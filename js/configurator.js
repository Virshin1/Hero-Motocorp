// Hero MotoCorp Bike Configurator - Fully Functional

document.addEventListener('DOMContentLoaded', function () {
    // --- Model Selection ---
    let selectedModel = null;
    let selectedColor = null;
    let selectedAccessories = [];

    // Model prices (match data-model attributes)
    const modelPrices = {
        'xtreme-160r': 120000,
        'xtreme-160r-4v': 135000,
        'xpulse-200': 140000
    };

    // --- Model Selection Logic ---
    document.querySelectorAll('.model-option').forEach(option => {
        option.addEventListener('click', function () {
            document.querySelectorAll('.model-option').forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            selectedModel = this.getAttribute('data-model');
            updatePriceAndFinancing();
        });
    });

    // --- Color Selection Logic ---
    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', function () {
            document.querySelectorAll('.color-option').forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            selectedColor = this.getAttribute('data-color');
        });
    });

    // --- Accessories Selection Logic ---
    document.querySelectorAll('.accessory-option').forEach(option => {
        option.addEventListener('click', function () {
            const acc = this.getAttribute('data-accessory');
            const price = parseInt(this.getAttribute('data-price'));
            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
                selectedAccessories = selectedAccessories.filter(a => a !== acc);
            } else {
                this.classList.add('selected');
                selectedAccessories.push(acc);
            }
            updatePriceAndFinancing();
        });
    });

    // --- Financing Inputs ---
    const downPaymentInput = document.getElementById('downPayment');
    const loanTermInput = document.getElementById('loanTerm');
    if (downPaymentInput) {
        downPaymentInput.addEventListener('input', updatePriceAndFinancing);
    }
    if (loanTermInput) {
        loanTermInput.addEventListener('change', updatePriceAndFinancing);
    }

    // --- Price Calculation ---
    function getAccessoryTotal() {
        let total = 0;
        document.querySelectorAll('.accessory-option.selected').forEach(option => {
            total += parseInt(option.getAttribute('data-price'));
        });
        return total;
    }

    function getBasePrice() {
        return selectedModel ? modelPrices[selectedModel] : 0;
    }

    function getTotalPrice() {
        return getBasePrice() + getAccessoryTotal();
    }

    // --- Financing Calculation ---
    function updatePriceAndFinancing() {
        // Update total price
        const totalPrice = getTotalPrice();
        const priceEl = document.getElementById('total-price');
        if (priceEl) priceEl.textContent = `₹${totalPrice.toLocaleString()}`;

        // Financing
        const downPayment = parseInt(downPaymentInput?.value) || 0;
        const loanTerm = parseInt(loanTermInput?.value) || 36;
        const interestRate = 0.08; // 8% annual
        const loanAmount = Math.max(totalPrice - downPayment, 0);
        const monthlyInterest = interestRate / 12;
        const n = loanTerm;
        let monthlyPayment = 0;
        if (loanAmount > 0 && n > 0) {
            monthlyPayment = (loanAmount * monthlyInterest * Math.pow(1 + monthlyInterest, n)) /
                (Math.pow(1 + monthlyInterest, n) - 1);
        }
        const totalInterest = (monthlyPayment * n) - loanAmount;
        const monthlyPaymentEl = document.getElementById('monthly-payment');
        const totalInterestEl = document.getElementById('total-interest');
        if (monthlyPaymentEl) monthlyPaymentEl.textContent = loanAmount > 0 ? `₹${monthlyPayment.toFixed(2)}` : '-';
        if (totalInterestEl) totalInterestEl.textContent = loanAmount > 0 ? `₹${totalInterest.toFixed(2)}` : '-';
    }

    // --- Initial State ---
    updatePriceAndFinancing();
}); 