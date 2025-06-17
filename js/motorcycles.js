document.addEventListener('DOMContentLoaded', function() {
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const engineFilter = document.getElementById('engine-filter');
    const motorcycleCards = document.querySelectorAll('.motorcycle-card');

    function filterMotorcycles() {
        const selectedCategory = categoryFilter.value;
        const selectedPrice = priceFilter.value;
        const selectedEngine = engineFilter.value;

        motorcycleCards.forEach(card => {
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

    categoryFilter.addEventListener('change', filterMotorcycles);
    priceFilter.addEventListener('change', filterMotorcycles);
    engineFilter.addEventListener('change', filterMotorcycles);
}); 