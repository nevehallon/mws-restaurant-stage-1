if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/js/sw.js').then(function () {
    console.log('Registration worked!');
  }).catch(function () {
    console.log('Registration failed!');
  });
}