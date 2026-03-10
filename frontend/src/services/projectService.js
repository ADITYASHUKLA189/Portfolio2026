import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URI}`;

const FALLBACK_PROJECTS = [
  {
    projectTitle: "EduArchive — Academic Resource Platform",
    projectLink: "eduarchive",
    projectSubTitle: "HTML + CSS + JavaScript + Cloudinary",
    projectTimeline: "Nov 2025 – Dec 2025",
    projectTagline: "Centralized academic platform for B.Tech students with branch-, year-, and semester-wise resource organization.",
    projectImages: [process.env.PUBLIC_URL + "/images/eduarchive.webp"],
    projectURLs: ["https://github.com/ADITYASHUKLA189/EduArchive", "https://mrtopr.github.io/EduArchive/"],
    projectParagraphs: [
      "EduArchive is a student-first academic resource platform designed to make B.Tech learning simple, structured, and accessible. It centralizes academic materials and placement preparation in one clean, distraction-free interface.",
      "Features include branch, year & semester-wise subject organization, centralized access to notes, PYQs, lab materials, and placement prep. Built with HTML, CSS, JavaScript, and Cloudinary for scalable PDF & resource storage.",
      "Collaboratively developed by Aditya Shukla and Sachin Kumar. The platform organizes resources exactly the way students think — by Branch, Year, and Semester."
    ],
    likesCount: 0,
  },
  {
    projectTitle: "Diagnostic Centre — Healthcare Management System",
    projectLink: "diagnostic-centre",
    projectSubTitle: "Modern Web Technologies",
    projectTimeline: "Oct 2025 – Nov 2025",
    projectTagline: "Web-based management system for diagnostic centres with patient, appointment, test report, and staff management.",
    projectImages: [process.env.PUBLIC_URL + "/images/diagnostic-centre.webp"],
    projectURLs: ["https://github.com/ADITYASHUKLA189"],
    projectParagraphs: [
      "A comprehensive healthcare management system built for diagnostic centres. Handles patient registration, appointment scheduling, test report generation, and staff management.",
      "Features a clean, modern UI with form validation, data persistence, and role-based access for administrators and staff members."
    ],
    likesCount: 0,
  },
  {
    projectTitle: "E-Commerce Website",
    projectLink: "e-commerce-project",
    projectSubTitle: "Bootstrap + HTML + CSS",
    projectTimeline: "2025",
    projectTagline: "Immersive e-commerce website for real-time data visualization with a clean, responsive shopping experience.",
    projectImages: [process.env.PUBLIC_URL + "/images/e-commerce.webp"],
    projectURLs: ["https://github.com/ADITYASHUKLA189/e-commerce-project", "https://adityashukla189.github.io/e-commerce-project/"],
    projectParagraphs: [
      "A responsive e-commerce website built with Bootstrap, HTML, and CSS. Features product listings, a shopping cart, and a clean layout optimized for all screen sizes.",
      "Designed with attention to UX, providing smooth navigation and a modern visual shopping experience."
    ],
    likesCount: 0,
  },
  {
    projectTitle: "3D Interactive Portfolio",
    projectLink: "3d-portfolio",
    projectSubTitle: "Spline + JavaScript",
    projectTimeline: "2025",
    projectTagline: "Immersive 3D portfolio enhanced with an interactive Spline-powered 3D model that dynamically traces cursor movements.",
    projectImages: [process.env.PUBLIC_URL + "/images/3d-portfolio.webp"],
    projectURLs: ["https://github.com/ADITYASHUKLA189/New-Portfolio", "https://protfolio-vert-gamma.vercel.app/"],
    projectParagraphs: [
      "An immersive 3D portfolio website enhanced with an interactive Spline-powered 3D model that dynamically traces cursor movements.",
      "Built with modern JavaScript and Spline 3D, featuring smooth animations, responsive layout, and sections for projects, skills, services, and contact."
    ],
    likesCount: 0,
  },
  {
    projectTitle: "Weather App",
    projectLink: "weather-app",
    projectSubTitle: "JavaScript + OpenWeather API",
    projectTimeline: "2025",
    projectTagline: "Fetches real-time weather data using OpenWeather API. Displays temperature, humidity, and conditions with an intuitive UI.",
    projectImages: [process.env.PUBLIC_URL + "/images/weather-app.webp"],
    projectURLs: ["https://github.com/ADITYASHUKLA189/weather-app", "https://adityashukla189.github.io/weather-app/"],
    projectParagraphs: [
      "A simple and modern Weather Application built using HTML, CSS, and JavaScript. Fetches real-time weather data using the OpenWeatherMap API.",
      "Displays current temperature, humidity, and wind speed with dynamic weather icons based on real-time conditions. Fully responsive for mobile, tablet, and desktop."
    ],
    likesCount: 0,
  },
  {
    projectTitle: "Simon Says Game",
    projectLink: "simon-says-game",
    projectSubTitle: "JavaScript",
    projectTimeline: "2025",
    projectTagline: "A fast-paced memory challenge powered by dynamic JavaScript logic with real-time pattern generation and visual feedback.",
    projectImages: [process.env.PUBLIC_URL + "/images/simon-says.webp"],
    projectURLs: ["https://github.com/ADITYASHUKLA189/simon-says-game", "https://adityashukla189.github.io/simon-says-game/"],
    projectParagraphs: [
      "A fun and interactive memory game built using HTML, CSS, and JavaScript. Test your memory skills by repeating the sequence of colors in the correct order.",
      "Features colorful animated buttons, increasing difficulty each round, game over and restart functionality, and a clean responsive design."
    ],
    likesCount: 0,
  },
];

// Fetch all projects
export const fetchProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/getprojects`);
    return response.data;
  } catch (error) {
    console.error("Error fetching projects, using fallback data:", error);
    return FALLBACK_PROJECTS;
  }
};

// Fetch a specific project by projectLink
export const fetchProjectByLink = async (projectLink) => {
  try {
    const response = await axios.get(`${API_URL}/getprojects/${projectLink}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching project by link:", error);
    const found = FALLBACK_PROJECTS.find((p) => p.projectLink === projectLink);
    if (found) return found;
    throw error;
  }
};
