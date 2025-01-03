// اسکرول برندها
function scrollBrands(direction) {
    const brandsCarousel = document.querySelector('.brands-carousel');
    brandsCarousel.scrollBy({
        left: direction * 150,
        behavior: 'smooth'
    });
}

// اسکرول اسلایدر
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// تغییر خودکار اسلایدها هر 5 ثانیه
function autoSlide() {
    setInterval(() => {
        nextSlide();
    }, 5000);
}

// Initialize اسلایدر
showSlide(currentSlide);
autoSlide();

// اسکرول محصولات
let productScrollPosition = 0;
const productCarousel = document.querySelector('.product-carousel');

function prevProduct() {
    productScrollPosition -= 220;
    productCarousel.scrollTo({
        left: productScrollPosition,
        behavior: 'smooth'
    });
}

function nextProduct() {
    productScrollPosition += 220;
    productCarousel.scrollTo({
        left: productScrollPosition,
        behavior: 'smooth'
    });
}

// فعال‌سازی منوهای کشویی برای دستگاه‌های لمسی
document.addEventListener('DOMContentLoaded', function () {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function (e) {
            e.stopPropagation();
            this.classList.toggle('active');
        });

        dropdown.addEventListener('mouseenter', function () {
            this.classList.add('active');
        });

        dropdown.addEventListener('mouseleave', function () {
            this.classList.remove('active');
        });
    });

    // بستن منوها هنگام کلیک خارج از آن‌ها
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
});

// فعال‌کردن نوار جست‌وجو
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');

// عملکرد جست‌وجو (با استفاده از سرور)
async function performSearch() {
    const query = searchInput.value.trim().toLowerCase();
    if (query) {
        try {
            const response = await fetch(`http://localhost:3000/search?q=${query}`);
            const results = await response.json();
            displaySearchResults(results);
        } catch (error) {
            console.error('خطا در دریافت نتایج جست‌وجو:', error);
            displaySearchResults([]);
        }
    } else {
        closeSearchResults();
    }
}

function displaySearchResults(results) {
    const resultsContent = searchResults.querySelector('.results-content');
    resultsContent.innerHTML = '';

    if (results.length > 0) {
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
            resultItem.innerHTML = `
                <img src="${result.image}" alt="${result.title}" style="width: 100px; height: auto; border-radius: 10px; margin-bottom: 10px;">
                <h4>${result.title}</h4>
                <p>برند: ${result.brand}</p>
                <p>توضیحات: ${result.description}</p>
                <p>قیمت: ${result.price}</p>
                <button onclick="window.location.href='${result.link || '#'}'">خرید</button>
            `;
            resultsContent.appendChild(resultItem);
        });
    } else {
        resultsContent.innerHTML = `<p>نتیجه‌ای یافت نشد.</p>`;
    }

    searchResults.classList.add('open'); // نمایش نتایج
}

// بستن بخش نتایج
function closeSearchResults() {
    searchResults.classList.remove('open');
}

// کلیک روی دکمه جست‌وجو
if (searchButton) {
    searchButton.addEventListener('click', performSearch);
}

// فشار کلید Enter در نوار جست‌وجو
if (searchInput) {
    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // رویداد پاک کردن محتوای نوار جستجو
    searchInput.addEventListener('input', function () {
        if (searchInput.value.trim() === '') {
            closeSearchResults();
        }
    });
}

// بستن نتایج هنگام کلیک خارج از پنجره
document.addEventListener('click', function (e) {
    if (!searchResults.contains(e.target) && !searchInput.contains(e.target)) {
        closeSearchResults();
    }
});

// بستن نتایج هنگام اسکرول
window.addEventListener('scroll', function () {
    closeSearchResults();
});

function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    if (navMenu.style.display === 'block') {
        navMenu.style.display = 'none';
    } else {
        navMenu.style.display = 'block';
    }
}

// بستن منو هنگام کلیک خارج از آن
document.addEventListener('click', function (e) {
    const navMenu = document.getElementById('nav-menu');
    const menuIcon = document.querySelector('.menu-icon');
    
    // فقط در حالت موبایل اجرا شود
    if (window.innerWidth <= 768) {
        if (!navMenu.contains(e.target) && !menuIcon.contains(e.target)) {
            navMenu.style.display = 'none';
        }
    }
});

