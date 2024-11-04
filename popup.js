document.getElementById("highlightButton").addEventListener("click", () => {
  const word = document.getElementById("wordInput").value.trim(); 
  const errorMessage = document.querySelector(".text-danger");

  if (word) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const url = new URL(tabs[0].url);
          const site = url.hostname; // Extract the domain name from the current tab's URL
          
          chrome.tabs.sendMessage(tabs[0].id, { word: word, site: site }); // Send word and site name
      });
      errorMessage.textContent = "";
  } else {
      errorMessage.textContent = "Please enter a word to highlight.";
  }
});

document.getElementById("closeButton").addEventListener("click", () => {
  window.close(); 
});
