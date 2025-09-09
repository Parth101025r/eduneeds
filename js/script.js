document.addEventListener('DOMContentLoaded', function () {

    // Teachers Carousel
    const teachersTrack = document.getElementById('teachersTrack');
    const teachersPrevBtn = document.getElementById('teachersPrevBtn');
    const teachersNextBtn = document.getElementById('teachersNextBtn');
    let teachersCurrentSlide = 0;
    const teachersTotalSlides = teachersTrack.children.length;

    function updateTeachersCarousel() {
        const slideWidth = 100; // Each slide is 100% width
        teachersTrack.style.transform = `translateX(-${teachersCurrentSlide * slideWidth}%)`;

        // Update button states
        teachersPrevBtn.disabled = teachersCurrentSlide === 0;
        teachersNextBtn.disabled = teachersCurrentSlide === teachersTotalSlides - 1;
    }

    teachersNextBtn.addEventListener('click', function () {
        if (teachersCurrentSlide < teachersTotalSlides - 1) {
            teachersCurrentSlide++;
            updateTeachersCarousel();
        }
    });

    teachersPrevBtn.addEventListener('click', function () {
        if (teachersCurrentSlide > 0) {
            teachersCurrentSlide--;
            updateTeachersCarousel();
        }
    });

    // Initialize teachers carousel
    updateTeachersCarousel();

    // Courses Carousel
    const coursesCarousel = document.querySelectorAll('.carousel-container')[1]; // Second carousel
    const coursesTrack = coursesCarousel.querySelector('.carousel-track');
    const coursesPrevBtn = coursesCarousel.querySelector('#prevBtn');
    const coursesNextBtn = coursesCarousel.querySelector('#nextBtn');
    let coursesCurrentSlide = 0;
    const coursesTotalSlides = coursesTrack.children.length;

    function updateCoursesCarousel() {
        const slideWidth = 100; // Each slide is 100% width
        coursesTrack.style.transform = `translateX(-${coursesCurrentSlide * slideWidth}%)`;

        // Update button states
        coursesPrevBtn.disabled = coursesCurrentSlide === 0;
        coursesNextBtn.disabled = coursesCurrentSlide === coursesTotalSlides - 1;
    }

    coursesNextBtn.addEventListener('click', function () {
        if (coursesCurrentSlide < coursesTotalSlides - 1) {
            coursesCurrentSlide++;
            updateCoursesCarousel();
        }
    });

    coursesPrevBtn.addEventListener('click', function () {
        if (coursesCurrentSlide > 0) {
            coursesCurrentSlide--;
            updateCoursesCarousel();
        }
    });

    // Initialize courses carousel
    updateCoursesCarousel();

    // Testimonials Carousel (Corrected)
    const testimonialsCarousel = document.getElementById('Testcourses'); // Select by ID
    const testimonialsTrack = testimonialsCarousel.querySelector('.carousel-track');
    const testimonialPrevBtn = testimonialsCarousel.querySelector('#TestprevBtn');
    const testimonialNextBtn = testimonialsCarousel.querySelector('#TestnextBtn');
    let testimonialsCurrentSlide = 0;
    const testimonialsTotalSlides = testimonialsTrack.children.length;

    function updateTestimonialsCarousel() { // Renamed for clarity and consistency
        const slideWidth = 100; // Each slide is 100% width
        testimonialsTrack.style.transform = `translateX(-${testimonialsCurrentSlide * slideWidth}%)`;

        // Update button states
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

    // Initialize testimonials carousel
    updateTestimonialsCarousel();


    // Optional: Auto-play functionality (uncomment if you want auto-sliding)
    /*
    setInterval(function() {
        // Auto-advance teachers carousel
        if (teachersCurrentSlide < teachersTotalSlides - 1) {
            teachersCurrentSlide++;
        } else {
            teachersCurrentSlide = 0;
        }
        updateTeachersCarousel();

        // Auto-advance courses carousel
        if (coursesCurrentSlide < coursesTotalSlides - 1) {
            coursesCurrentSlide++;
        } else {
            coursesCurrentSlide = 0;
        }
        updateCoursesCarousel();
    }, 5000); // Change slide every 5 seconds
    */


    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // Skip if href is "#" or empty
            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Select all card images
    document.querySelectorAll('.test-card-image').forEach(image => {
        image.addEventListener('click', function () {
            const card = this.closest('.test-card');
            const title = card.querySelector('.test-card-title').innerText;
            const description = card.querySelector('.test-card-paragraph').innerText;
            const imgSrc = this.src;

            // Inject content into modal
            document.getElementById('cardModalLabel').innerText = title;
            document.getElementById('cardModalBody').innerHTML = `
                <img src="${imgSrc}" class="img-fluid mb-4" style="max-height: 50vh; object-fit: cover;">
                <p>${description}</p>
            `;

            // Show the modal
            const myModal = new bootstrap.Modal(document.getElementById('cardModal'));
            myModal.show();
        });
    });

    document.querySelector('.btn-close').addEventListener('click', function () {
        const navbarCollapse = document.getElementById('navbarSupportedContent');
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);

        if (bsCollapse) {
            bsCollapse.hide();
        }
    });
});




const slider = document.getElementById("priceRange");
const bubble = document.getElementById("priceBubble");

function setBubble() {
    const val = slider.value;
    const min = slider.min;
    const max = slider.max;
    const percent = ((val - min) / (max - min)) * 100;
    bubble.innerHTML = `₹${val}`;
    bubble.style.left = `calc(${percent}% - 20px)`; // adjust -20px for centering
}

slider.addEventListener("input", () => {
    setBubble();
});

setBubble(); // Set initial position

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


