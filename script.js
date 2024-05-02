const showInfo = () => {
  let y = 0;
  const playButton = document.querySelector("#play-button");
  const pauseButton = document.querySelector("#pause-button");
  const stopButton = document.querySelector("#stop-button");
  const audio = document.querySelector('#mi-audio');

  const webButton = document.querySelector("#web-button");
  const text = document.querySelector("#text");

  playButton.setAttribute("visible", true);
  setTimeout(() => {
    pauseButton.setAttribute("visible", true);
  }, 300);
  setTimeout(() => {
    stopButton.setAttribute("visible", true);
  }, 600);

  setTimeout(() => {
    webButton.setAttribute("visible", true);
  }, 600);
  /*setTimeout(() => {
    locationButton.setAttribute("visible", true);
  }, 900);*/

  playButton.setAttribute("visible", true);
  pauseButton.setAttribute("visible", false);
  stopButton.setAttribute("visible", false);

  let currentTab = '';

 
  playButton.addEventListener('click', function (evt) {
    text.setAttribute("value", "Reproduciendo Audio");
  });

  pauseButton.addEventListener('click', function (evt) {
    text.setAttribute("value", "Audio Pausado");
  });

  stopButton.addEventListener('click', function (evt) {
    text.setAttribute("value", "Audio Detenido");
  });

  webButton.addEventListener('click', function (evt) {
    window.location.href="https://www.tlaxiaco.tecnm.mx/";
  });

  /*profileButton.addEventListener('click', function (evt) {
    text.setAttribute("value", "AR, VR solutions and consultation");
    currentTab = 'profile';
  });*/



  text.addEventListener('click', function (evt) {
    if (currentTab === 'web') {
      window.location.href="https://www.tlaxiaco.tecnm.mx/";
    }
  });

  const playAudio = () => {
    playButton.setAttribute("visible", false);
    pauseButton.setAttribute("visible", true);
    stopButton.setAttribute("visible", true);
    
    audio.play();
  }

  const pauseAudio = () => {
    playButton.setAttribute("visible", true);
    pauseButton.setAttribute("visible", false);
    stopButton.setAttribute("visible", true);
    
    audio.pause();
  }

 const stopAudio = () => {
    playButton.setAttribute("visible", true);
    pauseButton.setAttribute("visible", false);
    stopButton.setAttribute("visible", false);
    audio.pause();
    audio.currentTime = 0;
 }

  playButton.addEventListener('click', function() {
    // Reproducir el audio cuando se hace clic en el objeto interactivo
      playAudio();
  });

  pauseButton.addEventListener('click', function() {
    // Reproducir el audio cuando se hace clic en el objeto interactivo
    pauseAudio();
  });

  stopButton.addEventListener('click', function() {
    // Reproducir el audio cuando se hace clic en el objeto interactivo
    stopAudio();
  });

}

const showPortfolio = (done) => {
  const portfolio = document.querySelector("#portfolio-panel");
  const portfolioLeftButton = document.querySelector("#portfolio-left-button");
  const portfolioRightButton = document.querySelector("#portfolio-right-button");

  const playButtonVideo = document.querySelector("#playVideo");
  const pauseButtonVideo = document.querySelector("#pauseVideo");
  const stopButtonVideo = document.querySelector("#stopVideo");
  const paintandquestVideo = document.querySelector("#paintandquest-video-mp4");

  const iconPlay = document.querySelector("#icon-play");

  pauseButtonVideo.setAttribute("visible", false);
  stopButtonVideo.setAttribute("visible", false);

  let y = 0;
  let currentItem = 0;

  portfolio.setAttribute("visible", true);

  const showPortfolioItem = (item) => {
    for (let i = 0; i <= 2; i++) {
      document.querySelector("#portfolio-item" + i).setAttribute("visible", i === item);
    }
  }

  const playVideo = () => {
    playButtonVideo.setAttribute("visible", false);
    pauseButtonVideo.setAttribute("visible", true);
    stopButtonVideo.setAttribute("visible", true);

    const testVideo = document.createElement( "video" );
    const canplayWebm = testVideo.canPlayType( 'video/mkv; codecs="vp8, vorbis"' );
    if (canplayWebm == "") {
      document.querySelector("#paintandquest-video-link").setAttribute("src", "#paintandquest-video-mp4");
      paintandquestVideo.play();
    } else {
      document.querySelector("#paintandquest-video-link").setAttribute("src", "#paintandquest-video-webm");
      paintandquestVideo.play();
    }
  }

  const pauseVideo = () => {
    playButtonVideo.setAttribute("visible", true);
    pauseButtonVideo.setAttribute("visible", false);
    stopButtonVideo.setAttribute("visible", true);
    
    paintandquestVideo.pause();
  }

 const stopVideo = () => {
    playButtonVideo.setAttribute("visible", true);
    pauseButtonVideo.setAttribute("visible", false);
    stopButtonVideo.setAttribute("visible", false);
    paintandquestVideo.pause();
    paintandquestVideo.currentTime = 0;
 }

  playButtonVideo.addEventListener('click', () => {
    playVideo();
  });

  pauseButtonVideo.addEventListener('click', () => {
    pauseVideo();
  });

  stopButtonVideo.addEventListener('click', () => {
    stopVideo();
  });



  const id = setInterval(() => {
    y += 0.008;
    if (y >= 0.6) {
      clearInterval(id);
      portfolioLeftButton.setAttribute("visible", true);
      portfolioRightButton.setAttribute("visible", true);
      portfolioLeftButton.addEventListener('click', () => {
        currentItem = (currentItem + 1) % 3;
        showPortfolioItem(currentItem);
      });
      portfolioRightButton.addEventListener('click', () => {
        currentItem = (currentItem - 1 + 3) % 3;
        showPortfolioItem(currentItem);
      });

      setTimeout(() => {
        done();
      }, 500);
    }
    portfolio.setAttribute("position", "0 " + y + " -0.01");
  }, 10);
}


const showAvatar = (onDone) => {
  const avatar = document.querySelector("#avatar");
  let z = -0.3;
  const id = setInterval(() => {
    z += 0.008;
    if (z >= 0.3) {
      clearInterval(id);
      onDone();
    }
    avatar.setAttribute("position", "0 -0.25 " + z);
  }, 10);
}

AFRAME.registerComponent('mytarget', {
  init: function () {
    this.el.addEventListener('targetFound', event => {
      console.log("target found");
      showAvatar(() => {
        setTimeout(() => {
          showPortfolio(() => {
            setTimeout(() => {
              showInfo();
            }, 300);
          });
        }, 300);
      });
    });
    this.el.addEventListener('targetLost', event => {
      console.log("target found");
    });
    //this.el.emit('targetFound');
  }
});
