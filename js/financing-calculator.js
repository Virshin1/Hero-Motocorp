class FinancingCalculator {
    constructor() {
        this.interestRate = 0.085; // 8.5% annual interest
        this.maxTenure = 60; // 60 months
        this.minDownPayment = 0.10; // 10% minimum down payment
    }

    calculateEMI(price, downPayment, tenure) {
        const principal = price - downPayment;
        const monthlyRate = this.interestRate / 12;
        const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, tenure) / (Math.pow(1 + monthlyRate, tenure) - 1);
        return Math.round(emi);
    }

    calculateTotalInterest(price, downPayment, tenure) {
        const emi = this.calculateEMI(price, downPayment, tenure);
        const totalPayment = emi * tenure;
        const principal = price - downPayment;
        return Math.round(totalPayment - principal);
    }

    validateDownPayment(price, downPayment) {
        const minAmount = price * this.minDownPayment;
        return downPayment >= minAmount;
    }

    getTenureOptions() {
        return Array.from({length: this.maxTenure/12}, (_, i) => (i + 1) * 12);
    }
}

// Initialize calculator on product pages
document.addEventListener('DOMContentLoaded', () => {
    const calculator = new FinancingCalculator();
    const calculatorForm = document.getElementById('financing-calculator');
    
    if (calculatorForm) {
        const priceInput = document.getElementById('bike-price');
        const downPaymentInput = document.getElementById('down-payment');
        const tenureSelect = document.getElementById('tenure');
        const emiDisplay = document.getElementById('emi-amount');
        const interestDisplay = document.getElementById('total-interest');
        const totalAmountDisplay = document.getElementById('total-amount');

        // Populate tenure options
        const tenures = calculator.getTenureOptions();
        tenureSelect.innerHTML = tenures.map(tenure => 
            `<option value="${tenure}">${tenure} months</option>`
        ).join('');

        function updateCalculations() {
            const price = parseFloat(priceInput.value) || 0;
            const downPayment = parseFloat(downPaymentInput.value) || 0;
            const tenure = parseInt(tenureSelect.value) || 12;

            if (calculator.validateDownPayment(price, downPayment)) {
                const emi = calculator.calculateEMI(price, downPayment, tenure);
                const totalInterest = calculator.calculateTotalInterest(price, downPayment, tenure);
                const totalAmount = emi * tenure;

                emiDisplay.textContent = `₹${emi.toLocaleString()}`;
                interestDisplay.textContent = `₹${totalInterest.toLocaleString()}`;
                totalAmountDisplay.textContent = `₹${totalAmount.toLocaleString()}`;
            } else {
                const minDownPayment = price * calculator.minDownPayment;
                alert(`Minimum down payment should be ₹${minDownPayment.toLocaleString()}`);
            }
        }

        // Add event listeners
        priceInput.addEventListener('input', updateCalculations);
        downPaymentInput.addEventListener('input', updateCalculations);
        tenureSelect.addEventListener('change', updateCalculations);

        // Initial calculation
        updateCalculations();
    }
}); 