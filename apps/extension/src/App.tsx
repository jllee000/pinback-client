import * as React from 'react';
import { useState } from 'react';
import logo from './logo.png';
import './firebaseConfig'; // Firebase 설정 파일

const App = () => {
  const [status, setStatus] = useState('');

  const handleClick = () => {
    setStatus('토큰 생성 중...');

    chrome.runtime.sendMessage(
      { action: 'generateTokenWithSDK' },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error(
            '백그라운드 통신 실패:',
            chrome.runtime.lastError.message
          );
          setStatus('오류: 백그라운드 스크립트와 통신할 수 없습니다.');
          return;
        }

        if (response && response.success) {
          console.log('성공적으로 생성된 토큰:', response.token);
          setStatus('토큰이 성공적으로 생성되었습니다! (콘솔 확인)');
        } else {
          console.error('토큰 생성 실패:', response.error);
          setStatus(`오류: ${response.error}`);
        }
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <header className="flex flex-col items-center justify-center p-8">
        <img src={logo} className="mb-4 h-4 w-4 animate-spin" alt="logo" />
        <p className="text-3xl font-semibold">짜잔 난 핀백 다람쥐야~</p>

        <div className="mt-8 flex flex-col items-center space-y-4">
          <button
            id="enable-notifications"
            className="bg-main400 head1 hover:bg-main500 focus:ring-main300 w-[20rem] rounded-full px-4 py-2 text-white focus:outline-none focus:ring-2"
            onClick={handleClick}
          >
            알림 받아볼랭?
          </button>

          <p id="status" style={{ marginTop: 10 }}>
            {status}
          </p>
        </div>
      </header>
    </div>
  );
};

export default App;
