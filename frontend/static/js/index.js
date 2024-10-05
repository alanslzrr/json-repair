let timeoutId;
let controller;

document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
    const inputJSON = getJSONFromURL();
    if (inputJSON) {
        document.getElementById('input-json').value = inputJSON;
        processInput(inputJSON);
    }
    document.getElementById('input-json').addEventListener('input', handleInput);
    document.getElementById('copy-button').addEventListener('click', copyRepairedJSON);
}

function handleInput() {
    const inputJSON = document.getElementById('input-json').value;
    updateURL(inputJSON);
    processInput(inputJSON);
}

function copyRepairedJSON() {
    const outputJSON = document.getElementById('output-json');
    const copyButton = document.getElementById('copy-button');
    
    navigator.clipboard.writeText(outputJSON.value).then(() => {
        // Provide visual feedback
        copyButton.textContent = 'Copied!';
        copyButton.classList.add('copied');
        
        setTimeout(() => {
            copyButton.innerHTML = '<span class="copy-icon">📋</span> Copy';
            copyButton.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        copyButton.textContent = 'Copy failed';
        
        setTimeout(() => {
            copyButton.innerHTML = '<span class="copy-icon">📋</span> Copy';
        }, 2000);
    });
}

function updateURL(inputJSON) {
    const url = new URL(window.location);
    url.searchParams.set('json', encodeURIComponent(inputJSON));
    window.history.replaceState({}, '', url);
}

function getJSONFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('json') ? decodeURIComponent(urlParams.get('json')) : '';
}

function processInput(inputJSON) {
    if (inputJSON.trim() === '') {
        clearOutputs();
        return;
    }

    if (timeoutId) clearTimeout(timeoutId);
    if (controller) controller.abort();

    timeoutId = setTimeout(() => {
        controller = new AbortController();
        fetchRepairedJSON(inputJSON);
    }, 500);
}

function fetchRepairedJSON(inputJSON) {
    fetch('/api/repair-json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ malformedJSON: inputJSON }),
        signal: controller.signal
    })
    .then(response => response.json())
    .then(handleResponse)
    .catch(handleError);
}

function handleResponse(data) {
    let formattedJSON, logs;
    if (Array.isArray(data)) {
        [formattedJSON, logs] = data;
    } else {
        formattedJSON = data;
        logs = [{context: "", text: "Nothing to do, this was a valid JSON"}];
    }
    updateOutputs(formattedJSON, logs);
}

function handleError(error) {
    if (error.name !== 'AbortError') {
        document.getElementById('output-json').value = 'Error formatting JSON: ' + error.message;
        document.getElementById('log-output').value = '';
    }
}

function updateOutputs(formattedJSON, logs) {
    document.getElementById('output-json').value = JSON.stringify(formattedJSON, null, 4);
    const formattedLogs = logs.map(log => `Context: ${log.context}\nMessage: ${log.text}`).join('\n\n');
    document.getElementById('log-output').value = formattedLogs;
}

function clearOutputs() {
    document.getElementById('output-json').value = '';
    document.getElementById('log-output').value = '';
}