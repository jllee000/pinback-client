import * as React from 'react';
import logo from './logo.png';
// import './App.css';
import ModalPop from '@components/modalPop/ModalPop';
import { useEffect, useState } from 'react';
import { OgImageFetcher } from '@utils/OgImage';

const App = () => {
  const [url, setUrl] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const activeTab = tabs[0];
      if (activeTab?.url) {
        const currentUrl = activeTab.url;
        setUrl(currentUrl);

        chrome.storage.local.set({ bookmarkedUrl: currentUrl }, () => {
          console.log('저장');
        });

        const imageUrl = await OgImageFetcher({
          url: currentUrl,
        });

        const isInternalChromePage =
          /^chrome:\/\//.test(currentUrl) ||
          /^chrome-extension:\/\//.test(currentUrl);
        const fetchedTitle = imageUrl?.title ?? '';

        if (!isInternalChromePage && !fetchedTitle) {
          window.close();
          return;
        }
        setTitle(imageUrl?.title ?? '');
        setDescription(imageUrl?.description ?? '');
        setImgUrl(imageUrl?.image ?? '');
        localStorage.setItem('titleSave', title);
      }
    });
  }, []);

  return (
    <div>
      <ModalPop
        urlInfo={url}
        imgInfo={imgUrl}
        titleInfo={title}
        desInfo={description}
      />
    </div>
  );
};

export default App;
