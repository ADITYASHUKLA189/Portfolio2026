import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URI}`;

const FALLBACK_HONORS = [
  {
    honorsExperienceTitle: "CBSE Class XII — 92.8%",
    honorsExperienceLink: "cbse-class-xii",
    honorsExperienceSubTitle: "Kendriya Vidyalaya BSF Camp, Chhawla",
    honorsExperienceTimeline: "2021 – 2023",
    honorsExperienceTagline: "Scored 92.8% in CBSE Science stream. Strong academic foundation in Mathematics and Computer Science.",
    honorsExperienceImages: [process.env.PUBLIC_URL + "/images/cbse-xii.webp"],
    honorsExperienceURLs: [],
    honorsExperienceParagraphs: [
      "Graduated from Kendriya Vidyalaya BSF Camp, Chhawla with 92.8% in the CBSE Class XII Science stream.",
      "Developed a strong academic foundation in Mathematics, Physics, and Computer Science that laid the groundwork for a career in software engineering."
    ],
    likesCount: 0,
  },
  {
    honorsExperienceTitle: "LeetCode Rating 1650+",
    honorsExperienceLink: "leetcode-rating",
    honorsExperienceSubTitle: "Competitive Programming",
    honorsExperienceTimeline: "2024 – Present",
    honorsExperienceTagline: "Achieved 1650+ rating on LeetCode with 400+ DSA problems solved in C++.",
    honorsExperienceImages: [process.env.PUBLIC_URL + "/images/leetcode-rating.webp"],
    honorsExperienceURLs: ["https://leetcode.com/u/Aditya_Shuklaa/"],
    honorsExperienceParagraphs: [
      "Achieved 1650+ contest rating on LeetCode, demonstrating strong problem-solving and algorithmic thinking.",
      "Solved 400+ DSA problems in C++ covering arrays, strings, linked lists, trees, graphs, dynamic programming, and more."
    ],
    likesCount: 0,
  },
  {
    honorsExperienceTitle: "Dean's List — 1st Year B.Tech IT",
    honorsExperienceLink: "deans-list",
    honorsExperienceSubTitle: "IIIT Bhubaneswar",
    honorsExperienceTimeline: "2024 – 2025",
    honorsExperienceTagline: "Recognized on the Dean's List for outstanding academic performance during the first year of B.Tech Information Technology.",
    honorsExperienceImages: [process.env.PUBLIC_URL + "/images/deans-list.webp"],
    honorsExperienceURLs: [],
    honorsExperienceParagraphs: [
      "Named to the Dean's List at IIIT Bhubaneswar for maintaining excellent academic standing during the first year of B.Tech in Information Technology.",
      "Balanced rigorous coursework with extracurricular involvement in competitive programming, project building, and the Tech Society."
    ],
    likesCount: 0,
  },
];

// Fetch all Honors Experiences
export const fetchHonorsExperiences = async () => {
  try {
    const response = await axios.get(`${API_URL}/gethonorsexperiences`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Honors Experiences, using fallback data:", error);
    return FALLBACK_HONORS;
  }
};

// Fetch a specific Honors Experience by honorsExperienceLink
export const fetchHonorsExperienceByLink = async (honorsExperienceLink) => {
  try {
    const response = await axios.get(
      `${API_URL}/gethonorsexperiences/${honorsExperienceLink}`
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
