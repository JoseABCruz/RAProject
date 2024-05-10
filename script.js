const showInfo = () => {
  let y = 0;
  const microButton = document.querySelector("#microfono-button");
  const playButton = document.querySelector("#play-button");
  const pauseButton = document.querySelector("#pause-button");
  const stopButton = document.querySelector("#stop-button");
  const audio = document.querySelector('#mi-audio');
  const webButton = document.querySelector("#web-button");
  const text = document.querySelector("#text");

  pauseButton.setAttribute("visible", false);
  stopButton.setAttribute("visible", false);

  

  microButton.setAttribute("visible", true);
  setTimeout(() => {
    playButton.setAttribute("visible", true);
  }, 300);
  setTimeout(() => {
    pauseButton.setAttribute("visible", true);
  }, 300);
  setTimeout(() => {
    stopButton.setAttribute("visible", true);
  }, 600);

  setTimeout(() => {
    webButton.setAttribute("visible", true);
  }, 600);

 

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
    playAudio();
  });

  pauseButton.addEventListener('click', function() {
    pauseAudio();
  });

  stopButton.addEventListener('click', function() {
    stopAudio();
  });

}

const showAvatar = (onDone) => {
  const avatar = document.querySelector("#avatar");
  avatar.setAttribute("position", "0 -0.20 0.3"); // Establecer posición estática
  onDone(); // Llamar a la función de finalización
}

AFRAME.registerComponent('mytarget', {
  /*init: function () {
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
  }*/

  init: function () {
    const sceneEl = document.querySelector('a-scene');

    sceneEl.addEventListener('loaded', () => {
      console.log("Scene loaded");
      // Realizar acciones necesarias después de que se haya cargado la escena, incluida la realidad aumentada
      showAvatar(() => {
        setTimeout(() => {
          showPortfolio(() => {
            setTimeout(() => {
              showInfo();
            }, 300);
          });
        }, 300);
      });
      // Por ejemplo, eliminar la dependencia de la imagen
      sceneEl.removeAttribute('mindar-image');
    });
  }
});

window.addEventListener('load', () => {
  const contenedor = document.querySelector('.contenedor');
  contenedor.style.visibility = 'hidden';
  contenedor.style.opacity = 0;
  contenedor.setAttribute("visible", false);
});

window.contador = 0;
window.contadorcubogrande = 0;
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var arreglovoz = ['Hola',
  'Reproduce la explicación',
        'Pausa la explicación',
        'Reinicia la explicación',
      ];

      var grammar = '#JSGF V1.0; grammar arreglovoz; public <arreglovoz> = ' + arreglovoz.join(' | ') + ' ;'
    
      var recognition = new SpeechRecognition();
      var speechRecognitionList = new SpeechGrammarList();
      speechRecognitionList.addFromString(grammar, 1);
      recognition.grammars = speechRecognitionList;
      recognition.continuous = false;
      recognition.lang = 'es-MX';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      var diagnostic = document.querySelector('#text'); 
      var vozHTML = '';
      arreglovoz.forEach(function (v, i, a) {
        console.log(v, i);
    
      });
    
      window.onload = function() {
      function micro(){
     recognition.start();
     console.log('Estoy listo para escuchar.');
    }
    document.getElementById('microfono-button').onclick = micro;
    }



    recognition.onresult = function (event) {
      var voz = event.results[0][0].transcript;         
      diagnostic.setAttribute("value", "Dijiste: " + voz + ".");
      bg = voz;
      var bg = document.querySelector('text');
  
  
      //VISUALIZO EN CONSOLA
      console.log(bg);
      console.log(voz);
  
      function randD(array) {
        var rand = Math.random() * array.length | 0;
        var result = array[rand];
        return result;
      }
  
      // Interacciones iniciales
      if (voz === 'Hola') {
        console.log("Claro, reproduciendo la explicación!");
        let utterance = new SpeechSynthesisUtterance('Hola amigo, bienvenido. Estoy listo y preparado para resolver tus dudas. Te escucho...')
        //playAudio();
        utterance.lang = 'es-MX'
        speechSynthesis.speak(utterance)
      }

      console.log('Confidence: ' + event.results[0][0].confidence);
    }
  
  
    recognition.onspeechend = function () {
      recognition.stop();
    }
  
    recognition.onnomatch = function (event) {
      diagnostic.setAttribute("value", "No puedo escucharte claramente, por favor repiteme.");
    }
  
    recognition.onerror = function (event) {
      diagnostic.setAttribute("value", 'Ocurrio un error al escucharte: ' + event.error);
    }