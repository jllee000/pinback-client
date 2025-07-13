console.log('Background script loaded');
// background.js
try {
  importScripts(
    './firebase_sdk/firebase-app-compat.js',
    './firebase_sdk/firebase-messaging-compat.js',
    './firebase-config.js'
  );
} catch (e) {
  console.error('Firebase SDK 로딩에 실패했습니다.', e);
}

// Firebase 앱 초기화
let messaging;
if (typeof firebase !== 'undefined') {
  firebase.initializeApp(firebaseConfig);
  messaging = firebase.messaging();
} else {
  console.error(
    'Firebase가 초기화되지 않았습니다. importScripts를 확인하세요.'
  );
}

// 백그라운드에서 푸시 메시지를 처리하는 핸들러
// 서버가 "notification" 페이로드를 포함하여 메시지를 보내면 이 핸들러가 자동으로 알림을 표시합니다.
if (messaging) {
  messaging.onBackgroundMessage((payload) => {
    console.log('[background.js] Received background message: ', payload);

    // 여기서 커스텀 알림을 표시할 수도 있습니다.
    const notificationTitle = payload.data.url;
    const notificationOptions = {
      body: payload.notification.body,
      icon: '/icon48.png',
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
  });
}

// popup.js로부터 메시지를 받기 위한 리스너
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'generateTokenWithSDK') {
    console.log('Popup으로부터 SDK 토큰 생성 요청을 받았습니다.');

    generateToken()
      .then((token) => {
        sendResponse({ success: true, token: token });
        // TODO: 여기서 받아온 token을 서버로 전송하는 로직을 추가해야 합니다.
        // 예: sendTokenToServer(token);
      })
      .catch((error) => {
        sendResponse({ success: false, error: error.message });
      });

    return true; // 비동기 응답을 위해 true 반환
  }
});

async function generateToken() {
  if (!messaging) {
    throw new Error('Messaging 서비스가 초기화되지 않았습니다.');
  }

  try {
    const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;

    // ❌ 이전 코드
    // const currentToken = await messaging.getToken({ vapidKey: vapidKey });

    // ✅ 수정된 코드
    // 현재 실행 중인 서비스 워커(self.registration)를 사용하도록 명시합니다.
    const currentToken = await messaging.getToken({
      vapidKey: vapidKey,
      serviceWorkerRegistration: self.registration,
    });

    if (currentToken) {
      console.log('✅ FCM SDK로 토큰 생성 성공:', currentToken);
      return currentToken;
    } else {
      console.warn('토큰을 생성할 수 없습니다. 알림 권한을 확인하세요.');
      throw new Error('토큰 생성 실패. 권한이 필요합니다.');
    }
  } catch (error) {
    console.error('❌ 토큰 생성 중 오류 발생:', error);
    throw error;
  }
}
