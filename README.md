# COSMOCURA
## Astronaut Health Intelligence System
### Intelligent Healthcare Beyond Earth

**NASA Space Apps Challenge 2026**

COSMOCURA is a local-first astronaut health-support software prototype designed to help organize crew health information, monitor personal wellness, explore spaceflight health risks, and access structured health guidance through a unified interface.

Our vision is to explore how accessible digital health-support systems could help astronauts manage and understand health-related information during missions where immediate communication with Earth may be limited.

---

## 1. The Challenge

Human space exploration introduces health challenges that are very different from those experienced on Earth.

During space missions, astronauts may encounter:

- Radiation exposure
- Isolation and confinement
- Distance from Earth and communication delays
- Altered gravity
- Hostile and closed environments

These conditions can affect physical health, mental well-being, medical decision-making, and the continuity of health information.

Astronauts are highly trained professionals, but they are not necessarily medical specialists. During a mission, health information must be organized, understandable, and accessible when immediate assistance from Earth is unavailable or delayed.

This creates an important question:

**How can technology help astronauts organize health information and access useful health-support guidance when traditional medical support is not immediately available?**

COSMOCURA explores one possible software-based approach to this challenge.

---

## 2. Our Solution

COSMOCURA brings several astronaut health-support functions together in one mission-oriented digital workspace.

Instead of separating health measurements, wellness information, medical records, and emergency reference information into different tools, COSMOCURA organizes them through a unified interface.

The prototype allows users to:

- Maintain crew health information.
- Record and review health measurements.
- Complete guided measurement workflows.
- Explore body-related health information.
- Record sleep, mood, stress, and fatigue.
- Maintain medical records.
- Access categorized emergency reference guidance.
- Explore important human spaceflight hazards.
- Prepare a locally generated medical handoff summary.

The application follows a local-first approach. Its frontend communicates with a locally running backend, which stores application records in an SQLite database.

**Important:** COSMOCURA is a software prototype. It is not a clinically validated medical device or an operational spacecraft medical system.

---

## 3. Key Features

### 3.1 Mission Overview

A centralized dashboard that brings together crew-related information and health indicators.

It provides a starting point for navigating the application's main health-support functions.

### 3.2 Crew Health Monitoring

Allows users to record, organize, and review manually entered crew health measurements.

The purpose is to make recorded information easier to access and understand.

### 3.3 Guided Measurements

Provides a structured interface for recording health measurements.

It helps users follow an organized measurement workflow rather than entering information without context.

### 3.4 Interactive Body Explorer

An interactive interface for exploring body-related health information.

It provides a visual way to navigate health-related information.

### 3.5 Emergency Center

Organizes emergency reference information into categories and presents structured guidance with appropriate safety disclaimers.

It is intended as an information-support feature, not a replacement for professional medical procedures or mission-approved emergency protocols.

### 3.6 Medical Records

Allows users to create, organize, and review crew medical records.

Records are stored locally through the application's backend and remain available after refreshing the application.

### 3.7 Crew Wellness

Supports the recording of personal wellness information, including:

- Sleep
- Mood
- Stress
- Fatigue
- Wellness notes

This feature explores how personal wellness information can be organized alongside other crew health information.

### 3.8 Wellness History

Allows users to review previous wellness check-ins and recorded information.

It provides a historical view of the information entered into the application.

### 3.9 Five Spaceflight Hazards

Provides an information interface covering five major human spaceflight hazards:

1. Radiation
2. Isolation and confinement
3. Distance from Earth
4. Altered gravity
5. Hostile and closed environments

These areas are informed by NASA Human Research Program resources.

### 3.10 Mission Environment Profiles

Provides mission-related environmental information to help users explore conditions and considerations associated with human spaceflight.

### 3.11 Crew Handoff Summary

Generates a locally prepared medical handoff brief using available application records.

The summary can be copied for review and information continuity.

The current prototype does not transmit this report to mission control or any spacecraft communication system.

### 3.12 Local Data Persistence

Uses a local SQLite database through the backend to store supported application records.

This allows saved information to remain available when the application is refreshed, provided the local database is retained.

### 3.13 Responsive Interface

Provides a responsive user interface designed to support access through desktop and smaller-screen layouts.

---

## 4. How COSMOCURA Works

The application follows a frontend-and-backend architecture.

### Step 1: User Interaction

The user accesses the COSMOCURA interface and navigates its health-support features.

### Step 2: Information Entry

The user records available crew information, measurements, medical records, or wellness check-ins.

### Step 3: Backend Processing

The React frontend communicates with the Python FastAPI backend through API endpoints.

### Step 4: Local Storage

