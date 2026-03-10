import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URI}`;

const FALLBACK_YEAR_IN_REVIEWS = [
  {
    yearInReviewTitle: "2025 Year In Review",
    yearInReviewSubTitle: "A Year of Growth",
    yearInReviewTimeline: "2025",
    yearInReviewTagline: "Built EduArchive & Diagnostic Centre, reached LeetCode 1650+, and solved 400+ DSA problems in C++.",
    yearInReviewImages: [process.env.PUBLIC_URL + "/images/year-2025.webp"],
    yearInReviewURLs: ["https://github.com/ADITYASHUKLA189"],
    yearInReviewParagraphs: [
      "2025 was a breakthrough year — built EduArchive (academic resource platform), Diagnostic Centre management system, Weather App, Simon Says Game, and a 3D Interactive Portfolio.",
      "Reached 1650+ LeetCode rating and solved 400+ DSA problems in C++. Completed a Python Development Internship at SaiKet Systems. Started B.Tech IT at IIIT-Bhubaneswar."
    ],
    likesCount: 0,
  },
];

// Fetch all Year In Reviews
export const fetchYearInReviews = async () => {
  try {
    const response = await axios.get(`${API_URL}/getyearinreviews`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Year In Reviews, using fallback data:", error);
    return FALLBACK_YEAR_IN_REVIEWS;
  }
};
