let countries = {
  Europe: [
    "Ireland",
    "Serbia",
    "Albania",
    "Spain",
    "Italy",
    "Ukraine",
    "Belarus",
    "Germany",
    "Russia",
    "France",
    "Poland",
    "Romania",
    "Netherlands",
    "Belgium",
    "Czechia",
    "Greece",
    "Portugal",
    "Hungary",
    "Austria",
    "Switzerland",
    "Bulgaria",
    "Slovakia",
    "Finland",
    "Croatia",
    "Moldova",
    "Bosnia and Herzegovina",
    "Lithuania",
    "Slovenia",
    "North Macedonia",
    "Latvia",
    "Estonia",
    "Luxembourg",
    "Montenegro",
    "Malta",
    "Iceland",
    "Andorra",
    "Liechtenstein",
    "Monaco",
    "San Marino",
  ],
  Africa: [
    "Nigeria",
    "Ethiopia",
    "Egypt",
    "Congo",
    "Tanzania",
    "South Africa",
    "Kenya",
    "Uganda",
    "Sudan",
    "Algeria",
    "Morocco",
    "Angola",
    "Ghana",
    "Mozambique",
    "Madagascar",
    "Ivory Coast",
    "Cameroon",
    "Niger",
    "Mali",
    "Burkina Faso",
    "Malawi",
    "Zambia",
    "Chad",
    "Somalia",
    "Senegal",
    "Zimbabwe",
    "Guinea",
    "Rwanda",
    "Benin",
    "Burundi",
    "Tunisia",
    "South Sudan",
    "Togo",
    "Sierra Leone",
    "Libya",
    "Central African Republic",
    "Liberia",
    "Mauritania",
    "Eritrea",
    "Gambia",
    "Botswana",
    "Namibia",
    "Gabon",
    "Lesotho",
    "Guinea-Bissau",
    "Equatorial Guinea",
    "Mauritius",
    "Eswatini",
    "Djibouti",
    "Comoros",
    "Cape Verde",
    "Seychelles",
  ],
  Asia: [
    "People's Republic of China",
    "India",
    "Kazakhstan",
    "Saudi Arabia",
    "Iran",
    "Mongolia",
    "Indonesia",
    "Pakistan",
    "Turkey",
    "Myanmar",
    "Afghanistan",
    "Yemen",
    "Thailand",
    "Turkmenistan",
    "Uzbekistan",
    "Iraq",
    "Japan",
    "Vietnam",
    "Malaysia",
    "Oman",
    "Philippines",
    "Laos",
    "Kyrgyzstan",
    "Syria",
    "Cambodia",
    "Bangladesh",
    "Nepal",
    "Tajikistan",
    "North Korea",
    "South Korea",
    "Jordan",
    "United Arab Emirates",
    "Azerbaijan",
    "Georgia",
    "Sri Lanka",
    "Bhutan",
    "Taiwan",
    "Armenia",
    "Israel",
    "Kuwait",
    "East Timor",
    "Qatar",
    "Lebanon",
    "Cyprus",
    "Palestine",
    "Brunei",
    "Hong Kong",
    "Bahrain",
    "Singapore",
    "Maldives",
  ],
  Americas: [
    "United States",
    "Brazil",
    "Mexico",
    "Colombia",
    "Argentina",
    "Canada",
    "Peru",
    "Venezuela",
    "Chile",
    "Ecuador",
    "Guatemala",
    "Bolivia",
    "Haiti",
    "Cuba",
    "Dominican Republic",
    "Honduras",
    "Paraguay",
    "El Salvador",
    "Nicaragua",
    "Costa Rica",
    "Panama",
    "Uruguay",
    "Jamaica",
    "Trinidad and Tobago",
    "Guyana",
    "Suriname",
    "Belize",
    "Bahamas",
    "Barbados",
    "Saint Lucia",
    "Grenada",
    "Saint Vincent and the Grenadines",
    "Antigua and Barbuda",
    "Dominica",
    "Saint Kitts and Nevis",
  ],
  Oceania: [
    "Australia",
    "Papua New Guinea",
    "New Zealand",
    "Fiji",
    "Solomon Islands",
    "Micronesia",
    "Vanuatu",
    "Samoa",
    "Kiribati",
    "Tonga",
    "Palau",
    "Nauru",
    "Tuvalu",
  ],
};

