import { IntervalTimer } from './IntervalTimer.js';

export function Carousel(
  container,
  arrows = true,
  dots = true,
  playPause = true
) {
  // Get HTML
  const carouselHTML = CarouselHTML(container);
  if (arrows) carouselHTML.addArrows();
  if (dots) carouselHTML.addDots();
  if (playPause) carouselHTML.addPlayPause();

  // Variables
  let imageIndex = 1;
  const leftArrow = container.querySelector('.left-arrow');
  const rightArrow = container.querySelector('.right-arrow');
  const playPauseBtn = container.querySelector('.play-pause');
  const navDots = container.querySelectorAll('.nav-dot');
  const images = container.querySelectorAll('.carousel-images img');
  const timer = IntervalTimer(3000);

  // Methods
  const goToPreviousSlide = () => {
    if (imageIndex === 1) {
      imageIndex = images.length;
    } else {
      imageIndex--;
    }
    displayImage();
  };

  const goToNextSlide = () => {
    if (imageIndex === images.length) {
      imageIndex = 1;
    } else {
      imageIndex++;
    }
    displayImage();
  };

  const displayImage = () => {
    let i = 1;
    images.forEach((image) => {
      if (i !== imageIndex) {
        carouselHTML.hideImage(image);
      } else {
        carouselHTML.showImage(image);
      }
      i++;
    });
    updateNavDots();
    timer.start(goToNextSlide);
  };

  const updateNavDots = () => {
    navDots.forEach((dot) => {
      if (parseInt(dot.value) === imageIndex) {
        carouselHTML.activateDot(dot);
      } else {
        carouselHTML.deactivateDot(dot);
      }
    });
  };

  const handlePauseClick = () => {
    timer.pause();
    togglePlayPauseButton();
  };

  const handlePlayClick = () => {
    timer.resume(goToNextSlide);
    togglePlayPauseButton();
  };

  const togglePlayPauseButton = () => {
    carouselHTML.switchPlayPauseBtn(playPauseBtn);

    if (playPauseBtn.classList.contains('play')) {
      playPauseBtn.removeEventListener('click', handlePauseClick);
      playPauseBtn.addEventListener('click', handlePlayClick);
    } else {
      playPauseBtn.removeEventListener('click', handlePlayClick);
      playPauseBtn.addEventListener('click', handlePauseClick);
    }
  };

  // Event listeners
  if (leftArrow && rightArrow) {
    leftArrow.addEventListener('click', goToPreviousSlide);
    rightArrow.addEventListener('click', goToNextSlide);
  }

  if (navDots) {
    navDots.forEach((dot) => {
      dot.addEventListener('click', () => {
        imageIndex = parseInt(dot.value);
        displayImage();
      });
    });
  }

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', handlePauseClick);
  }

  // Functions to run on start
  displayImage();
}

function CarouselHTML(container) {
  const navContainer = container.querySelector('.carousel-nav-overlay');

  const addArrows = () => {
    const leftArrow = document.createElement('button');
    leftArrow.classList.add('carousel-btn', 'arrow', 'left-arrow');

    const rightArrow = document.createElement('button');
    rightArrow.classList.add('carousel-btn', 'arrow', 'right-arrow');

    navContainer.appendChild(leftArrow);
    navContainer.appendChild(rightArrow);
  };

  const addDots = () => {
    const dotContainer = document.createElement('div');
    dotContainer.classList.add('nav-dots');

    const imageDivs = container.querySelectorAll('.carousel-images img');
    for (let i = 1; i <= imageDivs.length; i++) {
      const dotBtn = document.createElement('button');
      dotBtn.classList.add('carousel-btn', 'nav-dot');

      // Use 'i' as button's value to display corresponding image
      dotBtn.value = i;

      dotContainer.appendChild(dotBtn);
    }

    navContainer.appendChild(dotContainer);
  };

  const addPlayPause = () => {
    const playPauseBtn = document.createElement('button');
    playPauseBtn.classList.add('carousel-btn', 'play-pause', 'pause');

    navContainer.appendChild(playPauseBtn);
  };

  const showImage = (image) => image.classList.remove('hidden');

  const hideImage = (image) => image.classList.add('hidden');

  const activateDot = (dot) => dot.classList.add('active-dot');

  const deactivateDot = (dot) => dot.classList.remove('active-dot');

  const switchPlayPauseBtn = (btn) => {
    if (btn.classList.contains('pause')) {
      btn.classList.remove('pause');
      btn.classList.add('play');
    } else {
      btn.classList.remove('play');
      btn.classList.add('pause');
    }
  };

  return {
    addArrows,
    addDots,
    addPlayPause,
    showImage,
    hideImage,
    activateDot,
    deactivateDot,
    switchPlayPauseBtn,
  };
}
