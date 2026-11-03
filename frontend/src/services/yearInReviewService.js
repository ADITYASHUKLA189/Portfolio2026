import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URI}`;

const FALLBACK_YEAR_IN_REVIEWS = [
  {
    yearInReviewTitle: "2025 – 2026 Year In Review",
    yearInReviewSubTitle: "Scalable Systems & High-Impact Projects",
    yearInReviewTimeline: "2025 – 2026",
    yearInReviewTagline: "Built VidTube, EcoSphere (Odoo Finalist), achieved LeetCode Knight 1853, solved 800+ DSA problems, and 5th in Crackathon IIT Bombay.",
    yearInReviewImages: [process.env.PUBLIC_URL + "/images/year-2025.webp"],
    yearInReviewURLs: ["https://github.com/ADITYASHUKLA189"],
    yearInReviewParagraphs: [
      "Built VidTube (scalable video streaming backend load-tested with k6), EcoSphere (Odoo Hackathon 2026 Finalist ESG platform with Prisma & PostgreSQL), and URL Shortener with Redis analytics.",
      "Achieved LeetCode Knight badge with an 1853 peak contest rating, 800+ problems solved, Codeforces Pupil, and 5th place in Crackathon at IIT Bombay."
    ],
    likesCount: 0,
  },
];

const normalizeYearInReview = (yearInReview) => ({
  ...yearInReview,
  yearInReviewTagline:
    yearInReview?.yearInReviewTagline ||
    "Built VidTube & EcoSphere, achieved LeetCode Knight 1853, and solved 800+ DSA problems in C++.",
  yearInReviewParagraphs:
    yearInReview?.yearInReviewParagraphs || [
      "Built VidTube (scalable video streaming backend), EcoSphere (Odoo Hackathon 2026 Finalist), and URL Shortener with Redis.",
      "Reached 1853 LeetCode Knight rating with 800+ DSA problems solved in C++. Third-year B.Tech IT at IIIT-Bhubaneswar.",
    ],
});

// Fetch all Year In Reviews
export const fetchYearInReviews = async () => {
  try {
    const response = await axios.get(`${API_URL}/getyearinreviews`, { timeout: 3500 });
    return response.data.map(normalizeYearInReview);
  } catch (error) {
    console.error("Error fetching Year In Reviews, using fallback data:", error);
    return FALLBACK_YEAR_IN_REVIEWS.map(normalizeYearInReview);
  }
};