const randomIndex = Math.floor(Math.random() * countries.length);
const guessText = document.querySelector(".guess-text");
const nextButton = document.querySelector(".next-btn");
const scoreName = document.querySelector(".score");
const score = document.querySelector(".score-value");
const highScore = document.querySelector(".score-highest");
const highScoreText = document.querySelector(".score-high-text");
const europeButton = document.getElementById("europe-button");
const africaButton = document.getElementById("africa-button");
const asiaButton = document.getElementById("asia-button");
const americasButton = document.getElementById("americas-button");
const oceaniaButton = document.getElementById("oceania-button");
const flagImage = document.querySelector(".flag-image");
const homeScreenButton = document.querySelector(".homescreen-btn");
const skipButton = document.querySelector(".skip-btn");

let europeSelected = false;
let africaSelected = false;
let asiaSelected = false;
let americasSelected = false;
let oceaniaSelected = false;
let countryName;
let guessedCountries = [];

// Function to fetch flag by country name
async function fetchFlagByCountryName(countryName) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    console.log("Response status:", response.status);
    const data = await response.json();
    console.log("Data received:", data);

    if (response.ok && data.length > 0) {
      let countryData;

      // Convert to lowercase for case-insensitive comparison
      const lowerCaseCountryName = countryName.toLowerCase();

      // Handle special cases
      if (lowerCaseCountryName === "netherlands") {
        // Find the Netherlands in Europe
        countryData = data.find((country) => country.region === "Europe");
      } else if (lowerCaseCountryName === "guinea") {
        countryData = data.find((country) => country.region === "Africa");
      } else if (lowerCaseCountryName === "east timor") {
        countryData = data.find(
          (country) => country.name.common.toLowerCase() === "timor-leste"
        );
      } else if (lowerCaseCountryName === "congo") {
        countryData = data.find(
          (country) =>
            country.name.common.toLowerCase() === "republic of the congo"
        );
      } else {
        // Default to finding the exact match for the country name
        countryData = data.find(
          (country) =>
            country.name.common.toLowerCase() === lowerCaseCountryName ||
            country.name.official.toLowerCase() === lowerCaseCountryName
        );
      }

      if (countryData) {
        const flagUrl = countryData.flags.svg;
        return flagUrl;
      } else {
        throw new Error("Country not found in the specified region");
      }
    } else {
      throw new Error("Country not found");
    }
  } catch (error) {
    console.error("Error fetching flag for:", countryName, error);
    return null;
  }
}
// Function to update flag image
function updateFlagImage(flagUrl) {
  const flagImage = document.querySelector(".flag-image");
  flagImage.src = flagUrl;
}

function getRandomCountry(continent) {
  if (continent in countries) {
    const countryArray = countries[continent];
    const randomIndex = Math.floor(Math.random() * countryArray.length);
    return countryArray[randomIndex];
  } else {
    console.error(`Continent ${continent} not found`);
    return null;
  }
}

function updateCounter() {
  let num = parseInt(score.innerHTML);
  num++;
  score.innerHTML = num;
}

// Function to get and set the highest score
function getHighestScore() {
  let currentHighScore;
  let highScoreKey;

  if (europeSelected) {
    highScoreKey = "highScoreEurope";
  } else if (africaSelected) {
    highScoreKey = "highScoreAfrica";
  } else if (asiaSelected) {
    highScoreKey = "highScoreAsia";
  } else if (americasSelected) {
    highScoreKey = "highScoreAmericas";
  } else if (oceaniaSelected) {
    highScoreKey = "highScoreOceania";
  }

  // Get the current high score from local storage
  currentHighScore = localStorage.getItem(highScoreKey);

  // If there's no high score yet or the new score is higher than the current high score
  if (
    currentHighScore === null ||
    parseInt(score.innerHTML) > parseInt(currentHighScore)
  ) {
    // Set the new high score in local storage
    localStorage.setItem(highScoreKey, parseInt(score.innerHTML));
    // Update the highScore element
    document.querySelector(".score-highest").textContent = parseInt(
      score.innerHTML
    );
  } else {
    // If the new score is not a high score, just display the current high score
    document.querySelector(".score-highest").textContent =
      parseInt(currentHighScore);
  }
}

// Function to initialize the high score display
function initializeHighScore() {
  // Get the current high score from local storage
  let currentHighScore;
  let highScoreKey;

  if (europeSelected) {
    highScoreKey = "highScoreEurope";
  } else if (africaSelected) {
    highScoreKey = "highScoreAfrica";
  } else if (asiaSelected) {
    highScoreKey = "highScoreAsia";
  } else if (americasSelected) {
    highScoreKey = "highScoreAmericas";
  } else if (oceaniaSelected) {
    highScoreKey = "highScoreOceania";
  }

  currentHighScore = localStorage.getItem(highScoreKey);
  currentHighScore = currentHighScore ? parseInt(currentHighScore, 10) : 0;

  // Update the high score element
  document.querySelector(".score-highest").textContent = currentHighScore;
}

