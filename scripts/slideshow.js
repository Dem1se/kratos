const slideCount = {
  technical: 5,
  nonTechnical: 8,
  workshop: 1,
  none: 0,
};

const slideDuration = 5000;
const animDuration = 600;

let index = 0;
let activePage = 'none';
let timer = null;

let ssContainer = document.getElementById('slideshowContainer');
let ssMarkers = document.getElementById('slideshowMarkers');

function updateSlides(targetPage) {
  index = 0;
  let prevPage = activePage;
  activePage = targetPage;
  let slides = document.getElementsByClassName('slide');
  let markers = document.getElementsByClassName('marker');

  for (var i = 0; i < slideCount[prevPage] - slideCount[activePage]; i++) {
    ssContainer.removeChild(slides[slideCount[prevPage] - 1 - i]);
    ssMarkers.removeChild(markers[slideCount[prevPage] - 1 - i])
  }

  for (var i = slideCount[prevPage]; i < slideCount[activePage]; i++) {
    var newSlide = ssContainer.appendChild(document.createElement('img'));
    newSlide.classList.add(['slide']);
    newSlide.id = `slide${i}`;

    var newMarker = slideshowMarkers.appendChild(document.createElement('div'));
    newMarker.classList.add(['marker']);
    newMarker.id = `marker${i}`;
    newMarker.onclick = function (ev) {
      clearInterval(timer);
      timer = null;
      index = Number(ev.target.id.replace('marker', ''));
      scrollToIndex(index);
      startTimer();
    };
  }

  slides = document.getElementsByClassName('slide');
  for (var i = 0; i < slideCount[activePage]; i++) {
    slides[i].src = `https://storage.googleapis.com/kratos23.com/images/slides/${activePage}/slide-${i}.png`;

    // performance optimizations
    // if (i > 0) {
    //   slides[i].loading = 'lazy';
    // }
  }

  ssContainer.scrollTo({ left: 0, behavior: 'auto' });
  startTimer();
}

const animOptions = {

  duration: animDuration,
  delay: 0,
  iterations: 1,
  easing: 'ease',
};

$('#slideRight').click((e) => {
  e.preventDefault();
  clearInterval(timer);
  timer = null;

  index = nextCyclicIndex(index);
  scrollToIndex(index);
  startTimer();
});

$('#slideLeft').click((e) => {
  e.preventDefault();
  clearInterval(timer);
  timer = null;

  index = prevCyclicIndex(index);
  scrollToIndex(index);
  startTimer();
});

function startTimer() {
  if (timer === null) {
    timer = setInterval(() => {
      index = nextCyclicIndex(index);
      scrollToIndex(index);
    }, slideDuration);
  }
}

function scrollToIndex(i) {
  let width = Number(
    window.getComputedStyle(ssContainer).width.replace('px', '')
  );
  let scrollTarget = width * i;
  ssContainer.scrollTo({ left: scrollTarget, behavior: 'smooth' });
}

function prevCyclicIndex(n) {
  if (n === 0) {
    return slideCount[activePage] - 1;
  }
  return n - 1;
}

function nextCyclicIndex(n) {
  if (n === slideCount[activePage] - 1) {
    return 0;
  }
  return n + 1;
}


