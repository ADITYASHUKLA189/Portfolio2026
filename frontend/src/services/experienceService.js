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
    experienceTitle: "B.Tech Information Technology (CGPA 8.55)",
    experienceLink: "btech-it-iiit-bhubaneswar",
    experienceSubTitle: "IIIT-Bhubaneswar | Aug 2024 – Apr 2028 (Expected)",
    experienceTimeline: "Aug 2024 – Apr 2028",
    experienceTagline: "Third-year B.Tech IT student at IIIT Bhubaneswar with an 8.55/10 CGPA, focused on backend systems, networking, and cloud architectures.",
    experienceImages: [process.env.PUBLIC_URL + "/images/iiit-bhubaneswar.webp"],
    experienceURLs: [],
    experienceParagraphs: [
      "Third-year B.Tech Information Technology undergraduate at IIIT Bhubaneswar with a cumulative GPA of 8.55/10.",
      "Key coursework includes Computer Networks, Operating Systems, Data Structures & Algorithms, Database Management Systems (DBMS), and Object-Oriented Programming (OOP). Active member of the campus developer community."
    ],
    likesCount: 0,
  },
  {
    experienceTitle: "Competitive Programming & Problem Solving",
    experienceLink: "competitive-programming",
    experienceSubTitle: "LeetCode Knight (1853) | 800+ Problems",
    experienceTimeline: "2023 – Present",
    experienceTagline: "LeetCode Knight with 1853 peak contest rating, 800+ DSA problems solved, Codeforces Pupil, and CodeChef 2-Star.",
    experienceImages: [process.env.PUBLIC_URL + "/images/competitive-programming-1735.svg"],
    experienceURLs: ["https://leetcode.com/u/cPyORwmUqZ/", "https://codolio.com/profile/AdityaShukla"],
    experienceParagraphs: [
      "Earned the LeetCode Knight badge with a peak contest rating of 1853 and 800+ algorithmic problems solved in C++ across dynamic programming, graphs, trees, binary search, and greedy algorithms.",
      "Competitive ratings: Codeforces Pupil and CodeChef 2-Star. 5th place in Crackathon (IIT Bombay) and Finalist at Odoo Hackathon 2026."
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
    experienceSubTitle: "LeetCode Knight (1853) | 800+ Problems",
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
    const response = await axios.get(`${API_URL}/getexperiences`, { timeout: 3500 });
    return response.data.map(normalizeExperience);
  } catch (error) {
    console.error("Error fetching experiences, using fallback data:", error);
    return FALLBACK_EXPERIENCES.map(normalizeExperience);
  }
};

// Fetch a specific experience by experienceLink
export const fetchExperienceByLink = async (experienceLink) => {
  try {
    const response = await axios.get(`${API_URL}/getexperiences/${experienceLink}`, { timeout: 3500 });
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