function classToggle() {
  flagImage.classList.remove("hidden");
  europeButton.classList.add("hidden");
  africaButton.classList.add("hidden");
  asiaButton.classList.add("hidden");
  americasButton.classList.add("hidden");
  oceaniaButton.classList.add("hidden");
  guessText.classList.remove("hidden");
  scoreName.classList.remove("hidden");
  score.classList.remove("hidden");
  highScore.classList.remove("hidden");
  highScoreText.classList.remove("hidden");
  nextButton.classList.remove("hidden");
  homeScreenButton.classList.remove("hidden");
  skipButton.classList.remove("hidden");
}

function classToggleHomeScreenButton() {
  flagImage.classList.add("hidden");
  europeButton.classList.remove("hidden");
  africaButton.classList.remove("hidden");
  asiaButton.classList.remove("hidden");
  americasButton.classList.remove("hidden");
  oceaniaButton.classList.remove("hidden");
  guessText.classList.add("hidden");
  scoreName.classList.add("hidden");
  highScore.classList.add("hidden");
  highScoreText.classList.add("hidden");
  score.classList.add("hidden");
  nextButton.classList.add("hidden");
  homeScreenButton.classList.add("hidden");
  skipButton.classList.add("hidden");

  score.innerHTML = 0;
  guessText.value = "";

  guessedCountries = [];

  europeSelected = false;
  africaSelected = false;
  asiaSelected = false;
  americasSelected = false;
  oceaniaSelected = false;
}

window.addEventListener("load", initializeHighScore);

europeButton.addEventListener("click", function () {
  classToggle();

  europeSelected = true;
  initializeHighScore();
  countryName = getRandomCountry("Europe");

  fetchFlagByCountryName(countryName)
    .then((flagUrl) => {
      if (flagUrl) {
        updateFlagImage(flagUrl);
      }
    })
    .catch((err) => {
      console.error("Error:", err);
    });
});

africaButton.addEventListener("click", function () {
  classToggle();

  africaSelected = true;
  initializeHighScore();
  countryName = getRandomCountry("Africa");

  fetchFlagByCountryName(countryName)
    .then((flagUrl) => {
      if (flagUrl) {
        updateFlagImage(flagUrl);
      }
    })
    .catch((err) => {
      console.error("Error:", err);
    });
});

asiaButton.addEventListener("click", function () {
  classToggle();

  asiaSelected = true;
  initializeHighScore();
  countryName = getRandomCountry("Asia");

  fetchFlagByCountryName(countryName)
    .then((flagUrl) => {
      if (flagUrl) {
        updateFlagImage(flagUrl);
      }
    })
    .catch((err) => {
      console.error("Error:", err);
    });
});

americasButton.addEventListener("click", function () {
  classToggle();

  americasSelected = true;
  initializeHighScore();
  countryName = getRandomCountry("Americas");

  fetchFlagByCountryName(countryName)
    .then((flagUrl) => {
      if (flagUrl) {
        updateFlagImage(flagUrl);
      }
    })
    .catch((err) => {
      console.error("Error:", err);
    });
});

oceaniaButton.addEventListener("click", function () {
  classToggle();

  oceaniaSelected = true;
  initializeHighScore();
  countryName = getRandomCountry("Oceania");

  fetchFlagByCountryName(countryName)
    .then((flagUrl) => {
      if (flagUrl) {
        updateFlagImage(flagUrl);
      }
    })
    .catch((err) => {
      console.error("Error:", err);
    });
});

// Click event listener for home screen button
homeScreenButton.addEventListener("click", handleHomeScreenButtonClick);

