// ===============================
// AR Manikandan — Portfolio JS
// ===============================

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Theme toggle ---------- */
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function applyTheme(theme){
  root.setAttribute('data-theme', theme);
  themeIcon.innerHTML = theme === 'light'
    ? '<circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
    : '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
  localStorage.setItem('portfolio-theme', theme);
}

const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  applyTheme(current === 'light' ? 'dark' : 'light');
});

/* ---------- Mobile menu ---------- */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => navLinks.classList.remove('open'))
);

/* ---------- Typing role animation ---------- */
const roles = [
  'Full Stack Developer',
  'Dot Net Developer',
  'Ai Application Developer',
  'Backend Developer',
  'Frontend Developer',
];
const typedEl = document.getElementById('typedRole');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop(){
  const current = roles[roleIndex];

  if (!deleting){
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length){
      deleting = true;
      setTimeout(typeLoop, 1400); // pause at full word
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0){
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 45 : 90);
}
typeLoop();

/* ---------- Skills data ---------- */
const skills = [
  { name: 'C#',            icon: 'devicon-csharp-plain colored' },
  { name: '.NET',          icon: 'devicon-dot-net-plain colored' },
  { name: 'Java',          icon: 'devicon-java-plain colored' },
  { name: 'Spring Boot',   icon: 'devicon-spring-plain colored' },
  { name: 'MS SQL Server', icon: 'devicon-microsoftsqlserver-plain colored' },
  { name: 'React.js',      icon: 'devicon-react-original colored' },
  { name: 'JavaScript',    icon: 'devicon-javascript-plain colored' },
  { name: 'HTML',          icon: 'devicon-html5-plain colored' },
  { name: 'CSS',           icon: 'devicon-css3-plain colored' },
  { name: 'unity',         icon: 'devicon-unity-plain colored' },
];

const skillsGrid = document.getElementById('skillsGrid');
skillsGrid.innerHTML = skills.map(s => `
  <div class="skill-card">
    <i class="skill-icon ${s.icon}"></i>
    <h3>${s.name}</h3>
  </div>
`).join('');

/* ---------- Scrollspy for nav ---------- */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(sec => spyObserver.observe(sec));

/* ---------- EmailJS Contact Form ---------- */

// Initialize EmailJS
emailjs.init({
    publicKey: "AcNcjl_4C3rTlAJYj"
});

const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

contactForm.addEventListener("submit", function (e) {

    e.preventDefault();

    formNote.textContent = "Sending...";
    formNote.style.color = "#f1c40f";

    emailjs.sendForm(
        "service_871abpp",
        "template_aghk8b8",
        this
    )
    .then(() => {

        formNote.textContent = "✅ Message sent successfully! I'll get back to you soon.";
        formNote.style.color = "#2ecc71";

        contactForm.reset();

        setTimeout(() => {
            formNote.textContent = "";
        }, 5000);

    })
    .catch((error) => {

        console.error(error);

        formNote.textContent = "❌ Failed to send message.";
        formNote.style.color = "#e74c3c";

    });

});

/* ---------- Download Resume placeholder ---------- */
document.getElementById('downloadResume').addEventListener('click', (e) => {
    e.preventDefault();

    const link = document.createElement('a');
    link.href = 'MANIKANDAN.AR_.pdf';
    link.download = 'Manikandan_AR.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

/* ---------- Certificate Drag/Swipe Carousel ---------- */

const certGrid = document.querySelector('.cert-grid');

let isDragging = false;
let startX;
let scrollLeft;

certGrid.addEventListener('mousedown', (e) => {
    isDragging = true;
    certGrid.classList.add('dragging');

    startX = e.pageX - certGrid.offsetLeft;
    scrollLeft = certGrid.scrollLeft;
});

certGrid.addEventListener('mouseleave', () => {
    isDragging = false;
    certGrid.classList.remove('dragging');
});

certGrid.addEventListener('mouseup', () => {
    isDragging = false;
    certGrid.classList.remove('dragging');
});

certGrid.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    e.preventDefault();

    const x = e.pageX - certGrid.offsetLeft;
    const walk = (x - startX) * 1.5;

    certGrid.scrollLeft = scrollLeft - walk;
});


/* ---------- Projects 6-Item Horizontal Carousel ---------- */

/* ==========================================================
                    PROJECT SLIDER
========================================================== */

(function () {

    const track = document.getElementById("projectsTrack");
    const dotsContainer = document.getElementById("projectDots");

    if (!track) return;

    // Get original cards
    const cards = Array.from(track.querySelectorAll(".project-card"));

    // Clear track
    track.innerHTML = "";

    const PER_PAGE = 6;

    const pages = [];

    // ------------------------------
    // Create pages
    // ------------------------------

    for (let i = 0; i < cards.length; i += PER_PAGE) {

        const chunk = cards.slice(i, i + PER_PAGE);

        const page = document.createElement("div");
        page.className = "projects-page";

        for (let j = 0; j < PER_PAGE; j++) {

          if (chunk[j]) {

            page.appendChild(chunk[j]);

          } else {

            const placeholder = document.createElement("div");
            placeholder.className = "project-placeholder";

            page.appendChild(placeholder);

          }

       }


        track.appendChild(page);

        pages.push(page);

    }

    //--------------------------------------------------
    // Slider
    //--------------------------------------------------

    let current = 0;

    function updateSlider() {

        const pageWidth = track.parentElement.clientWidth;

        track.style.transform =
            `translateX(-${current * pageWidth}px)`;
        document
            .querySelectorAll(".project-dot")
            .forEach((dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === current
                );

            });

    }

    //--------------------------------------------------
    // Dots
    //--------------------------------------------------

    dotsContainer.innerHTML = "";

    pages.forEach((_, index) => {

        const dot = document.createElement("span");

        dot.className = "project-dot";

        if (index === 0)
            dot.classList.add("active");

        dot.onclick = () => {

            current = index;

            updateSlider();

        };

        dotsContainer.appendChild(dot);

    });

    //--------------------------------------------------
    // Buttons
    //--------------------------------------------------

    document
        .querySelector(".next-btn")
        .addEventListener("click", () => {

            if (current < pages.length - 1) {

                current++;

                updateSlider();

            }

        });

    document
        .querySelector(".prev-btn")
        .addEventListener("click", () => {

            if (current > 0) {

                current--;

                updateSlider();

            }

        });

   //--------------------------------------------------
// Mouse Drag
//--------------------------------------------------

const slider = document.querySelector(".projects-slider");

let isDragging = false;
let startX = 0;

slider.addEventListener("mousedown", (e) => {

    isDragging = true;
    startX = e.clientX;

});

window.addEventListener("mouseup", () => {

    isDragging = false;

});

window.addEventListener("mousemove", (e) => {

    if (!isDragging) return;

    const diff = e.clientX - startX;

    if (diff < -120) {

        if (current < pages.length - 1) {

            current++;
            updateSlider();

        }

        isDragging = false;

    }

    if (diff > 120) {

        if (current > 0) {

            current--;
            updateSlider();

        }

        isDragging = false;

    }

});

    //--------------------------------------------------
    // Touch Swipe
    //--------------------------------------------------

    let touchStart = 0;

    slider.addEventListener("touchstart", (e) => {

        touchStart = e.touches[0].clientX;

    });

    slider.addEventListener("touchend", (e) => {

        const touchEnd = e.changedTouches[0].clientX;

        const diff = touchStart - touchEnd;

        if (diff > 60 && current < pages.length - 1) {

            current++;

        }

        if (diff < -60 && current > 0) {

            current--;

        }

        updateSlider();

    });

})();