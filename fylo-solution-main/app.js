

function validateFile(fileInput) {
    const file = fileInput.files[0];
    if (file) {
        const fileType = file.type.split('/')[1];
        if (['jpg', 'jpeg', 'png', 'gif'].includes(fileType)) {
            // Upload image
            uploadedFiles.push(file);
            updateDiskSpace(file.size);
        } else {
            alert('File format not supported');
        }
    }
}

const uploadImage = document.getElementById('uploadImage');
const uploadInput = document.getElementById('upload');

uploadImage.addEventListener('click', () => {
    uploadInput.click(); // Programmatically trigger click event on file input
    validateFile(uploadInput);
});
