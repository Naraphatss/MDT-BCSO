document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorEl = document.getElementById("error");

  // ตัวอย่าง user (จริงๆ ต้องดึงจาก database)
  const users = {
    "admin": { password: "1234", name: "สมชาย", rank: "ร.ต.อ.", officerId: "001" },
    "john": { password: "5678", name: "John Doe", rank: "ส.ต.ต.", officerId: "002" }
  };

  if(users[username] && users[username].password === password) {
    const user = users[username];
    const loginTime = new Date().toLocaleString("th-TH");

    // เก็บข้อมูลใน localStorage
    localStorage.setItem("name", user.name);
    localStorage.setItem("rank", user.rank);
    localStorage.setItem("officerId", user.officerId);
    localStorage.setItem("loginTime", loginTime);

    // ไปหน้า dashboard
    window.location.href = "dashboard.html";
  } else {
    errorEl.textContent = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง ❌";
  }
});
