import { useEffect, useMemo, useState } from "react";

import {
  Users,
  UserRound,
  HeartPulse,
  Thermometer,
  Droplets,
  Activity,
  RefreshCw,
  ClipboardList,
  AlertCircle,
  ShieldCheck
} from "lucide-react";

import {
  getCrew,
  getMeasurements
} from "../../services/api";

import "./CrewHealth.css";

const metricInfo = {
  heart_rate: {
    label: "Heart Rate",
    unit: "bpm",
    icon: HeartPulse
  },
  body_temperature: {
    label: "Body Temperature",
    unit: "°C",
    icon: Thermometer
  },
  oxygen_saturation: {
    label: "Oxygen Saturation",
    unit: "%",
    icon: Droplets
  }
};

function CrewHealth() {
  const [crew, setCrew] = useState([]);
  const [selectedCrewId, setSelectedCrewId] = useState("");
  const [measurements, setMeasurements] = useState([]);

  const [loadingCrew, setLoadingCrew] = useState(true);
  const [loadingRecords, setLoadingRecords] = useState(false);

  const [error, setError] = useState("");

  // LOAD CREW PROFILES

  async function loadCrew() {
    setLoadingCrew(true);
    setError("");

    try {
      const response = await getCrew();

      const members = Array.isArray(response)
        ? response
        : response.items || [];

      setCrew(members);

      if (members.length > 0) {
        setSelectedCrewId((current) => {
          const exists = members.some(
            (member) =>
              String(member.id) === String(current)
          );

          return exists
            ? current
            : String(members[0].id);
        });
      } else {
        setSelectedCrewId("");
        setMeasurements([]);
      }
    } catch (err) {
      setError(
        err.message || "Unable to load crew profiles."
      );
    } finally {
      setLoadingCrew(false);
    }
  }

  useEffect(() => {
    loadCrew();
  }, []);

  // LOAD SELECTED CREW MEASUREMENTS

  useEffect(() => {
    if (!selectedCrewId) {
      setMeasurements([]);
      setLoadingRecords(false);
      return;
    }

    let cancelled = false;

    async function loadRecords() {
      setLoadingRecords(true);
      setError("");

      try {
        const response = await getMeasurements(
          selectedCrewId
        );

        if (!cancelled) {
          setMeasurements(
            Array.isArray(response)
              ? response
              : response.items || []
          );
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.message ||
            "Unable to load this crew member's records."
          );
        }
      } finally {
        if (!cancelled) {
          setLoadingRecords(false);
        }
      }
    }

    loadRecords();

    return () => {
      cancelled = true;
    };
  }, [selectedCrewId]);

  // SELECTED CREW PROFILE

  const selectedCrew = useMemo(
    () =>
      crew.find(
        (member) =>
          String(member.id) === String(selectedCrewId)
      ),
    [crew, selectedCrewId]
  );

  // LATEST READING FOR EACH METRIC

  const latestReadings = useMemo(() => {
    const result = {};

    const sorted = [...measurements].sort(
      (a, b) =>
        new Date(b.recorded_at || 0) -
        new Date(a.recorded_at || 0)
    );

    sorted.forEach((record) => {
      if (!result[record.metric]) {
        result[record.metric] = record;
      }
    });

    return result;
  }, [measurements]);

  // FORMAT DATE

  function formatDate(value) {
    if (!value) return "Time unavailable";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "Time unavailable";
    }

    return date.toLocaleString();
  }

  // CREW NAME

  function getCrewName(member) {
    return (
      member?.name ||
      member?.full_name ||
      `Crew Member ${member?.id ?? ""}`
    );
  }

  // AVATAR INITIALS

  function getInitials(name) {
    return String(name)
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(
        (part) => part[0]?.toUpperCase() || ""
      )
      .join("");
  }

  return (
    <section className="ch-workspace">

      {/* PAGE HEADER */}

      <div className="ch-heading">
        <div>
          <span className="ch-eyebrow">
            MISSION PERSONNEL / HEALTH DATABASE
          </span>

          <h2>Crew Health Profiles</h2>

          <p>
            Review crew profiles and their saved health
            measurements from the local mission database.
          </p>
        </div>

        <button
          className="ch-refresh"
          type="button"
          onClick={loadCrew}
          disabled={loadingCrew}
        >
          <RefreshCw size={16} />
          Refresh Profiles
        </button>
      </div>

      {/* ERROR MESSAGE */}

      {error && (
        <div className="ch-message">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* CREW OVERVIEW */}

      <div className="ch-overview">
        <div className="ch-overview-icon">
          <Users size={23} />
        </div>

        <div>
          <span className="ch-eyebrow">
            REGISTERED PERSONNEL
          </span>

          <strong>
            {loadingCrew ? "..." : crew.length}
          </strong>

          <p>
            Crew profiles loaded from the database
          </p>
        </div>
      </div>

      {/* MAIN LAYOUT */}

      <div className="ch-layout">

        {/* CREW ROSTER */}

        <aside className="ch-panel ch-roster">

          <div className="ch-panel-heading">
            <div>
              <span className="ch-eyebrow">
                PERSONNEL DIRECTORY
              </span>

              <h3>Crew Roster</h3>
            </div>

            <Users size={20} />
          </div>

          {loadingCrew ? (
            <div className="ch-empty">
              <RefreshCw
                size={22}
                className="ch-spin"
              />

              <p>Loading crew profiles...</p>
            </div>
          ) : crew.length === 0 ? (
            <div className="ch-empty">
              <UserRound size={28} />

              <h4>No crew profiles</h4>

              <p>
                Add a crew member through the crew
                registration workflow to display
                their profile here.
              </p>
            </div>
          ) : (
            <div className="ch-roster-list">

              {crew.map((member) => {
                const name = getCrewName(member);

                const isSelected =
                  String(member.id) ===
                  String(selectedCrewId);

                return (
                  <button
                    type="button"
                    key={member.id}
                    className={`ch-person ${
                      isSelected ? "selected" : ""
                    }`}
                    onClick={() =>
                      setSelectedCrewId(
                        String(member.id)
                      )
                    }
                  >
                    <div className="ch-avatar">
                      {getInitials(name)}
                    </div>

                    <div className="ch-person-info">
                      <strong>{name}</strong>

                      <span>
                        {member.role ||
                          member.position ||
                          "Crew Member"}
                      </span>

                      <small>
                        PROFILE ID: {member.id}
                      </small>
                    </div>

                    <span className="ch-person-arrow">
                      ›
                    </span>
                  </button>
                );
              })}

            </div>
          )}

        </aside>

        {/* CREW DETAILS */}

        <div className="ch-main">

          {selectedCrew ? (
            <>

              {/* PROFILE CARD */}

              <div className="ch-panel ch-profile">

                <div className="ch-profile-top">

                  <div className="ch-large-avatar">
                    {getInitials(
                      getCrewName(selectedCrew)
                    )}
                  </div>

                  <div className="ch-profile-info">

                    <span className="ch-eyebrow">
                      SELECTED CREW PROFILE
                    </span>

                    <h3>
                      {getCrewName(selectedCrew)}
                    </h3>

                    <p>
                      {selectedCrew.role ||
                        selectedCrew.position ||
                        "Crew Member"}
                    </p>

                  </div>

                  <div className="ch-profile-id">
                    <span>CREW ID</span>

                    <strong>
                      #{selectedCrew.id}
                    </strong>
                  </div>

                </div>

                <div className="ch-profile-meta">

                  <div>
                    <span>DATABASE</span>
                    <strong>LOCAL RECORD</strong>
                  </div>

                  <div>
                    <span>MEASUREMENTS</span>
                    <strong>
                      {measurements.length} RECORDS
                    </strong>
                  </div>

                  <div>
                    <span>MISSION STATUS</span>
                    <strong>
                      {selectedCrew.mission_status ||
                        "Not specified"}
                    </strong>
                  </div>

                </div>

              </div>

              {/* HEALTH SNAPSHOT */}

              <div className="ch-reading-heading">

                <div>
                  <span className="ch-eyebrow">
                    LATEST SAVED READINGS
                  </span>

                  <h3>Health Snapshot</h3>
                </div>

                <Activity size={20} />

              </div>

              <div className="ch-reading-grid">

                {Object.entries(metricInfo).map(
                  ([key, info]) => {
                    const Icon = info.icon;
                    const record = latestReadings[key];

                    return (
                      <div
                        className="ch-reading-card"
                        key={key}
                      >

                        <div className="ch-reading-top">
                          <span>{info.label}</span>
                          <Icon size={19} />
                        </div>

                        <div className="ch-reading-value">
                          {record
                            ? record.value
                            : "—"}

                          <small>
                            {record
                              ? record.unit || info.unit
                              : info.unit}
                          </small>
                        </div>

                        <div className="ch-reading-time">
                          {record
                            ? formatDate(
                                record.recorded_at
                              )
                            : "No reading recorded"}
                        </div>

                      </div>
                    );
                  }
                )}

              </div>

              {/* MEASUREMENT HISTORY */}

              <div className="ch-panel ch-history">

                <div className="ch-panel-heading">

                  <div>
                    <span className="ch-eyebrow">
                      PERSONAL HEALTH TIMELINE
                    </span>

                    <h3>Measurement History</h3>
                  </div>

                  <ClipboardList size={20} />

                </div>

                {loadingRecords ? (
                  <div className="ch-empty">

                    <RefreshCw
                      size={22}
                      className="ch-spin"
                    />

                    <p>Loading health records...</p>

                  </div>
                ) : measurements.length === 0 ? (
                  <div className="ch-empty">

                    <ClipboardList size={28} />

                    <h4>No saved readings</h4>

                    <p>
                      Measurements recorded for this
                      crew member will appear here.
                    </p>

                  </div>
                ) : (

                  <div className="ch-table-wrap">

                    <table className="ch-table">

                      <thead>
                        <tr>
                          <th>MEASUREMENT</th>
                          <th>VALUE</th>
                          <th>RECORDED</th>
                          <th>SOURCE</th>
                        </tr>
                      </thead>

                      <tbody>

                        {measurements
                          .slice()
                          .sort(
                            (a, b) =>
                              new Date(
                                b.recorded_at || 0
                              ) -
                              new Date(
                                a.recorded_at || 0
                              )
                          )
                          .map((record) => {
                            const info =
                              metricInfo[record.metric];

                            return (
                              <tr key={record.id}>

                                <td>
                                  {info?.label ||
                                    record.metric}
                                </td>

                                <td className="ch-table-value">
                                  {record.value}{" "}
                                  {record.unit}
                                </td>

                                <td>
                                  {formatDate(
                                    record.recorded_at
                                  )}
                                </td>

                                <td>
                                  {record.source ||
                                    "Not specified"}
                                </td>

                              </tr>
                            );
                          })}

                      </tbody>

                    </table>

                  </div>

                )}

              </div>

            </>
          ) : (

            <div className="ch-panel ch-no-selection">

              <UserRound size={35} />

              <h3>Select a Crew Member</h3>

              <p>
                Choose a profile from the personnel
                directory to view its health information.
              </p>

            </div>

          )}

        </div>

      </div>

      {/* MEDICAL DISCLAIMER */}

      <div className="ch-disclaimer">

        <ShieldCheck size={18} />

        <p>
          This workspace displays stored measurements only.
          It does not diagnose medical conditions or determine
          whether a crew member is medically fit for duty.
          Follow approved mission medical procedures.
        </p>

      </div>

    </section>
  );
}

export default CrewHealth;