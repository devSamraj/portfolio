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
    
    document.getElementById('greeting').textContent = greeting;
}

// Dark/Light mode toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Project detail toggles
document.querySelectorAll('.project-toggle').forEach(button => {
    button.addEventListener('click', function() {
        const details = this.nextElementSibling;
        details.style.display = details.style.display === 'none' ? 'block' : 'none';
    });
});

// Initialize on page load
window.onload = function() {
    setGreeting();
    
    // Add event listeners
    document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
};