// Service Booking System
class ServiceBooking {
    constructor() {
        this.form = document.getElementById('service-booking-form');
        this.availableSlots = [];
        this.selectedSlot = null;
    }

    init() {
        this.setupEventListeners();
        this.loadAvailableSlots();
    }

    setupEventListeners() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }

        // Service type selection
        document.querySelectorAll('.service-type').forEach(option => {
            option.addEventListener('change', (e) => {
                this.updateServiceDetails(e.target.value);
            });
        });

        // Date selection
        const dateInput = document.getElementById('service-date');
        if (dateInput) {
            dateInput.addEventListener('change', (e) => {
                this.loadAvailableSlots(e.target.value);
            });
        }

        // Time slot selection
        document.querySelectorAll('.time-slot').forEach(slot => {
            slot.addEventListener('click', (e) => {
                this.selectTimeSlot(e.target.dataset.slot);
            });
        });
    }

    // Load available time slots for the selected date
    loadAvailableSlots(date = new Date()) {
        // Simulate loading available slots from backend
        const slots = this.generateTimeSlots(date);
        this.displayTimeSlots(slots);
    }

    // Generate time slots for a given date
    generateTimeSlots(date) {
        const slots = [];
        const startHour = 9; // 9 AM
        const endHour = 17; // 5 PM
        const interval = 60; // 1 hour intervals

        for (let hour = startHour; hour < endHour; hour++) {
            slots.push({
                time: `${hour}:00`,
                available: Math.random() > 0.3 // Randomly mark some slots as unavailable
            });
        }

        return slots;
    }

    // Display available time slots
    displayTimeSlots(slots) {
        const slotsContainer = document.getElementById('time-slots');
        if (!slotsContainer) return;

        slotsContainer.innerHTML = '';
        slots.forEach(slot => {
            const slotElement = document.createElement('button');
            slotElement.className = `time-slot ${slot.available ? 'available' : 'unavailable'}`;
            slotElement.dataset.slot = slot.time;
            slotElement.textContent = slot.time;
            slotElement.disabled = !slot.available;
            slotsContainer.appendChild(slotElement);
        });
    }

    // Select a time slot
    selectTimeSlot(slotTime) {
        this.selectedSlot = slotTime;
        document.querySelectorAll('.time-slot').forEach(slot => {
            slot.classList.remove('selected');
            if (slot.dataset.slot === slotTime) {
                slot.classList.add('selected');
            }
        });
    }

    // Update service details based on selected service type
    updateServiceDetails(serviceType) {
        const serviceDetails = {
            'regular': {
                duration: '1 hour',
                price: '₹500',
                description: 'Basic maintenance and inspection'
            },
            'premium': {
                duration: '2 hours',
                price: '₹1000',
                description: 'Comprehensive service with detailed inspection'
            },
            'emergency': {
                duration: '3 hours',
                price: '₹2000',
                description: 'Urgent repairs and immediate attention'
            }
        };

        const details = serviceDetails[serviceType] || {};
        document.getElementById('service-duration').textContent = details.duration || '';
        document.getElementById('service-price').textContent = details.price || '';
        document.getElementById('service-description').textContent = details.description || '';
    }

    // Validate form inputs
    validateForm() {
        const requiredFields = ['name', 'phone', 'email', 'vehicle-model', 'service-type', 'service-date'];
        let isValid = true;

        requiredFields.forEach(field => {
            const input = document.getElementById(field);
            if (!input || !input.value.trim()) {
                this.showError(field, 'This field is required');
                isValid = false;
            } else {
                this.clearError(field);
            }
        });

        // Validate email format
        const email = document.getElementById('email');
        if (email && email.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                this.showError('email', 'Please enter a valid email address');
                isValid = false;
            }
        }

        // Validate phone number
        const phone = document.getElementById('phone');
        if (phone && phone.value) {
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(phone.value)) {
                this.showError('phone', 'Please enter a valid 10-digit phone number');
                isValid = false;
            }
        }

        return isValid;
    }

    // Show error message for a field
    showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}-error`);
        if (field && errorElement) {
            field.classList.add('error');
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    // Clear error message for a field
    clearError(fieldId) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}-error`);
        if (field && errorElement) {
            field.classList.remove('error');
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }

    // Handle form submission
    async handleSubmit(e) {
        e.preventDefault();

        if (!this.validateForm()) {
            return;
        }

        if (!this.selectedSlot) {
            alert('Please select a time slot');
            return;
        }

        const formData = new FormData(this.form);
        const bookingData = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            vehicleModel: formData.get('vehicle-model'),
            serviceType: formData.get('service-type'),
            serviceDate: formData.get('service-date'),
            timeSlot: this.selectedSlot,
            additionalNotes: formData.get('notes')
        };

        try {
            // Simulate API call
            await this.submitBooking(bookingData);
            this.showSuccessMessage();
            this.form.reset();
        } catch (error) {
            this.showErrorMessage(error.message);
        }
    }

    // Simulate API call to submit booking
    async submitBooking(bookingData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true, bookingId: 'BK' + Math.random().toString(36).substr(2, 9) });
            }, 1000);
        });
    }

    // Show success message
    showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Booking successful! We will send you a confirmation email shortly.';
        this.form.appendChild(successMessage);
        setTimeout(() => successMessage.remove(), 5000);
    }

    // Show error message
    showErrorMessage(message) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message || 'An error occurred. Please try again.';
        this.form.appendChild(errorMessage);
        setTimeout(() => errorMessage.remove(), 5000);
    }
}