function handleHomeScreenButtonClick() {
  countries = {
    Europe: [
      "Ireland",
      "Serbia",
      "Albania",
      "Spain",
      "Italy",
      "Ukraine",
      "Belarus",
      "Germany",
      "Russia",
      "France",
      "Poland",
      "Romania",
      "Netherlands",
      "Belgium",
      "Sweden",
      "Czechia",
      "Greece",
      "Portugal",
      "Hungary",
      "Austria",
      "Switzerland",
      "Bulgaria",
      "Slovakia",
      "Finland",
      "Croatia",
      "Moldova",
      "Bosnia and Herzegovina",
      "Lithuania",
      "Slovenia",
      "North Macedonia",
      "Latvia",
      "Estonia",
      "Luxembourg",
      "Montenegro",
      "Malta",
      "Iceland",
      "Andorra",
      "Liechtenstein",
      "Monaco",
      "San Marino",
    ],
    Africa: [
      "Nigeria",
      "Ethiopia",
      "Egypt",
      "Congo",
      "Tanzania",
      "South Africa",
      "Kenya",
      "Uganda",
      "Sudan",
      "Algeria",
      "Morocco",
      "Angola",
      "Ghana",
      "Mozambique",
      "Madagascar",
      "Ivory Coast",
      "Cameroon",
      "Niger",
      "Mali",
      "Burkina Faso",
      "Malawi",
      "Zambia",
      "Chad",
      "Somalia",
      "Senegal",
      "Zimbabwe",
      "Guinea",
      "Rwanda",
      "Benin",
      "Burundi",
      "Tunisia",
      "South Sudan",
      "Togo",
      "Sierra Leone",
      "Libya",
      "Central African Republic",
      "Liberia",
      "Mauritania",
      "Eritrea",
      "Gambia",
      "Botswana",
      "Namibia",
      "Gabon",
      "Lesotho",
      "Guinea-Bissau",
      "Equatorial Guinea",
      "Mauritius",
      "Eswatini",
      "Djibouti",
      "Comoros",
      "Cape Verde",
      "Seychelles",
    ],
    Asia: [
      "China",
      "India",
      "Kazakhstan",
      "Saudi Arabia",
      "Iran",
      "Mongolia",
      "Indonesia",
      "Pakistan",
      "Turkey",
      "Myanmar",
      "Afghanistan",
      "Yemen",
      "Thailand",
      "Turkmenistan",
      "Uzbekistan",
      "Iraq",
      "Japan",
      "Vietnam",
      "Malaysia",
      "Oman",
      "Philippines",
      "Laos",
      "Kyrgyzstan",
      "Syria",
      "Cambodia",
      "Bangladesh",
      "Nepal",
      "Tajikistan",
      "North Korea",
      "South Korea",
      "Jordan",
      "United Arab Emirates",
      "Azerbaijan",
      "Georgia",
      "Sri Lanka",
      "Bhutan",
      "Taiwan",
      "Armenia",
      "Israel",
      "Kuwait",
      "East Timor",
      "Qatar",
      "Lebanon",
      "Cyprus",
      "Palestine",
      "Brunei",
      "Hong Kong",
      "Bahrain",
      "Singapore",
      "Maldives",
    ],
    Americas: [
      "United States",
      "Brazil",
      "Mexico",
      "Colombia",
      "Argentina",
      "Canada",
      "Peru",
      "Venezuela",
      "Chile",
      "Ecuador",
      "Guatemala",
      "Bolivia",
      "Haiti",
      "Cuba",
      "Dominican Republic",
      "Honduras",
      "Paraguay",
      "El Salvador",
      "Nicaragua",
      "Costa Rica",
      "Panama",
      "Uruguay",
      "Jamaica",
      "Trinidad and Tobago",
      "Guyana",
      "Suriname",
      "Belize",
      "Bahamas",
      "Barbados",
      "Saint Lucia",
      "Grenada",
      "Saint Vincent and the Grenadines",
      "Antigua and Barbuda",
      "Dominica",
      "Saint Kitts and Nevis",
    ],
    Oceania: [
      "Australia",
      "Papua New Guinea",
      "New Zealand",
      "Fiji",
      "Solomon Islands",
      "Micronesia",
      "Vanuatu",
      "Samoa",
      "Kiribati",
      "Tonga",
      "Palau",
      "Nauru",
      "Tuvalu",
    ],
  };

  classToggleHomeScreenButton();
  highScore.innerHTML = 0;
}

// Add click event listener to nextButton
nextButton.addEventListener("click", handleNextButtonClick);

// Add keydown event listener to guessText (for Enter key)
guessText.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    handleNextButtonClick();
  }
});

