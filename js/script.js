document.addEventListener('DOMContentLoaded', function () {

    // Testimonials Carousel (guarded) - keep existing custom one
    const testimonialsCarousel = document.getElementById('Testcourses');
    if (testimonialsCarousel) {
        const testimonialsTrack = testimonialsCarousel.querySelector('.carousel-track');
        const testimonialPrevBtn = testimonialsCarousel.querySelector('#TestprevBtn');
        const testimonialNextBtn = testimonialsCarousel.querySelector('#TestnextBtn');
        if (testimonialsTrack && testimonialPrevBtn && testimonialNextBtn) {
            let testimonialsCurrentSlide = 0;
            const testimonialsTotalSlides = testimonialsTrack.children.length;

            function updateTestimonialsCarousel() {
                const slideWidth = 100;
                testimonialsTrack.style.transform = `translateX(-${testimonialsCurrentSlide * slideWidth}%)`;
                testimonialPrevBtn.disabled = testimonialsCurrentSlide === 0;
                testimonialNextBtn.disabled = testimonialsCurrentSlide === testimonialsTotalSlides - 1;
            }

            testimonialNextBtn.addEventListener('click', function () {
                if (testimonialsCurrentSlide < testimonialsTotalSlides - 1) {
                    testimonialsCurrentSlide++;
                    updateTestimonialsCarousel();
                }
            });

            testimonialPrevBtn.addEventListener('click', function () {
                if (testimonialsCurrentSlide > 0) {
                    testimonialsCurrentSlide--;
                    updateTestimonialsCarousel();
                }
            });

            updateTestimonialsCarousel();
        }
    }

    // Smooth scrolling for on-page anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Modal image injection for testimonial cards (guarded)
    const modalEl = document.getElementById('cardModal');
    if (modalEl) {
        document.querySelectorAll('.test-card-image').forEach(image => {
            image.addEventListener('click', function () {
                const card = this.closest('.test-card');
                const titleEl = card && card.querySelector('.test-card-title');
                const descEl = card && card.querySelector('.test-card-paragraph');
                const title = titleEl ? titleEl.innerText : '';
                const description = descEl ? descEl.innerText : '';
                const imgSrc = this.src;
                const label = document.getElementById('cardModalLabel');
                const body = document.getElementById('cardModalBody');
                if (label && body) {
                    label.innerText = title;
                    body.innerHTML = `
                        <img src="${imgSrc}" class="img-fluid mb-4" style="max-height: 50vh; object-fit: cover;">
                        <p>${description}</p>
                    `;
                    const myModal = new bootstrap.Modal(modalEl);
                    myModal.show();
                }
            });
        });
    }

    // Navbar: close on custom close button and on nav-link tap (mobile)
    // Support both Collapse and Offcanvas nav containers across pages
    const navbarCollapse = document.getElementById('navbarSupportedContent');
    const navbarOffcanvas = document.getElementById('navbarOffcanvas');

    if (navbarCollapse) {
        let bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse, { toggle: false });
        document.querySelectorAll('.btn-close[data-bs-target="#navbarSupportedContent"]').forEach(btn => {
            btn.addEventListener('click', function () {
                const instance = bootstrap.Collapse.getInstance(navbarCollapse);
                if (instance) instance.hide();
            });
        });
        navbarCollapse.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function () {
                const instance = bootstrap.Collapse.getInstance(navbarCollapse);
                if (instance) instance.hide();
            });
        });
    }

    if (navbarOffcanvas) {
        const offcanvasInstance = bootstrap.Offcanvas.getOrCreateInstance(navbarOffcanvas, { scroll: true });
        navbarOffcanvas.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
            link.addEventListener('click', function () {
                offcanvasInstance.hide();
            });
        });
    }

    // Price range bubble (guarded)
    const slider = document.getElementById('priceRange');
    const bubble = document.getElementById('priceBubble');
    if (slider && bubble) {
        const setBubble = () => {
            const val = slider.value;
            const min = slider.min || 0;
            const max = slider.max || 100;
            const percent = ((val - min) / (max - min)) * 100;
            bubble.innerHTML = `₹${val}`;
            bubble.style.left = `calc(${percent}% - 20px)`;
        };
        slider.addEventListener('input', setBubble);
        setBubble();
    }
});




// The following utility functions are defined for pages that use them.

function applyFilter() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    const maxPrice = parseFloat(document.getElementById("priceRange").value);
    const cards = document.querySelectorAll(".course-card");
    const noResult = document.querySelector(".none-matched");

    let visibleCount = 0;

    cards.forEach(card => {
        const coursePrice = parseFloat(card.getAttribute("data-price"));
        const hasCategory = card.classList.contains(selectedCategory) || selectedCategory === "all";

        if (hasCategory && coursePrice <= maxPrice) {
            card.style.display = "block";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    // Show/hide "no result" message
    if (visibleCount === 0) {
        noResult.style.display = "block";
        noResult.style.fontSize = "40px";
        noResult.style.fontWeight = "bold";
        noResult.textContent = "Sorry No Results Found!";
    } else {
        noResult.style.display = "none";
    }
}


function openModal(src) {
    document.getElementById("modalImage").src = src;
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}


