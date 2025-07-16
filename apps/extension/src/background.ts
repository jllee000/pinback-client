chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SET_TOKEN') {
    chrome.storage.local.set({ jwtToken: message.token }, () => {
      console.log('Token saved!', message.token);
    });
  }
});
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.identity.getProfileUserInfo(function (info) {
      console.log('google email:', info.email);

      setTimeout(() => {
        chrome.tabs.create({
          url: `http://localhost:5180/onboarding?email=${info.email}`,
        });
      }, 1000);
    });
  }
});
