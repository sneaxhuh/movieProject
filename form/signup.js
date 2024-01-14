
const k = document.body.querySelector('.js-ok')

function checkRequirements() {

    if (k.value.length > 9) {
        document.body.querySelector('.symbol1').innerHTML = '&#x2714;'
    }
    if (k.value.length <= 9) {
        document.body.querySelector('.symbol1').innerHTML = '&#x2716;'
    }

    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const specialCharacterRegex = /[^a-zA-Z0-9]/;
    const numberRegex = /\d/;

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





