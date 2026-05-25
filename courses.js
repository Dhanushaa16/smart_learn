// ✅ Course Lessons
const courseLessons = {
  web: ["Introduction to Web Development","HTML Basics","CSS Styling","JavaScript Fundamentals","Mini Web Project"],
  python: ["Introduction to Python","Variables & Data Types","Conditional Statements","Loops & Functions","Python Mini Project"],
  datascience: ["Data Science Overview","Python for Data Science","Pandas & NumPy","Data Visualization","Case Study"],
  ml: ["Introduction to Machine Learning","Supervised Learning","Unsupervised Learning","Model Evaluation","ML Project"],
  ai: ["Introduction to AI","Search Algorithms","Knowledge Representation","Expert Systems","AI Applications"],
  cloud: ["Cloud Computing Basics","Service Models","Virtualization","Cloud Security","Deployment Models"],
  cyber: ["Cyber Security Basics","Types of Attacks","Network Security","Cryptography","Ethical Hacking Basics"],
  dbms: ["Database Concepts","ER Diagrams","SQL Basics","Normalization","Mini DB Project"],
  java: ["Java Introduction","OOP Concepts","Exception Handling","Collections Framework","Java Project"],
  dm: ["Digital Marketing Overview","SEO Fundamentals","Social Media Marketing","Google Ads Basics","Analytics & Reporting"]
};

// ✅ Course Titles
const courseTitles = {
  web: "Web Development",
  python: "Python",
  datascience: "Data Science",
  ml: "Machine Learning",
  ai: "Artificial Intelligence",
  cloud: "Cloud Computing",
  cyber: "Cyber Security",
  dbms: "DBMS",
  java: "Java Programming",
  dm: "Digital Marketing"
};

// ✅ Convert to ARRAY (IMPORTANT)
const courses = Object.keys(courseTitles).map((key, index) => ({
  id: index + 1,
  key: key,
  title: courseTitles[key],
  description: courseLessons[key][0], // first lesson as preview
  lessons: courseLessons[key]
}));