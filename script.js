// Function to toggle the navigation menu's visibility
function toggleMenu() {
   const menu = document.querySelector('.navigation-menu');
   menu.classList.toggle('visible');
}

// Attach event listener to the hamburger icon
document.querySelector('.hamburger-icon').addEventListener('click', toggleMenu);
// Implement smooth scrolling for navigation links
document.querySelectorAll('.navigation-menu a[href^="#"]').forEach(link => {
   link.addEventListener('click', function (event) {
      event.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
         targetElement.scrollIntoView({ behavior: 'smooth' });
      }
   });
});
// Filter feature for the projects section
function filterProjects(category) {
   const projects = document.querySelectorAll('.project');
   projects.forEach(project => {
      if (category === 'all' || project.classList.contains(category)) {
         project.style.display = 'block';
      } else {
         project.style.display = 'none';
      }
   });
}

// Attach event listeners to filter buttons
document.querySelectorAll('.filter-button').forEach(button => {
   button.addEventListener('click', function () {
      const category = this.getAttribute('data-category');
      filterProjects(category);
   });
});

// Lightbox effect for project images
function openLightbox(imageSrc) {
   const lightbox = document.createElement('div');
   lightbox.classList.add('lightbox');
   lightbox.innerHTML = `
      <div class="lightbox-content">
         <img src="${imageSrc}" alt="Project Image">
         <span class="lightbox-close">&times;</span>
      </div>
   `;
   document.body.appendChild(lightbox);

   // Close lightbox on click
   lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
      document.body.removeChild(lightbox);
   });

   // Close lightbox on outside click
   lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) {
         document.body.removeChild(lightbox);
      }
   });
}

// Attach event listeners to project images
document.querySelectorAll('.project img').forEach(image => {
   image.addEventListener('click', function () {
      openLightbox(this.src);
   });
});

// Form validation with real-time feedback
const contactForm = document.querySelector('#contact-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');
const errorMessages = {
   name: 'Name is required.',
   email: 'Please enter a valid email address.',
   message: 'Message cannot be empty.'
};

// Function to validate email format
function isValidEmail(email) {
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return emailRegex.test(email);
}

// Function to show error message
function showError(input, message) {
   const errorElement = input.nextElementSibling;
   errorElement.textContent = message;
   errorElement.style.display = 'block';
   input.classList.add('input-error');
}

// Function to clear error message
function clearError(input) {
   const errorElement = input.nextElementSibling;
   errorElement.textContent = '';
   errorElement.style.display = 'none';
   input.classList.remove('input-error');
}

// Real-time validation
nameInput.addEventListener('input', () => {
   if (nameInput.value.trim() === '') {
      showError(nameInput, errorMessages.name);
   } else {
      clearError(nameInput);
   }
});

emailInput.addEventListener('input', () => {
   if (!isValidEmail(emailInput.value.trim())) {
      showError(emailInput, errorMessages.email);
   } else {
      clearError(emailInput);
   }
});

messageInput.addEventListener('input', () => {
   if (messageInput.value.trim() === '') {
      showError(messageInput, errorMessages.message);
   } else {
      clearError(messageInput);
   }
});

// Form submission validation
contactForm.addEventListener('submit', (event) => {
   let isValid = true;

   if (nameInput.value.trim() === '') {
      showError(nameInput, errorMessages.name);
      isValid = false;
   }

   if (!isValidEmail(emailInput.value.trim())) {
      showError(emailInput, errorMessages.email);
      isValid = false;
   }

   if (messageInput.value.trim() === '') {
      showError(messageInput, errorMessages.message);
      isValid = false;
   }

   if (!isValid) {
      event.preventDefault();
   }
});