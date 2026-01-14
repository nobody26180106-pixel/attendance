// Auto-login check
if (localStorage.getItem("loggedInUser")) {
  showApp();
}

function signup() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if (!user || !pass) {
    alert("Fill all fields");
    return;
  }

  localStorage.setItem(user, pass);
  alert("Signup successful! Now login.");
}

function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if (localStorage.getItem(user) === pass) {
    localStorage.setItem("loggedInUser", user);
    showApp();
  } else {
    alert("Invalid credentials");
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  location.reload();
}

function showApp() {
  document.getElementById("authBox").classList.add("hidden");
  document.getElementById("appBox").classList.remove("hidden");
}

function calculate() {
  let total = parseInt(document.getElementById("total").value);
  let attended = parseInt(document.getElementById("attended").value);
  let required = parseInt(document.getElementById("required").value);

  if (attended > total || total <= 0) {
    alert("Invalid input");
    return;
  }

  let percentage = ((attended / total) * 100).toFixed(2);
  let result = document.getElementById("result");

  let status, color;
  if (percentage >= required + 5) {
    status = "🟢 Safe";
    color = "#c6f6d5";
  } else if (percentage >= required) {
    status = "🟡 Warning";
    color = "#fefcbf";
  } else {
    status = "🔴 Danger";
    color = "#fed7d7";
  }

  let x = 0;
  while ((attended / (total + x)) * 100 >= required) x++;
  x--;

  let y = 0;
  while (((attended + y) / (total + y)) * 100 < required) y++;

  result.style.background = color;
  result.innerHTML = `
    <b>Attendance:</b> ${percentage}%<br>
    <b>Status:</b> ${status}<br><br>
    ❌ Can miss <b>${x}</b> classes<br>
    ✅ Attend next <b>${y}</b> classes
  `;
}
