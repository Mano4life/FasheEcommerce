
if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
    localStorage.removeItem('category');

    // ==================== carousel part. ======================
    const rightBtn = document.querySelector(".right-btn");
    const leftBtn = document.querySelector(".left-btn");
    const slider = document.getElementById("hero");

    const carouselImages = [
        'assets/master-slide-02.jpg',
        'assets/master-slide-03.jpg',
        'assets/master-slide-04.jpg'
    ];

    let currentIndex = 0;



    function updateCarousel() {
        slider.style.backgroundImage = `url(${carouselImages[currentIndex]})`;
    }

    function showPrevImage() {
        currentIndex = (currentIndex === 0) ? carouselImages.length - 1 : currentIndex - 1;
        updateCarousel();
        clearInterval(intervalId);
    }

    function showNextImage() {
        currentIndex = (currentIndex === carouselImages.length - 1) ? 0 : currentIndex + 1;
        updateCarousel();
        clearInterval(intervalId);
    }


    let intervalId;

    slider.addEventListener("mouseenter", () => {
        intervalId = setInterval(() => {
            currentIndex = (currentIndex === 0) ? carouselImages.length - 1 : currentIndex - 1;
            updateCarousel();
        }, 2500);
    });

    slider.addEventListener("mouseleave", () => {
        clearInterval(intervalId);
    });

    updateCarousel();
    // ==================== end carousel part. ======================

}
// ==================== header part. and to top ======================
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    header.classList.toggle("fixed", window.scrollY > 10);
});

// ==================== end header part. ======================

// ==================== scroll to top ======================
if (window.location.href.includes("index.html") || window.location.href.includes("products.html")) {
    const toTop = document.querySelector(".to-top");

    window.addEventListener("scroll", () => {
        toTop.classList.toggle("active", window.scrollY > 550);
    });

    function backToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}



// ============== call to action ==============

let dressBtn = document.querySelector(".dresses-btn");
function handleCat(e) {
    localStorage.setItem('category', e.value);
    window.location.href = "products.html"
}

// ============== username ==============

let userName = document.querySelector('.userName');
userName.innerHTML = localStorage.getItem('currentUser');

