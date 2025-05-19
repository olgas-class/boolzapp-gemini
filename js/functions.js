const printMessages = (messagesArray, container) => {
  messagesArray.forEach((curMessage) => {
    printSingleMessage(curMessage, container);
  });
};

const printSingleMessage = (messageObj, container) => {
  const { type, content, timestamp } = messageObj;
  const date = new Date(timestamp).toLocaleString("it-IT");
  const messageElem = document.createElement("div");
  messageElem.classList.add("message-container", type);
  messageElem.innerHTML = `
            <div class="message">
              <p>${content}</p>
              <time datetime="${timestamp}">${date}</time>
            </div>`;
  container.append(messageElem);
  container.scrollTop = container.scrollHeight;
};

export { printMessages, printSingleMessage };
