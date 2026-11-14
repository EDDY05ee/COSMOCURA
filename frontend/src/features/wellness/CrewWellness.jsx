import { useEffect, useMemo, useState } from "react";

import {
  Brain,
  Moon,
  Battery,
  Heart,
  Activity,
  Smile,
  Meh,
  Frown,
  Sun,
  ShieldCheck,
  CalendarDays,
  Plus,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Sparkles,
  RefreshCw,
} from "lucide-react";

import {
  getCrew,
  getWellnessCheckins,
  createWellnessCheckin,
} from "../../services/api";

import "./CrewWellness.css";


const MOODS = [
  { value: "Excellent", icon: Smile, description: "Feeling positive" },
  { value: "Good", icon: Smile, description: "Doing well" },
  { value: "Okay", icon: Meh, description: "Neither good nor bad" },
  { value: "Low", icon: Frown, description: "Feeling low" },
  { value: "Very low", icon: Frown, description: "Finding things difficult" },
];


function getWellnessMessage(stress, fatigue, sleep, mood) {
  if (stress >= 4 || fatigue >= 4 || mood === "Very low") {
    return {
      title: "Consider additional support",
      description:
        "Consider speaking with a trusted crew member or following the mission's approved psychological support procedures. If you feel unsafe or unable to function, alert the appropriate crew member immediately.",
      type: "attention",
    };
  }

  if (sleep < 6 || stress >= 3 || fatigue >= 3 || mood === "Low") {
    return {
      title: "Check in with yourself",
      description:
        "Consider reviewing your workload, rest opportunities and available crew support. Repeat the check-in later if useful.",
      type: "notice",
    };
  }

  return {
    title: "Check-in recorded",
    description:
      "Continue routine self-monitoring and use available crew support when needed.",
    type: "positive",
  };
}


function formatDate(value) {
  if (!value) return "Unknown date";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value).slice(0, 10);
  }

  return date.toLocaleDateString();
}


function getDateKey(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value).slice(0, 10);
  }

  return date.toISOString().slice(0, 10);
}


