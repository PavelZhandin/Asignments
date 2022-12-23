const article = document.querySelector("article");
const totalChapters = 4;

const observer_forFetching = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        if (entry.target.getAttribute("data-observerPos") === "after") {
          const chapter = await fetchChapter(
            Number(entry.target.getAttribute("data-observerOfChapter")) + 1
          );

          observer.unobserve(chapter.firstChild);
          observer.unobserve(entry.target);
          article.appendChild(chapter);
          window.location.hash = Number(window.location.hash.slice(1)) + 1;
        } else if (entry.target.getAttribute("data-observerPos") === "before") {
          const prevChapter = await fetchChapter(
            Number(entry.target.getAttribute("data-observerOfChapter")) - 1
          );
          observer.unobserve(prevChapter.lastChild);
          observer.unobserve(entry.target);
          article.prepend(prevChapter);
          entry.target.parentElement.scrollIntoView();
        }
      }
    });
  },
  { rootMargin: "25px" }
);

async function fetchChapter(number) {
  const divForObserver_after = document.createElement("div");
  const text = await (await fetch(`./chapters/page${number}.json`)).json();
  const section = document.createElement("section");
  const heading = document.createElement("h2");
  const paragraph = document.createElement("p");
  const divForObserver_before = document.createElement("div");

  heading.innerHTML = text.heading;
  paragraph.innerHTML = text.content;
  divForObserver_after.setAttribute("data-observerPos", "after");
  divForObserver_after.setAttribute("data-observerOfChapter", number);
  divForObserver_before.setAttribute("data-observerPos", "before");
  divForObserver_before.setAttribute("data-observerOfChapter", number);
  observer_forFetching.observe(divForObserver_before);
  observer_forFetching.observe(divForObserver_after);
  if (number === 1) {
    section.append(heading, paragraph, divForObserver_after);
    return section;
  }
  if (number === totalChapters) {
    section.append(divForObserver_before, heading, paragraph);
    return section;
  }
  if (number > 1 && number < totalChapters) {
    section.append(
      divForObserver_before,
      heading,
      paragraph,
      divForObserver_after
    );

    return section;
  }
}

async function loadPages() {
  const hash = Number(window.location.hash);
  if (!hash || Number(window.location.hash.slice(1)) === 1) {
    window.location.hash = 1;
    const chapter = await fetchChapter(1);
    article.appendChild(chapter);
  } else if (hash !== "" && Number(window.location.hash.slice(1)) > 1) {
    const hash = Number(window.location.hash.slice(1));
    const chapter = await fetchChapter(hash);
    article.appendChild(chapter);
    chapter.scrollIntoView();
  }
}

document.addEventListener("DOMContentLoaded", loadPages);
