const passwordDisplay = document.getElementById("passwordDisplay");
const copyBtn = document.getElementById("copyBtn");
const lengthSlider = document.getElementById("lengthSlider");
const lengthValue = document.getElementById("lengthValue");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const generateBtn = document.getElementById("generateBtn");
const message = document.getElementById("message");
const strengthText = document.getElementById("strengthText");
const strengthBar = document.getElementById("strengthBar");

const charSets = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  nums: "0123456789",
  syms: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function setMessage(text, type = "") {
  message.textContent = text;
  message.className = "message";
  if (type) {
    message.classList.add(type);
  }
}

function updateLengthLabel() {
  lengthValue.textContent = lengthSlider.value;
}

function getSelectedCharacters() {
  let pool = "";
  if (uppercase.checked) pool += charSets.upper;
  if (lowercase.checked) pool += charSets.lower;
  if (numbers.checked) pool += charSets.nums;
  if (symbols.checked) pool += charSets.syms;
  return pool;
}

function getRandomChar(chars) {
  const index = Math.floor(Math.random() * chars.length);
  return chars[index];
}

function shuffleString(text) {
  const arr = text.split("");
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
}

function calculateStrength(password, selectedTypes, length) {
  // Password strength calculation:
  // score increases with length and character variety.
  let score = 0;
  if (length >= 12) score += 2;
  else if (length >= 8) score += 1;
  score += selectedTypes;

  if (!password) return { label: "Not generated", className: "strength-none" };
  if (score <= 3) return { label: "Weak", className: "strength-weak" };
  if (score <= 5) return { label: "Medium", className: "strength-medium" };
  return { label: "Strong", className: "strength-strong" };
}

function renderStrength(password, selectedTypes, length) {
  const strength = calculateStrength(password, selectedTypes, length);
  strengthText.textContent = strength.label;
  strengthBar.className = `strength-bar ${strength.className}`;
}

function generatePassword() {
  try {
    const length = Number(lengthSlider.value);
    const selectedTypes = [uppercase, lowercase, numbers, symbols].filter((el) => el.checked).length;

    // Validation and error handling:
    // Ensure at least one checkbox is selected before generation.
    if (selectedTypes === 0) {
      setMessage("Please select at least one character type.", "error");
      passwordDisplay.value = "";
      renderStrength("", 0, length);
      return;
    }

    // Warning for short lengths; generation still proceeds.
    if (length < 8) {
      setMessage("Password length should be at least 8 for better security.", "warning");
    } else {
      setMessage("");
    }

    // Password generation logic:
    // Build a pool from selected character sets, ensure each selected type
    // appears at least once, then fill the remaining length randomly.
    const selectedPools = [];
    if (uppercase.checked) selectedPools.push(charSets.upper);
    if (lowercase.checked) selectedPools.push(charSets.lower);
    if (numbers.checked) selectedPools.push(charSets.nums);
    if (symbols.checked) selectedPools.push(charSets.syms);

    const pool = getSelectedCharacters();
    let password = "";

    selectedPools.forEach((set) => {
      password += getRandomChar(set);
    });

    for (let i = password.length; i < length; i += 1) {
      password += getRandomChar(pool);
    }

    password = shuffleString(password);
    passwordDisplay.value = password;
    renderStrength(password, selectedTypes, length);
  } catch (error) {
    // Prevent crashes if something unexpected happens and show a user-friendly message.
    console.error("Password generation error:", error);
    setMessage("Something went wrong while generating the password. Please try again.", "error");
  }
}

async function copyPassword() {
  try {
    if (!passwordDisplay.value) {
      setMessage("No password to copy.", "error");
      return;
    }
    await navigator.clipboard.writeText(passwordDisplay.value);
    setMessage("Password copied to clipboard.", "success");
  } catch (error) {
    console.error("Clipboard copy error:", error);
    setMessage("Unable to copy password. Please copy it manually.", "error");
  }
}

lengthSlider.addEventListener("input", updateLengthLabel);
generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyPassword);

updateLengthLabel();
renderStrength("", 0, Number(lengthSlider.value));
