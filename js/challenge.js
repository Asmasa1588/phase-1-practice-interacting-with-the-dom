function init() {
  const formElement = document.getElementById("comment-form");
  const likeButtonElement = document.getElementById("heart");
  const targetCounterElement = document.getElementById("counter");
  targetCounterElement.textContent = 0;
  let intervalId;
  const likedCounts = {};
  const comments = [];

  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    const commentsContainer = document.getElementById("list");
    commentsContainer.innerHTML = "";
    const formInput = document.getElementById("comment-input");
    comments.push(formInput.value);
    const commentItems = comments
      .map((comment) => {
        return `<p> ${comment}</p>`;
      })
      .join("");
    commentsContainer.innerHTML = commentItems;
    formInput.value = "";
  });

  const updateLikedCountList = () => {
    if (Object.keys(likedCounts).length) {
      const [likesContainer] = document.getElementsByClassName("likes");
      likesContainer.innerHTML = "";
      const listItems = Object.entries(likedCounts)
        .map(([key, value]) => {
          return `<li> ${key} has been liked ${value} time </li>`;
        })
        .join("");
      likesContainer.innerHTML = listItems;
    }
  };

  intervalId = setInterval(() => {
    const oldCount = Number(targetCounterElement.textContent);
    targetCounterElement.textContent = oldCount + 1;
    console.log(likedCounts);
    updateLikedCountList();
  }, 1000);

  const minusButtonElement = document.getElementById("minus");
  const plusButtonElement = document.getElementById("plus");
  const pauseButtonElement = document.getElementById("pause");

  likeButtonElement.addEventListener("click", () => {
    const currentCount = Number(targetCounterElement.textContent);
    if (likedCounts[currentCount] === undefined) {
      likedCounts[currentCount] = 1;
    } else {
      likedCounts[currentCount] = likedCounts[currentCount] + 1;
    }
  });

  minusButtonElement.addEventListener("click", () => {
    const oldCount = Number(targetCounterElement.textContent);
    targetCounterElement.textContent = oldCount - 1;
  });
  plusButtonElement.addEventListener("click", () => {
    const oldCount = Number(targetCounterElement.textContent);
    targetCounterElement.textContent = oldCount + 1;
  });

  pauseButtonElement.addEventListener("click", () => {
    if (pauseButtonElement.textContent.trim() === "pause") {
      clearInterval(intervalId);
      minusButtonElement.disabled = true;
      plusButtonElement.disabled = true;
      likeButtonElement.disabled = true;
      pauseButtonElement.textContent = "resume";
    } else {
      minusButtonElement.disabled = false;
      plusButtonElement.disabled = false;
      likeButtonElement.disabled = false;
      pauseButtonElement.textContent = "pause";
      intervalId = setInterval(() => {
        const oldCount = Number(targetCounterElement.textContent);
        targetCounterElement.textContent = oldCount + 1;
        console.log(likedCounts);
        updateLikedCountList();
      }, 1000);
    }
  });
}

document.addEventListener("DOMContentLoaded", init);
