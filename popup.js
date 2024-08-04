document.addEventListener('DOMContentLoaded', function() {
    const extractButton = document.getElementById('extractButton');
    const wordInput = document.getElementById('wordInput');
    const resultDiv = document.getElementById('result');
  
    extractButton.addEventListener('click', function() {
      const word = wordInput.value.trim();
      if (word) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {action: "findWord", word: word}, function(response) {
            if (response && response.count !== undefined) {
              const csvContent = `Word,Count\n${word},${response.count}`;
              const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
              const url = URL.createObjectURL(blob);
              chrome.downloads.download({
                url: url,
                filename: 'word_count.csv',
                saveAs: true
              });
              resultDiv.textContent = `Found "${word}" ${response.count} times. CSV file created.`;
            } else {
              resultDiv.textContent = 'Error: Could not extract word.';
            }
          });
        });
      } else {
        resultDiv.textContent = 'Please enter a word to extract.';
      }
    });
  });