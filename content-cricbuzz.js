// content-cricbuzz.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.word) {
        highlightWordCricBuzz(message.word);
    }
});

function highlightWordCricBuzz(word) {
    const regex = new RegExp(`(${escapeRegExp(word)})`, 'gi');
    const tags = ['span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5'];

    tags.forEach(tag => {
        const elements = document.querySelectorAll(tag);
        elements.forEach(element => {
            processElement(element, regex);
        });
    });
}

function processElement(element, regex) {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    let node;

    while (node = walker.nextNode()) {
        const parent = node.parentNode;
        const highlightedText = node.nodeValue.replace(regex, `<span style="background-color: yellow;">$1</span>`);

        if (highlightedText !== node.nodeValue) {
            const span = document.createElement('span');
            span.innerHTML = highlightedText;
            parent.replaceChild(span, node);
        }
    }
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
