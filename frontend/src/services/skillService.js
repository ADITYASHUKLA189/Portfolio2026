import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URI}`;

const FALLBACK_SKILLS = [
  {
    title: "Front-end Development",
    description: "Expert in HTML, CSS, JavaScript, React, crafting responsive, high-performance websites",
    skills: [
      { name: "JavaScript", logo: "javascript", proficiency: "proficient" },
      { name: "React", logo: "react", proficiency: "proficient" },
      { name: "CSS", logo: "css", proficiency: "proficient" },
      { name: "Angular", logo: "angular", proficiency: "beginner" },
    ],
  },
  {
    title: "Back-end & Full Stack (MERN)",
    description: "MongoDB, Express.js, React.js, Node.js, Python, FastAPI",
    skills: [
      { name: "Node.js", logo: "nodejs", proficiency: "proficient" },
      { name: "Express.js", logo: "express", proficiency: "intermediate" },
      { name: "MongoDB", logo: "mongodb", proficiency: "intermediate" },
      { name: "Python", logo: "python", proficiency: "intermediate" },
    ],
  },
  {
    title: "Competitive Programming",
    description: "Sharpening logic with data structures, algorithms, and optimizing code under pressure",
    skills: [
      { name: "C++", logo: "cpp", proficiency: "proficient" },
      { name: "SQL", logo: "sql", proficiency: "intermediate" },
    ],
  },
];

// Fetch all skills
export const fetchSkills = async () => {
  try {
    const response = await axios.get(`${API_URL}/getskills`);
    return response.data;
  } catch (error) {
    console.error("Error fetching skills, using fallback data:", error);
    return FALLBACK_SKILLS;
  }
};
