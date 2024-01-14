document.addEventListener('DOMContentLoaded', function () {

    fetchAboutMe();
});

function fetchAboutMe() {
   
    const aboutMe = localStorage.getItem('aboutMe') || 'No information available';
    updateAboutMeDisplay(aboutMe);
}

function updateAboutMeDisplay(aboutMe) {
    const aboutMeDisplay = document.getElementById('aboutMeDisplay');
    aboutMeDisplay.textContent = aboutMe;
}

function openUpdateAboutMeModal() {
    const modal = document.getElementById('updateAboutMeModal');
    modal.style.display = 'block';
}

function closeUpdateAboutMeModal() {
    const modal = document.getElementById('updateAboutMeModal');
    modal.style.display = 'none';
}

function updateAboutMe() {
    // Get the updated About Me content from the textarea
    const newAboutMe = document.getElementById('newAboutMe').value;

    // Update the display
    updateAboutMeDisplay(newAboutMe);

    // Save the About Me content to local storage
    localStorage.setItem('aboutMe', newAboutMe);

    // Close the modal
    closeUpdateAboutMeModal();
}

function onAboutMeInput() {
    // Handle real-time updates to the About Me content
    const aboutMeDisplay = document.getElementById('aboutMeDisplay');
    const newAboutMe = aboutMeDisplay.textContent;

    // Update the display (optional, you can remove this line if you want to update only when saving)
    updateAboutMeDisplay(newAboutMe);
}
