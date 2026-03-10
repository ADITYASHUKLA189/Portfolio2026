import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URI}`;

const FALLBACK_SKILL_COMPONENTS = [
  {
    skillTitle: "Front-end",
    skillDescription: "HTML, CSS, JavaScript, React.js, Tailwind CSS, Angular, Vue",
    Labels: ["HTML", "CSS", "JavaScript", "React.js", "Tailwind CSS", "Angular"],
    Scores: [4.9, 4.8, 4.8, 4.7, 4.6, 4.2],
  },
  {
    skillTitle: "Back-end",
    skillDescription: "Node.js, Express.js, Python, FastAPI, MongoDB, MySQL",
    Labels: ["Node.js", "Express.js", "Python", "FastAPI", "MongoDB", "MySQL"],
    Scores: [4.7, 4.6, 4.5, 4.4, 4.6, 4.4],
  },
  {
    skillTitle: "Competitive Programming",
    skillDescription: "C++ (STL), Algorithms, Data Structures",
    Labels: ["C++", "Algorithms", "Data Structures", "Problem Solving"],
    Scores: [4.9, 4.8, 4.8, 4.7],
  },
  {
    skillTitle: "Tools & Platforms",
    skillDescription: "Git, GitHub, Cloudinary, Vite, Docker",
    Labels: ["Git", "GitHub", "Cloudinary", "Vite"],
    Scores: [4.7, 4.8, 4.5, 4.6],
  },
];

// Fetch all skill components
export const fetchSkillsComponents = async () => {
  try {
    const response = await axios.get(`${API_URL}/getskillcomponents`);
    return response.data;
  } catch (error) {
    console.error("Error fetching skill components, using fallback data:", error);
    return FALLBACK_SKILL_COMPONENTS;
  }
};
