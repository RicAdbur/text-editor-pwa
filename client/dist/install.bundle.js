/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
let deferredPrompt;
window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  butInstall.classList.remove("hidden");
  deferredPrompt = event;
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    await deferredPrompt.prompt();
  }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', event => {
  console.log("App successfully installed!");
  butInstall.classList.add("hidden");
});
/******/ })()
;