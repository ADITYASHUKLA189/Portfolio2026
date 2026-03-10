import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URI}`;

const FALLBACK_INVOLVEMENTS = [
  {
    involvementTitle: "Member — Tech Society, IIIT Bhubaneswar",
    involvementLink: "tech-society-iiitbh",
    involvementSubTitle: "IIIT Bhubaneswar Tech Society",
    involvementTimeline: "2024 – Present",
    involvementTagline: "Active member of the Tech Society at IIIT Bhubaneswar, participating in hackathons, coding workshops, and collaborative open-source projects.",
    involvementImages: [process.env.PUBLIC_URL + "/images/tech-society.webp"],
    involvementURLs: [],
    involvementParagraphs: [
      "Active member of the Tech Society at the International Institute of Information Technology, Bhubaneswar. Engaged in organizing and participating in hackathons, coding contests, and tech workshops.",
      "Contributed to peer-learning sessions on web development and competitive programming. Collaborated with fellow members on open-source projects and technical events that strengthen the campus developer community."
    ],
    likesCount: 0,
  },
  {
    involvementTitle: "Self-Learning & Project Building",
    involvementLink: "self-learning",
    involvementSubTitle: "Continuous Learning",
    involvementTimeline: "2024 – Present",
    involvementTagline: "Actively building strong fundamentals through projects, competitive programming, and continuous self-learning.",
    involvementImages: [process.env.PUBLIC_URL + "/images/self-learning.webp"],
    involvementURLs: ["https://github.com/ADITYASHUKLA189"],
    involvementParagraphs: [
      "Committed to continuous self-improvement through building real-world projects, exploring new technologies, and solving hundreds of DSA problems on LeetCode.",
      "Actively learning full-stack web development (MERN stack), Python automation, and competitive programming while pursuing B.Tech in Information Technology at IIIT-Bhubaneswar."
    ],
    likesCount: 0,
  },
];

// Fetch all involvements
export const fetchInvolvements = async () => {
  try {
    const response = await axios.get(`${API_URL}/getinvolvements`);
    return response.data;
  } catch (error) {
    console.error("Error fetching involvements, using fallback data:", error);
    return FALLBACK_INVOLVEMENTS;
  }
};

// Fetch a specific involvement by involvementLink
export const fetchInvolvementByLink = async (involvementLink) => {
  try {
    const response = await axios.get(
      `${API_URL}/getinvolvements/${involvementLink}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching involvement by link:", error);
    const found = FALLBACK_INVOLVEMENTS.find(
      (i) => i.involvementLink === involvementLink
    );
    if (found) return found;
    throw error;
  }
};
