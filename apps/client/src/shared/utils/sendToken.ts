const sendTokenToExtension = (token: string) => {
  window.postMessage(
    {
      type: 'SET_TOKEN',
      token,
    },
    '*'
  );
};

export const onSigninSuccess = (token: string, email?: string) => {
  localStorage.setItem('jwtToken', token);
  if (email) {
    localStorage.setItem('userEmail', email);
  }
  sendTokenToExtension(token);
};
