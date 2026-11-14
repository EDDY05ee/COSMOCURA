import { useState } from "react";

import {
  AlertTriangle,
  HeartPulse,
  Brain,
  Wind,
  Droplets,
  Activity,
  ShieldAlert,
  ShieldCheck,
  Radio,
  ClipboardList,
  CheckCircle2,
  Circle,
  Siren,
  Info,
  Stethoscope,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

import "./EmergencyCenter.css";

const emergencyTypes = [
  {
    id: "unresponsive",
    name: "Unresponsive crew member",
    description: "The person does not respond normally.",
    icon: Brain,
    level: "CRITICAL",
    color: "#ff4d5a",
    signs: [
      "No normal response to voice or gentle stimulation",
      "Sudden loss of consciousness",
      "Unable to communicate normally",
    ],
    actions: [
      "Check that the immediate environment is safe for you and the crew member.",
      "Try to get the person's attention and check for a response.",
      "Immediately activate the approved onboard emergency procedure and alert the crew.",
      "Assess breathing only as trained in the crew's medical protocol.",
      "Obtain the onboard medical kit and AED if directed by the approved procedure.",
      "Follow the trained response procedure and report any changes.",
    ],
  },
  {
    id: "breathing",
    name: "Breathing difficulty",
    description: "The person is struggling to breathe.",
    icon: Wind,
    level: "CRITICAL",
    color: "#ff4d5a",
    signs: [
      "Severe shortness of breath",
      "Unable to speak normally because of breathing difficulty",
      "Sudden worsening of breathing",
    ],
    actions: [
      "Check the environment and ensure it is safe.",
      "Immediately activate the onboard medical emergency procedure.",
      "Alert the other crew members and request medical support according to mission protocol.",
      "Observe and report breathing changes and responsiveness.",
      "Use available monitoring equipment only as trained.",
      "Follow the approved breathing-emergency checklist.",
    ],
  },
  {
    id: "chest-pain",
    name: "Severe chest pain",
    description: "Sudden or severe chest discomfort.",
    icon: HeartPulse,
    level: "CRITICAL",
    color: "#ff4d5a",
    signs: [
      "Severe or persistent chest discomfort",
      "Chest discomfort with breathlessness",
      "Chest discomfort with faintness or sweating",
    ],
    actions: [
      "Treat sudden severe chest pain as a potential emergency.",
      "Immediately activate the approved onboard medical procedure.",
      "Alert the crew and request medical support.",
      "Record when symptoms began and how they have changed.",
      "Record relevant available measurements without delaying emergency action.",
      "Do not administer medication unless directed by the approved mission medical protocol.",
    ],
  },
  {
    id: "bleeding",
    name: "Severe bleeding or injury",
    description: "Major bleeding or serious physical injury.",
    icon: Droplets,
    level: "CRITICAL",
    color: "#ff4d5a",
    signs: [
      "Heavy or uncontrolled bleeding",
      "Major injury or suspected serious trauma",
      "Rapid deterioration after an injury",
    ],
    actions: [
      "Ensure the area is safe before approaching.",
      "Activate the onboard emergency procedure and alert the crew.",
      "Use protective equipment and the medical kit according to crew training.",
      "Apply only the bleeding-control measures taught in the approved medical training.",
      "Record the injury circumstances and observed changes.",
      "Follow the mission's approved trauma-response checklist.",
    ],
  },
  {
    id: "neurological",
    name: "Sudden neurological changes",
    description: "Sudden confusion, weakness, or unusual behaviour.",
    icon: Brain,
    level: "URGENT",
    color: "#ffb547",
    signs: [
      "Sudden confusion or disorientation",
      "New weakness or difficulty moving",
      "Sudden speech or vision changes",
      "Seizure or unusual loss of awareness",
    ],
    actions: [
      "Treat sudden neurological changes as urgent.",
      "Activate the onboard medical procedure and alert the crew.",
      "Record the time symptoms were first observed.",
      "Observe responsiveness and changes in movement or communication.",
      "Protect the person from nearby hazards according to crew training.",
      "Follow the approved neurological emergency checklist.",
    ],
  },
  {
    id: "other",
    name: "Other serious symptoms",
    description: "A concerning or rapidly worsening health condition.",
    icon: Activity,
    level: "URGENT",
    color: "#ffb547",
    signs: [
      "Rapidly worsening symptoms",
      "Severe pain or distress",
      "A condition that causes serious concern",
    ],
    actions: [
      "Check immediate environmental safety.",
      "Alert the crew and activate the appropriate medical procedure.",
      "Describe the symptoms clearly and when they started.",
      "Record available measurements if doing so does not delay care.",
      "Monitor and communicate changes.",
      "Follow the approved onboard medical checklist.",
    ],
  },
];

const communicationFields = [
  "Crew member's name or identifier",
  "Time symptoms started",
  "Observed signs and symptoms",
  "Changes since symptoms began",
  "Available measurements and their timestamps",
  "Actions already taken",
  "Current responsiveness and breathing observations",
];

export default function EmergencyCenter() {
  const [selectedId, setSelectedId] = useState("unresponsive");
  const [completedSteps, setCompletedSteps] = useState([]);
  const [showReport, setShowReport] = useState(false);

  const selected =
    emergencyTypes.find((item) => item.id === selectedId) ||
    emergencyTypes[0];

  const SelectedIcon = selected.icon;

  function changeScenario(id) {
    setSelectedId(id);
    setCompletedSteps([]);
    setShowReport(false);
  }

  function toggleStep(index) {
    setCompletedSteps((previous) =>
      previous.includes(index)
        ? previous.filter((step) => step !== index)
        : [...previous, index]
    );
  }

  function resetChecklist() {
    setCompletedSteps([]);
    setShowReport(false);
  }

  return (
    <section className="emergency-center">
      <div className="emergency-heading">
        <div>
          <span className="emergency-eyebrow">
            CREW SAFETY AND RESPONSE
          </span>

          <h2>Emergency Response Center</h2>

          <p>
            A structured first-responder support interface for serious
            health situations during space missions.
          </p>
        </div>

        <div className="emergency-status">
          <Siren size={18} />
          <span>EMERGENCY SUPPORT</span>
        </div>
      </div>

      <div className="emergency-warning">
        <AlertTriangle size={22} />

        <div>
          <strong>Real emergency? Do not delay action.</strong>
          <p>
            Immediately activate your mission's approved emergency
            procedure, alert the crew, and follow trained instructions.
            This prototype does not contact mission control or emergency
            services.
          </p>
        </div>
      </div>

      <div className="emergency-main-grid">
        <aside className="emergency-scenarios">
          <div className="emergency-panel-heading">
            <span>SELECT A SITUATION</span>
            <span>{emergencyTypes.length} SCENARIOS</span>
          </div>

          {emergencyTypes.map((item) => {
            const Icon = item.icon;
            const active = selectedId === item.id;

            return (
              <button
                key={item.id}
                type="button"
                className={`emergency-scenario ${
                  active ? "active" : ""
                }`}
                style={{ "--emergency-color": item.color }}
                onClick={() => changeScenario(item.id)}
                aria-pressed={active}
              >
                <span className="emergency-scenario-icon">
                  <Icon size={19} />
                </span>

                <span className="emergency-scenario-text">
                  <strong>{item.name}</strong>
                  <small>{item.description}</small>
                </span>
              </button>
            );
          })}
        </aside>

        <div className="emergency-response">
          <div
            className="emergency-selected-header"
            style={{ "--emergency-color": selected.color }}
          >
            <div className="emergency-selected-icon">
              <SelectedIcon size={27} />
            </div>

            <div>
              <span>SELECTED EMERGENCY SCENARIO</span>
              <h3>{selected.name}</h3>
              <p>{selected.description}</p>
            </div>

            <span className="emergency-level">
              {selected.level}
            </span>
          </div>

          <div className="emergency-signs">
            <h4>
              <Info size={17} />
              Warning signs to recognise
            </h4>

            <ul>
              {selected.signs.map((sign) => (
                <li key={sign}>{sign}</li>
              ))}
            </ul>
          </div>

          <div className="emergency-checklist">
            <div className="emergency-checklist-heading">
              <div>
                <h4>
                  <ClipboardList size={18} />
                  First-responder checklist
                </h4>

                <p>
                  Follow your training and approved mission procedure.
                </p>
              </div>

              <span>
                {completedSteps.length}/{selected.actions.length}
              </span>
            </div>

            <div className="emergency-progress">
              <div
                style={{
                  width: `${
                    (completedSteps.length / selected.actions.length) *
                    100
                  }%`,
                }}
              />
            </div>

            <div className="emergency-action-list">
              {selected.actions.map((action, index) => {
                const completed = completedSteps.includes(index);

                return (
                  <button
                    key={`${selected.id}-${index}`}
                    type="button"
                    className={`emergency-action ${
                      completed ? "completed" : ""
                    }`}
                    onClick={() => toggleStep(index)}
                    aria-pressed={completed}
                  >
                    <span className="emergency-action-check">
                      {completed ? (
                        <CheckCircle2 size={20} />
                      ) : (
                        <Circle size={20} />
                      )}
                    </span>

                    <span className="emergency-action-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="emergency-action-text">
                      {action}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="emergency-reset"
              onClick={resetChecklist}
            >
              <RotateCcw size={15} />
              Reset checklist
            </button>
          </div>

          <div className="emergency-protocol-note">
            <ShieldCheck size={19} />

            <div>
              <strong>Mission protocol takes priority</strong>

              <p>
                These are general organisational prompts, not a validated
                spaceflight medical protocol. Follow crew training and
                approved mission procedures for positioning, CPR, AED use,
                medication, and all clinical interventions.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="emergency-communication">
        <div className="emergency-communication-heading">
          <div>
            <span>CREW MEDICAL COMMUNICATION</span>
            <h3>Prepare a health incident report</h3>
            <p>
              Organise the information that should be communicated to
              onboard medical support or ground medical teams.
            </p>
          </div>

          <Radio size={25} />
        </div>

        <div className="emergency-report-fields">
          {communicationFields.map((field, index) => (
            <div key={field} className="emergency-report-field">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{field}</p>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="emergency-report-button"
          onClick={() => setShowReport((previous) => !previous)}
        >
          <ClipboardList size={17} />
          {showReport ? "Hide report summary" : "View report summary"}
          <ArrowRight size={16} />
        </button>

        {showReport && (
          <div className="emergency-report-summary">
            <strong>Incident report preparation</strong>

            <p>Selected scenario: {selected.name}</p>

            <p>
              Checklist progress: {completedSteps.length} of{" "}
              {selected.actions.length} items marked complete.
            </p>

            <p>
              Required information: crew identifier, symptom onset,
              observations, measurements, and actions taken.
            </p>

            <small>
              This is a local on-screen summary only. It has not been
              saved, transmitted, or sent to any medical team.
            </small>
          </div>
        )}
      </div>

      <div className="emergency-footer-warning">
        <AlertTriangle size={18} />

        <p>
          COSMOCURA is a student-developed prototype. It is not clinically
          validated, does not diagnose emergencies, and must not replace
          approved spacecraft medical procedures or trained medical
          personnel.
        </p>
      </div>
    </section>
  );
}