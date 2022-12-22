const counter = document.getElementById("counter");
const startTime = Date.now();
const container = document.querySelector(".container");

fetch("./file.json")
  .then((response) => response.json())
  .then((data) => {
    const article = document.createElement("article");
    data.forEach((item) => {
      article.innerHTML += `
                <h2 class="title"> ${item.title} </h2>
                <p class="desc">  ${item.description} </p>
            `;
    });
    container.appendChild(article);

    /* Time spent */

    counter.innerHTML = ` Time spent: ${Date.now() - startTime} ms`;
    console.log(`${Date.now() - startTime} ms`);
  });