// Initialize the service booking system when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const serviceBooking = new ServiceBooking();
    serviceBooking.init();
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('test-ride-form');
    const timeSlotsContainer = document.getElementById('time-slots');
    const dateInput = document.getElementById('test-ride-date');

    // Set minimum date to today
    const today = new Date();
    const minDate = today.toISOString().split('T')[0];
    dateInput.min = minDate;

    // Set maximum date to 30 days from today
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);
    dateInput.max = maxDate.toISOString().split('T')[0];

    // Generate time slots
    function generateTimeSlots() {
        const slots = [];
        const startTime = 10; // 10 AM
        const endTime = 18; // 6 PM
        const interval = 1; // 1 hour intervals

        for (let hour = startTime; hour < endTime; hour += interval) {
            const time = `${hour}:00`;
            slots.push(time);
        }

        return slots;
    }

    // Display time slots
    function displayTimeSlots() {
        const slots = generateTimeSlots();
        timeSlotsContainer.innerHTML = '';

        slots.forEach(slot => {
            const slotElement = document.createElement('div');
            slotElement.className = 'time-slot';
            slotElement.innerHTML = `
                <input type="radio" name="time-slot" id="slot-${slot}" value="${slot}" required>
                <label for="slot-${slot}">${slot}</label>
            `;
            timeSlotsContainer.appendChild(slotElement);
        });
    }

    // Initialize time slots
    displayTimeSlots();

    // Form validation
    function validateForm() {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            const errorElement = document.getElementById(`${field.id}-error`);
            
            if (!field.value.trim()) {
                errorElement.textContent = 'This field is required';
                isValid = false;
            } else {
                errorElement.textContent = '';
            }

            // Email validation
            if (field.type === 'email' && field.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    errorElement.textContent = 'Please enter a valid email address';
                    isValid = false;
                }
            }

            // Phone validation
            if (field.id === 'phone' && field.value) {
                const phoneRegex = /^\d{10}$/;
                if (!phoneRegex.test(field.value.replace(/\D/g, ''))) {
                    errorElement.textContent = 'Please enter a valid 10-digit phone number';
                    isValid = false;
                }
            }

            // License number validation
            if (field.id === 'license-number' && field.value) {
                const licenseRegex = /^[A-Z]{2}\d{2}\d{4}\d{7}$/;
                if (!licenseRegex.test(field.value)) {
                    errorElement.textContent = 'Please enter a valid driving license number';
                    isValid = false;
                }
            }
        });

        return isValid;
    }

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (validateForm()) {
            // Collect form data
            const formData = new FormData(form);
            const bookingData = {
                vehicleModel: formData.get('vehicle-model'),
                name: formData.get('name'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                city: formData.get('city'),
                preferredDealer: formData.get('preferred-dealer'),
                testRideDate: formData.get('test-ride-date'),
                timeSlot: formData.get('time-slot'),
                licenseNumber: formData.get('license-number'),
                notes: formData.get('notes')
            };

            // Here you would typically send the data to your backend
            console.log('Booking Data:', bookingData);

            // Show success message
            alert('Test ride booking successful! We will contact you shortly to confirm your appointment.');
            form.reset();
        }
    });

    // Update time slots when date changes
    dateInput.addEventListener('change', function() {
        displayTimeSlots();
    });
}); 