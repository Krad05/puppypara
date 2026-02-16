/* =========================
   FIREWORKS SLOW VERSION
========================= */

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let gravity = 0.03; // giảm trọng lực cho bay chậm hơn

/* Resize canvas */
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

/* Random màu */
function randomColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 65%)`;
}

/* Tạo pháo hoa (nổ chậm hơn) */
function startFireworks() {
    setInterval(() => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height / 2;
        explode(x, y);
    }, 1600); // trước 800 → giờ 1600 (chậm hơn nhiều)
}

/* Nổ */
function explode(x, y) {

    const baseColor = randomColor();

    for (let i = 0; i < 70; i++) {

        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 3 + 1; // giảm tốc độ

        particles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            radius: Math.random() * 2 + 1,
            alpha: 1,
            color: baseColor
        });
    }
}

/* Animation */
function animate() {

    requestAnimationFrame(animate);

    /* Đuôi mượt hơn */
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, index) => {

        p.vy += gravity;
        p.x += p.vx;
        p.y += p.vy;

        p.alpha -= 0.008; // fade chậm và mềm hơn

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;

        ctx.shadowBlur = 18; // glow nhẹ
        ctx.shadowColor = p.color;

        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        if (p.alpha <= 0) {
            particles.splice(index, 1);
        }
    });
}

animate();

/* =========================
   LOGIN & LETTER LOGIC
========================= */

const openBtn = document.getElementById("openBtn");
const passwordInput = document.getElementById("password");
const loginPage = document.getElementById("loginPage");
const letterPage = document.getElementById("letterPage");
const message = document.getElementById("message");
const bgMusic = document.getElementById("bgMusic");

openBtn.addEventListener("click", checkAnswer);

passwordInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        checkAnswer();
    }
});

function checkAnswer() {

    const value = passwordInput.value.trim().toLowerCase();

    if (value === "yes") {

        loginPage.classList.add("fade-out");

        setTimeout(() => {

            loginPage.classList.add("hidden");
            letterPage.classList.remove("hidden");

            document.querySelector(".letter").classList.add("show");

            message.innerHTML = `Hi bae,<br>
                                <br>
                                I love you, too❤️️<br>
                                and...<br>
                                I will carry you into 2026 <br>
                                <br>
                                Chúc em gấm vóc lụa là <br>
                                Xuân sang hạnh phúc, đông về bình an <br>
                                Chúc em tuổi mới đàng sang <br>
                                Trong tay sự nghiệp, trong lòng có tuiii <br>
                                <br>
                                Happy New Year, my girl🫶 `;


            bgMusic.play();

            startFireworks();

        }, 1000);

    } else if (value === "no") {

        alert("Em không yêu Đậu saoo 😢");

    } else {

        alert("Yes or No, Bae❤️?");
    }
}
