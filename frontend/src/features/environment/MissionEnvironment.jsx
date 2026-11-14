import { useState } from "react";
import {
  Rocket,
  Orbit,
  Satellite,
  Moon,
  Globe2,
  Activity,
  HeartPulse,
  Brain,
  Bone,
  ShieldCheck,
  Radio,
  Wind,
  Droplets,
  Info,
  ChevronRight,
  Compass,
} from "lucide-react";

import "./MissionEnvironment.css";

const environments = [
  {
    id: "transit",
    number: "01",
    name: "Deep Space Transit",
    subtitle: "Long-distance journey beyond Earth",
    icon: Rocket,
    color: "#42c9f5",
    gravity: "Microgravity during transit",
    communication: "Communication delay increases with distance",
    environment: "Confined spacecraft habitat",
    overview:
      "During interplanetary transit, crew members live and work inside a spacecraft while travelling between planetary destinations. They must manage health, supplies, and onboard operations with limited immediate access to Earth.",
    conditions: [
      "Extended time in microgravity",
      "Exposure to deep-space radiation",
      "Limited living and working space",
      "Communication delays",
      "Dependence on onboard supplies",
    ],
    priorities: [
      {
        icon: HeartPulse,
        title: "Physical health",
        detail:
          "Monitor relevant health measurements and changes from personal baselines.",
      },
      {
        icon: Brain,
        title: "Mental well-being",
        detail:
          "Support sleep, routine, mood check-ins, and crew communication.",
      },
      {
        icon: ShieldCheck,
        title: "Radiation awareness",
        detail:
          "Review mission radiation information and follow approved protective procedures.",
      },
      {
        icon: Radio,
        title: "Medical autonomy",
        detail:
          "Keep health records and approved onboard procedures accessible during communication delays.",
      },
    ],
    hazards: [
      "Space radiation",
      "Isolation and confinement",
      "Distance from Earth",
      "Altered gravity",
      "Hostile environment",
    ],
    guidance:
      "Use onboard health records, measurement guidance, and approved crew medical procedures. Prepare a clear health summary for ground support when communication is available.",
  },
  {
    id: "station",
    number: "02",
    name: "Space Station",
    subtitle: "Long-duration orbital habitat",
    icon: Satellite,
    color: "#b18aff",
    gravity: "Microgravity environment",
    communication: "Communication depends on available relay infrastructure",
    environment: "Pressurized orbital habitat",
    overview:
      "A space station is a controlled habitat in orbit. Crew members work, exercise, sleep, and conduct research in a limited environment while adapting to microgravity.",
    conditions: [
      "Continuous microgravity exposure",
      "Structured daily schedules",
      "Controlled atmosphere and life support",
      "Exercise as part of crew routines",
      "Shared living and working areas",
    ],
    priorities: [
      {
        icon: Activity,
        title: "Daily health monitoring",
        detail:
          "Maintain measurement records and observe changes over time.",
      },
      {
        icon: Bone,
        title: "Bone and muscle health",
        detail:
          "Track exercise participation and physical performance.",
      },
      {
        icon: Wind,
        title: "Habitat conditions",
        detail:
          "Pay attention to environmental alerts and follow station safety procedures.",
      },
      {
        icon: Brain,
        title: "Crew wellness",
        detail:
          "Monitor sleep, workload, mood, and daily routines.",
      },
    ],
    hazards: [
      "Space radiation",
      "Isolation and confinement",
      "Altered gravity",
      "Hostile environment",
    ],
    guidance:
      "Use the station's approved health-monitoring schedule and environmental safety procedures. Record observations clearly for the medical team.",
  },
  {
    id: "moon",
    number: "03",
    name: "Lunar Surface",
    subtitle: "Operations on the Moon",
    icon: Moon,
    color: "#f5b85c",
    gravity: "Approximately one-sixth of Earth's gravity",
    communication: "Communication depends on mission location and infrastructure",
    environment: "Surface habitat and spacesuit operations",
    overview:
      "Lunar missions involve operating on the Moon's surface, where gravity is lower than on Earth. Crew members may move between a pressurized habitat and spacesuits while working in a challenging environment.",
    conditions: [
      "Reduced lunar gravity",
      "Radiation exposure beyond Earth's global magnetic protection",
      "Spacesuit operations outside the habitat",
      "Dust and surface-environment concerns",
      "Dependence on mission life-support systems",
    ],
    priorities: [
      {
        icon: Bone,
        title: "Mobility and physical performance",
        detail:
          "Observe movement, balance, coordination, and physical activity.",
      },
      {
        icon: Wind,
        title: "Suit and habitat safety",
        detail:
          "Follow approved spacesuit and habitat environmental procedures.",
      },
      {
        icon: HeartPulse,
        title: "Physical monitoring",
        detail:
          "Record relevant health measurements and symptoms.",
      },
      {
        icon: ShieldCheck,
        title: "Radiation awareness",
        detail:
          "Follow mission radiation monitoring and shelter procedures.",
      },
    ],
    hazards: [
      "Space radiation",
      "Distance from Earth",
      "Altered gravity",
      "Hostile environment",
    ],
    guidance:
      "Follow approved lunar surface, spacesuit, habitat, and emergency procedures. COSMOCURA does not monitor suit pressure, radiation, or habitat systems.",
  },
  {
    id: "mars",
    number: "04",
    name: "Mars Mission",
    subtitle: "Interplanetary journey and planetary operations",
    icon: Globe2,
    color: "#ff846f",
    gravity: "Microgravity in transit; approximately 38% of Earth's gravity on Mars",
    communication: "Long communication delays; immediate response from Earth is not possible",
    environment: "Transit spacecraft and planetary habitat",
    overview:
      "A Mars mission includes multiple phases: departure from Earth, interplanetary transit, operations on Mars, and the return journey. Each phase presents different health and operational conditions.",
    conditions: [
      "Long-duration interplanetary transit",
      "Deep-space radiation exposure",
      "Communication delays that can reach many minutes one way",
      "Reduced gravity on the Martian surface",
      "Limited resupply and medical support",
    ],
    priorities: [
      {
        icon: Radio,
        title: "Autonomous health assessment",
        detail:
          "Keep measurement instructions, health records, and approved procedures accessible onboard.",
      },
      {
        icon: Bone,
        title: "Gravity adaptation",
        detail:
          "Observe mobility, coordination, and physical performance across mission phases.",
      },
      {
        icon: Brain,
        title: "Long-duration wellness",
        detail:
          "Support sleep routines, mental well-being, and crew communication.",
      },
      {
        icon: ShieldCheck,
        title: "Radiation awareness",
        detail:
          "Review mission radiation information and follow approved protective procedures.",
      },
    ],
    hazards: [
      "Space radiation",
      "Isolation and confinement",
      "Distance from Earth",
      "Altered gravity",
      "Hostile environment",
    ],
    guidance:
      "Treat each mission phase as a distinct operational context. Use approved medical procedures and maintain a clear record of health observations for onboard and ground medical teams.",
  },
];