// Function to handle click event on nextButton or Enter key press on guessText
function handleNextButtonClick() {
  const guessedCountryName = guessText.value.trim().toLowerCase();
  const correctCountryName = countryName.toLowerCase();

  if (guessedCountryName === correctCountryName) {
    updateCounter(); // Update counter for correct guess

    guessedCountries.push(countryName);

    // Generate new country name and fetch flag
    if (europeSelected === true) {
      guessedCountries.forEach((country) => {
        const index = countries.Europe.indexOf(country);
        if (index !== -1) {
          countries.Europe.splice(index, 1);
        }
      });
      countryName = getRandomCountry("Europe");
    }

    if (africaSelected === true) {
      guessedCountries.forEach((country) => {
        const index = countries.Africa.indexOf(country);
        if (index !== -1) {
          countries.Africa.splice(index, 1);
        }
      });
      countryName = getRandomCountry("Africa");
    }

    if (asiaSelected === true) {
      guessedCountries.forEach((country) => {
        const index = countries.Asia.indexOf(country);
        if (index !== -1) {
          countries.Asia.splice(index, 1);
        }
      });
      countryName = getRandomCountry("Asia");
    }

    if (americasSelected === true) {
      guessedCountries.forEach((country) => {
        const index = countries.Americas.indexOf(country);
        if (index !== -1) {
          countries.Americas.splice(index, 1);
        }
      });
      countryName = getRandomCountry("Americas");
    }

    if (oceaniaSelected === true) {
      guessedCountries.forEach((country) => {
        const index = countries.Oceania.indexOf(country);
        if (index !== -1) {
          countries.Oceania.splice(index, 1);
        }
      });
      countryName = getRandomCountry("Oceania");
    }

    if (
      (oceaniaSelected === true && guessedCountries.length < 13) ||
      (europeSelected === true && guessedCountries.length < 40) ||
      (africaSelected === true && guessedCountries.length < 52) ||
      (asiaSelected === true && guessedCountries.length < 50) ||
      (americasSelected === true && guessedCountries.length < 35)
    ) {
      fetchFlagByCountryName(countryName)
        .then((flagUrl) => {
          if (flagUrl) {
            updateFlagImage(flagUrl); // Update flag image
          }
        })
        .catch((err) => {
          console.error("Error fetching flag:", err);
        });
    } else {
      getHighestScore();
      guessedCountries = [];
      guessText.classList.add("hidden");
      nextButton.classList.add("hidden");
      skipButton.classList.add("hidden");
    }

    guessText.value = ""; // Clear input field after correct guess
  }
}

function handleSkipButtonClick() {
  guessedCountries.push(countryName); // Add the current country to guessedCountries

  // Remove the guessed country from the continent array
  if (europeSelected) {
    const index = countries.Europe.indexOf(countryName);
    if (index !== -1) {
      countries.Europe.splice(index, 1);
    }
    // Generate a new country
    if (countries.Europe.length > 0) {
      countryName = getRandomCountry("Europe");
    }
  }

  if (africaSelected) {
    const index = countries.Africa.indexOf(countryName);
    if (index !== -1) {
      countries.Africa.splice(index, 1);
    }
    if (countries.Africa.length > 0) {
      countryName = getRandomCountry("Africa");
    }
  }

  if (asiaSelected) {
    const index = countries.Asia.indexOf(countryName);
    if (index !== -1) {
      countries.Asia.splice(index, 1);
    }
    if (countries.Asia.length > 0) {
      countryName = getRandomCountry("Asia");
    }
  }

  if (americasSelected) {
    const index = countries.Americas.indexOf(countryName);
    if (index !== -1) {
      countries.Americas.splice(index, 1);
    }
    if (countries.Americas.length > 0) {
      countryName = getRandomCountry("Americas");
    }
  }

  if (oceaniaSelected) {
    const index = countries.Oceania.indexOf(countryName);
    if (index !== -1) {
      countries.Oceania.splice(index, 1);
    }
    if (countries.Oceania.length > 0) {
      countryName = getRandomCountry("Oceania");
    }
  }

  if (
    (oceaniaSelected && guessedCountries.length < 13) ||
    (europeSelected && guessedCountries.length < 40) ||
    (africaSelected && guessedCountries.length < 52) ||
    (asiaSelected && guessedCountries.length < 50) ||
    (americasSelected && guessedCountries.length < 35)
  ) {
    fetchFlagByCountryName(countryName)
      .then((flagUrl) => {
        if (flagUrl) {
          updateFlagImage(flagUrl); // Update flag image
        }
      })
      .catch((err) => {
        console.error("Error fetching flag:", err);
      });
  } else {
    getHighestScore();
    guessedCountries = [];
    guessText.classList.add("hidden");
    nextButton.classList.add("hidden");
    skipButton.classList.add("hidden");
  }

  guessText.value = "";
}

skipButton.addEventListener("click", handleSkipButtonClick);
