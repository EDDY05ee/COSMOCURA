import { useState } from "react";

import {
  Activity,
  HeartPulse,
  LayoutDashboard,
  Users,
  ClipboardList,
  Scan,
  AlertTriangle,
  FileText,
  Brain,
  Globe2,
  Menu,
  X,
  Orbit,
  ShieldCheck,
  Radio,
  ChevronRight,
  Wifi,
  Clock3,
  Rocket,
} from "lucide-react";

import GuidedMeasurements from "./features/measurements/GuidedMeasurements";
import CrewHealth from "./features/crew/CrewHealth";
import CrewManagement from "./features/crew-management/CrewManagement";
import BodyExplorer from "./features/body-explorer/BodyExplorer";
import SpaceHazards from "./features/hazards/SpaceHazards";
import MissionEnvironment from "./features/environment/MissionEnvironment";
import EmergencyCenter from "./features/emergency/EmergencyCenter";
import MedicalRecords from "./features/medical-records/MedicalRecords";
import CrewWellness from "./features/wellness/CrewWellness";

import "./App.css";

const NAVIGATION = [
  {
    section: "MISSION",
    items: [
      {
        id: "overview",
        label: "Mission Overview",
        icon: LayoutDashboard,
      },
      {
        id: "crew",
        label: "Crew Health",
        icon: Users,
      },
      {
        id: "crew-management",
        label: "Crew Management",
        icon: Users,
      },
    ],
  },
  {
    section: "HEALTH INTELLIGENCE",
    items: [
      {
        id: "measurements",
        label: "Health Monitoring",
        icon: HeartPulse,
      },
      {
        id: "body",
        label: "Body Explorer",
        icon: Scan,
      },
      {
        id: "wellness",
        label: "Crew Wellness",
        icon: Brain,
      },
      {
        id: "records",
        label: "Medical Records",
        icon: FileText,
      },
    ],
  },
  {
    section: "MISSION SAFETY",
    items: [
      {
        id: "emergency",
        label: "Emergency Center",
        icon: AlertTriangle,
      },
      {
        id: "hazards",
        label: "Space Hazards",
        icon: ShieldCheck,
      },
      {
        id: "environment",
        label: "Mission Environment",
        icon: Globe2,
      },
    ],
  },
];

const PAGE_DETAILS = {
  overview: {
    title: "Mission Overview",
    subtitle: "A unified view of crew health and mission readiness.",
  },

  crew: {
    title: "Crew Health",
    subtitle: "Explore crew profiles and available health observations.",
  },

  "crew-management": {
    title: "Crew Management",
    subtitle: "Manage astronaut profiles and mission crew information.",
  },

  measurements: {
    title: "Health Monitoring",
    subtitle: "Guided health measurements and observation recording.",
  },

  body: {
    title: "Body Explorer",
    subtitle: "Understand human body systems in the space environment.",
  },

  wellness: {
    title: "Crew Wellness",
    subtitle: "Sleep, mood, stress and psychological wellbeing check-ins.",
  },

  records: {
    title: "Medical Records",
    subtitle: "Review health observations and prepare medical handoffs.",
  },

  emergency: {
    title: "Emergency Center",
    subtitle: "Structured first-responder support for serious situations.",
  },

  hazards: {
    title: "Space Hazards",
    subtitle: "Understand the five major hazards of human spaceflight.",
  },

  environment: {
    title: "Mission Environment",
    subtitle: "Explore health considerations across mission environments.",
  },
};