export default function CrewWellness() {
  const [crew, setCrew] = useState([]);
  const [checkins, setCheckins] = useState([]);

  const [selectedCrew, setSelectedCrew] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  const [form, setForm] = useState({
    sleep: "7",
    mood: "Good",
    stress: 2,
    fatigue: 2,
    note: "",
  });


  // ========================================
  // LOAD CREW AND WELLNESS DATA
  // ========================================

  async function loadData() {
    setLoading(true);
    setError("");

    try {
      const crewData = await getCrew();

      setCrew(crewData);

      if (!crewData.length) {
        setCheckins([]);
        setSelectedCrew("");
        return;
      }

      const wellnessData = await getWellnessCheckins();

      setCheckins(wellnessData);

      setSelectedCrew((previous) => {
        const stillExists = crewData.some(
          (member) => String(member.id) === String(previous)
        );

        return stillExists
          ? previous
          : String(crewData[0].id);
      });

    } catch (err) {
      setError(
        err.message || "Unable to load Crew Wellness data."
      );
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    loadData();
  }, []);


  // ========================================
  // SELECTED CREW MEMBER
  // ========================================

  const selectedCrewMember = crew.find(
    (member) => String(member.id) === String(selectedCrew)
  );

  const selectedCrewName = selectedCrewMember?.name || "";


  // ========================================
  // FILTER WELLNESS HISTORY
  // ========================================

  const crewHistory = useMemo(() => {
    return checkins
      .filter(
        (item) =>
          String(item.crew_id) === String(selectedCrew)
      )
      .sort(
        (a, b) =>
          new Date(b.recorded_at) - new Date(a.recorded_at)
      );
  }, [checkins, selectedCrew]);


  const latest = crewHistory[0];


  // ========================================
  // AVERAGE SLEEP
  // ========================================

  const averageSleep = useMemo(() => {
    if (!crewHistory.length) return "—";

    const average =
      crewHistory.reduce(
        (sum, item) => sum + Number(item.sleep),
        0
      ) / crewHistory.length;

    return average.toFixed(1);
  }, [crewHistory]);


  // ========================================
  // WELLNESS GUIDANCE
  // ========================================

  const wellnessMessage = latest
    ? getWellnessMessage(
        latest.stress,
        latest.fatigue,
        latest.sleep,
        latest.mood
      )
    : null;


  // ========================================
  // FORM HANDLING
  // ========================================

  function updateForm(field, value) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }


  // ========================================
  // SAVE CHECK-IN TO DATABASE
  // ========================================

  async function saveCheckin(event) {
    event.preventDefault();

    setError("");
    setSavedMessage("");

    const sleep = Number(form.sleep);

    if (
      !Number.isFinite(sleep) ||
      sleep < 0 ||
      sleep > 24
    ) {
      setError("Enter a valid sleep duration between 0 and 24 hours.");
      return;
    }

    if (!selectedCrew) {
      setError("Select a crew member before saving.");
      return;
    }

    const newCheckin = {
      crew_id: Number(selectedCrew),
      sleep,
      mood: form.mood,
      stress: Number(form.stress),
      fatigue: Number(form.fatigue),
      note: form.note.trim() || null,
    };

    setSaving(true);

    try {
      await createWellnessCheckin(newCheckin);

      const updatedCheckins = await getWellnessCheckins();

      setCheckins(updatedCheckins);

      setShowForm(false);
      setSavedMessage(
        "Wellness check-in saved to the local database."
      );

      setForm({
        sleep: "7",
        mood: "Good",
        stress: 2,
        fatigue: 2,
        note: "",
      });

    } catch (err) {
      setError(
        err.message || "Unable to save wellness check-in."
      );
    } finally {
      setSaving(false);
    }
  }


  // ========================================
  // MOOD ICON
  // ========================================

  const moodIcon = MOODS.find(
    (item) => item.value === latest?.mood
  )?.icon || Meh;

  const MoodIcon = moodIcon;


  // ========================================
  // LOADING STATE
  // ========================================

  if (loading) {
    return (
      <section className="crew-wellness">
        <div className="wellness-no-data">
          <RefreshCw size={28} />
          <p>Loading Crew Wellness data...</p>
        </div>
      </section>
    );
  }


  // ========================================
  // MAIN INTERFACE
  // ========================================

  return (
    <section className="crew-wellness">

      <div className="wellness-heading">
        <div>
          <div className="wellness-eyebrow">
            <Brain size={15} />
            HUMAN PERFORMANCE & WELLBEING
          </div>

          <h1>Crew Wellness</h1>

          <p>
            Supporting emotional wellbeing, sleep awareness and
            sustainable crew performance during space missions.
          </p>
        </div>

        <button
          className="wellness-primary-button"
          onClick={() => {
            setSavedMessage("");
            setError("");
            setShowForm(true);
          }}
          disabled={!crew.length}
        >
          <Plus size={17} />
          Daily Check-in
        </button>
      </div>


      <div className="wellness-demo-notice">
        <ShieldCheck size={18} />

        <div>
          <strong>Private wellness workspace — local database</strong>

          <span>
            Entries are stored in the local COSMOCURA database.
            This is a self-reporting tool, not a psychological
            diagnosis or clinical monitoring service.
          </span>
        </div>
      </div>


      {error && (
        <div className="wellness-saved-message">
          <AlertCircle size={17} />
          {error}
        </div>
      )}


      {savedMessage && (
        <div className="wellness-saved-message">
          <CheckCircle2 size={17} />
          {savedMessage}
        </div>
      )}


      {crew.length === 0 ? (

        <div className="wellness-panel">
          <div className="wellness-no-data">
            <Activity size={28} />

            <p>
              No crew members are available in the database.
            </p>

            <p>
              Add a crew member in Crew Management before
              creating wellness check-ins.
            </p>

            <button onClick={loadData}>
              <RefreshCw size={15} />
              Refresh data
            </button>
          </div>
        </div>

      ) : (

        <>

          {/* CREW SELECTOR */}

          <div className="wellness-crew-selector">
            <div>
              <span>SELECT CREW MEMBER</span>
              <strong>{selectedCrewName}</strong>
            </div>

            <select
              value={selectedCrew}
              onChange={(event) => {
                setSelectedCrew(event.target.value);
                setSavedMessage("");
                setError("");
              }}
              aria-label="Select crew member"
            >
              {crew.map((member) => (
                <option
                  key={member.id}
                  value={String(member.id)}
                >
                  {member.name}
                </option>
              ))}
            </select>
          </div>


          {/* OVERVIEW CARDS */}

          <div className="wellness-overview">

            <article className="wellness-metric-card">
              <div className="wellness-metric-icon blue">
                <Moon size={20} />
              </div>

              <span>Average sleep</span>

              <strong>
                {averageSleep} <small>hrs</small>
              </strong>

              <p>Across available entries</p>
            </article>


            <article className="wellness-metric-card">
              <div className="wellness-metric-icon purple">
                <Heart size={20} />
              </div>

              <span>Latest mood</span>

              <strong className="mood-value">
                {latest?.mood || "No data"}
              </strong>

              <p>Self-reported</p>
            </article>


            <article className="wellness-metric-card">
              <div className="wellness-metric-icon orange">
                <Battery size={20} />
              </div>

              <span>Fatigue rating</span>

              <strong>
                {latest ? `${latest.fatigue}/5` : "—"}
              </strong>

              <p>Self-reported scale</p>
            </article>


            <article className="wellness-metric-card">
              <div className="wellness-metric-icon green">
                <CalendarDays size={20} />
              </div>

              <span>Check-ins</span>

              <strong>{crewHistory.length}</strong>

              <p>Available entries</p>
            </article>

          </div>


          {/* MAIN WELLNESS GRID */}

          <div className="wellness-main-grid">

            <div className="wellness-panel">

              <div className="wellness-panel-heading">
                <div>
                  <h2>Latest Wellness Snapshot</h2>
                  <p>Based on the latest available self-report</p>
                </div>

                <Sparkles size={19} />
              </div>


              {latest ? (

                <>

                  <div
                    className={`wellness-guidance ${wellnessMessage.type}`}
                  >
                    <div className="wellness-guidance-icon">

                      {wellnessMessage.type === "attention" ? (
                        <AlertCircle size={20} />
                      ) : (
                        <CheckCircle2 size={20} />
                      )}

                    </div>

                    <div>
                      <strong>{wellnessMessage.title}</strong>
                      <p>{wellnessMessage.description}</p>
                    </div>
                  </div>


                  <div className="wellness-snapshot-grid">

                    <div className="wellness-snapshot-item">
                      <Moon size={19} />
                      <span>Sleep</span>
                      <strong>{latest.sleep} hours</strong>
                    </div>

                    <div className="wellness-snapshot-item">
                      <MoodIcon size={19} />
                      <span>Mood</span>
                      <strong>{latest.mood}</strong>
                    </div>

                    <div className="wellness-snapshot-item">
                      <Brain size={19} />
                      <span>Stress</span>
                      <strong>{latest.stress}/5</strong>
                    </div>

                    <div className="wellness-snapshot-item">
                      <Battery size={19} />
                      <span>Fatigue</span>
                      <strong>{latest.fatigue}/5</strong>
                    </div>

                  </div>

                </>

              ) : (

                <div className="wellness-no-data">
                  <Activity size={28} />

                  <p>
                    No check-in is available for this crew member.
                  </p>

                  <button onClick={() => setShowForm(true)}>
                    Start first check-in
                  </button>
                </div>

              )}

            </div>


            {/* WELLBEING PRACTICES */}

            <div className="wellness-panel">

              <div className="wellness-panel-heading">
                <div>
                  <h2>Wellbeing Practices</h2>
                  <p>Simple supportive activities</p>
                </div>

                <Sun size={19} />
              </div>


              <div className="wellness-practice">
                <div className="practice-icon">
                  <Moon size={18} />
                </div>

                <div>
                  <strong>Protect sleep opportunities</strong>

                  <p>
                    Maintain a consistent rest schedule where
                    mission operations allow.
                  </p>
                </div>
              </div>


              <div className="wellness-practice">
                <div className="practice-icon">
                  <Heart size={18} />
                </div>

                <div>
                  <strong>Stay socially connected</strong>

                  <p>
                    Make time for supportive conversations
                    with fellow crew members.
                  </p>
                </div>
              </div>


              <div className="wellness-practice">
                <div className="practice-icon">
                  <Activity size={18} />
                </div>

                <div>
                  <strong>Balance workload and recovery</strong>

                  <p>
                    Use approved exercise, rest and mission
                    scheduling opportunities.
                  </p>
                </div>
              </div>


              <div className="wellness-practice">
                <div className="practice-icon">
                  <BookOpen size={18} />
                </div>

                <div>
                  <strong>Keep a personal journal</strong>

                  <p>
                    Record observations and concerns you may
                    wish to discuss.
                  </p>
                </div>
              </div>

            </div>

          </div>


          {/* WELLNESS HISTORY */}

          <div className="wellness-history-panel">

            <div className="wellness-panel-heading">
              <div>
                <h2>Wellness History</h2>
                <p>Previous self-reported check-ins</p>
              </div>

              <button
                className="wellness-history-button"
                onClick={() => setShowHistory(!showHistory)}
              >
                {showHistory ? "Hide history" : "View history"}
              </button>
            </div>


            {showHistory && (

              <div className="wellness-history-list">

                {crewHistory.map((item) => (

                  <article key={item.id}>

                    <div>
                      <strong>
                        {formatDate(item.recorded_at)}
                      </strong>

                      <span>{item.mood} mood</span>
                    </div>


                    <div>
                      <span>Sleep</span>
                      <strong>{item.sleep} hrs</strong>
                    </div>


                    <div>
                      <span>Stress</span>
                      <strong>{item.stress}/5</strong>
                    </div>


                    <div>
                      <span>Fatigue</span>
                      <strong>{item.fatigue}/5</strong>
                    </div>


                    <p>
                      {item.note || "No additional notes."}
                    </p>

                  </article>

                ))}


                {crewHistory.length === 0 && (
                  <p>No history is available yet.</p>
                )}

              </div>

            )}

          </div>


          {/* FOOTER DISCLAIMER */}

          <div className="wellness-footer-note">
            <AlertCircle size={16} />

            <p>
              Wellness ratings are subjective self-reports.
              They do not establish a medical or psychological
              condition. Follow approved mission procedures
              and seek qualified support when needed.
            </p>
          </div>

        </>

      )}


      {/* DAILY CHECK-IN MODAL */}

      {showForm && (

        <div
          className="wellness-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowForm(false);
            }
          }}
        >

          <div className="wellness-modal">

            <div className="wellness-modal-heading">

              <div>
                <span>CREW WELLBEING</span>
                <h2>Daily Check-in</h2>
                <p>{selectedCrewName}</p>
              </div>

              <button
                onClick={() => setShowForm(false)}
                aria-label="Close check-in"
              >
                ×
              </button>

            </div>


            <form onSubmit={saveCheckin}>

              <label className="wellness-field">
                Hours of sleep

                <input
                  type="number"
                  min="0"
                  max="24"
                  step="0.5"
                  value={form.sleep}
                  onChange={(event) =>
                    updateForm("sleep", event.target.value)
                  }
                  required
                />
              </label>


              <div className="wellness-field">
                <span>How are you feeling today?</span>

                <div className="mood-options">

                  {MOODS.map((mood) => {
                    const Icon = mood.icon;

                    return (

                      <button
                        key={mood.value}
                        type="button"
                        className={
                          form.mood === mood.value
                            ? "selected"
                            : ""
                        }
                        onClick={() =>
                          updateForm("mood", mood.value)
                        }
                      >
                        <Icon size={22} />

                        <strong>{mood.value}</strong>

                        <small>{mood.description}</small>
                      </button>

                    );
                  })}

                </div>
              </div>


              <div className="wellness-field">

                <span>Stress level: {form.stress}/5</span>

                <input
                  type="range"
                  min="1"
                  max="5"
                  value={form.stress}
                  onChange={(event) =>
                    updateForm("stress", event.target.value)
                  }
                />

                <div className="wellness-range-labels">
                  <span>Low</span>
                  <span>High</span>
                </div>

              </div>


              <div className="wellness-field">

                <span>Fatigue level: {form.fatigue}/5</span>

                <input
                  type="range"
                  min="1"
                  max="5"
                  value={form.fatigue}
                  onChange={(event) =>
                    updateForm("fatigue", event.target.value)
                  }
                />

                <div className="wellness-range-labels">
                  <span>Rested</span>
                  <span>Very fatigued</span>
                </div>

              </div>


              <label className="wellness-field">
                Optional personal note

                <textarea
                  rows="3"
                  maxLength="500"
                  value={form.note}
                  onChange={(event) =>
                    updateForm("note", event.target.value)
                  }
                  placeholder="Write anything you would like to record..."
                />
              </label>


              <div className="wellness-privacy-note">
                <ShieldCheck size={16} />
                Self-reported entry. No automatic diagnosis.
              </div>


              <button
                className="wellness-primary-button full"
                type="submit"
                disabled={saving}
              >
                {saving ? (
                  <RefreshCw size={17} />
                ) : (
                  <CheckCircle2 size={17} />
                )}

                {saving ? "Saving..." : "Save Check-in"}
              </button>

            </form>

          </div>

        </div>

      )}

    </section>
  );
}