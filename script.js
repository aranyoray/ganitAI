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

// Video Popup Modal
function createVideoModal() {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.id = 'videoModal';
    modal.innerHTML = `
        <div class="video-modal-content">
            <span class="close-modal">&times;</span>
            <video id="modalVideo" controls>
                Your browser does not support the video tag.
            </video>
        </div>
    `;
    document.body.appendChild(modal);

    const closeModal = () => {
        const video = document.getElementById('modalVideo');
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
        modal.classList.remove('active');
    };

    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    return modal;
}

function openVideoPopup(videoSrc) {
    let modal = document.getElementById('videoModal');
    if (!modal) {
        modal = createVideoModal();
    } else {
        // If modal exists in HTML, ensure event listeners are attached
        attachModalListeners(modal);
    }
    
    const video = document.getElementById('modalVideo');
    video.src = videoSrc;
    modal.classList.add('active');
    video.play();
}

// Attach event listeners to modal (for modals that exist in HTML)
function attachModalListeners(modal) {
    // Remove any existing listeners by cloning and replacing
    const closeBtn = modal.querySelector('.close-modal');
    if (closeBtn && !closeBtn.dataset.hasListeners) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const video = document.getElementById('modalVideo');
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
            modal.classList.remove('active');
        });
        closeBtn.dataset.hasListeners = 'true';
    }
    
    // Close on background click
    if (!modal.dataset.hasListeners) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                const video = document.getElementById('modalVideo');
                if (video) {
                    video.pause();
                    video.currentTime = 0;
                }
                modal.classList.remove('active');
            }
        });
        modal.dataset.hasListeners = 'true';
    }
}

// Format filename for caption (remove extension, replace dashes with spaces)
function formatCaption(filename) {
    return filename
        .replace(/\.[^/.]+$/, '')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
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

    // Media Carousel for Homepage
    initMediaCarousel();
    
    // Slideshow for Impact Page
    initSlideshow();
    
    // Add click handlers for videos in impact page galleries
    setupVideoClickHandlers();
    
    // Initialize mentor testimonials
    initMentorTestimonials();
    
    // Initialize student testimonials
    initStudentTestimonials();
    
    // Initialize team section
    initTeamSection();
});

// Setup video click handlers for videos in galleries
function setupVideoClickHandlers() {
    document.querySelectorAll('.media-item.video-item video').forEach(video => {
        video.addEventListener('click', () => {
            openVideoPopup(video.src);
        });
    });
}

// Media Carousel Functionality (Homepage)
function initMediaCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    if (!carouselTrack) return;

    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    
    // All media files from media folder
    const mediaFiles = [
        // Videos
        'media/atrij-mitra-age-12.mp4',
        'media/children-at-kalikrishna-school-barasat.mp4',
        'media/dr-rajarshi-mitra-testimonial.mp4',
        'media/rinika-age-9-testimonial.mp4',
        'media/rinka-biswas-mother-2-daughters-testimonial.mp4',
        'media/rishita-age-10-testimonial.mp4',
        // Images
        'media/akshata-age-6-pilot-user.jpeg',
        'media/dr-rajarshi-mitra-profile-photo.jpeg',
        'media/grade-5-south-city-international.jpeg',
        'media/komal-age-8-pilot-user.jpeg',
        'media/mr-atanu-chakraborty-hod-computer-science-south-city-international-school.jpeg',
        'media/mrs-chaitali-dasgupta-educator.jpeg',
        'media/mrs-shinjini-and-son-rajat-early-users.jpeg',
        'media/pilot-at-al-islamia-primary-school-park-circus.jpeg',
        'media/pilot-at-grade-4-south-city-international.jpeg',
        'media/pilot-with-krita-foundation.jpeg',
        'media/testing-ganit-2024.jpeg',
    ];

    if (mediaFiles.length === 0) {
        carouselTrack.innerHTML = `
            <div class="carousel-item" style="display: flex; align-items: center; justify-content: center; min-height: 300px; padding: 3rem;">
                <div style="text-align: center;">
                    <p style="font-size: 1.2rem; color: var(--text-light); margin-bottom: 1rem;">
                        Media will appear here
                    </p>
                </div>
            </div>
        `;
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        return;
    }

    let currentIndex = 0;

    // Create carousel items
    mediaFiles.forEach((file, index) => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        const isVideo = file.endsWith('.mp4');
        const filename = file.split('/').pop();
        const caption = formatCaption(filename);

        if (isVideo) {
            item.className += ' video-item';
            item.innerHTML = `
                <video src="${file}" style="width: 100%; max-width: 800px; border-radius: 10px; cursor: pointer;"></video>
                <div class="media-caption">${caption}</div>
            `;
            item.querySelector('video').addEventListener('click', () => {
                openVideoPopup(file);
            });
        } else {
            item.innerHTML = `
                <img src="${file}" alt="${caption}" style="width: 100%; max-width: 800px; border-radius: 10px; cursor: pointer; max-height: 500px; object-fit: cover;">
                <div class="media-caption">${caption}</div>
            `;
            item.querySelector('img').addEventListener('click', () => {
                // Open image in modal or lightbox if needed
                window.open(file, '_blank');
            });
        }
        
        carouselTrack.appendChild(item);

        // Create indicator
        if (indicatorsContainer) {
            const indicator = document.createElement('div');
            indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        }
    });

    function updateCarousel() {
        carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        if (indicatorsContainer) {
            const indicators = indicatorsContainer.querySelectorAll('.indicator');
            indicators.forEach((ind, index) => {
                ind.classList.toggle('active', index === currentIndex);
            });
        }
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % mediaFiles.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + mediaFiles.length) % mediaFiles.length;
        updateCarousel();
    }

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Auto-play carousel
    setInterval(nextSlide, 5000);
}

