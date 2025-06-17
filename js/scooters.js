document.addEventListener('DOMContentLoaded', function() {
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const engineFilter = document.getElementById('engine-filter');
    const scooterCards = document.querySelectorAll('.scooter-card');

    function filterScooters() {
        const selectedCategory = categoryFilter.value;
        const selectedPrice = priceFilter.value;
        const selectedEngine = engineFilter.value;

        scooterCards.forEach(card => {
            const cardCategory = card.dataset.category;
            const cardPrice = card.dataset.price;
            const cardEngine = card.dataset.engine;

            const categoryMatch = selectedCategory === 'all' || cardCategory === selectedCategory;
            const priceMatch = selectedPrice === 'all' || cardPrice === selectedPrice;
            const engineMatch = selectedEngine === 'all' || cardEngine === selectedEngine;

            if (categoryMatch && priceMatch && engineMatch) {
                card.style.display = ''; // Show the card
            } else {
                card.style.display = 'none'; // Hide the card
            }
        });
    }

    categoryFilter.addEventListener('change', filterScooters);
    priceFilter.addEventListener('change', filterScooters);
    engineFilter.addEventListener('change', filterScooters);
}); 