let i = 0;
let timeStart;

function infiniteRender(i) {
  // const time = Date.now();
  console.log(i, Date.now() - timeStart);

  const containers = document.querySelectorAll(`.innerContainer-${i}`);
  const innerContainer = document.createElement("div");

  containers.forEach((container) => {
    container.innerHTML = `<div class="container innerContainer-${
      i + 1
    }"></div><div class="container innerContainer-${i + 1}"></div>`;
  });
  setTimeout(infiniteRender(i + 1), 50);
}

document.addEventListener("DOMContentLoaded", () => {
  timeStart = Date.now();
  console.log(timeStart);
  infiniteRender(0);
});

// display flex - 23 depth
// float: left - 23 depth
