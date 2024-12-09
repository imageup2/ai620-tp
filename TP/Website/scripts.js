"use strict";

const serverUrl = "http://127.0.0.1:5000"; // Change this to the correct endpoint if hosted remotely

async function getRecommendations() {
    const cuisine = document.getElementById("cuisine").value;
    const priceRange = document.getElementById("price-range").value;

    const response = await fetch(`${serverUrl}/getRecommendations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cuisine: cuisine,
            priceRange: priceRange
        })
    });

    const recommendations = await response.json();
    displayRecommendations(recommendations);
}

function displayRecommendations(recommendations) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; // Clear previous results

    recommendations.forEach(rec => {
        const recDiv = document.createElement("div");
        recDiv.classList.add("recommendation");
        recDiv.innerHTML = `
            <h3>${rec.name}</h3>
            <p>${rec.description}</p>
            <p><strong>Price:</strong> ${rec.price}</p>
            <button onclick="sendFeedback('${rec.id}', 1)">👍 Like</button>
            <button onclick="sendFeedback('${rec.id}', -1)">👎 Dislike</button>
        `;
        resultsDiv.appendChild(recDiv);
    });
}

async function sendFeedback(restaurantId, rating) {
    const response = await fetch(`${serverUrl}/sendFeedback`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            restaurantId: restaurantId,
            rating: rating
        })
    });

    const data = await response.json();
    alert(data.message);  
}


document.querySelector("button").addEventListener("click", getRecommendations);
