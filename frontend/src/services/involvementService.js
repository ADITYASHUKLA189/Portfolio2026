import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URI}`;

const FALLBACK_INVOLVEMENTS = [
  {
    involvementTitle: "Member — Tech Society, IIIT Bhubaneswar",
    involvementLink: "tech-society-iiitbh",
    involvementSubTitle: "IIIT Bhubaneswar Tech Society",
    involvementTimeline: "2024 – Present",
    involvementTagline: "Active member of the Tech Society at IIIT Bhubaneswar, participating in workshops, hackathons, and peer code-review & debugging sessions.",
    involvementImages: [process.env.PUBLIC_URL + "/images/tech-society.webp"],
    involvementURLs: [],
    involvementParagraphs: [
      "Active member of the Tech Society at the International Institute of Information Technology, Bhubaneswar (2024 – Present).",
      "Engaged in technical workshops, hackathons, peer code-review, and debugging sessions. Collaborated on open-source projects and campus developer initiatives."
    ],
    likesCount: 0,
  },
  {
    involvementTitle: "Competitive Programming & Problem Solving",
    involvementLink: "self-learning",
    involvementSubTitle: "Continuous Algorithmic Growth",
    involvementTimeline: "2024 – Present",
    involvementTagline: "Actively solving advanced algorithmic challenges across LeetCode, Codeforces, and CodeChef.",
    involvementImages: [process.env.PUBLIC_URL + "/images/self-learning.webp"],
    involvementURLs: ["https://github.com/ADITYASHUKLA189"],
    involvementParagraphs: [
      "Committed to continuous self-improvement through building production-grade backend projects and solving 800+ DSA problems.",
      "Specializing in data structures, dynamic programming, graph algorithms, and low-latency system design."
    ],
    likesCount: 0,
  },
];

// Fetch all involvements
export const fetchInvolvements = async () => {
  try {
    const response = await axios.get(`${API_URL}/getinvolvements`, { timeout: 3500 });
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
      `${API_URL}/getinvolvements/${involvementLink}`,
      { timeout: 3500 }
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
