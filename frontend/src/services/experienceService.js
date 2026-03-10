import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URI}`;

const FALLBACK_EXPERIENCES = [
  {
    experienceTitle: "Python Development Intern — SaiKet Systems",
    experienceLink: "saiket-systems-internship",
    experienceSubTitle: "SaiKet Systems (AICTE Approved)",
    experienceTimeline: "2025 – Present",
    experienceTagline: "Completed Python development tasks including web scraping, file handling, word count tools, and data analysis at SaiKet Systems.",
    experienceImages: [process.env.PUBLIC_URL + "/images/fullstack-dev.webp"],
    experienceURLs: ["https://www.linkedin.com/in/aditya-shukla-44121a2bb/", "https://saiket.in/internship/"],
    experienceParagraphs: [
      "Completed a Python Development Internship at SaiKet Systems, an AICTE-approved internship program focused on strengthening core Python concepts.",
      "Tasks included building a Basic Web Scraper, File Handling system, Word Count Tool, and more. Gained hands-on experience in data structures, control flow, string manipulation, and automation.",
      "This internship helped solidify my Python fundamentals and gave me real-world exposure to building tools and scripts used in industry."
    ],
    likesCount: 0,
  },
  {
    experienceTitle: "Full Stack Development Services",
    experienceLink: "fullstack-services",
    experienceSubTitle: "Web & Mobile App Development",
    experienceTimeline: "2024 – Present",
    experienceTagline: "Building full-featured web apps, dashboards, and cross-platform apps using React, Node.js, MongoDB, Express.",
    experienceImages: [process.env.PUBLIC_URL + "/images/fullstack-dev.webp"],
    experienceURLs: ["https://github.com/ADITYASHUKLA189"],
    experienceParagraphs: [
      "Building full-featured web applications, dashboards, B2B/B2C portals, and cross-platform apps using the MERN stack (MongoDB, Express, React, Node.js).",
      "Delivering intuitive, responsive UI/UX frontends paired with secure, performant server-side logic. Experience with REST APIs, database design, and cloud deployment."
    ],
    likesCount: 0,
  },
  {
    experienceTitle: "B.Tech Information Technology",
    experienceLink: "btech-it-iiit-bhubaneswar",
    experienceSubTitle: "IIIT-Bhubaneswar",
    experienceTimeline: "Apr 2024 – Apr 2028",
    experienceTagline: "Pursuing B.Tech IT with focus on web development, backend systems, and competitive programming.",
    experienceImages: [process.env.PUBLIC_URL + "/images/iiit-bhubaneswar.webp"],
    experienceURLs: [],
    experienceParagraphs: [
      "Currently pursuing B.Tech in Information Technology at the International Institute of Information Technology, Bhubaneswar (IIIT-BH).",
      "Focusing on web development, backend systems, data structures & algorithms, and competitive programming. Active participant in coding contests and hackathons."
    ],
    likesCount: 0,
  },
  {
    experienceTitle: "Competitive Programming & Mentoring",
    experienceLink: "competitive-programming",
    experienceSubTitle: "LeetCode 1650+ | 400+ Problems",
    experienceTimeline: "2023 – Present",
    experienceTagline: "Problem solving, algorithm design, mock coding contests, interview prep coaching, and content creation.",
    experienceImages: [process.env.PUBLIC_URL + "/images/competitive-prog.webp"],
    experienceURLs: ["https://leetcode.com/u/Aditya_Shuklaa/"],
    experienceParagraphs: [
      "Achieved 1650+ rating on LeetCode with 400+ DSA problems solved in C++. Sharpening logic and problem-solving with data structures, algorithms, and optimization.",
      "Specializing in optimizing code under time pressure. Helping learners level up through problem-solving sessions, code reviews, and mock coding contests."
    ],
    likesCount: 0,
  },
];

// Fetch all experiences
export const fetchExperiences = async () => {
  try {
    const response = await axios.get(`${API_URL}/getexperiences`);
    return response.data;
  } catch (error) {
    console.error("Error fetching experiences, using fallback data:", error);
    return FALLBACK_EXPERIENCES;
  }
};

// Fetch a specific experience by experienceLink
export const fetchExperienceByLink = async (experienceLink) => {
  try {
    const response = await axios.get(
      `${API_URL}/getexperiences/${experienceLink}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching experience by link:", error);
    const found = FALLBACK_EXPERIENCES.find(
      (e) => e.experienceLink === experienceLink
    );
    if (found) return found;
    throw error;
  }
};