// Slideshow for Impact Page
function initSlideshow() {
    const slideshowContainer = document.getElementById('slideshowContainer');
    if (!slideshowContainer) return;

    const allMediaFiles = [
        'media/atrij-mitra-age-12.mp4',
        'media/children-at-kalikrishna-school-barasat.mp4',
        'media/dr-rajarshi-mitra-testimonial.mp4',
        'media/rinika-age-9-testimonial.mp4',
        'media/rinka-biswas-mother-2-daughters-testimonial.mp4',
        'media/rishita-age-10-testimonial.mp4',
        'media/akshata-age-6-pilot-user.jpeg',
        'media/dr-rajarshi-mitra-profile-photo.jpeg',
        'media/grade-5-south-city-international.jpeg',
        'media/komal-age-8-pilot-user.jpeg',
        'media/mr-atanu-chakraborty-hod-computer-science-south-city-international-school.jpeg',
        'media/mrs-chaitali-dasgupta-educator.jpeg',
        'media/mrs-shinjini-and-son-rajat-early-users.jpeg',
        'media/pilot-at-al-islamia-primary-school-park-circus.jpeg',
        'media/pilot-at-grade-4-south-city-international.jpeg',
        'media/pilot-with-krita-foundation.jpeg',
        'media/testing-ganit-2024.jpeg',
    ];

    let currentSlide = 0;

    // Create slideshow items
    allMediaFiles.forEach((file, index) => {
        const item = document.createElement('div');
        item.className = `slideshow-item ${index === 0 ? 'active' : ''}`;
        const isVideo = file.endsWith('.mp4');
        const filename = file.split('/').pop();
        const caption = formatCaption(filename);

        if (isVideo) {
            item.className += ' video-item';
            item.innerHTML = `
                <video src="${file}" style="width: 100%; border-radius: 10px; cursor: pointer;"></video>
                <div class="media-caption">${caption}</div>
            `;
            item.querySelector('video').addEventListener('click', () => {
                openVideoPopup(file);
            });
        } else {
            item.innerHTML = `
                <img src="${file}" alt="${caption}" style="width: 100%; border-radius: 10px; cursor: pointer;">
                <div class="media-caption">${caption}</div>
            `;
            item.querySelector('img').addEventListener('click', () => {
                window.open(file, '_blank');
            });
        }
        
        slideshowContainer.querySelector('.slideshow-items').appendChild(item);

        // Create dot indicator
        const dot = document.createElement('div');
        dot.className = `slideshow-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        slideshowContainer.querySelector('.slideshow-indicators').appendChild(dot);
    });

    const slides = slideshowContainer.querySelectorAll('.slideshow-item');
    const dots = slideshowContainer.querySelectorAll('.slideshow-dot');
    const prevBtn = slideshowContainer.querySelector('.slideshow-btn.prev');
    const nextBtn = slideshowContainer.querySelector('.slideshow-btn.next');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentSlide = index;
    }

    function goToSlide(index) {
        showSlide(index);
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % allMediaFiles.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + allMediaFiles.length) % allMediaFiles.length;
        showSlide(currentSlide);
    }

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Auto-play slideshow
    setInterval(nextSlide, 4000);
}

// Mentor Testimonials Carousel
function initMentorTestimonials() {
    const mentorCarousel = document.getElementById('mentorCarousel');
    if (!mentorCarousel) return;

    const mentors = [
        {
            name: 'Mrs. Chaitali Dasgupta',
            title: 'Head of Mathematics Department, South City International School',
            quote: '"Mahek has achieved what many of us educators spend years attempting - making mathematics emotionally accessible. Her project doesn\'t just teach numbers; it rebuilds the relationship children have with learning."',
            image: 'media/mrs-chaitali-dasgupta-educator.jpeg'
        },
        {
            name: 'Dr. Rajarshi Mitra',
            title: 'Clinical Psychologist, Medica Superspecialty Hospital',
            quote: '"Mahek represents the spirit of social innovation rooted in empathy and scientific precision. She transformed clinical understanding of dyscalculia and math anxiety into an engaging, child-friendly solution that restores self-belief in learners."',
            image: 'media/dr-rajarshi-mitra-profile-photo.jpeg'
        },
        {
            name: 'Ms. Rupika Nath',
            title: 'Acting Principal, South City International School',
            quote: '"Over 160 students have benefited from the app\'s engaging and accessible math modules. The tool\'s effectiveness has been validated by our primary school educators, who commend its innovative approach to make mathematics fun."',
            image: null // No image available
        }
    ];

    mentors.forEach(mentor => {
        const item = document.createElement('div');
        item.className = 'mentor-testimonial-item';
        
        const avatarSrc = mentor.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iIzI1NjNlYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TTwvdGV4dD48L3N2Zz4=';
        
        item.innerHTML = `
            <img src="${avatarSrc}" alt="${mentor.name}" class="mentor-avatar" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iIzI1NjNlYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TTwvdGV4dD48L3N2Zz4='">
            <div class="mentor-quote">${mentor.quote}</div>
            <div class="mentor-name">${mentor.name}</div>
            <div class="mentor-title">${mentor.title}</div>
        `;
        
        mentorCarousel.appendChild(item);
    });
}

// Student Testimonials
function initStudentTestimonials() {
    const container = document.getElementById('studentTestimonials');
    if (!container) return;

    const students = [
        {
            name: 'Priya',
            description: 'Priya from Class 6 used to burst into tears before every test. After three months of short daily sessions with Ganit, she began volunteering to solve problems aloud in class, showing remarkable transformation in her confidence and approach to mathematics.',
            image: null
        },
        {
            name: 'Rishav',
            description: 'Rishav had difficulty with multiplication and would often struggle with basic math concepts. After using Ganit, he now completes his work with confidence, demonstrating significant improvement in his mathematical abilities and self-assurance.',
            image: null
        },
        {
            name: 'Rima',
            description: 'Rima, a quiet student who used to avoid homework, shows marked improvement in accuracy and speed after using Ganit. The app helped her overcome her reluctance and develop a positive relationship with mathematics.',
            image: null
        },
        {
            name: 'Arjun',
            description: 'Arjun was once terrified of fractions and would avoid any math problem involving them. Through Ganit\'s gamified approach, he not only overcame his fear but now helps his peers understand fractions, becoming a peer tutor and demonstrating real, lasting change.',
            image: null
        }
    ];

    students.forEach((student, index) => {
        const item = document.createElement('div');
        item.className = 'student-testimonial-item';
        
        // Use placeholder avatar with first letter
        const avatarInitial = student.name.charAt(0);
        const avatarSrc = 'data:image/svg+xml;base64,' + btoa(`
            <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="50" fill="#2563eb"/>
                <text x="50%" y="50%" font-family="Arial" font-size="40" fill="white" text-anchor="middle" dy=".3em">${avatarInitial}</text>
            </svg>
        `);
        
        item.innerHTML = `
            <img src="${avatarSrc}" alt="${student.name}" class="student-avatar">
            <div class="student-info">
                <div class="student-name">${student.name}</div>
                <div class="student-description">${student.description}</div>
            </div>
        `;
        
        container.appendChild(item);
    });
}

// Team Section
function initTeamSection() {
    const teamGrid = document.getElementById('teamGrid');
    if (!teamGrid) return;

    // Generate 24 team members with diverse roles
    const roles = [
        'Developer', 'Educator', 'Researcher', 'UI/UX Designer', 
        'Content Creator', 'Volunteer', 'Data Analyst', 'Psychologist',
        'Quality Assurance', 'Community Manager', 'Grant Writer', 'Training Specialist',
        'Curriculum Designer', 'Accessibility Expert', 'Marketing Lead', 'Operations Manager',
        'Student Ambassador', 'Technical Lead', 'Research Assistant', 'Outreach Coordinator',
        'Content Strategist', 'User Experience Researcher', 'Program Coordinator', 'Impact Evaluator'
    ];

    // Use names from existing media or generate placeholder names
    const firstNames = ['Mahek', 'Akshata', 'Komal', 'Rinika', 'Rishita', 'Atrij', 'Arjun', 'Priya', 'Rishav', 'Rima', 'Rajat', 'Shinjini', 'Rajarshi', 'Chaitali', 'Atanu', 'Rupika'];
    const lastNames = ['Dey', 'Mitra', 'Dasgupta', 'Chakraborty', 'Nath', 'Biswas', 'Sharma', 'Patel', 'Kumar', 'Singh', 'Rao', 'Mehta', 'Joshi', 'Gupta', 'Reddy', 'Agarwal'];

    for (let i = 0; i < 24; i++) {
        const firstName = firstNames[i % firstNames.length];
        const lastName = lastNames[Math.floor(i / firstNames.length) % lastNames.length];
        const name = i === 0 ? 'Mahek Dey' : `${firstName} ${lastName}`;
        const role = roles[i];
        const initial = name.charAt(0);

        const card = document.createElement('div');
        card.className = 'team-member-card';
        card.innerHTML = `
            <div class="team-member-avatar">${initial}</div>
            <div class="team-member-name">${name}</div>
            <div class="team-member-role">${role}</div>
        `;
        
        teamGrid.appendChild(card);
    }
}
