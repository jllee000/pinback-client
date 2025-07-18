window.addEventListener('message', (event) => {
  if (event.source !== window) return;
  if (event.data.type === 'SET_TOKEN') {
    chrome.runtime.sendMessage({
      type: 'SET_TOKEN',
      token: event.data.token,
    });
    console.log(event.data.token, '여기');
  }
});
