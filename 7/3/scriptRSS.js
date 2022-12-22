const dataContainer = document.querySelector(".data_container");
const buttons = document.querySelectorAll("button");
const form = document.getElementById("form");
// const counterRSS = document.getElementById("counter");

function fetchData(itemAmount, type) {
  let t1 = performance.now();

  if (type === "rss") {
    fetch(`files/rss_${itemAmount}.rss`)
      .then((response) => response.text())
      .then((text) => {
        return new DOMParser().parseFromString(text, "application/xml");
      })
      .then((doc) => {
        const itemCollection = doc.querySelectorAll("item");
        const dataArray = document.createElement("div");
        itemCollection.forEach((item) => {
          const article = document.createElement("article");
          article.innerHTML = `
            <h2> ${item.querySelector("title").innerHTML}</h2>
            <p>  ${item.querySelector("description").innerHTML} </p>
            `;
          dataArray.appendChild(article);
        });
        dataContainer.innerHTML = dataArray.innerHTML;
      });
  } else if (type === "json") {
    fetch(`files/json_${itemAmount}.json`)
      .then((response) => response.json())
      .then((data) => {
        const dataArray = document.createElement("div");
        data.forEach((item) => {
          const article = document.createElement("article");
          article.innerHTML = `
          <h3> ${item.title}</h2>
          <p>  ${item.description} </p>
            `;
          dataArray.appendChild(article);
        });
        dataContainer.innerHTML = dataArray.innerHTML;
      });
  }
  let t2 = performance.now();

  return t2 - t1;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const form = new FormData(e.target);
  const amount = form.get("amount");
  const type = form.get("type");
  const cell = document.querySelector(`.${type}${amount}`);

  const fetchedData = fetchData(amount, type);

  cell.innerHTML = `${fetchedData}`.slice(0, 6);
});
