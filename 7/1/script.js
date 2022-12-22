const counter = document.getElementById("counter");
const container = document.getElementById("container");
const startTime = Date.now();

fetch("./rss.rss")
  .then((response) => response.text())
  .then((text) => {
    return new DOMParser().parseFromString(text, "application/xml");
  })
  .then((doc) => {
    const itemCollection = doc.querySelectorAll("item");

    itemCollection.forEach((item) => {
      const title = item.querySelector("title");
      const desc = item.querySelector("description");
      const article = document.createElement("article");

      article.innerHTML = `
                <h3 class="title"> ${title.innerHTML} </h3>
                <p class="desc">  ${desc.innerHTML} </p>
            `;
      container.appendChild(article);

      // Time spent
      counter.innerHTML = `${Date.now() - startTime} milliseconds`;
    });
    console.log(`${Date.now() - startTime} ms`);
  });
