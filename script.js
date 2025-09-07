document.getElementById("loginForm").addEventListener("submit", async function(e) {
e.preventDefault();

const username = document.getElementById("username").value.trim();
const password = document.getElementById("password").value.trim();
const errorEl = document.getElementById("error");

// Get a reference to the Firebase database
const database = firebase.database();
const usersRef = database.ref('User/Users');

try {
// Use a query to fetch only the user with the matching username
const snapshot = await usersRef.orderByChild('username').equalTo(username).once('value');
const users = snapshot.val();

 // Check if a user was found and then verify the password
 if (users) {
 // Find the key of the matching user (there should only be one)
 const userKey = Object.keys(users)[0];
 const user = users[userKey];

 if (user.password === password) {
 const loginTime = new Date().toLocaleString("th-TH");

 // Store data in localStorage
 localStorage.setItem("name", user.name);
 localStorage.setItem("rank", user.rank);
 localStorage.setItem("username", user.username);
 localStorage.setItem("loginTime", loginTime);

 // Redirect to dashboard
 window.location.href = "dashboard.html";
 } else {
 errorEl.textContent = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง ❌";
 errorEl.style.color = "red";
 }
} else {
 errorEl.textContent = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง ❌";
 errorEl.style.color = "red";
 }

} catch(err) {
 errorEl.textContent = "เกิดข้อผิดพลาดในการดึงข้อมูลจาก Firebase ❌";
 console.error("Firebase fetch error:", err);
 }
});