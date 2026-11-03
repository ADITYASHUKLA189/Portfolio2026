import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URI}`;

const FALLBACK_HONORS = [
  {
    honorsExperienceTitle: "Finalist — Odoo Hackathon 2026",
    honorsExperienceLink: "odoo-hackathon-finalist-2026",
    honorsExperienceSubTitle: "Odoo Hackathon 2026",
    honorsExperienceTimeline: "2026",
    honorsExperienceTagline: "Finalist at Odoo Hackathon 2026 for building EcoSphere, a real-time B2B ESG carbon accounting and compliance management platform.",
    honorsExperienceImages: [process.env.PUBLIC_URL + "/images/fullstack-dev.webp"],
    honorsExperienceURLs: ["https://github.com/ADITYASHUKLA189"],
    honorsExperienceParagraphs: [
      "Selected as a National Finalist at Odoo Hackathon 2026 out of hundreds of participating developer teams.",
      "Engineered the complete backend and database layer for EcoSphere, integrating carbon transaction tracking, CSR reporting, compliance auditing, and gamification with Prisma ORM and PostgreSQL."
    ],
    likesCount: 0,
  },
  {
    honorsExperienceTitle: "5th Place — Crackathon (IIT Bombay)",
    honorsExperienceLink: "crackathon-iit-bombay",
    honorsExperienceSubTitle: "IIT Bombay Techfest",
    honorsExperienceTimeline: "2025 – 2026",
    honorsExperienceTagline: "Secured 5th place at Crackathon, a premier competitive programming and algorithmic problem-solving hackathon hosted by IIT Bombay.",
    honorsExperienceImages: [process.env.PUBLIC_URL + "/images/competitive-programming-1735.svg"],
    honorsExperienceURLs: [],
    honorsExperienceParagraphs: [
      "Achieved 5th position at Crackathon organized by IIT Bombay, competing against top university programmers nationally in algorithmic challenges, speed debugging, and data structure optimizations.",
      "Solved advanced graph theory, dynamic programming, and greedy optimization problems under strict real-time competitive constraints."
    ],
    likesCount: 0,
  },
  {
    honorsExperienceTitle: "LeetCode Knight (Peak Rating 1853)",
    honorsExperienceLink: "leetcode-knight-rating",
    honorsExperienceSubTitle: "LeetCode | 800+ Problems Solved",
    honorsExperienceTimeline: "2024 – Present",
    honorsExperienceTagline: "Earned the prestigious LeetCode Knight badge with an 1853 peak contest rating, solving 800+ complex problems in C++.",
    honorsExperienceImages: [process.env.PUBLIC_URL + "/images/competitive-programming-1735.svg"],
    honorsExperienceURLs: ["https://leetcode.com/u/cPyORwmUqZ/"],
    honorsExperienceParagraphs: [
      "Ranked in the top percentile of global LeetCode contest participants, earning the Knight title with a peak contest rating of 1853.",
      "Solved over 800 problems spanning dynamic programming, binary search, tree traversals, shortest-path algorithms, and bit manipulation. Codeforces Pupil and CodeChef 2-Star."
    ],
    likesCount: 0,
  },
  {
    honorsExperienceTitle: "CBSE Class XII (Science) — 92.0%",
    honorsExperienceLink: "cbse-class-xii",
    honorsExperienceSubTitle: "Kendriya Vidyalaya BSF Camp, Chhawla, New Delhi",
    honorsExperienceTimeline: "2022 – 2024",
    honorsExperienceTagline: "Scored 92.0% in CBSE Class XII Senior Secondary (Science) with distinction in Mathematics and Computer Science.",
    honorsExperienceImages: [process.env.PUBLIC_URL + "/images/cbse-xii.webp"],
    honorsExperienceURLs: [],
    honorsExperienceParagraphs: [
      "Completed CBSE Senior Secondary (Science) with 92.0% from Kendriya Vidyalaya BSF Camp, Chhawla, New Delhi.",
      "Built a solid foundation in Mathematics, Physics, and Object-Oriented Programming, fostering strong analytical and computational problem-solving abilities."
    ],
    likesCount: 0,
  },
];

const HIDDEN_HONORS = ["deans-list"];

// Fetch all Honors Experiences
export const fetchHonorsExperiences = async () => {
  try {
    const response = await axios.get(`${API_URL}/gethonorsexperiences`, { timeout: 3500 });
    return response.data.filter((h) => !HIDDEN_HONORS.includes(h.honorsExperienceLink));
  } catch (error) {
    console.error("Error fetching Honors Experiences, using fallback data:", error);
    return FALLBACK_HONORS.filter((h) => !HIDDEN_HONORS.includes(h.honorsExperienceLink));
  }
};

// Fetch a specific Honors Experience by honorsExperienceLink
export const fetchHonorsExperienceByLink = async (honorsExperienceLink) => {
  try {
    const response = await axios.get(
      `${API_URL}/gethonorsexperiences/${honorsExperienceLink}`,
      { timeout: 3500 }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Honors Experience by link:", error);
    const found = FALLBACK_HONORS.find(
      (h) => h.honorsExperienceLink === honorsExperienceLink
    );
    if (found) return found;
    throw error;
  }
};
