fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    let article = document.createElement("article");
    data.forEach((item) => {
      article.innerHTML += `
                <h3> ${item.title}       </h3>
                <p>  ${item.description} </p>
            `;
    });
    document.body.appendChild(article);
  });

const dataContainer = document.querySelector(".data_container");
const buttons = document.querySelectorAll("button");
// const counterRSS = document.getElementById("counter");

function fetchData(itemAmount) {
  const startTimeRSS = performance.now();
  fetch(`files/json_${itemAmount}.json`)
    .then((response) => response.json())
    .then((data) => {
      const dataArray = document.createElement("div");
      data.forEach((item) => {
        const article = document.createElement("article");
        article.innerHTML = `
            <h2> ${item.querySelector("title").innerHTML}</h2>
            <p>  ${item.querySelector("description").innerHTML} </p>
            `;
        dataArray.appendChild(article);
      });
      dataContainer.innerHTML = dataArray.innerHTML;
    });

  return `${performance.now() - startTimeRSS}`;
}
