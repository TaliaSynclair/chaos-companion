// [CC-JS-001] Chaos Companion MVP app logic

// [CC-JS-010] Data file paths
const DATA_PATHS = {
  companions: "data/companions.json",
  quests: "data/quests.json",
  chaos: "data/chaos.json"
};

// [CC-JS-020] App state
const appState = {
  companions: [],
  quests: [],
  chaos: []
};

// [CC-JS-030] DOM references
const companionButton = document.getElementById("companionButton");
const questButton = document.getElementById("questButton");
const chaosButton = document.getElementById("chaosButton");

const resultCard = document.getElementById("resultCard");
const resultTitle = document.getElementById("resultTitle");
const resultText = document.getElementById("resultText");
const resultMeta = document.getElementById("resultMeta");
const resultImage = document.getElementById("resultImage");

const resultLabel = document.querySelector(".result-label");

// [CC-JS-040] Fetch JSON helper
async function fetchJson(path) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Could not load ${path}`);
  }

  return response.json();
}

// [CC-JS-050] Pick one random item from an array
function pickRandom(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  const index = Math.floor(Math.random() * items.length);
  return items[index];
}

// [CC-JS-060] Show fallback error
function showError(message) {
  resultLabel.textContent = "Goblin Error";
  resultTitle.textContent = "Something went sideways.";
  resultText.textContent = message;
  resultMeta.textContent = "Check the JSON file paths and syntax.";
  resultImage.classList.add("hidden");
  resultImage.src = "";
  resultImage.alt = "";
}

// [CC-JS-070] Display companion result
function showCompanion() {
  const companion = pickRandom(appState.companions);

  if (!companion) {
    showError("No companions found.");
    return;
  }

  resultLabel.textContent = companion.rarity || "Companion";
  resultTitle.textContent = companion.name || "Unnamed Companion";
  resultText.textContent = companion.description || "This companion has chosen mystery.";
  resultMeta.textContent = companion.vibe || "";

  if (companion.image) {
    resultImage.src = companion.image;
    resultImage.alt = companion.name || "Chaos Companion duck";
    resultImage.classList.remove("hidden");
  } else {
    resultImage.classList.add("hidden");
    resultImage.src = "";
    resultImage.alt = "";
  }
}

// [CC-JS-080] Display quest result
function showQuest() {
  const quest = pickRandom(appState.quests);

  if (!quest) {
    showError("No quests found.");
    return;
  }

  resultLabel.textContent = quest.companionType || "Vacation Quest";
  resultTitle.textContent = "Your Tiny Mission:";
  resultText.textContent = quest.text;
  resultMeta.textContent = "Optional, harmless, and probably worth it.";

  // [CC-JS-081] Display quest companion image when available
  if (quest.image) {
    resultImage.src = quest.image;
    resultImage.alt = quest.companionType || "Quest companion";
    resultImage.classList.remove("hidden");
  } else {
    resultImage.classList.add("hidden");
    resultImage.src = "";
    resultImage.alt = "";
  }
}

// [CC-JS-090] Display chaos result
function showChaos() {
  const chaos = pickRandom(appState.chaos);

  if (!chaos) {
    showError("No chaos found.");
    return;
  }

  resultLabel.textContent = "Harmless Chaos";
  resultTitle.textContent = "The Goblin Demands:";
  resultText.textContent = chaos.text;
  resultMeta.textContent = "Compliance is optional.  Consequences may include stories.";

  // [CC-JS-091] Display chaos goblin image when available
  if (chaos.image) {
    resultImage.src = chaos.image;
    resultImage.alt = "Vacation chaos goblin";
    resultImage.classList.remove("hidden");
  } else {
    resultImage.classList.add("hidden");
    resultImage.src = "";
    resultImage.alt = "";
  }
}

// [CC-JS-100] Load all JSON data
async function loadData() {
  try {
    const [companions, quests, chaos] = await Promise.all([
      fetchJson(DATA_PATHS.companions),
      fetchJson(DATA_PATHS.quests),
      fetchJson(DATA_PATHS.chaos)
    ]);

    appState.companions = companions;
    appState.quests = quests;
    appState.chaos = chaos;

    resultLabel.textContent = "Ready";
    resultTitle.textContent = "Tap a button to begin.";
    resultText.textContent = "Consult wisely.  The duck has opinions.";
    resultMeta.textContent = "";
  } catch (error) {
    showError(error.message);
  }
}

// [CC-JS-110] Wire button clicks
companionButton.addEventListener("click", showCompanion);
questButton.addEventListener("click", showQuest);
chaosButton.addEventListener("click", showChaos);

// [CC-JS-900] Start app
loadData();