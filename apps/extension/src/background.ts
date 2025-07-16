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
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'SAVE_BOOKMARK') {
    const { url, title } = message.payload;

    chrome.storage.local.set({ savedBookmark: url }, () => {
      console.log('📦 storage 저장 완료:', url);
    });

    chrome.bookmarks.create(
      {
        title: localStorage.getItem('titleSave') ?? '핀백 저장소',
        url: url,
        parentId: '1',
      },
      (newBookmark) => {
        if (chrome.runtime.lastError) {
          console.error(
            '❌ 북마크 저장 실패:',
            chrome.runtime.lastError.message
          );
          sendResponse({
            success: false,
            error: chrome.runtime.lastError.message,
          });
        } else {
          console.log('📦 북마크 저장 완료:', newBookmark);
          sendResponse({ success: true, data: newBookmark });
        }
      }
    );

    return true;
  }

  sendResponse({ success: false, message: 'Unknown message type' });
  return false;
});

chrome.identity.getProfileUserInfo(function (info) {
  console.log('email:', info.email);
});
