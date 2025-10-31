// Rising Counter Animation
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// Initialize counters when page loads
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target);
                entry.target.dataset.animated = 'true';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        stat.textContent = '0';
        observer.observe(stat);
    });

    // Video Carousel
    initVideoCarousel();
});

// Video Carousel Functionality
function initVideoCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    
    if (!carouselTrack) return;

    // List of video filenames in the testimonials folder
    // Add your video filenames here (e.g., 'testimonial1.mp4', 'testimonial2.mp4')
    // Supported formats: .mp4, .webm, .ogg, .mov
    const videos = [
        // Add your video filenames here:
        // 'testimonial1.mp4',
        // 'testimonial2.mp4',
        // 'testimonial3.mp4',
        // 'testimonial4.mp4',
    ];
    
    // If no videos, show placeholder message
    if (videos.length === 0) {
        carouselTrack.innerHTML = `
            <div class="carousel-item" style="display: flex; align-items: center; justify-content: center; min-height: 300px; padding: 3rem;">
                <div style="text-align: center;">
                    <p style="font-size: 1.2rem; color: var(--text-light); margin-bottom: 1rem;">
                        Testimonial videos will appear here
                    </p>
                    <p style="font-size: 1rem; color: var(--text-light);">
                        Add your videos to the <code style="background: var(--bg-light); padding: 0.25rem 0.5rem; border-radius: 4px;">testimonials</code> folder and update the videos array in <code style="background: var(--bg-light); padding: 0.25rem 0.5rem; border-radius: 4px;">script.js</code>
                    </p>
                </div>
            </div>
        `;
        // Hide navigation buttons if no videos
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        return;
    }

    let currentIndex = 0;

    // Create carousel items for videos
    videos.forEach((video, index) => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.innerHTML = `
            <video controls style="width: 100%; max-width: 800px; border-radius: 10px;">
                <source src="testimonials/${video}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
        carouselTrack.appendChild(item);

        // Create indicator
        const indicator = document.createElement('div');
        indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    function updateCarousel() {
        carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update indicators
        const indicators = indicatorsContainer.querySelectorAll('.indicator');
        indicators.forEach((ind, index) => {
            ind.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % videos.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + videos.length) % videos.length;
        updateCarousel();
    }

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Auto-play carousel (optional)
    // setInterval(nextSlide, 5000);
}

// Auto-detect videos in testimonials folder (client-side approach)
// Note: This requires a server-side solution for production
// For now, you can manually add videos by creating a config file or updating the script

// Alternative: Create a helper function to manually add videos
function addTestimonialVideo(filename) {
    const carouselTrack = document.getElementById('carouselTrack');
    if (!carouselTrack) return;
    
    const item = document.createElement('div');
    item.className = 'carousel-item';
    item.innerHTML = `
        <video controls style="width: 100%; max-width: 800px; border-radius: 10px; margin: 0 auto; display: block;">
            <source src="testimonials/${filename}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    `;
    carouselTrack.appendChild(item);
}

// You can call this function for each video file you add:
// addTestimonialVideo('testimonial1.mp4');
// addTestimonialVideo('testimonial2.mp4');
// etc.

