
let totalSpace = 1000;
let uploadedFiles = [];

// // Function to validate and upload files
function validateFile(fileInput){
    const file = fileInput.files[0];
    if(file){
        const fileType = file.type.split('/')[1];
        if (['jpg', 'jpeg','png', 'gif'].includes(fileType)){
            // Upload image
            uploadedFiles.push(file);
            updateDiskSpace(file.size);
        } else {
            alert('File format not supported');
        }
    }
}

// Function to update disk space

function updateDiskSpace(fileSize){
    const diskSpaceElement = document.getElementById('diskSpace');
    const remainingSpace = totalSpace - fileSize;
    if (remainingSpace >= 0){
        // Update available space with animation
        diskSpaceElement.textContent = `Available space: ${remainingSpace} MB`;
        updateDiskSpace(remainingSpace);
    } else {
        alert ("There is no available space");
    }
}

// Function to update progress bar
function updateProgressBar(remainingSpace){
    const progressBar = document.getElementById('progressBar');
    const usedSpacePercentage = ((totalSpace - remainingSpace) / totalSpace) * 100;
    progressBar.style.width = usedSpacePercentage + '%';
}

// Function to display uploaded file names
function displayFileNames(){
    const fileListElement = document.getElementById('fileList');
    fileListElement.innerHTML = '';
    uploadedFiles.forEach(file => {
       const fileName = document.createElement('li');
       fileName.textContent = file.name;
       fileListElement.appendChild(fileName);
    });
}


// Function to handle file input change event
function handleFileInput() {
    const fileInput = document.getElementById('upload');
    validateFile(fileInput);
    displayFileNames();
}

// Event listener for file input change
document.getElementById('upload').addEventListener('change', handleFileInput);




// Function to handle multiple file uploads
function validateFiles(fileInput){
    const files = fileInput.files;
    for (let i = 0; i < files.length; i++){
        validateFile(files[i]);
    }
}

// Function to save state in localStorage
function saveState(){
    localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFilesArray));
    localStorage.setItem('uploadedFiles', JSON.stringify(remainingSpace));
}

// Function to retrieve state from localStorage
function retrieveState(){
    const storedFiles = localStorage.getItem('uploadedFiles');
    const storedSpace = localStorage.getItem('remainingSpace');
    if (storedFiles && storedSpace){
        uploadedFiles = JSON.parse(storedFiles);
        totalSpace = Number(storedFiles) + uploadedFiles.reduce((acc, file) => acc + file.size, 0);
        updateDiskSpace(0);
    }
}

// Event listener for page load
window.addEventListener('load', retrieveState);