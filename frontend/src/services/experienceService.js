import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URI}`;

const FALLBACK_EXPERIENCES = [
  {
    experienceTitle: "Full Stack Development Services",
    experienceLink: "fullstack-services",
    experienceSubTitle: "Web App Development",
    experienceTimeline: "2024 – Present",
    experienceTagline: "Building full-featured web apps and dashboards using React, Node.js, MongoDB, Express.",
    experienceImages: [process.env.PUBLIC_URL + "/images/fullstack-dev.webp"],
    experienceURLs: ["https://github.com/ADITYASHUKLA189"],
    experienceParagraphs: [
      "Building full-featured web applications, dashboards, and B2B/B2C portals using the MERN stack (MongoDB, Express, React, Node.js).",
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
    experienceSubTitle: "LeetCode 1735+ | 700+ Problems",
    experienceTimeline: "2023 – Present",
    experienceTagline: "Problem solving, algorithm design, mock coding contests, interview prep coaching, and content creation.",
    experienceImages: [process.env.PUBLIC_URL + "/images/competitive-programming-1735.svg"],
    experienceURLs: ["https://leetcode.com/u/cPyORwmUqZ/", "https://codolio.com/profile/AdityaShukla"],
    experienceParagraphs: [
      "Achieved 1735+ rating on LeetCode with 700+ DSA problems solved in C++. Sharpening logic and problem-solving with data structures, algorithms, and optimization.",
      "Specializing in optimizing code under time pressure. Helping learners level up through problem-solving sessions, code reviews, and mock coding contests."
    ],
    likesCount: 0,
  },
];

const normalizeExperience = (experience) => {
  if (experience?.experienceLink === "fullstack-services") {
    return {
      ...experience,
      experienceSubTitle: "Web App Development",
      experienceTagline:
        "Building full-featured web apps and dashboards using React, Node.js, MongoDB, Express.",
      experienceParagraphs: [
        "Building full-featured web applications, dashboards, and B2B/B2C portals using the MERN stack (MongoDB, Express, React, Node.js).",
        "Delivering intuitive, responsive UI/UX frontends paired with secure, performant server-side logic. Experience with REST APIs, database design, and cloud deployment.",
      ],
    };
  }

  if (experience?.experienceLink !== "competitive-programming") {
    return experience;
  }

  return {
    ...experience,
    experienceSubTitle: "LeetCode 1735+ | 700+ Problems",
    experienceTagline:
      "1735+ LeetCode rating with 700+ DSA problems solved in C++, focused on algorithms, speed, and interview-level problem solving.",
    experienceImages: [process.env.PUBLIC_URL + "/images/competitive-programming-1735.svg"],
    experienceURLs: ["https://leetcode.com/u/cPyORwmUqZ/", "https://codolio.com/profile/AdityaShukla"],
    experienceParagraphs: [
      "Achieved 1735+ rating on LeetCode with 700+ DSA problems solved in C++. Sharpening logic and problem-solving with data structures, algorithms, and optimization.",
      "Specializing in optimizing code under time pressure. Helping learners level up through problem-solving sessions, code reviews, and mock coding contests.",
    ],
  };
};

// Fetch all experiences
export const fetchExperiences = async () => {
  try {
    const response = await axios.get(`${API_URL}/getexperiences`);
    return response.data.map(normalizeExperience);
  } catch (error) {
    console.error("Error fetching experiences, using fallback data:", error);
    return FALLBACK_EXPERIENCES.map(normalizeExperience);
  }
};

// Fetch a specific experience by experienceLink
export const fetchExperienceByLink = async (experienceLink) => {
  try {
    const response = await axios.get(
      `${API_URL}/getexperiences/${experienceLink}`
    );
    return normalizeExperience(response.data);
  } catch (error) {
    console.error("Error fetching experience by link:", error);
    const found = FALLBACK_EXPERIENCES.find(
      (e) => e.experienceLink === experienceLink
    );
    if (found) return normalizeExperience(found);
    throw error;
  }
};