function MissionOverview({ onNavigate }) {
  const quickActions = [
    {
      id: "measurements",
      title: "Guided Measurements",
      description: "Learn how to collect health observations.",
      icon: HeartPulse,
    },
    {
      id: "emergency",
      title: "Emergency Support",
      description: "Open the first-responder guidance workspace.",
      icon: AlertTriangle,
    },
    {
      id: "wellness",
      title: "Crew Wellness",
      description: "Review wellbeing and daily check-ins.",
      icon: Brain,
    },
    {
      id: "records",
      title: "Medical Handoff",
      description: "Prepare a local medical summary.",
      icon: ClipboardList,
    },
  ];

  return (
    <div className="mission-overview">
      <section className="mission-hero">
        <div className="mission-hero-content">
          <div className="hero-kicker">
            <Orbit size={15} />
            HUMAN HEALTH BEYOND EARTH
          </div>

          <h1>
            Intelligent Healthcare
            <br />
            <span>Beyond Earth.</span>
          </h1>

          <p>
            An integrated astronaut health intelligence workspace
            designed to help crew members understand health
            observations, follow guided assessments and access
            structured emergency support.
          </p>

          <button
            className="hero-action"
            onClick={() => onNavigate("measurements")}
          >
            Explore Health Monitoring
            <ChevronRight size={17} />
          </button>
        </div>

        <div className="hero-orbit-art" aria-hidden="true">
          <div className="orbit-ring orbit-ring-one" />
          <div className="orbit-ring orbit-ring-two" />
          <div className="orbit-ring orbit-ring-three" />

          <div className="orbit-core">
            <HeartPulse size={54} />
          </div>

          <div className="orbit-satellite">
            <Activity size={18} />
          </div>
        </div>

        <div className="hero-bottom-label">
          <span>01</span>
          <span>CREW HEALTH INTELLIGENCE</span>
          <span>SPACEFLIGHT SUPPORT SYSTEM</span>
        </div>
      </section>

      <div className="overview-section-heading">
        <div>
          <span>COMMAND CENTER</span>
          <h2>Mission Workspace</h2>
        </div>

        <span className="synthetic-label">
          <span />
          SYNTHETIC DEMO
        </span>
      </div>

      <section className="overview-stats">
        <article className="overview-stat">
          <div className="overview-stat-icon cyan">
            <Users size={21} />
          </div>

          <div>
            <span>Demo crew profiles</span>
            <strong>04</strong>
          </div>
        </article>

        <article className="overview-stat">
          <div className="overview-stat-icon green">
            <Activity size={21} />
          </div>

          <div>
            <span>Health modules</span>
            <strong>08</strong>
          </div>
        </article>

        <article className="overview-stat">
          <div className="overview-stat-icon orange">
            <ShieldCheck size={21} />
          </div>

          <div>
            <span>Space hazards</span>
            <strong>05</strong>
          </div>
        </article>

        <article className="overview-stat">
          <div className="overview-stat-icon purple">
            <Globe2 size={21} />
          </div>

          <div>
            <span>Mission environments</span>
            <strong>04</strong>
          </div>
        </article>
      </section>

      <section className="overview-main-grid">
        <div className="overview-panel">
          <div className="overview-panel-heading">
            <div>
              <span>QUICK ACCESS</span>
              <h2>Health Operations</h2>
            </div>

            <Rocket size={21} />
          </div>

          <div className="quick-action-grid">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <button
                  className="quick-action-card"
                  key={action.id}
                  onClick={() => onNavigate(action.id)}
                >
                  <div className="quick-action-icon">
                    <Icon size={21} />
                  </div>

                  <strong>{action.title}</strong>

                  <p>{action.description}</p>

                  <span>
                    Open module <ChevronRight size={14} />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="overview-panel mission-status-panel">
          <div className="overview-panel-heading">
            <div>
              <span>SYSTEM ARCHITECTURE</span>
              <h2>Platform Status</h2>
            </div>

            <Radio size={21} />
          </div>

          <div className="status-row">
            <span>
              <span className="status-dot green-dot" />
              Frontend interface
            </span>

            <strong>Available</strong>
          </div>

          <div className="status-row">
            <span>
              <span className="status-dot orange-dot" />
              Medical database
            </span>

            <strong>Integration pending</strong>
          </div>

          <div className="status-row">
            <span>
              <span className="status-dot orange-dot" />
              Spacecraft telemetry
            </span>

            <strong>Not connected</strong>
          </div>

          <div className="status-row">
            <span>
              <span className="status-dot orange-dot" />
              Earth communication
            </span>

            <strong>Not connected</strong>
          </div>

          <div className="status-explanation">
            <ShieldCheck size={17} />

            <p>
              Interface demonstrations are available. Live spacecraft
              hardware, telemetry and communication systems are not
              integrated.
            </p>
          </div>
        </div>
      </section>

      <section className="overview-hazards-strip">
        <div>
          <span>MISSION CONTEXT</span>

          <h2>Five Human Spaceflight Hazards</h2>

          <p>
            Explore the environmental and human health challenges
            that shape astronaut health monitoring.
          </p>
        </div>

        <button onClick={() => onNavigate("hazards")}>
          Explore hazards <ChevronRight size={16} />
        </button>
      </section>

      <div className="overview-disclaimer">
        <ShieldCheck size={16} />

        <p>
          COSMOCURA is an independent educational prototype. It is
          not a medical device, does not diagnose conditions and is
          not affiliated with or endorsed by NASA.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const page = PAGE_DETAILS[activePage] || PAGE_DETAILS.overview;

  function navigateTo(pageId) {
    setActivePage(pageId);
    setSidebarOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function renderPage() {
    switch (activePage) {
      case "crew":
        return <CrewHealth />;

      case "crew-management":
        return <CrewManagement />;

      case "measurements":
        return <GuidedMeasurements />;

      case "body":
        return <BodyExplorer />;

      case "wellness":
        return <CrewWellness />;

      case "records":
        return <MedicalRecords />;

      case "emergency":
        return <EmergencyCenter />;

      case "hazards":
        return <SpaceHazards />;

      case "environment":
        return <MissionEnvironment />;

      default:
        return <MissionOverview onNavigate={navigateTo} />;
    }
  }

  return (
    <div className="cosmocura-app">
      {sidebarOpen && (
        <button
          className="mobile-sidebar-backdrop"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`app-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="brand-block">
          <div className="brand-symbol">
            <Orbit size={25} />
            <span />
          </div>

          <div>
            <strong>COSMOCURA</strong>
            <span>SPACE HEALTH INTELLIGENCE</span>
          </div>

          <button
            className="mobile-close-sidebar"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-mission-card">
          <div className="sidebar-mission-top">
            <span className="mission-status-dot" />
            DEMONSTRATION MODE
          </div>

          <strong>CREW HEALTH SYSTEM</strong>

          <span>Independent research prototype</span>
        </div>

        <nav className="sidebar-navigation">
          {NAVIGATION.map((group) => (
            <div className="navigation-group" key={group.section}>
              <span className="navigation-section-title">
                {group.section}
              </span>

              {group.items.map((item) => {
                const Icon = item.icon;
                const active = activePage === item.id;

                return (
                  <button
                    key={item.id}
                    className={`navigation-item ${active ? "active" : ""}`}
                    onClick={() => navigateTo(item.id)}
                  >
                    <Icon size={18} />

                    <span>{item.label}</span>

                    {active && (
                      <span className="navigation-active-mark" />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-connection">
            <Wifi size={16} />

            <div>
              <strong>Local workspace</strong>
              <span>External link unavailable</span>
            </div>
          </div>

          <div className="sidebar-version">
            <span>COSMOCURA</span>
            <span>PROTOTYPE · 1.0</span>
          </div>
        </div>
      </aside>

      <main className="app-main">
        <header className="app-topbar">
          <div className="topbar-left">
            <button
              className="mobile-menu-button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation"
            >
              <Menu size={21} />
            </button>

            <div className="breadcrumb">
              <span>MISSION CONTROL</span>

              <ChevronRight size={14} />

              <strong>{page.title}</strong>
            </div>
          </div>

          <div className="topbar-right">
            <div className="topbar-time">
              <Clock3 size={15} />
              <span>LOCAL SESSION</span>
            </div>

            <div className="topbar-status">
              <span />
              SYSTEM ONLINE
            </div>

            <div className="topbar-avatar">C</div>
          </div>
        </header>

        <div className="page-content">
          {activePage !== "overview" && (
            <div className="page-title-bar">
              <div>
                <span>MISSION CONTROL / COSMOCURA</span>

                <h1>{page.title}</h1>

                <p>{page.subtitle}</p>
              </div>
            </div>
          )}

          {renderPage()}
        </div>

        <footer className="app-footer">
          <span>
            <Orbit size={14} /> COSMOCURA
          </span>

          <span>INTELLIGENT HEALTHCARE BEYOND EARTH</span>

          <span>INDEPENDENT STUDENT PROTOTYPE</span>
        </footer>
      </main>
    </div>
  );
}