const messages = document.getElementById("messages");
const input = document.getElementById("userInput");
const sendButton = document.getElementById("sendBtn");

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = sender;
  msg.textContent = text;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

sendButton.addEventListener("click", () => {
  const userText = input.value.trim();
  if (userText === "") return;
  addMessage("👤 Toi : " + userText, "user");
  input.value = "";

  // Réponse automatique du bot (drôle et amical)
  const botReplies = [
    "😄 Haha, pas mal !",
    "🤖 Je vois que tu es en forme aujourd’hui !",
    "😎 Bonne ambiance ici !",
    "😂 Tu m’as bien fait rire !",
    "👋 Hey, raconte-moi encore un truc !"
  ];
  const randomReply = botReplies[Math.floor(Math.random() * botReplies.length)];
  setTimeout(() => addMessage("🤖 Bot : " + randomReply, "bot"), 500);
});
