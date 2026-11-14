import { useEffect, useState } from "react";
import {
  Activity,
  HeartPulse,
  Thermometer,
  Droplets,
  Save,
  RefreshCw,
  ClipboardList,
  AlertCircle,
  CheckCircle2
} from "lucide-react";

import {
  getCrew,
  getMeasurements,
  createMeasurement
} from "../../services/api";

import "./GuidedMeasurements.css";

const measurementTypes = {
  heart_rate: {
    label: "Heart Rate",
    unit: "bpm",
    icon: HeartPulse,
    instruction:
      "Use an approved pulse sensor or follow your mission's trained pulse-measurement procedure. Record the beats per minute."
  },
  body_temperature: {
    label: "Body Temperature",
    unit: "°C",
    icon: Thermometer,
    instruction:
      "Use an approved medical thermometer according to its instructions. Record the displayed temperature in °C."
  },
  oxygen_saturation: {
    label: "Oxygen Saturation",
    unit: "%",
    icon: Droplets,
    instruction:
      "If an approved pulse oximeter is available, follow its instructions and record the SpO₂ percentage."
  }
};

function GuidedMeasurements() {
  const [crew, setCrew] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [crewId, setCrewId] = useState("");
  const [metric, setMetric] = useState("heart_rate");
  const [value, setValue] = useState("");
  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadData() {
    setLoading(true);
    setError("");

    try {
      const crewData = await getCrew();
      const crewList = Array.isArray(crewData)
        ? crewData
        : crewData.items || [];

      setCrew(crewList);

      const selectedId = crewId || crewList[0]?.id;

      if (selectedId) {
        setCrewId(String(selectedId));

        const data = await getMeasurements(selectedId);

        setMeasurements(
          Array.isArray(data) ? data : data.items || []
        );
      } else {
        setMeasurements([]);
      }
    } catch (err) {
      setError(err.message || "Unable to load health records.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleCrewChange(nextCrewId) {
    setCrewId(nextCrewId);
    setMeasurements([]);
    setError("");
    setSuccess("");

    if (!nextCrewId) return;

    setLoading(true);

    try {
      const data = await getMeasurements(nextCrewId);

      setMeasurements(
        Array.isArray(data) ? data : data.items || []
      );
    } catch (err) {
      setError(
        err.message || "Unable to load this crew member's records."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!crewId) {
      setError("Create a crew profile before saving a measurement.");
      return;
    }

    if (value === "" || !Number.isFinite(Number(value))) {
      setError("Enter a valid numerical reading.");
      return;
    }

    if (Number(value) <= 0) {
      setError("The reading must be greater than zero.");
      return;
    }

    setSaving(true);

    try {
      const reading = {
        crew_id: Number(crewId),
        metric,
        value: Number(value),
        unit: measurementTypes[metric].unit,
        source: "manual",
        notes: note.trim() || "Manually entered demonstration reading."
      };

      await createMeasurement(reading);

      setValue("");
      setNote("");
      setSuccess("Measurement saved successfully.");

      const updatedData = await getMeasurements(crewId);

      setMeasurements(
        Array.isArray(updatedData)
          ? updatedData
          : updatedData.items || []
      );
    } catch (err) {
      setError(err.message || "Unable to save this measurement.");
    } finally {
      setSaving(false);
    }
  }

  function formatDate(dateValue) {
    if (!dateValue) return "Time unavailable";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "Time unavailable";
    }

    return date.toLocaleString();
  }

  const selectedType = measurementTypes[metric];
  const SelectedIcon = selectedType.icon;

  return (
    <section className="gm-workspace">

      <div className="gm-heading">
        <div>
          <span className="gm-eyebrow">
            CREW HEALTH / DATA COLLECTION
          </span>
          <h2>Guided Health Measurements</h2>
          <p>
            Record health readings, understand how to measure them,
            and maintain a local crew health history.
          </p>
        </div>

        <button
          className="gm-refresh"
          onClick={loadData}
          disabled={loading}
          type="button"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="gm-message gm-error">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="gm-message gm-success">
          <CheckCircle2 size={18} />
          <span>{success}</span>
        </div>
      )}

      <div className="gm-layout">

        <div className="gm-panel gm-form-panel">
          <div className="gm-panel-heading">
            <div className="gm-heading-icon">
              <Activity size={20} />
            </div>
            <div>
              <span className="gm-eyebrow">NEW RECORD</span>
              <h3>Record a Measurement</h3>
            </div>
          </div>

          <form onSubmit={handleSave}>

            <label className="gm-label" htmlFor="gm-crew">
              Crew Member
            </label>

            <select
              id="gm-crew"
              className="gm-input"
              value={crewId}
              onChange={(event) =>
                handleCrewChange(event.target.value)
              }
              required
            >
              <option value="">Select crew member</option>

              {crew.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name || `Crew Member ${member.id}`}
                </option>
              ))}
            </select>

            <label className="gm-label" htmlFor="gm-metric">
              Measurement Type
            </label>

            <select
              id="gm-metric"
              className="gm-input"
              value={metric}
              onChange={(event) => setMetric(event.target.value)}
            >
              {Object.entries(measurementTypes).map(([key, item]) => (
                <option key={key} value={key}>
                  {item.label}
                </option>
              ))}
            </select>

            <div className="gm-instruction">
              <SelectedIcon size={21} />
              <div>
                <strong>How to measure</strong>
                <p>{selectedType.instruction}</p>
              </div>
            </div>

            <label className="gm-label" htmlFor="gm-value">
              Reading ({selectedType.unit})
            </label>

            <input
              id="gm-value"
              className="gm-input"
              type="number"
              step="any"
              min="0.01"
              placeholder={`Enter value in ${selectedType.unit}`}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              required
            />

            <label className="gm-label" htmlFor="gm-note">
              Notes (optional)
            </label>

            <textarea
              id="gm-note"
              className="gm-input gm-textarea"
              placeholder="Add context, measurement conditions or observations..."
              value={note}
              onChange={(event) => setNote(event.target.value)}
              rows={3}
            />

            <button
              className="gm-save-button"
              type="submit"
              disabled={saving || !crewId}
            >
              <Save size={17} />
              {saving ? "Saving..." : "Save Measurement"}
            </button>

          </form>
        </div>

        <div className="gm-panel gm-history-panel">
          <div className="gm-panel-heading">
            <div className="gm-heading-icon">
              <ClipboardList size={20} />
            </div>
            <div>
              <span className="gm-eyebrow">LOCAL DATABASE</span>
              <h3>Measurement History</h3>
            </div>
          </div>

          {loading ? (
            <div className="gm-empty">
              <RefreshCw className="gm-loading-icon" size={24} />
              <p>Loading saved measurements...</p>
            </div>
          ) : measurements.length === 0 ? (
            <div className="gm-empty">
              <ClipboardList size={30} />
              <h4>No measurements yet</h4>
              <p>
                Select a crew member and save a reading to begin
                building their health history.
              </p>
            </div>
          ) : (
            <div className="gm-record-list">
              {measurements
                .slice()
                .sort(
                  (a, b) =>
                    new Date(b.recorded_at || 0) -
                    new Date(a.recorded_at || 0)
                )
                .map((record) => {
                  const type = measurementTypes[record.metric];
                  const RecordIcon = type?.icon || Activity;

                  return (
                    <div className="gm-record" key={record.id}>
                      <div className="gm-record-icon">
                        <RecordIcon size={19} />
                      </div>

                      <div className="gm-record-details">
                        <strong>
                          {type?.label || record.metric}
                        </strong>

                        <span>
                          {formatDate(record.recorded_at)}
                        </span>

                        {record.notes && <p>{record.notes}</p>}
                      </div>

                      <div className="gm-record-value">
                        <strong>{record.value}</strong>
                        <span>{record.unit}</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>

      </div>

      <div className="gm-disclaimer">
        <AlertCircle size={17} />
        <p>
          Demonstration data only. These records are not a medical
          diagnosis or a substitute for approved mission medical
          procedures. Measurements must be taken using suitable,
          approved equipment.
        </p>
      </div>

    </section>
  );
}

export default GuidedMeasurements;