The backend uses SQLAlchemy to interact with the SQLite database and store supported records.

### Step 5: Information Retrieval

When the user returns to a feature or refreshes the application, saved information can be retrieved from the local backend and displayed again.

### Step 6: Information Organization

The application brings together relevant information through dashboards, history views, and the locally prepared handoff summary.

---

## 5. System Architecture

COSMOCURA is structured into three main layers.

### Frontend Layer

The frontend provides the user interface and application interactions.

Technologies:
- React
- JavaScript
- Vite
- Lucide React
- Recharts

### Backend Layer

The backend handles application requests, data operations, and API communication.

Technologies:
- Python
- FastAPI
- SQLAlchemy
- Pydantic

### Database Layer

SQLite provides local database storage for supported application records.

### Architecture Flow

User
  |
  v
React Frontend
  |
  v
FastAPI Backend
  |
  v
SQLAlchemy
  |
  v
SQLite Database

The frontend and backend communicate locally during prototype operation.

---

## 6. Technology Stack

| Technology | Purpose |
|---|---|
| React | Frontend user interface |
| JavaScript | Application logic |
| Vite | Frontend development and build tooling |
| Python | Backend programming language |
| FastAPI | Backend API framework |
| SQLite | Local database |
| SQLAlchemy | Database integration |
| Pydantic | Data validation and settings |
| Lucide React | Interface icons |
| Recharts | Data visualization |
| Git | Version control |
| GitHub | Source-code hosting |

The prototype was developed using commonly available software development tools and open-source technologies.

No specialized spacecraft hardware is required to run the current desktop prototype.

---

## 7. Project Structure

COSMOCURA/
|
|-- backend/
|   |-- app/
|   |   |-- api/
|   |   |-- core/
|   |   |-- database/
|   |   |-- models/
|   |   |-- schemas/
|   |   |-- services/
|   |   |-- main.py
|   |-- requirements.txt
|
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- assets/
|   |   |-- features/
|   |   |-- services/
|   |   |-- App.jsx
|   |   |-- App.css
|   |   |-- index.css
|   |   |-- main.jsx
|   |-- package.json
|
|-- .gitignore
|-- README.md

---

## 8. Installation and Local Setup

Anyone with a compatible computer can run the current development version by following these instructions.

### Prerequisites

Install:

- Python 3.10 or later
- Node.js and npm
- Git
- Visual Studio Code (recommended)

### Step 1: Clone the Repository

Open a terminal and run:

git clone https://github.com/EDDY05ee/COSMOCURA.git

Move into the project folder:

cd COSMOCURA

### Step 2: Set Up the Backend

Open a terminal:

cd backend

Create a Python virtual environment:

py -m venv .venv

Install the required packages:

.\.venv\Scripts\python.exe -m pip install -r requirements.txt

Start the backend server:

.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload

The backend should now be available at:

http://127.0.0.1:8000

API documentation:

http://127.0.0.1:8000/docs

Health check:

http://127.0.0.1:8000/api/health

### Step 3: Set Up the Frontend

Open a second terminal.

From the project root, run:

cd frontend

Install frontend dependencies:

npm install

Start the development server:

npm run dev

Open the local address displayed by Vite, normally:

http://localhost:5173

**Windows PowerShell note:** If PowerShell blocks npm.ps1 because of its execution policy, use `npm.cmd install` and `npm.cmd run dev` instead.

### Step 4: Use the Application

Keep both backend and frontend terminals running while using the application.

The frontend requires the backend to be available for database-backed features.

---

## 9. NASA and Space Agency Research

COSMOCURA was developed with reference to publicly available spaceflight health and human research resources.

### NASA Human Research Program

**NASA – 5 Hazards of Human Spaceflight**

https://www.nasa.gov/hrp/hazards/

**NASA – Risks of Human Spaceflight**

https://www.nasa.gov/hrp/risks/

**NASA – Ongoing HRP Research in Space**

https://www.nasa.gov/hrp/ongoing-hrp-research/

### Canadian Space Agency

**Monitoring Radiation for Astronaut Health**

https://www.asc-csa.gc.ca/eng/news/articles/2026/2026-02-26-monitoring-radiation-astronaut-health.asp

**Why Do We Conduct Science Experiments in Space?**

https://www.asc-csa.gc.ca/eng/iss/science/why-do-we-conduct-science-experiments-in-space.asp

These resources inform the project's understanding of astronaut health, spaceflight hazards, radiation, and human research in space.

They are research references, not live data feeds integrated into the application.

---

## 10. Testing and Current Development Status

The prototype has been manually tested for important application workflows, including:

