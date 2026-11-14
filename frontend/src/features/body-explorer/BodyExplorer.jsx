import { useState } from "react";
import {
  Activity,
  HeartPulse,
  Wind,
  Brain,
  Bone,
  ShieldCheck,
  Utensils,
  Droplets,
  Info,
  Orbit,
  ChevronRight,
} from "lucide-react";

import "./BodyExplorer.css";

const systems = [
  {
    id: "cardiovascular",
    name: "Cardiovascular",
    subtitle: "Heart and blood circulation",
    icon: HeartPulse,
    color: "#ff647c",
    function:
      "The cardiovascular system moves blood, oxygen, and nutrients throughout the body. Changes in gravity can affect fluid distribution and cardiovascular adaptation.",
    monitor: [
      "Heart rate",
      "Blood pressure",
      "Exercise tolerance",
      "Reported dizziness or faintness",
    ],
    hazards: ["Altered gravity", "Distance from Earth"],
    note:
      "Monitor changes from the astronaut's personal baseline and follow approved mission medical procedures.",
  },
  {
    id: "respiratory",
    name: "Respiratory",
    subtitle: "Lungs and breathing",
    icon: Wind,
    color: "#42c9f5",
    function:
      "The respiratory system brings oxygen into the body and removes carbon dioxide. Spacecraft air quality and environmental conditions are important to crew health.",
    monitor: [
      "Breathing rate",
      "Oxygen saturation (if a compatible device is available)",
      "Shortness of breath",
      "Cough or breathing discomfort",
    ],
    hazards: ["Hostile environment", "Distance from Earth"],
    note:
      "Oxygen saturation readings require a compatible sensor. A normal reading does not rule out an emergency.",
  },
  {
    id: "nervous",
    name: "Nervous",
    subtitle: "Brain, nerves and senses",
    icon: Brain,
    color: "#b18aff",
    function:
      "The nervous system coordinates movement, sensation, thinking, and balance. Microgravity and transitions between gravity environments can affect orientation and coordination.",
    monitor: [
      "Alertness and responsiveness",
      "Balance and coordination",
      "Headache or unusual symptoms",
      "Sleep and cognitive changes",
    ],
    hazards: [
      "Altered gravity",
      "Space radiation",
      "Isolation and confinement",
    ],
    note:
      "Sudden confusion, loss of responsiveness, or new neurological symptoms require immediate use of approved emergency procedures.",
  },
  {
    id: "musculoskeletal",
    name: "Musculoskeletal",
    subtitle: "Bones, muscles and joints",
    icon: Bone,
    color: "#f5b85c",
    function:
      "Bones provide structure and protect organs. Muscles enable movement. Reduced mechanical loading in microgravity can contribute to bone and muscle changes.",
    monitor: [
      "Exercise activity",
      "Muscle discomfort",
      "Mobility and coordination",
      "Changes in physical performance",
    ],
    hazards: ["Altered gravity", "Distance from Earth"],
    note:
      "Exercise and monitoring should follow the crew's approved mission plan.",
  },
  {
    id: "immune",
    name: "Immune",
    subtitle: "Body defence system",
    icon: ShieldCheck,
    color: "#20d69b",
    function:
      "The immune system helps the body respond to infections and other threats. Spaceflight conditions, stress, and the closed habitat environment are important research areas.",
    monitor: [
      "Reported fever or illness",
      "Skin changes",
      "Signs of infection",
      "General health changes",
    ],
    hazards: [
      "Hostile environment",
      "Isolation and confinement",
      "Space radiation",
    ],
    note:
      "Symptoms should be recorded and assessed using approved onboard medical guidance.",
  },
  {
    id: "digestive",
    name: "Digestive",
    subtitle: "Stomach and intestines",
    icon: Utensils,
    color: "#f2a66c",
    function:
      "The digestive system processes food and absorbs nutrients. Nutrition and food availability are important parts of maintaining crew health during long missions.",
    monitor: [
      "Food and fluid intake",
      "Appetite changes",
      "Nausea or vomiting",
      "Digestive discomfort",
    ],
    hazards: ["Isolation and confinement", "Distance from Earth"],
    note:
      "Record persistent symptoms and changes in food or fluid intake for the medical team.",
  },
  {
    id: "urinary",
    name: "Urinary",
    subtitle: "Kidneys and fluid balance",
    icon: Droplets,
    color: "#65a8ff",
    function:
      "The kidneys help regulate fluid and electrolyte balance and remove waste products. Fluid distribution changes during spaceflight make hydration and monitoring important.",
    monitor: [
      "Fluid intake",
      "Urination changes",
      "Hydration-related symptoms",
      "Relevant measurements prescribed by the medical team",
    ],
    hazards: ["Altered gravity", "Distance from Earth"],
    note:
      "This interface provides educational information, not a hydration prescription or diagnosis.",
  },
];

