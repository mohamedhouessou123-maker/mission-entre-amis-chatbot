// === CONFIGURATION FIREBASE ===
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAcR51pdj9A-XFPeDyhQwtRYaqxn2ZoMJc",
  authDomain: "missionentreamis.firebaseapp.com",
  databaseURL: "https://missionentreamis-default-rtdb.firebaseio.com",
  projectId: "missionentreamis",
  storageBucket: "missionentreamis.firebasestorage.app",
  messagingSenderId: "382594877270",
  appId: "1:382594877270:web:7a26fa87dfa4eef07cb8f7",
  measurementId: "G-HLN0T1964Z"
};

// === INITIALISATION ===
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// === INTERFACE ===
const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// === BOT MESSAGES DRÔLES ===
const botReplies = [
  "Essaie de faire une danse marrante devant tes potes 💃😂",
  "Imite ton prof préféré pendant 10 secondes 😆",
  "Dis 'je suis un robot' sans rigoler 🤖",
  "Crie 'Mission réussie !' très fort 😜",
  "Fais une grimace et envoie une photo à ton ami 📸"
];

// === ENVOYER MESSAGE UTILISATEUR ===
sendBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text === "") return;

  push(ref(db, "messages"), {
    sender: "user",
    text: text
  });

  input.value = "";
});

// === AFFICHAGE MESSAGES EN DIRECT ===
onValue(ref(db, "messages"), (snapshot) => {
  chatBox.innerHTML = "";
  snapshot.forEach((child) => {
    const msg = child.val();
    const div = document.createElement("div");
    div.className = msg.sender === "user" ? "user-message" : "bot-message";
    div.textContent = msg.text;
    chatBox.appendChild(div);
  });
  chatBox.scrollTop = chatBox.scrollHeight;
});

// === BOT RÉPOND AUTOMATIQUEMENT ===
onValue(ref(db, "messages"), (snapshot) => {
  const data = snapshot.val();
  if (!data) return;
  const keys = Object.keys(data);
  const last = data[keys[keys.length - 1]];

  if (last.sender === "user") {
    const randomReply = botReplies[Math.floor(Math.random() * botReplies.length)];
    push(ref(db, "messages"), {
      sender: "bot",
      text: randomReply
    });
  }
});
