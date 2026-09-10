let nav = document.querySelector(".nav ul");
let menuBar = document.querySelector(".menu-bar");

if (menuBar && nav) {
    menuBar.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}

const fruits = [
    { name: "Cherry", image: "./images/chiery.png", description: "Sweet taste", price: "$2.99" },
    { name: "Peach", image: "./images/fruit1.png", description: "Soft texture", price: "$3.49" },
    { name: "Apple", image: "./images/appleRotatingImage.png", description: "Crisp bite", price: "$1.99" },
    { name: "Mango", image: "./images/fruit4.png", description: "Rich flavor", price: "$4.99" },
    { name: "Yellow Mango", image: "./images/mango.png", description: "Smooth taste", price: "$5.49" },
    { name: "Berry", image: "./images/fruit14.png", description: "Fresh burst", price: "$3.29" },
    { name: "Coconut", image: "./images/fruit7.png", description: "Tropical vibe", price: "$2.49" },
    { name: "Watermelon", image: "./images/fruit18.png", description: "Cool refresh", price: "$6.99" },
    { name: "Strawberry", image: "./images/fruit8.png", description: "Juicy treat", price: "$2.79" },
    { name: "Persimmon", image: "./images/fruit16.png", description: "Mild sweet", price: "$3.59" },
    { name: "Pineapple", image: "./images/pngegg - 2024-11-05T233504.121.png", description: "Tangy punch", price: "$4.79" },
    { name: "Rambutan", image: "./images/pngegg - 2024-11-05T234847.916 - Copy.png", description: "Exotic fruit", price: "$5.19" }
];

const cardContainer = document.getElementById("cardContainer");

if (cardContainer) {
    cardContainer.innerHTML = fruits.map(fruit => `
        <div class="card">
            <div class="circle">
                <img src="${fruit.image}" alt="${fruit.name}" />
            </div>

            <h3>${fruit.name}</h3>
            <p>${fruit.description}</p>

            <div class="button-container">

                <button class="details-btn" 
                    data-name="${fruit.name}" 
                    data-desc="${fruit.description}"
                    data-image="${fruit.image}"
                    data-price="${fruit.price}"> 
                    Details
                </button>

                <button class="add-to-cart-btn">add</button>

            </div>
        </div>
    `).join("");
}


/* Cart */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

if (cardContainer) {

    cardContainer.addEventListener("click", (event) => {

        if (event.target.classList.contains("add-to-cart-btn")) {

            const card = event.target.closest(".card");
            const name = card.querySelector("h3").textContent;

            const fruit = fruits.find(fruit => fruit.name === name);

            if (fruit) {

                cart.push(fruit);

                localStorage.setItem("cart", JSON.stringify(cart));

                updateCartCount();
            }
        }
    });
}


/* Cart Count */

function updateCartCount() {

    const cartCount = document.querySelector(".cart-count");

    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

updateCartCount();


/* Model */

const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const modalDesc = document.getElementById("modal-desc");
const modalTitle = document.getElementById("modal-title");
const modalPrice = document.getElementById("modal-price");
const closeBtn = document.querySelector(".close-btn");

if (modal) {

    document.addEventListener("DOMContentLoaded", () => {
        modal.style.display = "none";
    });
}

if (cardContainer && modal) {

    cardContainer.addEventListener("click", function (event) {

        if (event.target.classList.contains("details-btn")) {

            const name = event.target.getAttribute("data-name");
            const desc = event.target.getAttribute("data-desc");
            const image = event.target.getAttribute("data-image");
            const price = event.target.getAttribute("data-price");

            modalTitle.textContent = name;
            modalDesc.textContent = desc;
            modalImage.src = image;
            modalPrice.textContent = `Price: ${price}`;

            modal.style.display = "flex";
        }
    });
}

if (closeBtn && modal) {

    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });
}

if (modal) {

    window.addEventListener("click", function (event) {

        if (event.target === modal) {
            modal.style.display = "none";
        }

    });
}


/* Display Cart */

const cartItems = document.getElementById("cartItems");
const cartTotalItems = document.getElementById("cartTotalItems");
const cartTotalPrice = document.getElementById("cartTotalPrice");

