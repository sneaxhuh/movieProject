
const k = document.body.querySelector('.js-ok')
const uppercaseRegex = /[A-Z]/;
const lowercaseRegex = /[a-z]/;
const specialCharacterRegex = /[^a-zA-Z0-9]/;
const numberRegex = /\d/;
function checkRequirements() {

    if (k.value.length > 9) {
        document.body.querySelector('.symbol1').innerHTML = '&#x2714;'
    }
    if (k.value.length <= 9) {
        document.body.querySelector('.symbol1').innerHTML = '&#x2716;'
    }



    if (uppercaseRegex.test(k.value)) {
        document.body.querySelector('.symbol2').innerHTML = '&#x2714;'
    } else document.body.querySelector('.symbol2').innerHTML = '&#x2716;'
    if (lowercaseRegex.test(k.value)) {
        document.body.querySelector('.symbol4').innerHTML = '&#x2714;'
    } else document.body.querySelector('.symbol4').innerHTML = '&#x2716;'
    if (specialCharacterRegex.test(k.value)) {
        document.body.querySelector('.symbol3').innerHTML = '&#x2714;'
    } else document.body.querySelector('.symbol3').innerHTML = '&#x2716;'
    if (numberRegex.test(k.value)) {
        document.body.querySelector('.symbol5').innerHTML = '&#x2714;'
    } else document.body.querySelector('.symbol5').innerHTML = '&#x2716;'

}

k.type = "password"

function verifyPassword() {
    if (k.value.length > 9 && uppercaseRegex.test(k.value) && lowercaseRegex.test(k.value) && specialCharacterRegex.test(k.value) && numberRegex.test(k.value)) {
        return true
    }
    else return false
}

function validateAndSubmit() {
    var isValidPassword = verifyPassword();

    if (isValidPassword) {
        // Password is valid, proceed with form submission
        document.getElementById('errorMessage').innerText = ''; // Clear any previous error messages
        document.forms[0].submit(); // Assuming your form is the first form on the page
    } else {
        // Password is not valid, display an error message
        document.getElementById('errorMessage').innerText = 'Invalid Password. Please check the requirements.';
    }
}

module.exports = {
    verifyPassword: verifyPassword
};

