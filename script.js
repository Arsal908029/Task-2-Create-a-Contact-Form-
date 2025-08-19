document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    const successMessage = document.getElementById('successMessage');
    
    // Show error function
    function showError(input, errorElement, message) {
        const inputGroup = input.parentElement;
        inputGroup.classList.add('error');
        inputGroup.querySelector('.error-icon').style.display = 'block';
        inputGroup.querySelector('.success-icon').style.display = 'none';
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    // Show success function
    function showSuccess(input) {
        const inputGroup = input.parentElement;
        inputGroup.classList.remove('error');
        inputGroup.querySelector('.error-icon').style.display = 'none';
        inputGroup.querySelector('.success-icon').style.display = 'block';
        const errorElement = inputGroup.nextElementSibling;
        errorElement.style.display = 'none';
    }
    
    // Validate email format
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Validate required fields
    function isRequired(value) {
        return value.trim() !== '';
    }
    
    // Validate form on submit
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Validate full name
        if (!isRequired(fullName.value)) {
            showError(fullName, document.getElementById('nameError'), 'Full name is required');
            isValid = false;
        } else {
            showSuccess(fullName);
        }
        
        // Validate email
        if (!isRequired(email.value)) {
            showError(email, document.getElementById('emailError'), 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, document.getElementById('emailError'), 'Please enter a valid email address');
            isValid = false;
        } else {
            showSuccess(email);
        }
        
        // Validate subject
        if (!isRequired(subject.value)) {
            showError(subject, document.getElementById('subjectError'), 'Subject is required');
            isValid = false;
        } else {
            showSuccess(subject);
        }
        
        // Validate message
        if (!isRequired(message.value)) {
            showError(message, document.getElementById('messageError'), 'Message is required');
            isValid = false;
        } else {
            showSuccess(message);
        }
        
        // If form is valid, show success message
        if (isValid) {
            successMessage.style.display = 'block';
            form.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    });
    
    // Real-time validation
    const inputs = [fullName, email, subject, message];
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (input.type === 'email') {
                if (isValidEmail(input.value)) {
                    showSuccess(input);
                } else if (isRequired(input.value)) {
                    showError(input, input.nextElementSibling, 'Please enter a valid email address');
                }
            } else {
                if (isRequired(input.value)) {
                    showSuccess(input);
                }
            }
        });
        
        input.addEventListener('blur', function() {
            if (!isRequired(input.value)) {
                const errorId = input.id + 'Error';
                showError(input, document.getElementById(errorId), `${input.previousElementSibling.textContent} is required`);
            }
        });
    });
});