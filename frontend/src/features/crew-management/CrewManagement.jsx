import { useEffect, useMemo, useState } from "react";
import {
  Users,
  UserPlus,
  Search,
  Pencil,
  Trash2,
  RefreshCw,
  ShieldCheck,
  X,
  Save,
  Activity,
  AlertCircle,
  CheckCircle2,
  UserRound,
} from "lucide-react";

import "./CrewManagement.css";

const API_URL = "http://127.0.0.1:8000/api/crew/";

const EMPTY_FORM = {
  name: "",
  role: "Crew Member",
  mission_status: "Active",
};

const STATUS_OPTIONS = [
  "Active",
  "On Duty",
  "Standby",
  "Inactive",
  "Medical Observation",
];

export default function CrewManagement() {
  const [crew, setCrew] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function loadCrew() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Unable to load crew members.");
      }

      const data = await response.json();
      setCrew(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        err.message ||
        "Could not connect to the COSMOCURA backend."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCrew();
  }, []);

  const filteredCrew = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return crew;

    return crew.filter((member) =>
      [
        member.name,
        member.role,
        member.mission_status,
        String(member.id),
      ]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [crew, search]);

  function openAddForm() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError("");
    setNotice("");
    setShowForm(true);
  }

  function openEditForm(member) {
    setEditingId(member.id);
    setForm({
      name: member.name || "",
      role: member.role || "Crew Member",
      mission_status: member.mission_status || "Active",
    });
    setError("");
    setNotice("");
    setShowForm(true);
  }

  function closeForm() {
    if (saving) return;

    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  function updateField(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const cleanName = form.name.trim();
    const cleanRole = form.role.trim();

    if (cleanName.length < 2 || cleanRole.length < 2) {
      setError("Please enter a valid name and role.");
      return;
    }

    setSaving(true);
    setError("");
    setNotice("");

    const payload = {
      name: cleanName,
      role: cleanRole,
      mission_status: form.mission_status,
    };

    try {
      const url = editingId
        ? `${API_URL}${editingId}`
        : API_URL;

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.detail || "Could not save the crew profile."
        );
      }

      setShowForm(false);
      setEditingId(null);
      setForm(EMPTY_FORM);

      await loadCrew();

      setNotice(
        editingId
          ? "Crew profile updated successfully."
          : "New crew member added successfully."
      );
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(member) {
    const confirmed = window.confirm(
      `Delete ${member.name}'s crew profile? This cannot be undone.`
    );

    if (!confirmed) return;

    setError("");
    setNotice("");

    try {
      const response = await fetch(`${API_URL}${member.id}`, {
        method: "DELETE",
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.detail || "Could not delete this crew profile."
        );
      }

      await loadCrew();
      setNotice(`${member.name}'s profile was deleted.`);
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    }
  }

  const activeCount = crew.filter(
    (member) => member.mission_status === "Active"
  ).length;

  const onDutyCount = crew.filter(
    (member) => member.mission_status === "On Duty"
  ).length;

  return (
    <section className="crew-management">
      <header className="cm-header">
        <div>
          <span className="cm-eyebrow">
            MISSION PERSONNEL DATABASE
          </span>
          <h2>Crew Management</h2>
          <p>
            Manage crew profiles, mission assignments and personnel status.
          </p>
        </div>

        <button className="cm-primary-btn" onClick={openAddForm}>
          <UserPlus size={18} />
          Add Crew Member
        </button>
      </header>

      <div className="cm-stats">
        <article className="cm-stat-card">
          <span className="cm-stat-icon">
            <Users size={20} />
          </span>
          <div>
            <small>TOTAL CREW</small>
            <strong>{crew.length}</strong>
          </div>
        </article>

        <article className="cm-stat-card">
          <span className="cm-stat-icon cm-green">
            <ShieldCheck size={20} />
          </span>
          <div>
            <small>ACTIVE</small>
            <strong>{activeCount}</strong>
          </div>
        </article>

        <article className="cm-stat-card">
          <span className="cm-stat-icon cm-blue">
            <Activity size={20} />
          </span>
          <div>
            <small>ON DUTY</small>
            <strong>{onDutyCount}</strong>
          </div>
        </article>
      </div>

      <div className="cm-directory">
        <div className="cm-directory-heading">
          <div>
            <span className="cm-section-label">PERSONNEL</span>
            <h3>Crew Directory</h3>
            <p>Registered crew members from the local mission database.</p>
          </div>

          <button
            className="cm-refresh-btn"
            onClick={loadCrew}
            disabled={loading}
            title="Refresh crew directory"
          >
            <RefreshCw size={17} />
            Refresh
          </button>
        </div>

        <div className="cm-toolbar">
          <div className="cm-search">
            <Search size={18} />
            <input
              type="search"
              placeholder="Search name, role, status or ID..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <span className="cm-result-count">
            {filteredCrew.length} of {crew.length} members
          </span>
        </div>

        {notice && (
          <div className="cm-notice">
            <CheckCircle2 size={17} />
            {notice}
            <button onClick={() => setNotice("")} aria-label="Dismiss">
              <X size={16} />
            </button>
          </div>
        )}

        {error && (
          <div className="cm-error">
            <AlertCircle size={18} />
            <span>{error}</span>
            <button onClick={() => setError("")} aria-label="Dismiss">
              <X size={16} />
            </button>
          </div>
        )}

        {loading ? (
          <div className="cm-state">
            <RefreshCw className="cm-spinner" size={25} />
            <p>Loading mission personnel...</p>
          </div>
        ) : filteredCrew.length === 0 ? (
          <div className="cm-state">
            <UserRound size={36} />
            <h4>
              {crew.length === 0
                ? "No crew members registered"
                : "No matching crew members"}
            </h4>
            <p>
              {crew.length === 0
                ? "Add your first crew profile to begin building the directory."
                : "Try another name, role, status or crew ID."}
            </p>

            {crew.length === 0 && (
              <button className="cm-primary-btn" onClick={openAddForm}>
                <UserPlus size={17} />
                Add First Crew Member
              </button>
            )}
          </div>
        ) : (
          <div className="cm-table-wrap">
            <table className="cm-table">
              <thead>
                <tr>
                  <th>CREW MEMBER</th>
                  <th>CREW ID</th>
                  <th>ROLE</th>
                  <th>MISSION STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {filteredCrew.map((member) => (
                  <tr key={member.id}>
                    <td>
                      <div className="cm-person">
                        <span className="cm-avatar">
                          {member.name?.charAt(0)?.toUpperCase() || "C"}
                        </span>
                        <strong>{member.name}</strong>
                      </div>
                    </td>

                    <td>
                      <span className="cm-id">
                        CC-{String(member.id).padStart(3, "0")}
                      </span>
                    </td>

                    <td>{member.role}</td>

                    <td>
                      <span
                        className={`cm-status ${
                          member.mission_status
                            ?.toLowerCase()
                            .replaceAll(" ", "-") || "unknown"
                        }`}
                      >
                        <span />
                        {member.mission_status}
                      </span>
                    </td>

                    <td>
                      <div className="cm-actions">
                        <button
                          className="cm-icon-btn"
                          onClick={() => openEditForm(member)}
                          title="Edit crew profile"
                          aria-label={`Edit ${member.name}`}
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          className="cm-icon-btn cm-delete-btn"
                          onClick={() => handleDelete(member)}
                          title="Delete crew profile"
                          aria-label={`Delete ${member.name}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="cm-footer">
          <ShieldCheck size={15} />
          <span>
            Connected to the COSMOCURA local database. Profiles are
            retrieved from the backend API.
          </span>
        </div>
      </div>

      {showForm && (
        <div
          className="cm-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeForm();
          }}
        >
          <div
            className="cm-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cm-form-title"
          >
            <div className="cm-modal-heading">
              <div>
                <span className="cm-section-label">
                  PERSONNEL REGISTRATION
                </span>
                <h3 id="cm-form-title">
                  {editingId ? "Edit Crew Profile" : "Add Crew Member"}
                </h3>
              </div>

              <button
                className="cm-icon-btn"
                onClick={closeForm}
                disabled={saving}
                aria-label="Close form"
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label>
                Crew member name
                <input
                  name="name"
                  value={form.name}
                  onChange={updateField}
                  placeholder="Enter full name"
                  minLength={2}
                  maxLength={120}
                  required
                />
              </label>

              <label>
                Mission role
                <input
                  name="role"
                  value={form.role}
                  onChange={updateField}
                  placeholder="e.g. Mission Commander"
                  minLength={2}
                  maxLength={100}
                  required
                />
              </label>

              <label>
                Mission status
                <select
                  name="mission_status"
                  value={form.mission_status}
                  onChange={updateField}
                  required
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>

              {error && (
                <div className="cm-error">
                  <AlertCircle size={17} />
                  {error}
                </div>
              )}

              <div className="cm-modal-actions">
                <button
                  type="button"
                  className="cm-secondary-btn"
                  onClick={closeForm}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="cm-primary-btn"
                  disabled={saving}
                >
                  <Save size={17} />
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Save Changes"
                    : "Register Crew"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}