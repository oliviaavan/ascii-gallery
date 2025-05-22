let frames   = frames1;
    let max      = frames.length;
    let i        = -1;
    let dir      = 'inc';
    let fps      = 3;
    let fpsInterval, then, now, elapsed;
    const pre    = document.getElementById('trace');
    let currentAudio;

    function setPreCharSize() {
      const vw = window.innerWidth, vh = window.innerHeight;
      const lines = frames[0].split('\n');
      const numLines = lines.length;
      const maxLineLength = Math.max(...lines.map(l => l.length));

      const charW = vw / maxLineLength;
      const charH = vh / numLines;
      const base  = Math.min(charW, charH);

      const scale = 1.2;
      const size  = base * scale;
      pre.style.fontSize   = `${size}px`;
      pre.style.lineHeight = `${size * (9/14)}px`;  
    }

    function startAnimating() {
      fpsInterval = 350 / fps;
      then = Date.now();
      animate();
    }

    function animate() {
      requestAnimationFrame(animate);
      now = Date.now();
      elapsed = now - then;
      if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        step();
      }
    }

    function step() {
      if (dir === 'inc') {
        if (i === max - 1) { dir = 'dec'; i--; }
        else               { i++;         }
      } else {
        if (i === 0)       { dir = 'inc'; i++; }
        else               { i--;           }
      }
      document.getElementById('trace-chars').innerText = frames[i];
    }

    function switchVideo(newFrames, newCaption, audioId) {
      frames = newFrames;
      max    = frames.length;
      i      = -1;
      dir    = 'inc';
      document.getElementById('caption').innerText = newCaption;
      setPreCharSize();

      if (currentAudio) {
        currentAudio.pause();
      }
      currentAudio = document.getElementById(audioId);
      currentAudio.currentTime = 0;
      currentAudio.play();
    }

    document.getElementById('start-btn').addEventListener('click', () => {
      document.getElementById('landing').style.display = 'none';
      document.getElementById('main').style.display    = 'block';
      setPreCharSize();
      startAnimating();
      currentAudio = document.getElementById('audio1');
      currentAudio.play();
    });

    window.addEventListener('resize', setPreCharSize);
