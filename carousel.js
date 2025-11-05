const slidesEl = document.getElementById('slides');
const indicatorsEl = document.getElementById('indicators');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let current = 0;
let autoplay = true;
let timer = null;

function renderIndicators() {
  indicatorsEl.innerHTML = '';
  const slides = slidesEl.children;
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === current ? ' active' : '');
    dot.onclick = () => goTo(i);
    indicatorsEl.appendChild(dot);
  }
}

function goTo(index) {
  const n = slidesEl.children.length;
  current = (index + n) % n;
  slidesEl.style.transform = `translateX(${-current * 100}%)`;
  renderIndicators();
}

function next() {
  goTo(current + 1);
}

function prev() {
  goTo(current - 1);
}

nextBtn.addEventListener('click', () => { next(); resetTimer(); });
prevBtn.addEventListener('click', () => { prev(); resetTimer(); });

function resetTimer() {
  if (timer) clearInterval(timer);
  if (autoplay) timer = setInterval(next, 4000);
}

// Inicializar
renderIndicators();
resetTimer();

// Pausar autoplay al pasar el mouse
['mouseenter', 'touchstart'].forEach(ev => {
  document.getElementById('carousel').addEventListener(ev, () => {
    autoplay = false;
    if (timer) clearInterval(timer);
  });
});
['mouseleave', 'touchend'].forEach(ev => {
  document.getElementById('carousel').addEventListener(ev, () => {
    autoplay = true;
    resetTimer();
  });
});
