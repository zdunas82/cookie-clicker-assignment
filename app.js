const cookieBtn = document.getElementById("cookie-btn");
const cookieDisplay = document.getElementById("cookie-display");
const cpsDisplay = document.getElementById("cps-display");
const grandmaBtn = document.getElementById("grandma-button")

//Game State
let cookies = parseInt(localStorage.getItem("cookies")) || 0;
let cps = parseInt(localStorage.getItem("cps")) || 0;

//Display cookie values
cookieDisplay.textContent = cookies;
cpsDisplay.textContent = cps;

//Game logic
//every sec increase cookies by cps
setInterval(function () {
  cookies += cps;
  cookieDisplay.textContent = cookies;
  localStorage.setItem("cookies", cookies);  //to update local storage
}, 1000);

//get cookie when i click the button
cookieBtn.addEventListener("click", function() {
  console.log("cookieBTN clicked!");
  cookies += 1;
  //cookies = cookies + 1;
  cookieDisplay.textContent = cookies;
  localStorage.setItem("cookies", cookies); //updating local storage
});

//buying upgrades
grandmaBtn.addEventListener("click", function() {
  if (cookies >= 10) {
    cps = cps + 1;
    cookies = cookies - 10;
    cookieDisplay.textContent = cookies;
    cpsDisplay.textContent = cps;
    localStorage.setItem("cookies", cookies);
    localStorage.setItem("cps", cps);
  }
});