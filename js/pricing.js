function calculateEMI() {
    const price = parseFloat(document.getElementById('vehicle-price').value);
    const downPayment = parseFloat(document.getElementById('down-payment').value);
    const loanTerm = parseInt(document.getElementById('loan-term').value);
    const interestRate = parseFloat(document.getElementById('interest-rate').value);

    if (!price || !downPayment || !loanTerm || !interestRate) {
        alert('Please fill in all fields');
        return;
    }

    const loanAmount = price - downPayment;
    const monthlyInterest = interestRate / 12 / 100;
    const emi = loanAmount * monthlyInterest * Math.pow(1 + monthlyInterest, loanTerm) / (Math.pow(1 + monthlyInterest, loanTerm) - 1);
    const totalAmount = emi * loanTerm;
    const totalInterest = totalAmount - loanAmount;

    document.getElementById('monthly-emi').textContent = '₹' + Math.round(emi).toLocaleString();
    document.getElementById('total-interest').textContent = '₹' + Math.round(totalInterest).toLocaleString();
    document.getElementById('total-amount').textContent = '₹' + Math.round(totalAmount).toLocaleString();
} 