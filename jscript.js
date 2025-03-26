
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        
        clearErrors();
        
        
        if (validateForm()) {
            
            alert('Registration Successful! Welcome to Western Institute of Technology');
            form.reset();
        }
    });
    
    function validateForm() {
        let isValid = true;
        
        
        const firstName = document.getElementById('firstName');
        if (firstName.value.trim() === '') {
            showError(firstName, 'First Name is required');
            isValid = false;
        }
        
        
        const lastName = document.getElementById('lastName');
        if (lastName.value.trim() === '') {
            showError(lastName, 'Last Name is required');
            isValid = false;
        }
        
        
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        
        const birthDate = document.getElementById('birthDate');
        if (birthDate.value === '') {
            showError(birthDate, 'Birth Date is required');
            isValid = false;
        } else {
            const selectedDate = new Date(birthDate.value);
            const currentDate = new Date();
            const minAge = new Date(currentDate.getFullYear() - 16, currentDate.getMonth(), currentDate.getDate());
            
            if (selectedDate > currentDate) {
                showError(birthDate, 'Birth date cannot be in the future');
                isValid = false;
            } else if (selectedDate > minAge) {
                showError(birthDate, 'You must be at least 16 years old');
                isValid = false;
            }
        }
        
        
        const username = document.getElementById('username');
        if (username.value.trim() === '' || username.value.length < 4) {
            showError(username, 'Username must be at least 4 characters long');
            isValid = false;
        }
        
        
        const password = document.getElementById('password');
        if (password.value.length < 8) {
            showError(password, 'Password must be at least 8 characters long');
            isValid = false;
        }
        
        
        const genderInputs = document.getElementsByName('gender');
        let genderSelected = false;
        for (let radio of genderInputs) {
            if (radio.checked) {
                genderSelected = true;
                break;
            }
        }
        if (!genderSelected) {
            const genderError = document.createElement('div');
            genderError.className = 'error';
            genderError.textContent = 'Please select a gender';
            document.querySelector('.gender-options').appendChild(genderError);
            isValid = false;
        }
        
        
        const course = document.getElementById('course');
        if (course.value === '') {
            showError(course, 'Please select a course');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showError(inputElement, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = message;
        
        inputElement.parentNode.appendChild(errorDiv);
        inputElement.classList.add('error-input');
    }
    
    function clearErrors() {
        
        const errors = document.querySelectorAll('.error');
        errors.forEach(error => error.remove());
        
        
        const errorInputs = document.querySelectorAll('.error-input');
        errorInputs.forEach(input => input.classList.remove('error-input'));
    }
});
