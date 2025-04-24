// External JavaScript - scripts.js

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Time-based greeting
    setGreeting();
    
    // Theme toggle functionality
    setupThemeToggle();
    
    // Form validations
    if (document.getElementById('contactForm')) {
        setupContactFormValidation();
    }
    
    if (document.getElementById('surveyForm')) {
        setupSurveyFormValidation();
    }
    
    // Project details toggle
    setupProjectDetailsToggle();
});

// Time-based greeting
function setGreeting() {
    const hour = new Date().getHours();
    let greeting;
    
    if (hour < 12) {
        greeting = "Good morning!";
    } else if (hour < 18) {
        greeting = "Good afternoon!";
    } else {
        greeting = "Good evening!";
    }
    
    const greetingElement = document.getElementById('greeting');
    if (greetingElement) {
        greetingElement.textContent = greeting;
    }
}

// Theme toggle functionality
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update button text
        themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
    
    // Set initial button text
    themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// Contact form validation
function setupContactFormValidation() {
    const form = document.getElementById('contactForm');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const nameInput = document.getElementById('name');
    const messageInput = document.getElementById('message');
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Phone validation regex (simple version)
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    
    form.addEventListener('submit', function(e) {
        let isValid = true;
        
        // Validate name
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required');
            isValid = false;
        } else {
            hideError(nameInput);
        }
        
        // Validate email
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email');
            isValid = false;
        } else {
            hideError(emailInput);
        }
        
        // Validate phone (if provided)
        if (phoneInput.value.trim() !== '' && !phoneRegex.test(phoneInput.value)) {
            showError(phoneInput, 'Please enter a valid phone number');
            isValid = false;
        } else {
            hideError(phoneInput);
        }
        
        // Validate message
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Message is required');
            isValid = false;
        } else {
            hideError(messageInput);
        }
        
        if (!isValid) {
            e.preventDefault();
        }
    });
    
    // Helper functions
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        input.style.borderColor = 'var(--accent-color)';
    }
    
    function hideError(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error');
        errorElement.style.display = 'none';
        input.style.borderColor = '#ddd';
    }
}

// Survey form validation
function setupSurveyFormValidation() {
    const form = document.getElementById('surveyForm');
    const requiredRadios = document.querySelectorAll('input[type="radio"][required]');
    const requiredCheckboxes = document.querySelectorAll('input[type="checkbox"][required]');
    
    form.addEventListener('submit', function(e) {
        let isValid = true;
        
        // Validate required radio buttons
        requiredRadios.forEach(radio => {
            const groupName = radio.name;
            const isChecked = document.querySelector(`input[name="${groupName}"]:checked`);
            
            if (!isChecked) {
                const formGroup = radio.closest('.form-group');
                const errorElement = formGroup.querySelector('.error');
                errorElement.textContent = 'This field is required';
                errorElement.style.display = 'block';
                isValid = false;
            } else {
                const formGroup = radio.closest('.form-group');
                const errorElement = formGroup.querySelector('.error');
                errorElement.style.display = 'none';
            }
        });
        
        // Validate required checkboxes
        requiredCheckboxes.forEach(checkbox => {
            const groupName = checkbox.name;
            const isChecked = document.querySelector(`input[name="${groupName}"]:checked`);
            
            if (!isChecked) {
                const formGroup = checkbox.closest('.form-group');
                const errorElement = formGroup.querySelector('.error');
                errorElement.textContent = 'Please select at least one option';
                errorElement.style.display = 'block';
                isValid = false;
            } else {
                const formGroup = checkbox.closest('.form-group');
                const errorElement = formGroup.querySelector('.error');
                errorElement.style.display = 'none';
            }
        });
        
        if (!isValid) {
            e.preventDefault();
        }
    });
}

// Project details toggle
function setupProjectDetailsToggle() {
    const projectToggles = document.querySelectorAll('.project-toggle');
    
    projectToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const details = this.nextElementSibling;
            details.style.display = details.style.display === 'none' ? 'block' : 'none';
            this.textContent = details.style.display === 'none' ? 'Show Details' : 'Hide Details';
        });
    });
}