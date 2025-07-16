const sendTokenToExtension = (token: string) => {
  window.postMessage(
    {
      type: 'SET_TOKEN',
      token,
    },
    '*'
  );
};

export const onSigninSuccess = (token: string) => {
  localStorage.setItem('jwtToken', token);
  sendTokenToExtension(token);
};
