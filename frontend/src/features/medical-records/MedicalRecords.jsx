import { useEffect, useMemo, useState } from "react";

import {
  ClipboardList,
  FileText,
  Plus,
  Search,
  HeartPulse,
  Brain,
  Clock,
  User,
  ShieldCheck,
  Radio,
  Copy,
  X,
  AlertCircle,
  CheckCircle2,
  RefreshCw
} from "lucide-react";

import {
  getCrew,
  getMedicalRecords,
  createMedicalRecord
} from "../../services/api";

import "./MedicalRecords.css";

const CATEGORIES = [
  "Vital Signs",
  "Wellness",
  "Medical Notes",
  "Medication",
  "Incident",
  "Other"
];

function formatDate(date) {
  if (!date) return "Time unavailable";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Time unavailable";
  }

  return parsedDate.toLocaleString([], {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function categoryIcon(category) {
  const icons = {
    "Vital Signs": HeartPulse,
    Wellness: Brain,
    "Medical Notes": FileText,
    Medication: ShieldCheck,
    Incident: AlertCircle,
    Other: ClipboardList
  };

  return icons[category] || ClipboardList;
}

export default function MedicalRecords() {
  const [crew, setCrew] = useState([]);
  const [records, setRecords] = useState([]);

  const [selectedCrew, setSelectedCrew] = useState("all");
  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [showHandoff, setShowHandoff] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    crewId: "",
    category: "Vital Signs",
    title: "",
    details: "",
    source: "Manual entry",
    status: "Routine"
  });

  // LOAD CREW AND MEDICAL RECORDS

  async function loadData() {
    setLoading(true);
    setError("");

    try {
      const [crewData, recordData] = await Promise.all([
        getCrew(),
        getMedicalRecords()
      ]);

      const members = Array.isArray(crewData)
        ? crewData
        : crewData.items || [];

      const savedRecords = Array.isArray(recordData)
        ? recordData
        : recordData.items || [];

      setCrew(members);
      setRecords(savedRecords);

      setForm((previous) => ({
        ...previous,
        crewId:
          previous.crewId ||
          String(members[0]?.id || "")
      }));

      if (
        selectedCrew !== "all" &&
        !members.some(
          (member) => String(member.id) === selectedCrew
        )
      ) {
        setSelectedCrew("all");
      }
    } catch (err) {
      setError(
        err.message || "Unable to load medical records."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  // CREW NAME LOOKUP

  function getCrewName(crewId) {
    const member = crew.find(
      (item) => String(item.id) === String(crewId)
    );

    return member?.name || `Crew Member ${crewId}`;
  }

  // FILTER RECORDS

  const filteredRecords = useMemo(() => {
    const query = search.toLowerCase().trim();

    return records
      .map((record) => ({
        ...record,
        crewName: getCrewName(record.crew_id),
        date: record.recorded_at
      }))
      .filter((record) => {
        const matchesCrew =
          selectedCrew === "all" ||
          String(record.crew_id) === selectedCrew;

        const matchesSearch =
          (record.title || "").toLowerCase().includes(query) ||
          (record.details || "").toLowerCase().includes(query) ||
          record.crewName.toLowerCase().includes(query) ||
          (record.category || "").toLowerCase().includes(query);

        return matchesCrew && matchesSearch;
      })
      .sort(
        (a, b) =>
          new Date(b.date || 0) -
          new Date(a.date || 0)
      );
  }, [records, selectedCrew, search, crew]);

  const selectedCrewName =
    selectedCrew === "all"
      ? "All crew members"
      : getCrewName(selectedCrew);

  const routineCount = records.filter(
    (record) => record.status === "Routine"
  ).length;

  const incidentCount = records.filter(
    (record) => record.category === "Incident"
  ).length;

  // FORM UPDATE

  function updateForm(field, value) {
    setForm((previous) => ({
      ...previous,
      [field]: value
    }));
  }

  // OPEN ADD RECORD FORM
  // Automatically selects the currently filtered crew member.

  function openAddRecordForm() {
    setError("");
    setSuccess("");

    setForm((previous) => ({
      ...previous,
      crewId:
        selectedCrew !== "all"
          ? selectedCrew
          : String(crew[0]?.id || "")
    }));

    setShowForm(true);
  }

  // SAVE MEDICAL RECORD TO SQLITE

  async function addRecord(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.crewId) {
      setError("Please create a crew profile first.");
      return;
    }

    if (!form.title.trim() || !form.details.trim()) {
      setError("Enter a title and record details.");
      return;
    }

    setSaving(true);

    try {
      const newRecord = {
        crew_id: Number(form.crewId),
        category: form.category,
        title: form.title.trim(),
        details: form.details.trim(),
        source: form.source.trim() || "Manual entry",
        status: form.status
      };

      await createMedicalRecord(newRecord);

      await loadData();

      setSelectedCrew("all");
      setSearch("");
      setShowForm(false);

      setForm({
        crewId: String(crew[0]?.id || ""),
        category: "Vital Signs",
        title: "",
        details: "",
        source: "Manual entry",
        status: "Routine"
      });

      setSuccess(
        "Medical record saved to the local database."
      );
    } catch (err) {
      setError(
        err.message || "Unable to save medical record."
      );
    } finally {
      setSaving(false);
    }
  }

  // MEDICAL HANDOFF TEXT

  const handoffText = useMemo(() => {
    const lines = [
      "COSMOCURA — MEDICAL HANDOFF BRIEF",
      "================================",
      `Prepared: ${new Date().toLocaleString()}`,
      `Crew scope: ${selectedCrewName}`,
      "",
      "IMPORTANT: This is a locally prepared summary.",
      "It has NOT been transmitted to mission control.",
      "Verify all information against approved medical records.",
      "",
      "RECORD TIMELINE",
      "---------------"
    ];

    filteredRecords.forEach((record) => {
      lines.push(
        "",
        `${formatDate(record.date)} | ${record.crewName}`,
        `Category: ${record.category}`,
        `Title: ${record.title}`,
        `Details: ${record.details}`,
        `Source: ${record.source}`,
        `Record label: ${record.status}`
      );
    });

    if (filteredRecords.length === 0) {
      lines.push(
        "No records match the selected crew member and search."
      );
    }

    return lines.join("\n");
  }, [filteredRecords, selectedCrewName]);

  // COPY HANDOFF

  async function copyHandoff() {
    try {
      await navigator.clipboard.writeText(handoffText);

      setSuccess(
        "Handoff brief copied. It has not been transmitted."
      );
    } catch {
      setError(
        "Clipboard access is unavailable. Select and copy the report manually."
      );
    }
  }

  return (
    <section className="medical-records">

      {/* HEADER */}

      <div className="records-heading">
        <div>
          <div className="records-eyebrow">
            <ClipboardList size={15} />
            CREW MEDICAL DATA
          </div>

          <h1>Medical Records</h1>

          <p>
            A structured timeline of crew health observations
            and mission medical notes.
          </p>
        </div>

        <button
          className="records-primary-button"
          onClick={openAddRecordForm}
          disabled={crew.length === 0}
          type="button"
        >
          <Plus size={17} />
          Add Record
        </button>
      </div>

      {/* STATUS MESSAGES */}

      {error && (
        <div className="records-notice">
          <AlertCircle size={19} />

          <div>
            <strong>Attention</strong>
            <span>{error}</span>
          </div>
        </div>
      )}

      {success && (
        <div className="records-notice">
          <CheckCircle2 size={19} />

          <div>
            <strong>Success</strong>
            <span>{success}</span>
          </div>
        </div>
      )}

      {/* DATA NOTICE */}

      <div className="records-notice">
        <ShieldCheck size={19} />

        <div>
          <strong>Local database workspace</strong>

          <span>
            Records are stored in the local SQLite database.
            This prototype does not transmit medical information
            to mission control.
          </span>
        </div>
      </div>

      {/* STATISTICS */}

      <div className="records-stats">

        <div className="record-stat-card">
          <div className="record-stat-icon blue">
            <FileText size={19} />
          </div>

          <div>
            <span>Total records</span>
            <strong>
              {loading ? "..." : records.length}
            </strong>
          </div>
        </div>

        <div className="record-stat-card">
          <div className="record-stat-icon green">
            <CheckCircle2 size={19} />
          </div>

          <div>
            <span>Routine entries</span>
            <strong>
              {loading ? "..." : routineCount}
            </strong>
          </div>
        </div>

        <div className="record-stat-card">
          <div className="record-stat-icon orange">
            <AlertCircle size={19} />
          </div>

          <div>
            <span>Incident entries</span>
            <strong>
              {loading ? "..." : incidentCount}
            </strong>
          </div>
        </div>

      </div>

      {/* TOOLBAR */}

      <div className="records-toolbar">

        <div className="records-search">
          <Search size={17} />

          <input
            type="search"
            placeholder="Search records, crew or category..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            aria-label="Search medical records"
          />
        </div>

        <select
          value={selectedCrew}
          onChange={(event) =>
            setSelectedCrew(event.target.value)
          }
          aria-label="Filter by crew member"
        >
          <option value="all">All crew members</option>

          {crew.map((member) => (
            <option
              key={member.id}
              value={String(member.id)}
            >
              {member.name}
            </option>
          ))}
        </select>

        <button
          className="records-secondary-button"
          onClick={() => setShowHandoff(true)}
          type="button"
        >
          <Radio size={17} />
          Prepare Handoff
        </button>

        <button
          className="records-secondary-button"
          onClick={loadData}
          disabled={loading}
          type="button"
        >
          <RefreshCw size={16} />
          Refresh
        </button>

      </div>

      {/* MAIN CONTENT */}

      <div className="records-content">

        {/* TIMELINE */}

        <div className="records-timeline-panel">

          <div className="records-panel-heading">
            <div>
              <h2>Health Timeline</h2>

              <p>
                {filteredRecords.length} matching records
              </p>
            </div>

            <span className="records-live-label">
              <span />
              LOCAL DATABASE
            </span>
          </div>

          {loading ? (
            <div className="records-empty">
              <RefreshCw size={30} />
              <h3>Loading records...</h3>
            </div>
          ) : filteredRecords.length === 0 ? (
            <div className="records-empty">
              <Search size={30} />

              <h3>No records found</h3>

              <p>
                Add a medical record or try another search
                or crew filter.
              </p>
            </div>
          ) : (
            <div className="records-timeline">

              {filteredRecords.map((record) => {
                const Icon = categoryIcon(record.category);

                return (
                  <article
                    className="timeline-record"
                    key={record.id}
                  >
                    <div className="timeline-marker">
                      <Icon size={17} />
                    </div>

                    <div className="timeline-record-content">

                      <div className="timeline-record-top">
                        <div>
                          <span className="record-category">
                            {record.category}
                          </span>

                          <h3>{record.title}</h3>
                        </div>

                        <span
                          className={`record-status ${
                            record.status === "Routine"
                              ? "routine"
                              : "attention"
                          }`}
                        >
                          {record.status}
                        </span>
                      </div>

                      <p className="record-description">
                        {record.details}
                      </p>

                      <div className="record-meta">

                        <span>
                          <User size={13} />
                          {record.crewName}
                        </span>

                        <span>
                          <Clock size={13} />
                          {formatDate(record.date)}
                        </span>

                      </div>

                      <button
                        className="record-details-button"
                        onClick={() =>
                          setSelectedRecord(record)
                        }
                        type="button"
                      >
                        View record details
                      </button>

                    </div>
                  </article>
                );
              })}

            </div>
          )}

        </div>

        {/* HANDOFF PANEL */}

        <aside className="records-side-panel">

          <div className="records-side-icon">
            <FileText size={23} />
          </div>

          <h2>Mission Handoff</h2>

          <p>
            Prepare a structured summary of available crew
            health records for review by authorized
            medical personnel.
          </p>

          <div className="handoff-detail">
            <span>Selected scope</span>
            <strong>{selectedCrewName}</strong>
          </div>

          <div className="handoff-detail">
            <span>Included records</span>
            <strong>{filteredRecords.length}</strong>
          </div>

          <div className="handoff-detail">
            <span>Transmission</span>
            <strong className="not-transmitted">
              Not connected
            </strong>
          </div>

          <button
            className="records-primary-button full"
            onClick={() => setShowHandoff(true)}
            type="button"
          >
            <ClipboardList size={17} />
            Generate Brief
          </button>

          <div className="handoff-security-note">
            <ShieldCheck size={16} />

            <span>
              Preparing a report does not send data to Earth.
            </span>
          </div>

        </aside>

      </div>

      {/* ADD RECORD MODAL */}

      {showForm && (
        <div
          className="records-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowForm(false);
            }
          }}
        >
          <div className="records-modal">

            <div className="records-modal-heading">

              <div>
                <span>MEDICAL DATA ENTRY</span>
                <h2>Add Health Record</h2>
              </div>

              <button
                className="records-close-button"
                onClick={() => setShowForm(false)}
                aria-label="Close form"
                type="button"
              >
                <X size={20} />
              </button>

            </div>

            <form onSubmit={addRecord}>

              <label>
                Crew member

                <select
                  value={form.crewId}
                  onChange={(event) =>
                    updateForm("crewId", event.target.value)
                  }
                  required
                >
                  <option value="">
                    Select crew member
                  </option>

                  {crew.map((member) => (
                    <option
                      key={member.id}
                      value={String(member.id)}
                    >
                      {member.name}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Record category

                <select
                  value={form.category}
                  onChange={(event) =>
                    updateForm("category", event.target.value)
                  }
                >
                  {CATEGORIES.map((category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Record title

                <input
                  value={form.title}
                  onChange={(event) =>
                    updateForm("title", event.target.value)
                  }
                  placeholder="e.g. Daily health assessment"
                  required
                  maxLength={100}
                />
              </label>

              <label>
                Details and observations

                <textarea
                  value={form.details}
                  onChange={(event) =>
                    updateForm("details", event.target.value)
                  }
                  placeholder="Enter the recorded observation..."
                  rows={4}
                  required
                  maxLength={5000}
                />
              </label>

              <label>
                Data source

                <input
                  value={form.source}
                  onChange={(event) =>
                    updateForm("source", event.target.value)
                  }
                  placeholder="e.g. Manual entry or device name"
                  maxLength={100}
                />
              </label>

              <label>
                Record label

                <select
                  value={form.status}
                  onChange={(event) =>
                    updateForm("status", event.target.value)
                  }
                >
                  <option value="Routine">
                    Routine
                  </option>

                  <option value="Needs review">
                    Needs review
                  </option>

                  <option value="Urgent review">
                    Urgent review
                  </option>
                </select>
              </label>

              <div className="records-form-warning">
                <AlertCircle size={16} />

                This is a record label, not a clinical assessment.
              </div>

              <button
                type="submit"
                className="records-primary-button full"
                disabled={saving || crew.length === 0}
              >
                {saving ? (
                  <>
                    <RefreshCw size={17} />
                    Saving...
                  </>
                ) : (
                  <>
                    <Plus size={17} />
                    Save to Database
                  </>
                )}
              </button>

            </form>

          </div>
        </div>
      )}

      {/* RECORD DETAILS MODAL */}

      {selectedRecord && (
        <div
          className="records-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedRecord(null);
            }
          }}
        >
          <div className="records-modal">

            <div className="records-modal-heading">

              <div>
                <span>RECORD DETAILS</span>
                <h2>{selectedRecord.title}</h2>
              </div>

              <button
                className="records-close-button"
                onClick={() => setSelectedRecord(null)}
                aria-label="Close details"
                type="button"
              >
                <X size={20} />
              </button>

            </div>

            <div className="record-detail-list">

              <div>
                <span>Crew member</span>
                <strong>{selectedRecord.crewName}</strong>
              </div>

              <div>
                <span>Category</span>
                <strong>{selectedRecord.category}</strong>
              </div>

              <div>
                <span>Date recorded</span>
                <strong>
                  {formatDate(selectedRecord.date)}
                </strong>
              </div>

              <div>
                <span>Source</span>
                <strong>{selectedRecord.source}</strong>
              </div>

              <div>
                <span>Record label</span>
                <strong>{selectedRecord.status}</strong>
              </div>

            </div>

            <div className="record-full-description">
              <span>OBSERVATIONS</span>
              <p>{selectedRecord.details}</p>
            </div>

            <p className="records-disclaimer">
              This record is informational and must be reviewed
              according to approved mission medical procedures.
            </p>

          </div>
        </div>
      )}

      {/* HANDOFF MODAL */}

      {showHandoff && (
        <div
          className="records-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowHandoff(false);
            }
          }}
        >
          <div className="records-modal handoff-modal">

            <div className="records-modal-heading">

              <div>
                <span>MISSION COMMUNICATION</span>
                <h2>Medical Handoff Brief</h2>
              </div>

              <button
                className="records-close-button"
                onClick={() => setShowHandoff(false)}
                aria-label="Close handoff"
                type="button"
              >
                <X size={20} />
              </button>

            </div>

            <div className="handoff-warning">
              <AlertCircle size={18} />

              <div>
                <strong>Not transmitted</strong>

                <p>
                  This report is only prepared locally.
                  No spacecraft communication link is connected.
                </p>
              </div>
            </div>

            <div className="handoff-preview">
              <pre>{handoffText}</pre>
            </div>

            <button
              className="records-primary-button full"
              onClick={copyHandoff}
              type="button"
            >
              <Copy size={17} />
              Copy Handoff Text
            </button>

          </div>
        </div>
      )}

    </section>
  );
}