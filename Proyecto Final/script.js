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

// Variable global para controlar el estado de la animación
let animationPaused = true;

document.addEventListener('DOMContentLoaded', function() {
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
  var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

  var voces = ['Hola', 'Inicia explicación', 'Pausa explicación', 'Reinicia explicación'];

  var grammar = '#JSGF V1.0; grammar voces; public <voces> = ' + voces.join(' | ') + ' ;';

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
  voces.forEach(function (v, i, a) {
    console.log(v, i);
  });

  function micro(){
      recognition.start();
      console.log('Estoy listo para escuchar.');
  }
  document.getElementById('microfono-button').onclick = micro;

    // Pausar la animación cuando se carga la escena
  const avatar = document.getElementById('avatar');
  avatar.removeAttribute('animation-mixer');

  recognition.onresult = function (event) {
      var voz = event.results[0][0].transcript;         
      diagnostic.setAttribute("value", "Dijiste: " + voz);
      bg = voz;
      var bg = document.querySelector('#text');

      //VISUALIZO EN CONSOLA
      console.log(bg);
      console.log('Voz reconocida: ',voz);

      // Variable para almacenar el utterance actual
      let currentUtterance;

      

      // Interacciones iniciales
      if (voz === 'Hola.') {
          console.log("Hola, estas saludando!");
          let utterance = new SpeechSynthesisUtterance('Hola amigo, que bueno verte de nuevo...');
        diagnostic.setAttribute("value", "Dijiste: " + voz + ".");
        utterance.lang = 'es-MX'
        speechSynthesis.speak(utterance)
      }

      if (voz === 'Inicia explicación.' || voz === 'Inicia, explicación.' || voz === 'Inicia la explicación.') {
        console.log("Iniciando la explicación!");
        let utterance = new SpeechSynthesisUtterance('En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor.');
        diagnostic.setAttribute("value", "Dijiste: " + voz + ".");
        utterance.lang = 'es-MX'
            // Verificamos si hay un utterance actual pausado
        if (speechSynthesis.paused) {
          // Si hay un utterance actual, lo reanudamos
          speechSynthesis.resume();
          
        } else {
          // Si no hay un utterance actual, iniciamos uno nuevo
          currentUtterance = utterance;
          speechSynthesis.speak(utterance);

          if (currentUtterance) {
            currentUtterance.onend = function(event) {
              // Pausar la animación del modelo 3D cuando el texto ha terminado de leerse
              avatar.removeAttribute('animation-mixer');
            };
          }
          
        }
        // Iniciamos la animación del modelo 3D
        avatar.setAttribute('animation-mixer', '');
      }

      if (voz === 'Pausa explicación.' || voz === 'Pausa, explicación.' || voz === 'Pausa la explicación.') {
        console.log("Pausando la explicación!");
        
          // Si hay un utterance actual, lo pausamos
          speechSynthesis.pause();
          // Pausamos la animación del modelo 3D
          avatar.removeAttribute('animation-mixer');
        
      }

      if (voz === 'Reinicia explicación.' || voz === 'Reinicia, explicación.' || voz === 'Reinicia la explicación.') {
        console.log("Reiniciando la explicación!");
        // Cancelar la síntesis de voz
        speechSynthesis.cancel();
        // Detenemos la animación del modelo 3D
        let avatar = document.getElementById('avatar');
        avatar.removeAttribute('animation-mixer');
      }

      console.log('Confidence: ' + event.results[0][0].confidence);
  };
});


  recognition.onspeechend = function () {
      recognition.stop();
  };

  recognition.onnomatch = function (event) {
      diagnostic.setAttribute("value", "No puedo escucharte claramente, por favor repiteme.");
  };

  recognition.onerror = function (event) {
      diagnostic.setAttribute("value", 'Ocurrio un error al escucharte: ' + event.error);
  };

  // Evento que se dispara cuando la síntesis de voz ha terminado de leer el texto
  speechSynthesis.addEventListener('end', function() {
    // Pausar la animación del modelo 3D cuando el texto ha terminado de leerse
    avatar.removeAttribute('animation-mixer');
  });

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
