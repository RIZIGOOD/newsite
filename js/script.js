console.clear();

const uls = document.querySelectorAll("nav ul");
const light = document.querySelector("nav .tubelight");
const links = document.querySelectorAll("nav a");
const sections = document.querySelectorAll(".section");

let activeIndex = 0;
let currentIndex = 0;
let increment = 1;


window.addEventListener("hashchange", function () {
    const contactDivs = document.querySelectorAll(".small-screen");
    contactDivs.forEach(el => {
        el.style.opacity = 1;
        el.style.transition = "opacity 0.5s ease-in-out";
        requestAnimationFrame(() => {
            el.style.opacity = 0;
        });
        setTimeout(() => el.remove(), 500);
    });

    if (window.location.hash === "#contact") {
        fetch('../contact.html')
            .then(response => response.text())
            .then(data => {
                const contact = document.createElement("div");
                contact.classList.add("small-screen");
                contact.innerHTML = data;
                document.body.appendChild(contact);

                // Add animation when transitioning to #contact
                contact.style.opacity = 0;
                contact.style.transition = "opacity 0.5s ease-in-out";
                requestAnimationFrame(() => {
                    contact.style.opacity = 1;
                });

                // Fix for the toggle button on re-opening #contact
                const toggleButton = contact.querySelector(".share-btn");
                if (toggleButton) {
                    toggleButton.addEventListener("click", function (e) {
                        const element = e.target;
                        const parent = element.parentElement;
                        parent.classList.toggle("active");
                    });
                }
            })
            .catch(error => console.error('Error loading contact:', error));
    }
});



links.forEach((link, index) => {
    if (links[index].classList.contains("active")) {
        light.style.left = `${links[index].offsetLeft + light.offsetWidth / 4}px`;
    }

    link.addEventListener("click", (e) => {
        activeIndex = index;
        let t = setInterval(() => {
            if (activeIndex > currentIndex) increment = 1;
            else if (activeIndex < currentIndex) increment = -1;
            currentIndex += increment;

            links[currentIndex].classList.add("active");
            if (currentIndex !== -1) {
                links[currentIndex - increment].classList.remove("active");
            }

            if (currentIndex === activeIndex) {
                e.target.classList.add("active");
                increment = 0;
                clearInterval(t);
            }
        }, 50);
        light.style.left = `${e.target.offsetLeft + light.offsetWidth / 4}px`;
    });
});

// Завантаження navbar.html в div з id="navbar"
window.onload = function () {
    fetch('../navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
        })
        .catch(error => console.error('Error loading navbar:', error));
};
links.forEach(link => {
    link.addEventListener("click", function (e) {
        const targetId = e.target.id.replace('-link', '');
        // Ховати всі секції
        sections.forEach(section => section.classList.remove("active"));
        // Показати відповідну секцію
        document.getElementById(targetId).classList.add("active");
    });
});

document.querySelector(".share-btn").addEventListener("click", function (e) {
    e.preventDefault();
    const url = e.target.getAttribute("href");
    window.open(url, "_blank");
});