export default function BodyExplorer() {
  const [selectedId, setSelectedId] = useState("cardiovascular");

  const selected =
    systems.find((system) => system.id === selectedId) || systems[0];

  const SelectedIcon = selected.icon;

  return (
    <section className="body-explorer">
      <div className="body-explorer-heading">
        <div>
          <span className="section-eyebrow">CREW HEALTH INTELLIGENCE</span>
          <h2>Interactive Body Explorer</h2>
          <p>
            Explore human body systems and understand what to monitor during
            space missions.
          </p>
        </div>

        <div className="body-explorer-status">
          <Orbit size={17} />
          <span>EDUCATIONAL REFERENCE</span>
        </div>
      </div>

      <div className="body-explorer-layout">
        <aside className="body-system-list">
          <div className="body-list-heading">
            <span>BODY SYSTEMS</span>
            <span>{systems.length} SYSTEMS</span>
          </div>

          {systems.map((system) => {
            const Icon = system.icon;
            const active = selectedId === system.id;

            return (
              <button
                key={system.id}
                type="button"
                className={`body-system-button ${
                  active ? "active" : ""
                }`}
                onClick={() => setSelectedId(system.id)}
                aria-pressed={active}
              >
                <span
                  className="body-system-icon"
                  style={{ "--system-color": system.color }}
                >
                  <Icon size={19} />
                </span>

                <span className="body-system-label">
                  <strong>{system.name}</strong>
                  <small>{system.subtitle}</small>
                </span>

                <ChevronRight size={17} className="body-system-arrow" />
              </button>
            );
          })}
        </aside>

        <main className="body-system-details">
          <div
            className="body-detail-banner"
            style={{ "--system-color": selected.color }}
          >
            <div className="body-detail-icon">
              <SelectedIcon size={30} />
            </div>

            <div>
              <span>SELECTED BODY SYSTEM</span>
              <h3>{selected.name}</h3>
              <p>{selected.subtitle}</p>
            </div>
          </div>

          <div className="body-detail-section">
            <div className="body-detail-title">
              <Info size={18} />
              <h4>What does it do?</h4>
            </div>

            <p>{selected.function}</p>
          </div>

          <div className="body-detail-section">
            <div className="body-detail-title">
              <Activity size={18} />
              <h4>What should astronauts monitor?</h4>
            </div>

            <ul className="body-monitor-list">
              {selected.monitor.map((item) => (
                <li key={item}>
                  <span className="monitor-dot" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="body-detail-section">
            <div className="body-detail-title">
              <Orbit size={18} />
              <h4>Relevant spaceflight hazards</h4>
            </div>

            <div className="body-hazard-tags">
              {selected.hazards.map((hazard) => (
                <span key={hazard}>{hazard}</span>
              ))}
            </div>
          </div>

          <div className="body-guidance-note">
            <ShieldCheck size={20} />
            <div>
              <strong>Mission health note</strong>
              <p>{selected.note}</p>
            </div>
          </div>
        </main>
      </div>

      <div className="body-explorer-disclaimer">
        <Info size={16} />
        <p>
          COSMOCURA is an educational health-assessment support prototype.
          It does not diagnose conditions or replace trained medical
          professionals, crew training, or approved mission procedures.
        </p>
      </div>
    </section>
  );
}