let i = 0;

function infiniteRender(i) {
  console.log(i);
  if (i < 100) {
    const containers = document.querySelectorAll(`.innerContainer-${i}`);
    const innerContainer = document.createElement("div");

    // innerContainer.classList.add([`innerContainer-${i}`, "container"]);

    containers.forEach((container) => {
      container.innerHTML = `<div class="container innerContainer-${
        i + 1
      }"></div><div class="container innerContainer-${i + 1}"></div>`;
    });

    infiniteRender(i + 1);
  } else return;
}

document.addEventListener("DOMContentLoaded", () => {
  infiniteRender(0);
});

// display flex - 23
