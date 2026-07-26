// ==========================
// Typed.js
// ==========================

const typed = new Typed(".typing",{
    strings:[
        "Frontend Developer",
        "Web Designer",
        "UI Developer",
        "JavaScript Lover"
    ],
    typeSpeed:80,
    backSpeed:50,
    backDelay:1500,
    loop:true
});

// ==========================
// Active Navbar
// ==========================

const sections=document.querySelectorAll("section");
const navLinks=document.querySelectorAll("nav a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const top=window.scrollY;
        const offset=section.offsetTop-200;
        const height=section.offsetHeight;

        if(top>=offset && top<offset+height){
            current=section.getAttribute("id");
        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){
            link.classList.add("active");
        }

    });

});

// ==========================
// Navbar Blur
// ==========================

window.addEventListener("scroll",()=>{

    const header=document.querySelector("header");

    if(window.scrollY>50){

        header.style.background="rgba(10,15,30,.75)";
        header.style.boxShadow="0 10px 30px rgba(0,247,255,.08)";

    }

    else{

        header.style.background="rgba(0,0,0,.25)";
        header.style.boxShadow="none";

    }

});

// ==========================
// Mouse Glow
// ==========================

const glow=document.createElement("div");

glow.style.position="fixed";
glow.style.width="280px";
glow.style.height="280px";
glow.style.borderRadius="50%";
glow.style.pointerEvents="none";
glow.style.background="radial-gradient(circle,#00f7ff55,transparent)";
glow.style.filter="blur(30px)";
glow.style.zIndex="-1";
glow.style.transition="transform .08s linear";

document.body.appendChild(glow);

window.addEventListener("mousemove",(e)=>{

    glow.style.transform=
    `translate(${e.clientX-140}px,${e.clientY-140}px)`;

});

// ==========================
// Scroll Reveal
// ==========================

const observer=new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.2
});

document.querySelectorAll(".content,.image").forEach(el=>{

    el.classList.add("hidden");

    observer.observe(el);

});
// ==========================
// 3D Card Tilt
// ==========================

const card = document.querySelector(".glass-card");

card.addEventListener("mousemove",(e)=>{

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = (x - rect.width/2) / 18;
    const rotateX = -(y - rect.height/2) / 18;

    card.style.transform =
    `perspective(1000px)
     rotateX(${rotateX}deg)
     rotateY(${rotateY}deg)
     scale(1.03)`;

});

card.addEventListener("mouseleave",()=>{

    card.style.transform =
    "perspective(1000px) rotateX(0) rotateY(0) scale(1)";

});
/* ===========================
   PARTICLES
=========================== */

tsParticles.load("particles-js",{

background:{
color:"transparent"
},

fpsLimit:60,

particles:{

number:{
value:70
},

color:{
value:"#00f7ff"
},

links:{
enable:true,
distance:150,
color:"#00f7ff",
opacity:.25
},

move:{
enable:true,
speed:1
},

size:{
value:{min:1,max:4}
},

opacity:{
value:.5
}

}

});
/* ===========================
   GSAP INTRO
=========================== */

gsap.from("header",{

y:-100,
opacity:0,
duration:1.2,
ease:"power4.out"

});

gsap.from(".content h3",{

x:-120,
opacity:0,
delay:.4,
duration:1

});

gsap.from(".content h1",{

x:-150,
opacity:0,
delay:.6,
duration:1

});

gsap.from(".content h2",{

x:-150,
opacity:0,
delay:.8,
duration:1

});

gsap.from(".content p",{

opacity:0,
y:40,
delay:1,
duration:1

});

gsap.from(".btn",{

scale:0,
delay:1.2,
duration:.8,
ease:"back.out(1.7)"

});

gsap.from(".social a",{

scale:0,
stagger:.1,
delay:1,
duration:.5

});

gsap.from(".glass-card",{

scale:.5,
opacity:0,
rotation:15,
delay:.8,
duration:1.5,
ease:"elastic.out(1,0.5)"

});