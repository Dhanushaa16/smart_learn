
AWS.config.update({
  region: "us-east-1",
 accessKeyId: "ACCESS_KEY",
secretAccessKey: "SECRET_KEY"
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
// =========================
// 📚 ALL COURSES
// =========================
const ALL_COURSES = [
  { id: "web", name: "Web Development", desc: "HTML, CSS, JavaScript" },
  { id: "python", name: "Python Programming", desc: "Beginner to Advanced" },
  { id: "datascience", name: "Data Science", desc: "Analysis & Visualization" },
  { id: "ml", name: "Machine Learning", desc: "Models & Algorithms" },
  { id: "ai", name: "Artificial Intelligence", desc: "Smart Systems" },
  { id: "cloud", name: "Cloud Computing", desc: "AWS & Azure" },
  { id: "cyber", name: "Cyber Security", desc: "Ethical Hacking" },
  { id: "dbms", name: "DBMS", desc: "SQL & Databases" },
  { id: "java", name: "Java Programming", desc: "OOP & Projects" },
  { id: "dm", name: "Digital Marketing", desc: "SEO & Ads" }
];

const list = document.getElementById("courseList");


// =========================
// 📦 LOCAL STORAGE HELPERS
// =========================
function getEnrolled() {
  return JSON.parse(localStorage.getItem("enrolledCourses")) || [];
}

function saveEnrolled(data) {
  localStorage.setItem("enrolledCourses", JSON.stringify(data));
}


// =========================
// ☁️ AWS USER FETCH (YOU MUST DEFINE THIS PROPERLY)
// =========================
function getCurrentUser(callback) {
  // Example (replace with your real login logic)
  const userId = localStorage.getItem("userId");

 

  callback(userId);
}


// =========================
// 🚀 ENROLL COURSE (LOCAL + AWS)
// =========================
function enrollCourse(courseId) {

  let enrolled = getEnrolled();

  // Already enrolled check
  if (enrolled.some(c => c.id === courseId)) {
    alert("Already Enrolled");
    return;
  }

  const course = ALL_COURSES.find(c => c.id === courseId);

  // 1️⃣ Save locally (instant UI)
  enrolled.push(course);
  saveEnrolled(enrolled);
  renderCourses();

  // 2️⃣ Save to AWS (background)
  getCurrentUser((userId) => {

    dynamodb.update({
      TableName: "SmartLearnUsers",
      Key: { userId },
      UpdateExpression: "SET courses = list_append(if_not_exists(courses, :empty), :course)",
      ExpressionAttributeValues: {
        ":course": [course],
        ":empty": []
      }
    }, (err) => {

    

    });

  });

}


// =========================
// 🎨 RENDER COURSES
// =========================
function renderCourses() {

  const enrolled = getEnrolled();
  list.innerHTML = "";

  ALL_COURSES.forEach(course => {

    const isEnrolled = enrolled.some(c => c.id === course.id);

    const div = document.createElement("div");
    div.className = "course";

    div.innerHTML = `
      <h3>${course.name}</h3>
      <p>${course.desc}</p>
      <button onclick="enrollCourse('${course.id}')" ${isEnrolled ? "disabled" : ""}>
        ${isEnrolled ? "Enrolled" : "Enroll"}
      </button>
    `;

    list.appendChild(div);
  });

}


// =========================
// 🔄 SYNC FROM AWS (ON LOGIN)
// =========================
function syncFromAWS() {

  getCurrentUser((userId) => {

    dynamodb.get({
      TableName: "SmartLearnUsers",
      Key: { userId }
    }, (err, data) => {

      if (err) {
        console.error("Fetch error:", err);
        return;
      }

      const courses = data.Item?.courses || [];

      saveEnrolled(courses);
      renderCourses();

      console.log("Synced from AWS ✅");

    });

  });

}


// =========================
// 🔐 LOGIN BUTTON CHECK
// =========================
document.getElementById("goDashboardBtn").addEventListener("click", () => {

  const enrolled = getEnrolled();

  if (enrolled.length === 0) {
    alert("Please enroll at least one course");
    return;
  }

  window.location.href = "login.html";

});


// =========================
// ⚡ ON LOAD
// =========================
window.onload = function () {

  renderCourses();

  // OPTIONAL: Reset after 10 minutes
  setTimeout(function () {

    localStorage.removeItem("enrolledCourses");

    console.log("Enrollment reset");

    location.reload();

  }, 600000); // 10 min

};