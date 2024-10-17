const cookieImg = document.getElementById("cookie-image");
const cookieDisplay = document.getElementById("cookie-display");
const cpsDisplay = document.getElementById("cps-display");
const upgradesContainer = document.getElementById("upgrades-container");
const clickSound = new Audio('./sounds/crunch.mp3');

//Game State
let cookies = parseInt(localStorage.getItem("cookies")) || 0;
let cps = parseInt(localStorage.getItem("cps")) || 0;

//Display cookie values
cookieDisplay.textContent = cookies;
cpsDisplay.textContent = cps;

//Game logic

//every sec increase cookies by CPS
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

  clickSound.play(); //play 
});


//fetching upgrades from API
async function fetchUpgrades() {
  try {
    const response = await fetch('https://cookie-upgrade-api.vercel.app/api/upgrades');
    const upgrades = await response.json();
    displayUpgrades(upgrades);
  } catch (error) {
    console.error("Error fetching upgrades", error);
  }
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

//buying upgrades function
function purchaseUpgrade(upgrade) {
  if (cookies >= upgrade.cost) {
    cookies = cookies - upgrade.cost;
    cps = cps + upgrade.increase;
    updateDisplay();
    localStorage.setItem("cps", cps);
    localStorage.setItem("cookies", cookies);
  } else {
    alert("Not Enough Cookies!");
  }
}

//update display function
function updateDisplay() {
  cookieDisplay.textContent = cookies;
  cpsDisplay.textContent = cps;
}

// Call the fetchUpgrades function on page load
fetchUpgrades();