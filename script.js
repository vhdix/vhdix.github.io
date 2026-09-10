const input = document.getElementById("nameInput");
const btn = document.getElementById("writeBtn");
const book = document.getElementById("book");
const writtenName = document.getElementById("writtenName");
const pageNote = document.getElementById("pageNote");
const result = document.getElementById("result");
const resultTitle = document.getElementById("resultTitle");
const resultText = document.getElementById("resultText");
const flash = document.getElementById("flash");

document.getElementById("year").textContent = new Date().getFullYear();

function tone(freq=80, duration=.22){
  try{
    const C = window.AudioContext || window.webkitAudioContext;
    if(!C) return;
    const ctx = new C(), osc = ctx.createOscillator(), gain = ctx.createGain();
    osc.type = "sine"; osc.frequency.value = freq;
    gain.gain.setValueAtTime(.0001,ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(.035,ctx.currentTime+.02);
    gain.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+duration);
    osc.connect(gain).connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime+duration+.03);
  }catch(e){}
}

function writeName(){
  const name = input.value.trim();
  if(!name){
    input.focus();
    resultTitle.textContent = "NO NAME DETECTED";
    resultText.textContent = "The ledger cannot remember an empty page.";
    result.classList.add("active");
    setTimeout(()=>result.classList.remove("active"),700);
    return;
  }

  tone(54,.4);
  flash.classList.remove("go"); void flash.offsetWidth; flash.classList.add("go");
  book.classList.add("open");
  result.classList.remove("active");
  writtenName.classList.remove("writing"); void writtenName.offsetWidth; writtenName.classList.add("writing");
  writtenName.textContent = "";
  pageNote.textContent = "The ink is moving...";
  resultTitle.textContent = "THE LEDGER REMEMBERS";
  resultText.textContent = "The name has been written into this fictional page.";

  let i=0;
  const chars=[...name];
  const timer=setInterval(()=>{
    writtenName.textContent += chars[i++];
    tone(70 + Math.random()*45,.035);
    if(i>=chars.length){
      clearInterval(timer);
      pageNote.textContent = "The page has been sealed.";
      result.classList.add("active");
      setTimeout(()=>result.classList.remove("active"),1000);
    }
  },70);
}

btn.addEventListener("click",writeName);
input.addEventListener("keydown",e=>{
  if(e.key==="Enter") writeName();
  if(e.key==="Escape"){
    input.value="";
    writtenName.textContent="— — —";
    pageNote.textContent="Awaiting ink...";
    resultTitle.textContent="THE PAGE IS BLANK";
    resultText.textContent="The ledger is waiting for a name.";
  }
});

// Atmospheric particles
const canvas=document.getElementById("particles"), ctx=canvas.getContext("2d");
let dots=[];
function resize(){
  canvas.width=innerWidth*devicePixelRatio;
  canvas.height=innerHeight*devicePixelRatio;
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
  dots=Array.from({length:Math.min(110,Math.floor(innerWidth/10))},()=>({
    x:Math.random()*innerWidth,y:Math.random()*innerHeight,
    r:Math.random()*1.2+.2,v:Math.random()*.22+.03,a:Math.random()*.45+.08
  }));
}
function animate(){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  for(const d of dots){
    d.y-=d.v;if(d.y<0)d.y=innerHeight;
    ctx.globalAlpha=d.a;
    ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fillStyle="#aaa";ctx.fill();
  }
  requestAnimationFrame(animate);
}
addEventListener("resize",resize); resize(); animate();
