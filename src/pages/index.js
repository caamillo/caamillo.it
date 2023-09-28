import { useEffect, useState } from "react"

export default function Home() {

  const AMOUNT_PARTICLES = 6e3
  const INTERVAL_CHANGE_LETTER = 1e3

  const phrases = [
    'I LOVE',
    'I AM ADDICTED TO',
    'I AM OBSESSED WITH',
    'I AM CRAZY ABOUT',
    'I AM PASSIONATE ABOUT',
    'I AM FASCINATED BY',
    'I AM ENTHRALLED BY',
    'I AM INFATUATED WITH',
    'I AM MAD ABOUT',
    'I AM WILD ABOUT',
    'I AM KEEN ON',
  ]

  const choosePhrase = () => {
    let newPhrases
    const rawStoredPhrases = JSON.parse(localStorage.getItem('phrases'))
    console.log(!rawStoredPhrases || rawStoredPhrases.length === 0)

    if (!rawStoredPhrases || rawStoredPhrases.length === phrases.length) newPhrases = [ ...phrases ]
    else newPhrases = phrases.filter(phrase => !rawStoredPhrases.includes(phrase))

    const rndPhrase = Math.floor(Math.random() * newPhrases.length)
    const storedPhrases = phrases.filter(phrase => !newPhrases.includes(phrase) || phrase === newPhrases[rndPhrase])
    console.log('stored', storedPhrases, 'curr', newPhrases[rndPhrase])
    localStorage.setItem('phrases', JSON.stringify(storedPhrases))

    return newPhrases[rndPhrase]
  }

  const [phrase, setPhrase] = useState()

  var particleAlphabet = {
    Particle: function(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 3.5;
      this.draw = function(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, this.radius, this.radius);
        ctx.restore();
      };
    },
    init: function() {
      particleAlphabet.canvas = document.querySelector('canvas');
      particleAlphabet.ctx = particleAlphabet.canvas.getContext('2d');
      particleAlphabet.W = window.innerWidth;
      particleAlphabet.H = window.innerHeight;
      particleAlphabet.particlePositions = [];
      particleAlphabet.particles = [];
      particleAlphabet.tmpCanvas = document.createElement('canvas');
      particleAlphabet.tmpCtx = particleAlphabet.tmpCanvas.getContext('2d');
  
      particleAlphabet.canvas.width = particleAlphabet.W;
      particleAlphabet.canvas.height = particleAlphabet.H;
  
      setInterval(function(){
        particleAlphabet.changeLetter();
        particleAlphabet.getPixels(particleAlphabet.tmpCanvas, particleAlphabet.tmpCtx);
      }, INTERVAL_CHANGE_LETTER);
  
      particleAlphabet.makeParticles(AMOUNT_PARTICLES);
      particleAlphabet.animate();
    }, 
    currentPos: 0,
    changeLetter: function() {
      var letters = phrase + ' FEMBOYS',
        letters = letters.split(' ');
      particleAlphabet.time = letters[particleAlphabet.currentPos];
      particleAlphabet.currentPos++;
      if (particleAlphabet.currentPos >= letters.length) {
        particleAlphabet.currentPos = 0;
      }
    },
    makeParticles: function(num) {
      for (var i = 0; i <= num; i++) {
        particleAlphabet.particles.push(new particleAlphabet.Particle(particleAlphabet.W / 2 + Math.random() * 400 - 200, particleAlphabet.H / 2 + Math.random() * 400 -200));
      }
    },
    getPixels: function(canvas, ctx) {
      var keyword = particleAlphabet.time,
        gridX = 6,
        gridY = 6;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = 'red';
      ctx.font = 'italic bold 330px Noto Serif';
      ctx.fillText(keyword, canvas.width / 2 - ctx.measureText(keyword).width / 2, canvas.height / 2 + 100);
      var idata = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var buffer32 = new Uint32Array(idata.data.buffer);
      if (particleAlphabet.particlePositions.length > 0) particleAlphabet.particlePositions = [];
      for (var y = 0; y < canvas.height; y += gridY) {
        for (var x = 0; x < canvas.width; x += gridX) {
          if (buffer32[y * canvas.width + x]) {
            particleAlphabet.particlePositions.push({x: x, y: y});
          }
        }
      }
    },
    animateParticles: function() {
      var p, pPos;
      for (var i = 0, num = particleAlphabet.particles.length; i < num; i++) {
        p = particleAlphabet.particles[i];
        pPos = particleAlphabet.particlePositions[i];
        if (particleAlphabet.particles.indexOf(p) === particleAlphabet.particlePositions.indexOf(pPos)) {
        p.x += (pPos.x - p.x) * .3;
        p.y += (pPos.y - p.y) * .3;
        p.draw(particleAlphabet.ctx);
      }
      }
    },
    animate: function() {
      requestAnimationFrame(particleAlphabet.animate);
      particleAlphabet.ctx.fillStyle = 'rgba(0, 0, 0)';
      particleAlphabet.ctx.fillRect(0, 0, particleAlphabet.W, particleAlphabet.H);
      particleAlphabet.animateParticles();
    }
  };

  useEffect(() => {
    setPhrase(choosePhrase())
  }, [])

  useEffect(() => {
    if (!phrase) return
    document.title = phrase + ' FEMBOYS | caamillo'
    particleAlphabet.init()
  }, [phrase])

  return (
    <>
      <canvas></canvas>
    </>
  )
}
