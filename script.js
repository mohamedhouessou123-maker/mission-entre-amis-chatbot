// Sélection des éléments du DOM
const form = document.querySelector("form");
const input = document.querySelector("input");
const chatBox = document.querySelector(".chat-box");

// Fonction pour afficher un message dans la boîte de chat
function addMessage(sender, text) {
  const message = document.createElement("div");
  message.classList.add("message");

  // Style différent pour le bot et l'utilisateur
  if (sender === "bot") {
    message.classList.add("bot-message");
    message.innerHTML = `<strong>🤖 Bot:</strong> ${text}`;
  } else {
    message.classList.add("user-message");
    message.innerHTML = `<strong>👤 Toi:</strong> ${text}`;
  }

  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Réponses possibles du bot
const botReplies = [
  "Essaie de faire une danse marrante devant tes potes 💃😂",
  "Dis à ton ami le plus proche un compliment au hasard 😄",
  "Fais un cri de guerre comme si tu étais un super-héros ! 🦸‍♂️",
  "Demande à un ami de te poser une question folle 😜",
  "Imite ton prof préféré pendant 10 secondes 🤓",
  "Fais une blague à ton pote le plus sérieux 😆",
  "Balance un 'Secret entre amis' 😏"
];

// Fonction pour générer une réponse du bot
function botResponse() {
  const randomIndex = Math.floor(Math.random() * botReplies.length);
  return botReplies[randomIndex];
}

// Événement quand on envoie le formulaire
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userInput = input.value.trim();
  if (userInput === "") return;

  // Afficher le message de l'utilisateur
  addMessage("user", userInput);
  input.value = "";

  // Réponse du bot après un petit délai
  setTimeout(() => {
    const reply = botResponse();
    addMessage("bot", reply);
  }, 800);
});
