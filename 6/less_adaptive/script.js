let startTime = performance.now();
window.addEventListener("DOMContentLoaded", () => {
  console.log(`DOM: ${performance.now() - startTime}`);
});
window.addEventListener("load", () => {
  console.log(`Page : ${performance.now() - startTime}`);
});
