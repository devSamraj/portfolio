function validateContactForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Name validation
    if (name.trim() === '') {
        alert('Please enter your name');
        return false;
    }
    
    // Email validation with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    // Message validation
    if (message.trim() === '') {
        alert('Please enter your message');
        return false;
    }
    
    return true;
}

// Add event listener to contact form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    if (!validateContactForm()) {
        e.preventDefault();
    }
});