// Pétalas / flores caindo
const flores = ['🌸','💙','🪻','🩵','✨','❤️'];

for(let i = 0; i < 25; i++){
  let s = document.createElement('div');
  s.className = 'petal';
  s.innerText = flores[Math.floor(Math.random() * flores.length)];
  s.style.left = Math.random() * 100 + 'vw';
  s.style.animationDuration = (6 + Math.random() * 7) + 's';
  s.style.animationDelay = (Math.random() * 5) + 's';
  document.body.appendChild(s);
}

// Botão final
document.getElementById('botaoSim').addEventListener('click', function(){
  document.getElementById('resposta').style.display = 'block';
  this.style.display = 'none';
});



// ===== DESENHO PROGRAMADO - FLOR AZUL =====
const canvas = document.getElementById('florCanvas');
if(canvas){
  const ctx = canvas.getContext('2d');
  let progresso = 0;
  let brilhos = [];

  function desenharFlor(p){
    ctx.clearRect(0,0,360,360);
    const cx = 180, cy = 150;

    // 1. Caule - cresce de baixo pra cima
    ctx.strokeStyle = '#22a06b';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx, 330);
    ctx.quadraticCurveTo(cx - 10, 280, cx, 210 * p + 330 * (1-p) );
    // truque: vai subindo conforme p aumenta
    ctx.lineTo(cx, 330 - (120 * Math.min(p*1.5, 1)));
    ctx.stroke();

    // 2. Folhas
    if(p > 0.3){
      let f = Math.min((p-0.3)*2, 1);
      ctx.fillStyle = '#4ade80';
      ctx.beginPath();
      ctx.ellipse(cx - 30*f, 285, 28*f, 12*f, -0.5, 0, Math.PI*2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(cx + 30*f, 260, 28*f, 12*f, 0.5, 0, Math.PI*2);
      ctx.fill();
    }

    // 3. Pétalas - abrem uma por uma
    if(p > 0.5){
      let petalas = 8;
      let abertura = Math.min((p-0.5)*2.5, 1);
      for(let i=0; i<petalas; i++){
        let ang = (i / petalas) * Math.PI * 2 - Math.PI/2;
        let x = cx + Math.cos(ang) * 38 * abertura;
        let y = cy + Math.sin(ang) * 38 * abertura;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(ang + Math.PI/2);
        // pétala azul com degradê
        let grad = ctx.createLinearGradient(0, -30, 0, 10);
        grad.addColorStop(0, '#93c5fd');
        grad.addColorStop(1, '#1e3a8a');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(0, -15, 22*abertura, 32*abertura, 0, 0, Math.PI*2);
        ctx.fill();
        ctx.restore();
      }

      // miolo amarelo
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(cx, cy, 22*abertura, 0, Math.PI*2);
      ctx.fill();
      ctx.fillStyle = '#f59e0b';
      for(let i=0;i<8;i++){
        let a = (i/8)*Math.PI*2;
        ctx.beginPath();
        ctx.arc(cx+Math.cos(a)*12*abertura, cy+Math.sin(a)*12*abertura, 3, 0, Math.PI*2);
        ctx.fill();
      }
    }

    // 4. Brilhos / partículas
    brilhos.forEach(b => {
      ctx.fillStyle = `rgba(147,197,253,${b.alpha})`;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI*2);
      ctx.fill();
      b.y -= 0.6;
      b.alpha -= 0.005;
    });
    brilhos = brilhos.filter(b => b.alpha > 0);
    if(Math.random() < 0.2){
      brilhos.push({x: Math.random()*360, y: 340, r: 2+Math.random()*3, alpha: 0.9});
    }

    // 5. Texto
    if(p >= 1){
      ctx.fillStyle = '#1e3a8a';
      ctx.font = 'italic 22px "Playfair Display", serif';
      ctx.textAlign = 'center';
      ctx.fillText('Para Minha cacheada 💙', cx, 335);
    }
  }

  function animar(){
    progresso = 0;
    brilhos = [];
    let timer = setInterval(() => {
      progresso += 0.008;
      if(progresso >= 1){
        progresso = 1;
        clearInterval(timer);
      }
      desenharFlor(progresso);
    }, 16);
  }

  animar();

  document.getElementById('desenharNovamente').addEventListener('click', animar);
}