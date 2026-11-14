import { useState } from "react";
import {
  Radiation,
  Users,
  Radio,
  Orbit,
  ShieldAlert,
  Activity,
  Brain,
  HeartPulse,
  Bone,
  Wind,
  Droplets,
  Info,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

import "./SpaceHazards.css";

const hazards = [
  {
    id: "radiation",
    number: "01",
    name: "Space Radiation",
    short: "Exposure to high-energy particles",
    icon: Radiation,
    color: "#ff6b75",
    overview:
      "Beyond Earth's protective atmosphere and magnetic field, astronauts can be exposed to energetic particles from the Sun and outside our solar system.",
    sources: [
      {
        name: "Solar particle events",
        detail:
          "Energetic particles released during solar activity, including solar storms.",
      },
      {
        name: "Galactic cosmic rays",
        detail:
          "High-energy particles originating outside our solar system. They are particularly challenging to shield against.",
      },
      {
        name: "Trapped radiation",
        detail:
          "Energetic particles held in Earth's magnetic field, including the Van Allen radiation belts.",
      },
    ],
    health: [
      "Potential DNA and cellular damage",
      "Long-term cancer risk",
      "Potential cardiovascular effects",
      "Potential effects on the central nervous system",
    ],
    monitor: [
      "Mission radiation and dosimeter records",
      "Cumulative exposure information",
      "Crew-reported health changes",
      "Medical assessments according to mission protocols",
    ],
    response:
      "Follow the mission radiation-monitoring plan and approved shelter procedures during radiation events. COSMOCURA does not calculate radiation dose or diagnose radiation injury.",
    systems: ["Cardiovascular", "Nervous", "Immune"],
  },
  {
    id: "isolation",
    number: "02",
    name: "Isolation & Confinement",
    short: "Living and working in a confined crew environment",
    icon: Users,
    color: "#b18aff",
    overview:
      "Long missions can involve separation from family, limited personal space, repetitive routines, and continuous interaction with the same small crew.",
    sources: [
      {
        name: "Social isolation",
        detail:
          "Limited contact with family, friends, and people outside the mission.",
      },
      {
        name: "Confinement",
        detail:
          "Living and working in a restricted physical environment for extended periods.",
      },
      {
        name: "Mission routine",
        detail:
          "Workload, monotony, disrupted routines, and limited environmental variation can affect well-being.",
      },
    ],
    health: [
      "Changes in mood and morale",
      "Sleep difficulties",
      "Stress and interpersonal challenges",
      "Changes in attention and cognitive performance",
    ],
    monitor: [
      "Self-reported mood",
      "Sleep duration and quality",
      "Crew wellness check-ins",
      "Changes in social interaction and daily routine",
    ],
    response:
      "Encourage regular wellness check-ins, appropriate rest, and communication according to the crew's mission plan. This feature is not a mental-health diagnosis.",
    systems: ["Nervous", "Immune", "Digestive"],
  },
  {
    id: "distance",
    number: "03",
    name: "Distance from Earth",
    short: "Delayed communication and limited resupply",
    icon: Radio,
    color: "#42c9f5",
    overview:
      "As missions travel farther from Earth, communication delays increase and immediate support or resupply becomes more difficult.",
    sources: [
      {
        name: "Communication delay",
        detail:
          "Signals take time to travel between Earth and the spacecraft. Mars communication delays can reach many minutes one way.",
      },
      {
        name: "Limited resupply",
        detail:
          "Crews must plan carefully for food, equipment, medicines, and other essential supplies.",
      },
      {
        name: "Autonomous operations",
        detail:
          "Crew members may need to perform initial health assessments while waiting for ground support.",
      },
    ],
    health: [
      "Greater responsibility for initial health assessment",
      "Challenges obtaining timely medical guidance",
      "Need for careful medical supply planning",
      "Importance of accurate health records and handoffs",
    ],
    monitor: [
      "Crew health records",
      "Medication and medical supply inventory",
      "Symptom history and measurement trends",
      "Communication and handoff status",
    ],
    response:
      "Record relevant observations and measurements, follow approved onboard medical procedures, and prepare a concise report for ground medical support when communication is available.",
    systems: ["Cardiovascular", "Respiratory", "Nervous"],
  },
  {
    id: "gravity",
    number: "04",
    name: "Altered Gravity",
    short: "Changes in gravity during a space mission",
    icon: Orbit,
    color: "#f5b85c",
    overview:
      "Astronauts can experience weightlessness during transit, reduced gravity on the Moon or Mars, and a return to Earth's gravity. These transitions affect how the body functions and adapts.",
    sources: [
      {
        name: "Microgravity",
        detail:
          "During spaceflight, the body experiences fluid shifts and changes in the mechanical loading placed on bones and muscles.",
      },
      {
        name: "Lunar and Martian gravity",
        detail:
          "The Moon and Mars have weaker surface gravity than Earth.",
      },
      {
        name: "Gravity transitions",
        detail:
          "Moving between different gravity environments can affect balance, coordination, and movement.",
      },
    ],
    health: [
      "Changes in bone and muscle conditioning",
      "Fluid redistribution",
      "Balance and spatial-orientation challenges",
      "Changes in physical performance",
    ],
    monitor: [
      "Exercise activity",
      "Mobility and coordination",
      "Physical performance trends",
      "Symptoms reported during gravity transitions",
    ],
    response:
      "Use the crew's approved exercise and health-monitoring plan. Record symptoms and changes in mobility, balance, or physical performance.",
    systems: ["Musculoskeletal", "Cardiovascular", "Nervous"],
  },
  {
    id: "environment",
    number: "05",
    name: "Hostile & Closed Environments",
    short: "Living inside a controlled spacecraft habitat",
    icon: ShieldAlert,
    color: "#20d69b",
    overview:
      "Spacecraft and habitats must maintain conditions that support human life. Air quality, temperature, pressure, lighting, noise, and microbial conditions all matter.",
    sources: [
      {
        name: "Environmental control",
        detail:
          "Temperature, pressure, air composition, and other habitat conditions must be maintained within mission requirements.",
      },
      {
        name: "Microbial environment",
        detail:
          "Microorganisms can persist and spread in enclosed habitats. Monitoring and hygiene practices are important.",
      },
      {
        name: "Limited living space",
        detail:
          "Noise, lighting, restricted space, and environmental conditions can affect crew comfort and well-being.",
      },
    ],
    health: [
      "Potential respiratory irritation from environmental problems",
      "Infection and immune-system concerns",
      "Sleep and comfort disruptions",
      "Potential effects from environmental stressors",
    ],
    monitor: [
      "Habitat environmental readings",
      "Air-quality system alerts",
      "Crew-reported symptoms",
      "Relevant hygiene and health observations",
    ],
    response:
      "Follow approved habitat safety procedures and report environmental alarms or symptoms to the responsible crew member. COSMOCURA does not measure spacecraft air quality.",
    systems: ["Respiratory", "Immune", "Nervous"],
  },
];

const systemIcons = {
  Cardiovascular: HeartPulse,
  Respiratory: Wind,
  Nervous: Brain,
  Musculoskeletal: Bone,
  Immune: ShieldCheck,
  Digestive: Activity,
};

export default function SpaceHazards() {
  const [selectedId, setSelectedId] = useState("radiation");

  const selected =
    hazards.find((hazard) => hazard.id === selectedId) || hazards[0];

  const SelectedIcon = selected.icon;

  return (
    <section className="space-hazards">
      <div className="hazards-heading">
        <div>
          <span className="hazards-eyebrow">
            NASA HUMAN SPACEFLIGHT RESEARCH
          </span>

          <h2>Five Hazards of Spaceflight</h2>

          <p>
            Understand the major environmental and operational risks that
            can affect astronaut health during space missions.
          </p>
        </div>

        <div className="hazards-count">
          <ShieldAlert size={18} />
          <span>05 MAJOR HAZARDS</span>
        </div>
      </div>

      <div className="hazards-card-grid">
        {hazards.map((hazard) => {
          const Icon = hazard.icon;
          const active = selectedId === hazard.id;

          return (
            <button
              key={hazard.id}
              type="button"
              className={`hazard-card ${active ? "selected" : ""}`}
              style={{ "--hazard-color": hazard.color }}
              onClick={() => setSelectedId(hazard.id)}
              aria-pressed={active}
            >
              <div className="hazard-card-top">
                <span className="hazard-number">{hazard.number}</span>

                <span className="hazard-card-icon">
                  <Icon size={22} />
                </span>
              </div>

              <h3>{hazard.name}</h3>

              <p>{hazard.short}</p>

              <span className="hazard-explore">
                EXPLORE HAZARD
                <ChevronRight size={14} />
              </span>
            </button>
          );
        })}
      </div>

      <div
        className="hazard-detail-panel"
        style={{ "--hazard-color": selected.color }}
      >
        <div className="hazard-detail-header">
          <div className="hazard-detail-icon">
            <SelectedIcon size={28} />
          </div>

          <div>
            <span>HAZARD {selected.number} / 05</span>
            <h3>{selected.name}</h3>
            <p>{selected.short}</p>
          </div>
        </div>

        <div className="hazard-overview">
          <h4>
            <Info size={17} />
            Understanding the hazard
          </h4>

          <p>{selected.overview}</p>
        </div>

        <div className="hazard-detail-grid">
          <div className="hazard-info-card">
            <h4>Sources and conditions</h4>

            {selected.sources.map((source) => (
              <div className="hazard-source-item" key={source.name}>
                <strong>{source.name}</strong>
                <p>{source.detail}</p>
              </div>
            ))}
          </div>

          <div className="hazard-info-card">
            <h4>Potential health impacts</h4>

            <ul>
              {selected.health.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="hazard-info-card">
            <h4>What should the crew monitor?</h4>

            <ul>
              {selected.monitor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="hazard-info-card hazard-response-card">
            <h4>
              <ShieldCheck size={17} />
              COSMOCURA guidance
            </h4>

            <p>{selected.response}</p>
          </div>
        </div>

        <div className="hazard-related-systems">
          <h4>Related body systems</h4>

          <div className="hazard-system-tags">
            {selected.systems.map((system) => {
              const Icon = systemIcons[system] || Activity;

              return (
                <span key={system}>
                  <Icon size={14} />
                  {system}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div className="hazards-disclaimer">
        <Info size={17} />

        <p>
          This section provides educational context based on spaceflight
          health research. It does not calculate exposure, predict illness,
          or replace NASA guidance, crew training, or approved mission
          procedures.
        </p>
      </div>
    </section>
  );
}