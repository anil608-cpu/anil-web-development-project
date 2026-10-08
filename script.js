// ==================== TO-DO LIST ====================

const taskCount = document.getElementById("taskCount");
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", function () {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement("li");

    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function () {
        li.remove();
        taskCount.textContent =
            "Total Tasks: " + taskList.children.length;
    });

    taskSpan.addEventListener("click", function () {
        taskSpan.classList.toggle("completed");
    });

    li.appendChild(taskSpan);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    taskCount.textContent =
        "Total Tasks: " + taskList.children.length;

    taskInput.value = "";
});

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTaskBtn.click();
    }
});


// ==================== WEATHER ====================

const cityInput = document.getElementById("cityInput");
const searchWeatherBtn =
    document.getElementById("searchWeatherBtn");
const weatherResult =
    document.getElementById("weatherResult");

const API_KEY = "7c7a80d3ea4994b4b6581657f753db0e";

searchWeatherBtn.addEventListener("click", async function () {

    const city = cityInput.value.trim();

    if (city === "") {
        weatherResult.innerHTML =
            "<p>Please enter a city name.</p>";
        return;
    }

    weatherResult.innerHTML =
        "<p>Loading weather...</p>";

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Weather request failed"
            );
        }

        weatherResult.innerHTML = `
            <h3>${data.name}, ${data.sys.country}</h3>
            <p>Temperature: ${Math.round(data.main.temp)}°C</p>
            <p>Condition: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;

    } catch (error) {

        weatherResult.innerHTML =
            "<p>Error: " + error.message + "</p>";
    }
});


// ==================== PRODUCT SEARCH ====================

const productSearch =
    document.getElementById("productSearch");

const productCards =
    document.querySelectorAll(".product-card");

productSearch.addEventListener("input", function () {

    const searchText =
        productSearch.value.toLowerCase().trim();

    productCards.forEach(function (card) {

        const productName =
            card.querySelector("h3")
                .textContent
                .toLowerCase();

        if (productName.includes(searchText)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });
});


// ==================== ADD TO CART ====================

const cartCount =
    document.getElementById("cartCount");

const cartList =
    document.getElementById("cartList");

const cartTotal =
    document.getElementById("cartTotal");

let cartItems = 0;
let totalPrice = 0;

productCards.forEach(function (card) {

    const button =
        card.querySelector("button");

    button.addEventListener("click", function () {

        const productName =
            card.querySelector("h3").textContent;

        const priceText =
            card.querySelector(".price").textContent;

        const price =
            Number(
                priceText
                    .replace("₹", "")
                    .replace(",", "")
            );

        const li = document.createElement("li");

        const productText =
            document.createElement("span");

        productText.textContent =
            productName + " - ₹" +
            price.toLocaleString("en-IN");

        const removeButton =
            document.createElement("button");

        removeButton.textContent = "Remove";

        removeButton.addEventListener("click", function () {

            li.remove();

            cartItems--;
            totalPrice -= price;

            cartCount.textContent = cartItems;

            cartTotal.textContent =
                totalPrice.toLocaleString("en-IN");

        });

        li.appendChild(productText);
        li.appendChild(removeButton);

        cartList.appendChild(li);

        cartItems++;
        totalPrice += price;

        cartCount.textContent = cartItems;

        cartTotal.textContent =
            totalPrice.toLocaleString("en-IN");

    });

});

// ==================== CLIENT-SIDE ROUTING ====================

function handleRoute() {
    const route = window.location.hash;

    if (route === "#/shop") {
        document.getElementById("shop").scrollIntoView();
    } else if (route === "#/todo") {
        document.getElementById("todo").scrollIntoView();
    } else if (route === "#/weather") {
        document.getElementById("weather").scrollIntoView();
    } else if (route === "#/contact") {
        document.getElementById("contact").scrollIntoView();
    } else {
        document.getElementById("home").scrollIntoView();
    }
}

window.addEventListener("hashchange", handleRoute);
