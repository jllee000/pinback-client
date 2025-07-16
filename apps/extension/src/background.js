chrome.identity.getProfileUserInfo(function (info) {
  console.log('google email:', info.email);
});
