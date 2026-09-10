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


// ============================================================
// DARK ATMOSPHERIC SOUND
// ============================================================

function tone(freq = 80, duration = 0.22) {
    try {
        const AudioContext =
            window.AudioContext || window.webkitAudioContext;

        if (!AudioContext) return;

        const ctx = new AudioContext();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.value = freq;

        gain.gain.setValueAtTime(0.0001, ctx.currentTime);

        gain.gain.exponentialRampToValueAtTime(
            0.035,
            ctx.currentTime + 0.02
        );

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            ctx.currentTime + duration
        );

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();

        osc.stop(
            ctx.currentTime + duration + 0.03
        );

    } catch (e) {
        // Audio is optional.
    }
}


// ============================================================
// WRITE NAME INTO THE LEDGER
// ============================================================

function writeName() {

    const name = input.value.trim();

    // Empty input
    if (!name) {

        input.focus();

        resultTitle.textContent =
            "NO NAME DETECTED";

        resultText.textContent =
            "The ledger cannot remember an empty page.";

        result.classList.add("active");

        setTimeout(() => {
            result.classList.remove("active");
        }, 700);

        return;
    }


    // Initial dark sound
    tone(54, 0.4);


    // Red screen flash
    flash.classList.remove("go");

    void flash.offsetWidth;

    flash.classList.add("go");


    // Open notebook
    book.classList.add("open");


    // Reset result animation
    result.classList.remove("active");


    // Restart writing animation
    writtenName.classList.remove("writing");

    void writtenName.offsetWidth;

    writtenName.classList.add("writing");


    // Clear old name
    writtenName.textContent = "";


    // Update status
    pageNote.textContent =
        "The ink is moving...";

    resultTitle.textContent =
        "THE LEDGER REMEMBERS";

    resultText.textContent =
        "The name has been written into this fictional page.";


    // ========================================================
    // CHARACTER-BY-CHARACTER BLOOD INK EFFECT
    // ========================================================

    let i = 0;

    const chars = [...name];

    const timer = setInterval(() => {

        writtenName.textContent += chars[i++];

        // Tiny writing sound
        tone(
            70 + Math.random() * 45,
            0.035
        );


        // Finished
        if (i >= chars.length) {

            clearInterval(timer);

            pageNote.textContent =
                "The page has been sealed.";

            result.classList.add("active");

            setTimeout(() => {

                result.classList.remove("active");

            }, 1000);
        }

    }, 70);
}


// ============================================================
// WRITE BUTTON
// ============================================================

btn.addEventListener(
    "click",
    writeName
);


// ============================================================
// KEYBOARD CONTROLS
// ============================================================

input.addEventListener(
    "keydown",
    (e) => {

        // ENTER = WRITE
        if (e.key === "Enter") {
            writeName();
        }


        // ESC = CLEAR
        if (e.key === "Escape") {

            input.value = "";

            writtenName.textContent =
                "— — —";

            pageNote.textContent =
                "Awaiting ink...";

            resultTitle.textContent =
                "THE PAGE IS BLANK";

            resultText.textContent =
                "The ledger is waiting for a name.";
        }

    }
);


// ============================================================
// ATMOSPHERIC PARTICLES
// ============================================================

const canvas =
    document.getElementById("particles");

const ctx =
    canvas.getContext("2d");

let dots = [];


// ============================================================
// RESIZE CANVAS
// ============================================================

function resize() {

    canvas.width =
        innerWidth * devicePixelRatio;

    canvas.height =
        innerHeight * devicePixelRatio;

    ctx.setTransform(
        devicePixelRatio,
        0,
        0,
        devicePixelRatio,
        0,
        0
    );


    // Create particles
    dots = Array.from(
        {
            length: Math.min(
                110,
                Math.floor(innerWidth / 10)
            )
        },
        () => ({

            x:
                Math.random() *
                innerWidth,

            y:
                Math.random() *
                innerHeight,

            r:
                Math.random() *
                1.2 +
                0.2,

            v:
                Math.random() *
                0.22 +
                0.03,

            a:
                Math.random() *
                0.45 +
                0.08

        })
    );
}


// ============================================================
// PARTICLE ANIMATION
// ============================================================

function animate() {

    ctx.clearRect(
        0,
        0,
        innerWidth,
        innerHeight
    );


    for (const d of dots) {

        // Slowly move particles upward
        d.y -= d.v;


        // Reset when they leave screen
        if (d.y < 0) {
            d.y = innerHeight;
        }


        ctx.globalAlpha = d.a;

        ctx.beginPath();

        ctx.arc(
            d.x,
            d.y,
            d.r,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#aaa";

        ctx.fill();
    }


    requestAnimationFrame(
        animate
    );
}


// ============================================================
// START PARTICLES
// ============================================================

addEventListener(
    "resize",
    resize
);

resize();

animate();