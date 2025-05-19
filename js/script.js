import messages from "./data.js";
import { printMessages, printSingleMessage } from "./functions.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import config from "./config.js";

// Elementi del DOM
const chatBox = document.getElementById("chat-box");
const sendBtn = document.getElementById("send-button");
const messageInput = document.getElementById("message-input");

// Preparazione di collegamento alle API di Gemini AI
const genAI = new GoogleGenerativeAI(config.API_KEY);
let chat = null;

// Preparazione della chat iniziale
printMessages(messages, chatBox);

// Intercetto invio del messaggio
sendBtn.addEventListener("click", function () {
  const message = messageInput.value;
  addNewMessage(message, "sent");
  // Ripulire il campo di input
  messageInput.value = "";
  // Aspetto la risposta
  setTimeout(getResponse, 2000);
});

// Response functions
function getResponse() {
  // Se la chat non è stata inizializzata
  if (chat === null) {
    const model = genAI.getGenerativeModel({ model: config.AI_MODEL });

    // Trasforma i messaggi nel format richiesto da API di ggogle
    const historyMessages = messages.map((curMessage) => {
      return {
        role: curMessage.type === "sent" ? "user" : "model",
        parts: [{ text: curMessage.content }],
      };
    });

    historyMessages.unshift({
      role: "user",
      parts: [
        {
          text: "Sei Marco, mio amico e collega. Siamo amici da tanti anni. Non direi mai che se un modell di intelligenza artificiale",
        },
      ],
    });
    // Inizializza
    chat = model.startChat({
      history: historyMessages,
      generationConfig: {
        maxOutputTokens: 200,
      },
    });
  }
  // Inviare il messaggio dell'utente
  const lastMessage = messages[messages.length - 1].content;
  console.log(lastMessage);

  chat
    .sendMessage(lastMessage)
    .then((result) => result.response)
    .then((responose) => responose.text())
    .then((text) => addNewMessage(text, "received"));
}

function addNewMessage(text, type) {
  const newMessage = {
    id: messages.length + 1,
    type: type,
    content: text,
    timestamp: new Date().toISOString(),
  };
  messages.push(newMessage);
  printSingleMessage(newMessage, chatBox);
}
