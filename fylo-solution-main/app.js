const totalSize = 10;
let usedSize = 0;
let percentage;
let sizeLeft;
const totalSizeElement = document.getElementById('totalSize');
const sizeLeftElement = document.getElementById('sizeLeft');
const progressBarElement = document.getElementById('progressBar');
const usedSizeElement = document.getElementById('sizeUsed');
const selectedFileElement = document.getElementById('selectedFile');

const shortedSizeNumber = (x) =>{
    return Number.parseFloat(x).toFixed(2);
};

const init = () =>{
  usedSize = Number(window.localStorage.getItem('usedSize'));
  percentage = 100 * (usedSize / totalSize) +4;
  sizeLeft = totalSize - usedSize;
  totalSizeElement.innerText = totalSize + ' MB';
  sizeLeftElement.innerText = shortedSizeNumber(sizeLeft);
  usedSizeElement.innerText = shortedSizeNumber(usedSize) + ' MB';
  progressBarElement.style.width = percentage.toString(10) + '%';
};

const addCurrentFileSize = (s) => {
    s /= Math.pow(1024, 2);
    if (usedSize + s < totalSize) {
        usedSize += s;
        sizeLeft = totalSize - usedSize;
        percentage = 100 * (usedSize / totalSize) - 4;
        usedSizeElement.innerText = shortedSizeNumber(usedSize) + ' MB';
        sizeLeftElement.innerText = shortedSizeNumber(sizeLeft);
        progressBarElement.style.width = percentage.toString(10) + '%';
        progressBarElement.style.transition = 'width 0.5s ease 0.1s';
    } else {
        alert('There is not enough space on the disk');
    }
};

const addFileBox = (name, size) => {
    const span = document.createElement('span');
    span.innerText = name;
    const removeButton = document.createElement('button');
    removeButton.innerText = 'X';
    removeButton.classList.add('removeButton');
    removeButton.addEventListener('click', () =>{
        span.remove();
        addCurrentFileSize(-size);
    });
    span.appendChild(removeButton);
    selectedFileElement.appendChild(span);
};


// Function to handle file input change event
const handleFileInput = (e) => {
    const fileName = e.value.split('\\').pop();
    const isImgFile = new RegExp('(.(gif|jpeg|jpg|png|svg))').test(fileName);
    if (isImgFile) {
        const file = e.files[0];
        addCurrentFileSize(file.size);
        addFileBox(fileName, file.size);
    } else {
        alert('File ' + fileName + ' Type Not Supported');
    }
};

const clear = document.getElementById('clear');
clear.addEventListener('click', () => {
    usedSize = 0;
    init()
});

// main start
init();
