const cookieImg = document.getElementById("cookie-image");
const cookieDisplay = document.getElementById("cookie-display");
const cpsDisplay = document.getElementById("cps-display");
const upgradesContainer = document.getElementById("upgrades-container");
const resetBtn = document.getElementById("reset-btn");
const customAlert = document.getElementById("alert");
const closeAlertBtn = document.getElementById("close-alert");
const textAlert = document.getElementById("alert-text")

const clickSound = new Audio('./sound/crunch.mp3');

//Game stats
let cookies = parseInt(localStorage.getItem("cookies")) || 0;
let cps = parseInt(localStorage.getItem("cps")) || 0;

//Display cookie values
cookieDisplay.textContent = cookies;
cpsDisplay.textContent = cps;

//Game logic
//every 1sec increase cookies by CPS
setInterval(function () {
  cookies = cookies + cps;
  cookieDisplay.textContent = cookies;
  localStorage.setItem("cookies", cookies);
}, 1000);

//get cookie when i click the button
cookieImg.addEventListener("click", function() {
  console.log("Cookie image clicked!");
  cookies = cookies + 1;
  cookieDisplay.textContent = cookies;
  localStorage.setItem("cookies", cookies);

  clickSound.play();
});

//fetching upgrades from API
async function fetchUpgrades() {
    const response = await fetch('https://cookie-upgrade-api.vercel.app/api/upgrades');
    const upgrades = await response.json();
    displayUpgrades(upgrades);
}

//show upgrades function
function displayUpgrades(upgrades) {
  upgrades.forEach(upgrade => {
    const upgradeBtn = document.createElement("button");
    upgradeBtn.textContent = `${upgrade.name} (Cost: ${upgrade.cost}) +${upgrade.increase} CPS`;

    upgradeBtn.addEventListener("click", function () {
      purchaseUpgrade(upgrade);
    });
    upgradesContainer.appendChild(upgradeBtn);
  });
}

//alert function
function showAlert(message, isSuccess) {
  textAlert.textContent = message;
if (isSuccess) {
  customAlert.style.backgroundColor = "green";
} else {
  customAlert.style.backgroundColor = "red";
}
  customAlert.classList.remove("hidden");
}

closeAlertBtn.addEventListener("click", function(){
  customAlert.classList.add("hidden");
})

//buying upgrades function
function purchaseUpgrade(upgrade) {
  if (cookies >= upgrade.cost) {
    cookies = cookies - upgrade.cost;
    cps = cps + upgrade.increase;
    updateDisplay();
    localStorage.setItem("cps", cps);
    localStorage.setItem("cookies", cookies);
    showAlert("You bought the " + upgrade.name + " upgrade!", true);
  } else {
    showAlert("You don't have enough cookies!", false);
  }
}

//update display function
function updateDisplay() {
  cookieDisplay.textContent = cookies;
  cpsDisplay.textContent = cps;
}

// Call the fetchUpgrades function on page load
fetchUpgrades();

//Resets all game stats to 0
resetBtn.addEventListener("click", function() {
  console.log("Reset button Clicked!");
  cookies = 0;
  cps = 0;

  cookieDisplay.textContent = cookies;
  cpsDisplay.textContent = cps;

  localStorage.removeItem("cookies");
  localStorage.removeItem("cps");
})