- Adding, editing, and deleting crew information.
- Navigating the Mission Overview and application sections.
- Recording guided health measurements.
- Reviewing saved health information.
- Creating and reviewing medical records.
- Checking medical record persistence after refreshing.
- Recording wellness check-ins.
- Reviewing wellness history.
- Accessing emergency categories and guidance.
- Using the medical handoff summary.
- Checking responsive layouts on smaller screens.

These checks represent prototype-level functional testing, not clinical validation or operational spaceflight testing.

---

## 11. Privacy, Safety, and Limitations

COSMOCURA is designed as an educational and experimental software prototype.

The current implementation has important limitations:

- Health measurements are entered manually.
- The application does not connect to spacecraft sensors.
- No live NASA, CSA, or mission-control system integration is implemented.
- The prototype does not transmit information through spacecraft communication systems.
- The SQLite database is not encrypted in the current implementation.
- The application does not currently contain an integrated runtime AI or machine-learning model.
- Emergency information is not a substitute for professional medical advice or mission-approved procedures.
- The system has not been clinically validated or operationally tested in spaceflight.

The local-first design demonstrates how supported information can be stored and accessed through a locally running application. It does not establish flight readiness or guarantee uninterrupted operation under spacecraft conditions.

**COSMOCURA must not be used as a substitute for qualified medical professionals, validated medical systems, or official emergency procedures.**

---

## 12. Future Development

Our long-term vision is to explore how COSMOCURA could evolve into a more capable astronaut health-support platform.

Potential future directions include:

- Stronger data protection and encryption.
- Expert-reviewed and validated health guidance.
- Improved offline operation and resource efficiency.
- Integration with validated medical sensors, subject to appropriate testing and approval.
- More advanced health data visualization.
- Improved accessibility and multilingual interaction.
- Mission-approved data exchange and communication capabilities.
- Further research into AI-assisted health information support.

These are future development goals, not capabilities claimed by the current prototype.

---

## 13. Creativity and Innovation

The central idea behind COSMOCURA is to bring multiple astronaut health-support functions into one organized digital environment.

Its approach combines health measurements, wellness tracking, medical records, emergency reference information, spaceflight hazard awareness, and handoff preparation.

The local-first architecture explores an important consideration for future space missions: how health-related information might remain accessible through local application infrastructure when external connectivity is limited.

Rather than presenting a single isolated health feature, COSMOCURA explores a connected workflow for organizing astronaut health information.

---

## 14. Intended Impact

COSMOCURA explores the potential of accessible digital tools to support health-information organization during human space exploration.

Its intended contribution is to:

- Improve the organization of crew health information.
- Make recorded measurements easier to review.
- Support awareness of personal wellness.
- Bring medical records and health information together.
- Provide structured access to emergency reference information.
- Explore information continuity through locally prepared handoff summaries.

The broader vision is to contribute ideas toward more accessible, understandable, and mission-oriented digital health-support technologies.

---

## 15. Team

**Team COSMOCURA**

A student innovation team participating in the NASA Space Apps Challenge 2026.

Our team brings together interests in:

- Artificial Intelligence and Machine Learning
- Software development
- Healthcare technology
- Research and problem-solving
- Collaborative innovation

We believe meaningful innovation begins with understanding real-world challenges and developing practical solutions through teamwork.

---

## 16. Project Demonstration and Resources

### Live Project Source Code

GitHub Repository:

https://github.com/EDDY05ee/COSMOCURA

### Project Demonstration

30-second demonstration video:

https://youtu.be/UmIzZ4BTYQA

### Project Presentation

Seven-slide presentation:

https://drive.google.com/file/d/1pO3xX034TSnjv91PRf4n18PbZI0nP5yI/view?usp=drivesdk

---

## 17. AI Assistance Disclosure

AI-assisted tools were used during project development for brainstorming, research assistance, software architecture guidance, code generation, debugging, documentation, and presentation preparation.

The team directed the project, made development decisions, and reviewed and tested the application with AI assistance.

The current COSMOCURA prototype does not contain an integrated runtime AI or machine-learning model. Its demonstrated application features operate through programmed application logic and locally stored data.

Any AI-generated visual assets included in submitted materials should be visibly identified in accordance with NASA Space Apps Challenge requirements.

---

## 18. Project Information

**Project:** COSMOCURA  
**Category:** Astronaut Health / Space Health Technology  
**Event:** NASA Space Apps Challenge 2026  
**Project Type:** Local-first software prototype  
**Frontend:** React  
**Backend:** Python / FastAPI  
**Database:** SQLite  
**Repository:** https://github.com/EDDY05ee/COSMOCURA

---

### Technology that supports health, wherever humanity travels.

**COSMOCURA — Intelligent Healthcare Beyond Earth.**
