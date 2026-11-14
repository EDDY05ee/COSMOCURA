# COSMOCURA
### Astronaut Health Intelligence System
**NASA Space Apps Challenge 2026**

<p align="center">
  A mission-oriented digital health-support workspace designed for human space exploration.
</p>

---

## 🚀 Overview

COSMOCURA is an Astronaut Health Intelligence System developed for the NASA Space Apps Challenge 2026.

During long-duration space missions, astronauts face unique health challenges, including altered gravity, radiation exposure, isolation, confinement, communication delays, and limited access to medical professionals.

COSMOCURA explores how an integrated digital health-support workspace could help astronauts organize their health information, monitor personal wellness, record health measurements, and access structured emergency guidance when immediate medical support from Earth may be limited.

The project brings multiple health-support capabilities together in one mission-oriented interface, supported by a local-first software architecture.

## 🎯 Problem Statement

Astronauts operating in space environments may experience situations where communication with Earth is delayed or immediate medical assistance is unavailable.

Important health information can become difficult to organize when measurements, medical records, wellness information, and emergency resources are separated across different systems.

COSMOCURA explores a unified approach to making this information more accessible and understandable for crew members.

## 💡 Our Solution

COSMOCURA provides a centralized workspace for astronaut health awareness and information management.

The platform combines crew health monitoring, guided measurements, medical records, wellness tracking, spaceflight hazard awareness, and emergency guidance.

Its goal is to support health-information organization and personal awareness rather than replace trained medical professionals or mission-approved medical procedures.

## ✨ Key Features

### 1. Mission Overview
A centralized dashboard presenting crew information and health-related indicators.

### 2. Crew Health Monitoring
Organize and review manually entered health measurements and their history.

### 3. Guided Measurements
A structured interface to help crew members record health measurements.

### 4. Interactive Body Explorer
Explore body-related health information through an interactive interface.

### 5. Medical Records
Create, organize, and review crew medical records.

### 6. Crew Wellness
Record and review wellness information such as:
- Sleep
- Mood
- Stress
- Fatigue
- Personal wellness notes

### 7. Emergency Center
A categorized emergency information interface providing structured guidance and safety disclaimers.

### 8. Spaceflight Hazards
Explore important human spaceflight hazards and their potential effects on astronaut health.

### 9. Mission Environment
A mission-oriented information section for understanding spaceflight environmental considerations.

### 10. Health History
Review recorded health and wellness information to support personal awareness and information continuity.

## 🛰️ NASA Data and Research

COSMOCURA's concept and health-support framework are informed by NASA Human Research Program resources.

**NASA resources:**

