import messages from "./data.js";
import { printMessages, printSingleMessage } from "./functions.js";

// Elementi del DOM
const chatBox = document.getElementById("chat-box");
const sendBtn = document.getElementById("send-button");
const messageInput = document.getElementById("message-input");

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
  const responseMesg = "Ok"; // QUI inseriremo AI che terrà la conversazione con noi
  addNewMessage(responseMesg, "received");
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
