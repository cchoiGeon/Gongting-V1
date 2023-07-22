const progress = document.getElementById("progress");
// const prev = document.getElementById("prev");
const next = document.getElementById("next");
const circles = document.querySelectorAll(".circle");

let currentActive = 0;

next.addEventListener("click", () => {
  currentActive++;
  if (currentActive > circles.length) currentActive = circles.length - 1;
  update();
});
next.addEventListener("click", () => {
  if (currentActive === 0) currentActive = 1;
  update();
});


const update = () => {
  circles.forEach((circle, index) => {
    if (index < currentActive) circle.classList.add("active");
    else circle.classList.remove("active");
  });
  const actives = document.querySelectorAll(".active");

  // 바의 너비 설정
  const stepWidth = 100 / (circles.length - 1);
  progress.style.width = `${(actives.length - 1) * stepWidth}%`;

  // 이전 버튼과 다음 버튼 활성화/비활성화 설정
  // prev.disabled = currentActive === 1;
  next.disabled = currentActive === circles.length;
};

function fristDone(event) {
  event.preventDefault();
  let fristDiv = document.getElementById('frist');
  let secondDiv = document.getElementById('second');
  fristDiv.style.display = 'none';
  secondDiv.style.display = 'block';
}
function secondDone(event) {
  event.preventDefault();
  let secondDiv = document.getElementById('second');
  let thridDiv = document.getElementById('thrid');
  secondDiv.style.display = 'none';
  thridDiv.style.display = 'block';
}
function thridDone(event) {
  event.preventDefault();
  let thridDiv = document.getElementById('thrid');
  let fourDiv = document.getElementById('four');
  thridDiv.style.display = 'none';
  fourDiv.style.display = 'block';
}
function fourDone(event) {
  event.preventDefault();
  let fourDiv = document.getElementById('four');
  let fiveDiv = document.getElementById('five');
  fourDiv.style.display = 'none';
  fiveDiv.style.display = 'block';
}