if (cartItems) {

    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    if (savedCart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-cart-shopping"></i>
                <h2>Your cart is empty</h2>
                <p>Add some fresh fruits to your cart.</p>
            </div>
        `;

        cartTotalItems.textContent = "0";
        cartTotalPrice.textContent = "$0.00";

    } else {

        cartItems.innerHTML = savedCart.map((fruit, index) => `
            <div class="cart-item">

                <img src="${fruit.image}" alt="${fruit.name}">

                <div class="cart-item-info">
                    <h3>${fruit.name}</h3>
                    <p>${fruit.description}</p>

                    <span class="cart-item-price">
                        ${fruit.price}
                    </span>
                </div>

                <button class="remove-btn" data-index="${index}">
                    Remove
                </button>

            </div>
        `).join("");

        cartTotalItems.textContent = savedCart.length;

        const total = savedCart.reduce((sum, fruit) => {
            return sum + parseFloat(fruit.price.replace("$", ""));
        }, 0);

        cartTotalPrice.textContent = `$${total.toFixed(2)}`;
    }
}


/* Remove From Cart */

if (cartItems) {

    cartItems.addEventListener("click", (event) => {

        if (event.target.classList.contains("remove-btn")) {

            const index = Number(event.target.dataset.index);

            cart.splice(index, 1);

            localStorage.setItem("cart", JSON.stringify(cart));

            location.reload();
        }
    });
}


/* Reviews Carousel */

const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper button");

let isDragging = false;
let startX;
let startScrollLeft;

if (carousel) {

    arrowBtns.forEach(btn => {

        btn.addEventListener("click", () => {

            const card = carousel.querySelector(".review");

            if (!card) return;

            const cardStyle = getComputedStyle(card);
            const cardWidth = card.offsetWidth + 16;

            carousel.scrollLeft += btn.id === "left" ? -cardWidth : cardWidth;
        });

    });


    const dragStart = (e) => {

        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;

    };


    const dragging = (e) => {

        if (!isDragging) return;

        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);

    };


    const dragStop = () => {

        isDragging = false;
        carousel.classList.remove("dragging");

    };


    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
}


/* Animation */

if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {

    gsap.registerPlugin(ScrollTrigger);


    gsap.from(".home .content h2", {
        scrollTrigger: {
            trigger: ".home",
            start: "top 80%",
            toggleActions: "play none none reset"
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });


    gsap.from(".home .content p", {
        scrollTrigger: {
            trigger: ".home",
            start: "top 80%",
            toggleActions: "play none none reset"
        },
        x: -100,
        opacity: 0,
        delay: 0.2,
        duration: 1,
        ease: "power3.out"
    });


    gsap.from(".home .content button", {
        scrollTrigger: {
            trigger: ".home",
            start: "top 80%",
            toggleActions: "play none none reset"
        },
        y: 50,
        opacity: 0,
        delay: 0.4,
        duration: 1,
        ease: "back.out(1.7)"
    });


    gsap.from(".pineapple", {
        scrollTrigger: {
            trigger: ".home",
            start: "top 80%",
            toggleActions: "play none none reset"
        },
        x: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out"
    });


    gsap.from(".small", {
        scrollTrigger: {
            trigger: ".small-cards",
            start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out"
    });


    /* About Animation */

    gsap.from(".grid-item", {
        scrollTrigger: {
            trigger: ".about",
            start: "top 80%",
            toggleActions: "play none none reset"
        },
        opacity: 0,
        x: -100,
        duration: 1,
        stagger: 0.2
    });


    gsap.from([".about h2", ".about p"], {
        scrollTrigger: {
            trigger: ".about-content",
            start: "top 80%",
            toggleActions: "play none none reset"
        },
        opacity: 0,
        x: 100,
        duration: 1,
        stagger: 0.2
    });


    /* Products Animation */

    gsap.from(".cards", {
        scrollTrigger: {
            trigger: ".card-container",
            start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
    });


    /* Animation Discount */

    gsap.from([".discount h2", ".discount p"], {
        scrollTrigger: {
            trigger: ".discount",
            start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });


    gsap.from(".discount h5", {
        scrollTrigger: {
            trigger: ".discount",
            start: "top 80%",
        },
        y: 50,
        opacity: 0,
        delay: 0.2,
        duration: 1,
        ease: "power3.out"
    });


    gsap.from(".discount button", {
        scrollTrigger: {
            trigger: ".discount",
            start: "top 80%",
        },
        y: 50,
        opacity: 0,
        delay: 0.2,
        duration: 1,
        ease: "power3.out"
    });

}