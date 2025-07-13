import { useEffect, useState } from 'react';

const macosPattern =
  /(Macintosh)|(MacIntel)|(MacPPC)|(Mac68K)|(iPhone)|(iPad)|(iPod)/i;
const windowsPattern = /(Win32)|(Win64)|(Windows)|(WinCE)/i;

export type OSType = 'macos' | 'windows' | 'linux' | 'android' | 'unknown';

export const useOSDetector = (): OSType => {
  const [os, setOS] = useState<OSType>('unknown');

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const { userAgent } = window.navigator;

    if (macosPattern.test(userAgent)) {
      setOS('macos');
      return;
    }

    if (windowsPattern.test(userAgent)) {
      setOS('windows');
      return;
    }

    setOS('unknown');
  }, []);

  return os;
};