export default function MissionEnvironment() {
  const [selectedId, setSelectedId] = useState("transit");

  const selected =
    environments.find((item) => item.id === selectedId) || environments[0];

  const SelectedIcon = selected.icon;

  return (
    <section className="mission-environment">
      <div className="environment-heading">
        <div>
          <span className="environment-eyebrow">
            MISSION CONTEXT INTELLIGENCE
          </span>

          <h2>Mission Environment Profiles</h2>

          <p>
            Explore different spaceflight environments and the health
            considerations associated with each mission context.
          </p>
        </div>

        <div className="environment-status">
          <Compass size={17} />
          <span>MISSION PROFILES</span>
        </div>
      </div>

      <div className="environment-selector">
        {environments.map((environment) => {
          const Icon = environment.icon;
          const active = selectedId === environment.id;

          return (
            <button
              key={environment.id}
              type="button"
              className={`environment-option ${active ? "active" : ""}`}
              style={{ "--environment-color": environment.color }}
              onClick={() => setSelectedId(environment.id)}
              aria-pressed={active}
            >
              <span className="environment-option-icon">
                <Icon size={21} />
              </span>

              <span className="environment-option-text">
                <small>PROFILE {environment.number}</small>
                <strong>{environment.name}</strong>
              </span>

              <ChevronRight size={17} />
            </button>
          );
        })}
      </div>

      <div
        className="environment-detail"
        style={{ "--environment-color": selected.color }}
      >
        <div className="environment-detail-header">
          <div className="environment-main-icon">
            <SelectedIcon size={31} />
          </div>

          <div>
            <span>SELECTED MISSION PROFILE</span>
            <h3>{selected.name}</h3>
            <p>{selected.subtitle}</p>
          </div>
        </div>

        <div className="environment-overview">
          <h4>Mission overview</h4>
          <p>{selected.overview}</p>
        </div>

        <div className="environment-facts">
          <div className="environment-fact">
            <Orbit size={19} />
            <span>GRAVITY CONTEXT</span>
            <strong>{selected.gravity}</strong>
          </div>

          <div className="environment-fact">
            <Radio size={19} />
            <span>COMMUNICATION</span>
            <strong>{selected.communication}</strong>
          </div>

          <div className="environment-fact">
            <ShieldCheck size={19} />
            <span>HABITAT CONTEXT</span>
            <strong>{selected.environment}</strong>
          </div>
        </div>

        <div className="environment-content-grid">
          <div className="environment-panel">
            <h4>
              <Info size={17} />
              Environmental conditions
            </h4>

            <ul>
              {selected.conditions.map((condition) => (
                <li key={condition}>{condition}</li>
              ))}
            </ul>
          </div>

          <div className="environment-panel">
            <h4>
              <Activity size={17} />
              Health priorities
            </h4>

            <div className="environment-priorities">
              {selected.priorities.map((priority) => {
                const Icon = priority.icon;

                return (
                  <div
                    className="environment-priority"
                    key={priority.title}
                  >
                    <span>
                      <Icon size={17} />
                    </span>

                    <div>
                      <strong>{priority.title}</strong>
                      <p>{priority.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="environment-hazards">
          <h4>Relevant spaceflight hazards</h4>

          <div className="environment-hazard-tags">
            {selected.hazards.map((hazard) => (
              <span key={hazard}>{hazard}</span>
            ))}
          </div>
        </div>

        <div className="environment-guidance">
          <ShieldCheck size={20} />

          <div>
            <strong>Mission-context guidance</strong>
            <p>{selected.guidance}</p>
          </div>
        </div>
      </div>

      <div className="environment-disclaimer">
        <Info size={17} />

        <p>
          These profiles provide educational mission context. Selecting a
          profile changes the information displayed; it does not connect to
          spacecraft systems, measure environmental conditions, or modify
          medical procedures.
        </p>
      </div>
    </section>
  );
}