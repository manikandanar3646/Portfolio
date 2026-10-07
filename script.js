const projectsTrack = document.getElementById("projectsTrack");
const projectPages = document.querySelectorAll(".projects-page");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const projectDots = document.querySelectorAll(".project-dot");

let currentProjectPage = 0;

function updateProjectSlider() {
    projectsTrack.style.transform = `translateX(-${currentProjectPage * 100}%)`;

    projectDots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentProjectPage);
    });

    prevBtn.disabled = currentProjectPage === 0;
    nextBtn.disabled = currentProjectPage === projectPages.length - 1;
}

nextBtn.addEventListener("click", () => {
    if (currentProjectPage < projectPages.length - 1) {
        currentProjectPage++;
        updateProjectSlider();
    }
});

prevBtn.addEventListener("click", () => {
    if (currentProjectPage > 0) {
        currentProjectPage--;
        updateProjectSlider();
    }
});

projectDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        currentProjectPage = index;
        updateProjectSlider();
    });
});

updateProjectSlider();
