// Site Visit Counter
function initVisitCounter() {
    // Get current visit count from localStorage
    let visitCount = localStorage.getItem('sulak-visit-count');
    
    // If no count exists, start at 0
    if (!visitCount) {
        visitCount = 0;
    } else {
        visitCount = parseInt(visitCount);
    }
    
    // Increment the count
    visitCount++;
    
    // Store the new count
    localStorage.setItem('sulak-visit-count', visitCount);
    
    // Display the count with animation
    const countElement = document.getElementById('visit-count');
    if (countElement) {
        // Animate the number counting up
        animateCounter(countElement, visitCount);
    }
}

// Animate the counter number
function animateCounter(element, targetCount) {
    let currentCount = 0;
    const increment = Math.max(1, Math.floor(targetCount / 50));
    const duration = 2000; // 2 seconds
    const stepTime = duration / (targetCount / increment);
    
    const timer = setInterval(() => {
        currentCount += increment;
        if (currentCount >= targetCount) {
            currentCount = targetCount;
            clearInterval(timer);
        }
        element.textContent = currentCount.toLocaleString();
    }, stepTime);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initVisitCounter();
});