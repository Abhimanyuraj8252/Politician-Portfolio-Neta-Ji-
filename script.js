// CONFIGURATION: Change this email when client requests
const RECIPIENT_EMAIL = "gamingwarrior961@gmail.com"; 

// Mobile Menu Toggle
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Lightbox Logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');

function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxCaption.textContent = caption;
    lightbox.classList.remove('hidden');
    // Small delay to allow display flex to apply before opacity transition
    setTimeout(() => {
        lightbox.classList.add('active');
    }, 10);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeLightbox() {
    lightbox.classList.remove('active');
    setTimeout(() => {
        lightbox.classList.add('hidden');
        lightboxImg.src = '';
    }, 300);
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close lightbox on clicking outside
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Floating Share Button Logic
function toggleShare() {
    const shareOptions = document.getElementById('shareOptions');
    shareOptions.classList.toggle('show');
}

// Form Submission Logic
// Custom Modal Logic
const successModal = document.getElementById('successModal');
const modalContent = document.getElementById('modalContent');

function showSuccessModal() {
    successModal.classList.remove('opacity-0', 'pointer-events-none');
    modalContent.classList.remove('scale-90');
    modalContent.classList.add('scale-100');
    document.body.style.overflow = 'hidden'; 
}

function closeSuccessModal() {
    successModal.classList.add('opacity-0', 'pointer-events-none');
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-90');
    document.body.style.overflow = 'auto';
}

// Form Submission Logic
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const button = form.querySelector('button');
    const originalText = button.innerText;
    
    // Loading State
    button.innerText = 'Sending...';
    button.disabled = true;
    
    // Prepare Data
    const formData = new FormData(form);
    
    // Optional: Add FormSubmit configurations
    // formData.append('_captcha', 'false'); // Uncomment to disable captcha if needed
    // formData.append('_template', 'table'); // Nice email format
    
    const endpoint = `https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`;

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Success UI Changes
            button.innerText = 'Sent Successfully!';
            button.classList.remove('from-saffron', 'to-orange-600');
            button.classList.add('from-green-500', 'to-green-700');
            
            showSuccessModal();
            form.reset();
            
            // Revert button after delay
            setTimeout(() => {
                button.innerText = originalText;
                button.disabled = false;
                button.classList.add('from-saffron', 'to-orange-600');
                button.classList.remove('from-green-500', 'to-green-700');
            }, 3000);
        } else {
             throw new Error('Form submission failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please check your internet connection or try again later.'); 
        button.innerText = originalText;
        button.disabled = false;
    }
}

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.gallery-item, .bg-gray-50').forEach(el => {
    el.style.opacity = '0'; // Prepare for animation
    observer.observe(el);
});
