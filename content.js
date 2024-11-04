// content.js

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.word) {
      const site = message.site;
      console.log(site)
      if (site === "www.espncricinfo.com") {
          highlightWordCricInfo(message.word);
      } else if (site === "www.cricbuzz.com") {
          highlightWordCricBuzz(message.word);
      } else {
          highlightWord(message.word); // Default behavior
      }
  }
});

// Function to highlight words on Cricinfo
function highlightWordCricInfo(word) {
  const regex = new RegExp(`(${escapeRegExp(word)})`, 'gi');
  const tags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5'];
  const color = 'red'
  tags.forEach(tag => {
      const elements = document.querySelectorAll(tag);
      elements.forEach(element => {
          processElement(element, regex, color);
      });
  });
}

// Function to highlight words on Cricbuzz
function highlightWordCricBuzz(word) {
  const regex = new RegExp(`(${escapeRegExp(word)})`, 'gi');
  const tags = ['span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5']; // Example: different tags for cricbuzz
  const color = 'green'
  tags.forEach(tag => {
      const elements = document.querySelectorAll(tag);
      elements.forEach(element => {
          processElement(element, regex, color);
      });
  });
}

// Default highlight function
function highlightWord(word) {
  const regex = new RegExp(`(${escapeRegExp(word)})`, 'gi');
  const tags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5'];
  const color = 'blue'
  tags.forEach(tag => {
      const elements = document.querySelectorAll(tag);
      elements.forEach(element => {
          processElement(element, regex, color);
      });
  });
}

// Helper function to process each element
function processElement(element, regex, color) {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
  let node;

  while (node = walker.nextNode()) {
      const parent = node.parentNode;
      const highlightedText = node.nodeValue.replace(regex, `<span style="background-color: ${color};">$1</span>`);

      if (highlightedText !== node.nodeValue) {
          const span = document.createElement('span');
          span.innerHTML = highlightedText;
          parent.replaceChild(span, node);
      }
  }
}

// Function to escape special characters in the word (for safety)
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special characters
}
