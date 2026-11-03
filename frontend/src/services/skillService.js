import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URI}`;

const FALLBACK_SKILLS = [
  {
    title: "Backend & Cloud Architecture",
    description: "Node.js, Express.js, FastAPI (Python), REST APIs, JWT, RBAC, Zod, Redis, PostgreSQL, Prisma, Docker, k6",
    skills: [
      { name: "Node.js", logo: "nodejs", proficiency: "proficient" },
      { name: "Express.js", logo: "express", proficiency: "proficient" },
      { name: "PostgreSQL", logo: "sql", proficiency: "proficient" },
      { name: "MongoDB", logo: "mongodb", proficiency: "proficient" },
      { name: "Redis", logo: "python", proficiency: "intermediate" },
      { name: "Docker", logo: "nodejs", proficiency: "intermediate" },
    ],
  },
  {
    title: "Core CS & Competitive Programming",
    description: "Computer Networks, Operating Systems, System Design, DBMS, OOP, 800+ DSA in C++ (LeetCode Knight 1853)",
    skills: [
      { name: "C++", logo: "cpp", proficiency: "proficient" },
      { name: "Python", logo: "python", proficiency: "proficient" },
      { name: "Java", logo: "java", proficiency: "intermediate" },
      { name: "SQL", logo: "sql", proficiency: "proficient" },
      { name: "Linux", logo: "linux", proficiency: "proficient" },
      { name: "Git", logo: "git", proficiency: "proficient" },
    ],
  },
  {
    title: "Front-end & UI Engineering",
    description: "React.js, Tailwind CSS, JavaScript, HTML, CSS, Framer Motion, Responsive Architecture",
    skills: [
      { name: "React", logo: "react", proficiency: "proficient" },
      { name: "JavaScript", logo: "javascript", proficiency: "proficient" },
      { name: "Tailwind CSS", logo: "css", proficiency: "proficient" },
      { name: "CSS", logo: "css", proficiency: "proficient" },
    ],
  },
];

// Fetch all skills
export const fetchSkills = async () => {
  try {
    const response = await axios.get(`${API_URL}/getskills`, { timeout: 3500 });
    return response.data;
  } catch (error) {
    console.error("Error fetching skills, using fallback data:", error);
    return FALLBACK_SKILLS;
  }
};
