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
];

const HIDDEN_HONORS = ["leetcode-rating", "deans-list"];

// Fetch all Honors Experiences
export const fetchHonorsExperiences = async () => {
  try {
    const response = await axios.get(`${API_URL}/gethonorsexperiences`);
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
