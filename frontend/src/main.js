import './style.css'

document.addEventListener('DOMContentLoaded', () => {
    const footerContainer = document.querySelector('#footer .container');
    if (footerContainer && !footerContainer.querySelector('.footer-links')) {
        const footerNav = document.createElement('nav');
        footerNav.className = 'footer-links';
        footerNav.setAttribute('aria-label', 'Rechtliche Links');
        footerNav.innerHTML = '<a href="#impressum">Impressum</a>';
        footerContainer.appendChild(footerNav);
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Unobserve after showing
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInElements.forEach(el => observer.observe(el));

    // Dynamic Hero Video/Image behavior placeholder
    // In the future, this is where the video logic will go
    const heroImage = document.getElementById('heroImage');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrollPercent = window.scrollY / window.innerHeight;
            if (scrollPercent <= 1) {
                heroImage.style.transform = `scale(${1 + (scrollPercent * 0.2)})`;
                heroImage.style.filter = `blur(${scrollPercent * 5}px) brightness(${1 - (scrollPercent * 0.4)})`;
            }
        });
    }

    // Scroll reveal for buttons/CTAs with a small delay
    const btns = document.querySelectorAll('.btn');
    btns.forEach((btn, index) => {
        btn.style.transitionDelay = `${index * 0.2}s`;
    });

    console.log('Hekto Landing Page Initialized');

    // Video Hover Logic
    const glueVideo = document.getElementById('glue-video');
    if (glueVideo) {
        glueVideo.playbackRate = 2.0;
        let isReversing = false;
        let seekStep = null;

        const stopReversing = () => {
            isReversing = false;
            if (seekStep) {
                glueVideo.removeEventListener('seeked', seekStep);
                seekStep = null;
            }
        };

        const playBackwards = () => {
            console.log('[HEKTO] Video ended. Playing backwards...');
            isReversing = true;
            glueVideo.pause();

            seekStep = () => {
                if (!isReversing) return;
                
                if (glueVideo.currentTime <= 0.1) {
                    glueVideo.currentTime = 0;
                    stopReversing();
                    console.log('[HEKTO] Reached start. Waiting for next hover.');
                } else {
                    // Step backward by 0.1s. Browser will fire 'seeked' when the frame is ready
                    glueVideo.currentTime -= 0.1;
                }
            };

            glueVideo.addEventListener('seeked', seekStep);
            
            // Start the reverse sequence
            if (glueVideo.currentTime > 0.1) {
                glueVideo.currentTime -= 0.1;
            }
        };

        const container = glueVideo.closest('.showcase-item');
        if (container) {
            container.addEventListener('mouseenter', () => {
                console.log('[HEKTO] Mouse enter. Starting video...');
                stopReversing();
                
                if (glueVideo.ended || glueVideo.currentTime <= 0.1) {
                    glueVideo.currentTime = 0;
                }
                glueVideo.play().catch(e => console.error('[HEKTO] Play error:', e));
            });

            glueVideo.addEventListener('ended', () => {
                playBackwards();
            });
        }
    }

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other open items for cleaner UX 
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer) otherAnswer.style.maxHeight = null;
                });

                // Toggle current
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 40 + "px"; // 40px for padding
                }
            });
        }
    });
    // Carousel Logic (Infinite Loop Style)
    const carousel = document.querySelector('.reviews-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (carousel && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            const last = carousel.lastElementChild;
            if (last) {
                // Add tiny animation class if wanted, or just prepend for instant swap
                carousel.prepend(last);
            }
        });

        nextBtn.addEventListener('click', () => {
            const first = carousel.firstElementChild;
            if (first) {
                carousel.append(first);
            }
        });
    }

});
