# Aditya Shukla — Full Stack Portfolio

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" alt="React 18" />
  <img src="https://img.shields.io/badge/Node.js-Fastify-brightgreen?logo=node.js&logoColor=white" alt="Node.js/Fastify" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-success?logo=mongodb&logoColor=white" alt="MongoDB Atlas" />
  <img src="https://img.shields.io/badge/OpenAI-GPT--4-blueviolet?logo=openai&logoColor=white" alt="OpenAI GPT-4" />
</p>

## About

Personal portfolio website for **Aditya Shukla** — B.Tech Information Technology student at IIIT Bhubaneswar. Built with the MERN stack and enhanced with an AI Companion chatbot. Showcases projects, experience, skills, involvements, and honors in an interactive, animated interface.

### Highlights

- **6 Projects** — EduArchive, Diagnostic Centre, E-Commerce, 3D Interactive Portfolio, Weather App, Simon Says Game
- **4 Experiences** — SaiKet Systems Python Internship, Full Stack Development, B.Tech IT @ IIIT-BH, Competitive Programming & Mentoring
- **Skills Radar Charts** — Front-end, Back-end, Competitive Programming, Tools & Platforms with Chart.js radar graphs
- **Coding Stats Bar Chart** — GitHub language distribution (C++, JavaScript, HTML, CSS, Python, TypeScript)
- **AI Companion** — Conversational chatbot with voice input, context-aware dialog, and follow-up suggestions
- **LeetCode 1650+** rating | **400+ DSA problems** solved in C++

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 18, Framer Motion, React Spring, Chart.js, Stitches, Glide.js, Swiper, TypeAnimation |
| **Backend** | Node.js, Fastify, MongoDB Atlas, OpenAI GPT-4 & Embeddings API |
| **Deployment** | Render.com (frontend & backend), MongoDB Atlas |

## Quick Start

```bash
# Clone
git clone https://github.com/ADITYASHUKLA189/portfolio_full-stack.git
cd portfolio_full-stack

# Frontend only (works without backend using fallback data)
cd frontend
npm install
npm start
# Visit http://localhost:3000
```

### Full Setup (with backend)

```bash
# Backend
cd backend
cp .env.example .env   # Add your MONGO_URI, OPENAI_API_KEY, etc.
npm install
npm start

# Frontend (in a separate terminal)
cd frontend
npm install
npm start
```

### Environment Variables (backend `.env`)

```
PORT=5000
MONGO_URI="<MongoDB connection string>"
OPENAI_API_KEY="<OpenAI API key>"
JWT_SECRET="<JWT secret>"
GITHUB_TOKEN="<GitHub PAT (optional)>"
```

## Project Structure

```
├── backend/          # Fastify API server, controllers, routes, AI service
├── frontend/
│   ├── public/       # Static assets, card images, profile photo, resume
│   └── src/
│       ├── components/   # HomePage, AboutPage, SkillPage, ProjectPage, ContactPage, WindowModal
│       ├── services/     # API service files with fallback data
│       └── styles/       # CSS files
└── tests/            # Integration & unit tests
```

## Contact

- **Email:** Shukladitya22@gmail.com
- **GitHub:** [ADITYASHUKLA189](https://github.com/ADITYASHUKLA189)
- **LinkedIn:** [aditya-shukla-44121a2bb](https://www.linkedin.com/in/aditya-shukla-44121a2bb/)
- **LeetCode:** [Aditya_Shuklaa](https://leetcode.com/u/Aditya_Shuklaa/)

---
