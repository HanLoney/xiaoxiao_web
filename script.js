// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Mouse move effect
document.addEventListener('DOMContentLoaded', function() {
  const mouseMoveEffect = document.getElementById('mouse-move-effect');
  
  document.addEventListener('mousemove', function(event) {
    const x = event.clientX;
    const y = event.clientY;
    
    mouseMoveEffect.style.background = `radial-gradient(600px at ${x}px ${y}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
  });
  
  // For mobile devices, disable the effect
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    mouseMoveEffect.style.display = 'none';
  }
});

// Mobile menu toggle (if needed)
// This is a placeholder for mobile menu functionality
// You would need to add a hamburger button in the HTML and the corresponding menu
/*
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
    });
  }
});
*/

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});