- [5 Hazards of Human Spaceflight](https://www.nasa.gov/hrp/hazards/)
- [Risks of Human Spaceflight](https://www.nasa.gov/hrp/risks/)
- [Ongoing HRP Research in Space](https://www.nasa.gov/hrp/ongoing-hrp-research/)

**Additional Space Agency research:**

- [Canadian Space Agency – Monitoring Radiation for Astronaut Health](https://www.asc-csa.gc.ca/eng/news/articles/2026/2026-02-26-monitoring-radiation-astronaut-health.asp)
- [Canadian Space Agency – Why Do We Conduct Science Experiments in Space?](https://www.asc-csa.gc.ca/eng/iss/science/why-do-we-conduct-science-experiments-in-space.asp)

These resources informed the project's research and design. They are not live data integrations.

## 🏗️ System Architecture

COSMOCURA uses a frontend-backend architecture.

**Frontend**
- React
- JavaScript
- Vite
- CSS
- Lucide React
- Recharts

**Backend**
- Python
- FastAPI
- SQLAlchemy
- Pydantic
- Pydantic Settings

**Database**
- SQLite

The React frontend communicates with the FastAPI backend through API endpoints. The backend manages application data and stores it in a local SQLite database.

The application can operate locally without requiring cloud connectivity, provided the frontend and backend services are running on the same local environment.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React | User interface |
| JavaScript | Application logic |
| Vite | Frontend development and build |
| Python | Backend programming |
| FastAPI | Backend API |
| SQLite | Local database |
| SQLAlchemy | Database integration |
| Pydantic | Data validation |
| Lucide React | Interface icons |
| Recharts | Data visualization |
| Git | Version control |
| GitHub | Source code hosting |

## 📁 Repository Structure

```text
COSMOCURA/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── database/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   │
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── features/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── package-lock.json
│   ├── index.html
│   └── vite.config.js
│
└── .gitignore
```

## ⚙️ Installation and Setup

Follow these instructions to run COSMOCURA locally.

### Prerequisites

Install the following:

- Python 3.10 or later
- Node.js and npm
- Git
- Visual Studio Code (recommended)

### 1. Clone the repository

```bash
git clone https://github.com/EDDY05ee/COSMOCURA.git
cd COSMOCURA
```

### 2. Set up the backend

Open a terminal:

```bash
cd backend
```

Create a Python virtual environment:

```bash
py -m venv .venv
```

Install the dependencies:

**Windows PowerShell:**

```powershell
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
```

Start the backend server:

```powershell
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload
```

The backend will be available at:

http://127.0.0.1:8000

API documentation:

http://127.0.0.1:8000/docs

Health check:

http://127.0.0.1:8000/api/health

### 3. Set up the frontend

Open a second terminal at the project root:

```bash
cd frontend
```

Install frontend dependencies:

```powershell
npm.cmd install
```

Start the development server:

```powershell
npm.cmd run dev
```

Open the application:

http://localhost:5173

**Important:** Keep both the frontend and backend terminals running while using the application.

## 🔒 Data, Privacy and Safety

COSMOCURA is designed around local application operation.

Current prototype considerations:

- Application records are stored using a local SQLite database.
- The backend must be running for frontend API operations.
- The current SQLite database is not encrypted.
- No cloud synchronization is implemented.
- No spacecraft sensors or medical monitoring hardware are connected.

Users should not enter real sensitive medical information into this educational prototype.

## ⚠️ Current Limitations

COSMOCURA is an educational software prototype.

It is:
- Not a clinically validated medical device.
- Not tested or certified for spaceflight operations.
- Not connected to NASA systems or mission control.
- Not connected to spacecraft sensors or radiation-monitoring instruments.
- Not equipped with a runtime AI/ML medical model.
- Based on manually entered measurements.
- Not a replacement for professional medical advice or mission-approved procedures.

Emergency information is provided for prototype demonstration and must not replace crew training or mission-approved medical protocols.

## 🔭 Future Development

Potential future development areas include:

- Stronger data protection and encryption.
- Expert-reviewed astronaut medical information.
- Validated medical hardware integration.
- More advanced offline capabilities.
- Mission-approved emergency procedure integration.
- Improved accessibility and multilingual interaction.
- Further testing with relevant healthcare and aerospace experts.

These are future development goals, not currently implemented capabilities.

## 👥 Team COSMOCURA

**NASA Space Apps Challenge 2026**

- Edwin Vinod
- Nandha Hari
- Anupama A B

## 🎥 Project Demonstration

**30-second project demonstration:**

https://youtu.be/UmIzZ4BTYQA

**Seven-slide presentation:**

https://drive.google.com/file/d/1Y--tl8WQXslW3HR4BqSGiOXNf24AJ1OW/view?usp=drivesdk

## 🌍 Project Repository

GitHub:

https://github.com/EDDY05ee/COSMOCURA

## 🤖 AI Assistance Disclosure

AI assistance was used during project ideation, research synthesis, software development, coding and debugging support, and documentation preparation.

The submitted prototype does not currently integrate a runtime AI/ML model. Its demonstrated application features use programmed application logic and locally stored data.

## ❤️ Our Vision

We believe health information should remain accessible, understandable, and useful, even when humanity travels beyond Earth.

COSMOCURA represents our exploration of how technology can support the health and wellbeing of future space explorers.

**COSMOCURA — Intelligent Healthcare Beyond Earth.**

---

*Developed for the NASA Space Apps Challenge 2026.*
