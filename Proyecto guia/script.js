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
  document.getElementById('micro-button').onclick = micro;

  recognition.onresult = function (event) {
      var voz = event.results[0][0].transcript;         
      diagnostic.setAttribute("value", "Dijiste: " + voz);
      bg = voz;
      var bg = document.querySelector('#text');

      //VISUALIZO EN CONSOLA
      console.log(bg);
      console.log('Voz reconocida: ',voz);

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
        let utterance = new SpeechSynthesisUtterance('Iniciando la explicación, espera un momento...');
        diagnostic.setAttribute("value", "Dijiste: " + voz + ".");
        utterance.lang = 'es-MX'
        speechSynthesis.speak(utterance)
      }


      if (voz === 'Pausa explicación.' || voz === 'Pausa, explicación.' || voz === 'Pausa la explicación.') {
        console.log("Pausando la explicación!");
        let utterance = new SpeechSynthesisUtterance('Pausando la explicación, espera un momento...');
        diagnostic.setAttribute("value", "Dijiste: " + voz + ".");
        utterance.lang = 'es-MX'
        speechSynthesis.speak(utterance)
      }


      if (voz === 'Reinicia explicación.' || voz === 'Reinicia, explicación.' || voz === 'Reinicia la explicación.') {
        console.log("Reiniciando la explicación!");
        let utterance = new SpeechSynthesisUtterance('Reiniciando la explicación, espera un momento...');
        diagnostic.setAttribute("value", "Dijiste: " + voz + ".");
        utterance.lang = 'es-MX'
        speechSynthesis.speak(utterance)
      }


      // Interacciones iniciales
      /*if (voz === 'Hola') {
        console.log("Hola, estas saludando!");
  
        //let utterance = new SpeechSynthesisUtterance('Hola amigo, bienvenido. Estoy listo y preparado para resolver tus dudas. Te escucho...');
        //diagnostic.setAttribute("value", "Dijiste: " + voz + ".");
        //utterance.lang = 'es-MX'
        //speechSynthesis.speak(utterance)
    } else {
      console.log("Palabra reconocida pero no es 'Hola'");
    }*/

      console.log('Confidence: ' + event.results[0][0].confidence);
  };

  recognition.onspeechend = function () {
      recognition.stop();
  };

  recognition.onnomatch = function (event) {
      diagnostic.setAttribute("value", "No puedo escucharte claramente, por favor repiteme.");
  };

  recognition.onerror = function (event) {
      diagnostic.setAttribute("value", 'Ocurrio un error al escucharte: ' + event.error);
  };

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
  };

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
});
