# Grex

> **“Your team’s full toolkit, in one workspace.”**

Grex is a collaboration and project management platform built specifically for small teams such as thesis or capstone groups. It provides everything a team needs to organize work, stay in sync, and collaborate efficiently — all in one accessible workspace. With features like task management, group chat, analytics, and GrexAI, teams can focus on progress rather than juggling multiple tools.

---

## 📘 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Demo](#demo)
- [Development Setup](#development-setup)
- [Contributing](#contributing)
- [Future Plans](#future-plans)
- [Acknowledgements](#acknowledgements)

---

## 🧩 Overview

Small teams, such as student groups working on their thesis or capstone projects, often rely on several disconnected tools — using messaging apps for communication, separate task trackers for deadlines, and other services for sharing files.  
Premium project management tools like Jira or MS Project are powerful but often unaffordable.

**Grex** solves this by offering an **all-in-one workspace** designed for small collaborative teams. It combines task management, communication, analytics, and an AI-powered assistant into a single, intuitive interface.

---

## 🚀 Key Features

### 🗂️ Task Management

- Create, assign, and prioritize tasks.
- Set deadlines and monitor progress visually.
- Supports **Kanban board view** and **List view**.
- Tasks can contain **subtasks** for more granular control.

### 💬 Real-Time Collaboration

- Each workspace includes a **group chat** for easy communication.
- Share files and media directly in the workspace.
- Collaborate and exchange updates without leaving the platform.

### 🤖 GrexAI — Your Intelligent Groupmate

- Automate task creation and organization.
- Request AI-driven opinions or suggestions for project decisions.
- Get natural-language assistance directly within your workspace.

### 📅 Calendar Integration

- Displays how long each task spans and its assignees.
- Offers a complete timeline view of your team’s workflow.

### 📊 Project Overview & Analytics

- Visualize key metrics such as:
  - Task breakdown (done, pending, overdue)
  - Task priority distribution
  - Task distribution by members
  - Recent activity logs
- Gain actionable insights to improve team efficiency.

---

## 🛠️ Tech Stack

This README is for the **Frontend Repository** of Grex.  
The backend is a separate project currently in development.

| Layer                       | Technology              |
| --------------------------- | ----------------------- |
| **Frontend Framework**      | React (TypeScript)      |
| **UI & Styling**            | Tailwind CSS, shadcn/ui |
| **State Management**        | Zustand                 |
| **Data Fetching & Caching** | TanStack Query          |
| **Routing**                 | React Router            |
| **Charts & Analytics**      | Chart.js                |
| **Drag & Drop**             | hello-pangea/dnd        |

---

## 🎥 Demo

<video src="/src/assets/DnDDemo.mp4" width="100%" controls></video>

---

## ⚙️ Development Setup

> ⚠️ **Note:** This frontend project requires the Grex backend to be functional.  
> The backend is currently under development and will be integrated soon.

A complete setup guide will be provided once the backend is deployed and publicly available.

---

## 🤝 Contributing

Contributions are welcome and appreciated!  
To get started:

1. **Fork** the repository
2. **Create a new branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Commit your changes**

   ```bash
   git commit -m "Add your meaningful commit message"
   ```

4. **Push to your fork**

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request** for review 🚀

---

## 🧭 Future Plans

- Deploy both frontend and backend for public access
- Implement comprehensive frontend tests (unit & integration)
- Expand GrexAI’s capabilities for smarter automation
- Add audio and video call functionality for seamless communication

---

## 💡 Acknowledgements

Grex is built with passion to empower small teams — especially students — to collaborate more effectively and achieve more together.

---

> © 2025 Grex — Created and maintained by the Grex Team
