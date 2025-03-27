
document.addEventListener('DOMContentLoaded', () => {

    if (!localStorage.getItem('files')) {
        localStorage.setItem('files', JSON.stringify([]));
    }
    
    if (window.location.pathname.includes('upload.html')) {
        setupUploadPage();
    }
    
    // Download page functionality
    if (window.location.pathname.includes('download.html')) {
        setupDownloadPage();
    }
});

// Encryption function using Web Crypto API
async function encryptFile(file, key) {
    const fileData = await readFileAsArrayBuffer(file);
    const cryptoKey = await window.crypto.subtle.importKey(
        'raw',
        key,
        { name: 'AES-GCM' },
        false,
        ['encrypt']
    );
    
    // Generate IV (Initialization Vector)
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    
    // Encrypt the file
    const encryptedData = await window.crypto.subtle.encrypt(
        {
            name: 'AES-GCM',
            iv: iv
        },
        cryptoKey,
        fileData
    );
    
    return {
        iv: Array.from(iv),
        encryptedData: Array.from(new Uint8Array(encryptedData))
    };
}

// Decryption function
async function decryptFile(encryptedFile, key) {
    const cryptoKey = await window.crypto.subtle.importKey(
        'raw',
        key,
        { name: 'AES-GCM' },
        false,
        ['decrypt']
    );
    
    const decryptedData = await window.crypto.subtle.decrypt(
        {
            name: 'AES-GCM',
            iv: new Uint8Array(encryptedFile.iv)
        },
        cryptoKey,
        new Uint8Array(encryptedFile.encryptedData)
    );
    
    return new Blob([decryptedData], { type: 'application/octet-stream' });
}

// Helper function to read file as ArrayBuffer
function readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}

// Generate a random key for encryption
function generateEncryptionKey() {
    return window.crypto.getRandomValues(new Uint8Array(32));
}

// Convert Uint8Array to hex string for display
function keyToHex(key) {
    return Array.from(key).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Convert hex string back to Uint8Array
function hexToKey(hex) {
    const bytes = [];
    for (let i = 0; i < hex.length; i += 2) {
        bytes.push(parseInt(hex.substr(i, 2), 16));
    }
    return new Uint8Array(bytes);
}

function setupUploadPage() {
    const dropArea = document.getElementById('dropArea');
    const fileInput = document.getElementById('fileInput');
    const browseBtn = document.getElementById('browseBtn');
    const uploadBtn = document.getElementById('uploadBtn');
    const selectedFilesList = document.getElementById('selectedFiles');
    const fileListDiv = document.getElementById('fileList');
    const uploadProgress = document.getElementById('uploadProgress');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const uploadSuccess = document.getElementById('uploadSuccess');
    const uploadError = document.getElementById('uploadError');
    
    let filesToUpload = [];
    let encryptionKeys = {};
    
    // Browse files
    browseBtn.addEventListener('click', () => fileInput.click());
    
    // Handle file selection
    fileInput.addEventListener('change', handleFiles);
    
    // Drag and drop events
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        dropArea.classList.add('border-blue-500', 'bg-blue-50');
    }
    
    function unhighlight() {
        dropArea.classList.remove('border-blue-500', 'bg-blue-50');
    }
    
    // Handle dropped files
    dropArea.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        fileInput.files = dt.files;
        handleFiles({ target: fileInput });
    });
    
    // Process selected files
    function handleFiles(e) {
        filesToUpload = Array.from(e.target.files);
        
        if (filesToUpload.length > 0) {
            fileListDiv.classList.remove('hidden');
            selectedFilesList.innerHTML = '';
            
            filesToUpload.forEach((file, index) => {
                // Generate encryption key for each file
                const key = generateEncryptionKey();
                encryptionKeys[index] = key;
                
                const li = document.createElement('li');
                li.className = 'flex justify-between items-center bg-gray-50 p-2 rounded';
                li.innerHTML = `
                    <div>
                        <span>${file.name} (${formatFileSize(file.size)})</span>
                        <div class="text-xs text-gray-500 mt-1">
                            <span class="font-medium">Decryption Key:</span> 
                            <span class="key-display">${keyToHex(key)}</span>
                            <button class="copy-key ml-2 text-blue-500 hover:text-blue-700" data-key="${keyToHex(key)}">
                                Copy
                            </button>
                        </div>
                    </div>
                    <button data-index="${index}" class="text-red-500 hover:text-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                    </button>
                `;
                selectedFilesList.appendChild(li);
            });
            
            // Add event listeners to remove buttons
            document.querySelectorAll('[data-index]').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const index = e.target.closest('button').getAttribute('data-index');
                    filesToUpload.splice(index, 1);
                    delete encryptionKeys[index];
                    handleFiles({ target: { files: filesToUpload } });
                    if (filesToUpload.length === 0) {
                        fileListDiv.classList.add('hidden');
                        uploadBtn.disabled = true;
                    }
                });
            });
            
            // Add event listeners to copy key buttons
            document.querySelectorAll('.copy-key').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const key = e.target.getAttribute('data-key');
                    navigator.clipboard.writeText(key);
                    e.target.textContent = 'Copied!';
                    setTimeout(() => {
                        e.target.textContent = 'Copy';
                    }, 2000);
                });
            });
            
            uploadBtn.disabled = false;
        } else {
            fileListDiv.classList.add('hidden');
            uploadBtn.disabled = true;
        }
    }
    
    // Upload files
    uploadBtn.addEventListener('click', async () => {
        if (filesToUpload.length === 0) return;
        
        uploadBtn.disabled = true;
        uploadProgress.classList.remove('hidden');
        uploadSuccess.classList.add('hidden');
        uploadError.classList.add('hidden');
        
        try {
            // Encrypt and save each file
            for (let i = 0; i < filesToUpload.length; i++) {
                const file = filesToUpload[i];
                const key = encryptionKeys[i];
                
                // Update progress
                const progress = Math.floor((i / filesToUpload.length) * 100);
                progressBar.style.width = `${progress}%`;
                progressText.textContent = `Encrypting and uploading ${i + 1} of ${filesToUpload.length} files...`;
                
                // Encrypt the file
                const encryptedFile = await encryptFile(file, key);
                
                // Save to "storage"
                const description = document.getElementById('fileDescription').value;
                const files = JSON.parse(localStorage.getItem('files'));
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                
                files.push({
                    id: Date.now().toString(),
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    description,
                    uploadedBy: currentUser.email,
                    uploadDate: new Date().toISOString(),
                    encryptedData: encryptedFile.encryptedData,
                    iv: encryptedFile.iv,
                    // Store the key hex for demonstration (in real app, the user would keep this)
                    keyHex: keyToHex(key)
                });
                
                localStorage.setItem('files', JSON.stringify(files));
            }
            
            // Complete progress
            progressBar.style.width = '100%';
            progressText.textContent = 'Upload complete!';
            
            uploadSuccess.innerHTML = `
                <p>${filesToUpload.length} file(s) uploaded successfully!</p>
                <div class="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                    <p class="font-medium text-yellow-800">Important:</p>
                    <p class="text-sm text-yellow-700">Make sure to save the decryption keys for each file. 
                    You'll need them to download the files later.</p>
                </div>
            `;
            uploadSuccess.classList.remove('hidden');
            
            // Reset form
            filesToUpload = [];
            encryptionKeys = {};
            fileInput.value = '';
            fileListDiv.classList.add('hidden');
            document.getElementById('fileDescription').value = '';
            uploadBtn.disabled = true;
            
            // Hide progress after a delay
            setTimeout(() => {
                uploadProgress.classList.add('hidden');
                progressBar.style.width = '0%';
                progressText.textContent = '0% uploaded';
            }, 2000);
        } catch (error) {
            console.error('Upload error:', error);
            uploadError.textContent = 'An error occurred during upload. Please try again.';
            uploadError.classList.remove('hidden');
            uploadBtn.disabled = false;
        }
    });
}

function setupDownloadPage() {
    const filesContainer = document.getElementById('filesContainer');
    const noFilesMessage = document.getElementById('noFilesMessage');
    const searchInput = document.getElementById('searchInput');
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let files = JSON.parse(localStorage.getItem('files')) || [];
    
    // Filter files by current user
    files = files.filter(file => file.uploadedBy === currentUser.email);
    
    // Display files
    function displayFiles(filesToDisplay) {
        filesContainer.innerHTML = '';
        
        if (filesToDisplay.length === 0) {
            noFilesMessage.classList.remove('hidden');
            filesContainer.classList.add('hidden');
            return;
        }
        
        noFilesMessage.classList.add('hidden');
        filesContainer.classList.remove('hidden');
        
        filesToDisplay.forEach(file => {
            const fileElement = document.createElement('div');
            fileElement.className = 'bg-gray-50 p-4 rounded-lg';
            fileElement.innerHTML = `
                <div class="flex justify-between items-center mb-2">
                    <div>
                        <h3 class="font-medium">${file.name}</h3>
                        <p class="text-sm text-gray-500">${formatFileSize(file.size)} • ${new Date(file.uploadDate).toLocaleDateString()}</p>
                    </div>
                    <button data-id="${file.id}" class="download-btn px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Download
                    </button>
                </div>
                ${file.description ? `<p class="text-sm text-gray-600 mb-2">${file.description}</p>` : ''}
                <div class="key-input-container hidden mt-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Enter decryption key:</label>
                    <div class="flex">
                        <input type="text" class="decryption-key flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Paste the decryption key here">
                        <button class="decrypt-btn px-4 py-2 bg-green-600 text-white rounded-r-md hover:bg-green-700">
                            Decrypt & Download
                        </button>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">Key format: 64-character hex string</p>
                </div>
                <div class="key-hint text-xs text-gray-500 mt-1">
                    <span class="font-medium">Hint:</span> Your decryption key was: ${file.keyHex}
                </div>
            `;
            filesContainer.appendChild(fileElement);
        });
        
        // Add event listeners to download buttons
        document.querySelectorAll('.download-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const fileId = e.target.getAttribute('data-id');
                const fileContainer = e.target.closest('.bg-gray-50');
                const keyInputContainer = fileContainer.querySelector('.key-input-container');
                const keyHint = fileContainer.querySelector('.key-hint');
                
                // Toggle the key input field
                keyInputContainer.classList.toggle('hidden');
                keyHint.classList.toggle('hidden');
            });
        });
        
        // Add event listeners to decrypt buttons
        document.querySelectorAll('.decrypt-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const fileContainer = e.target.closest('.bg-gray-50');
                const keyInput = fileContainer.querySelector('.decryption-key');
                const fileId = fileContainer.querySelector('.download-btn').getAttribute('data-id');
                const file = files.find(f => f.id === fileId);
                
                if (!file) return;
                
                const keyHex = keyInput.value.trim();
                
                // Validate key
                if (!keyHex || keyHex.length !== 64 || !/^[0-9a-fA-F]+$/.test(keyHex)) {
                    alert('Please enter a valid 64-character hex decryption key');
                    return;
                }
                
                try {
                    e.target.disabled = true;
                    e.target.textContent = 'Decrypting...';
                    
                    // Convert hex key to Uint8Array
                    const key = hexToKey(keyHex);
                    
                    // Prepare encrypted file data
                    const encryptedFile = {
                        encryptedData: file.encryptedData,
                        iv: file.iv
                    };
                    
                    // Decrypt the file
                    const decryptedBlob = await decryptFile(encryptedFile, key);
                    
                    // Create download link
                    const url = URL.createObjectURL(decryptedBlob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = file.name;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    
                    e.target.textContent = 'Decrypt & Download';
                    e.target.disabled = false;
                    
                    // Hide the key input
                    fileContainer.querySelector('.key-input-container').classList.add('hidden');
                    fileContainer.querySelector('.key-hint').classList.remove('hidden');
                } catch (error) {
                    console.error('Decryption error:', error);
                    alert('Decryption failed. Please check your key and try again.');
                    e.target.textContent = 'Decrypt & Download';
                    e.target.disabled = false;
                }
            });
        });
    }
    
    // Initial display
    displayFiles(files);
    
    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredFiles = files.filter(file => 
            file.name.toLowerCase().includes(searchTerm) || 
            (file.description && file.description.toLowerCase().includes(searchTerm))
        );
        displayFiles(filteredFiles);
    });
}

// Helper function to format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}
// ... (previous encryption/decryption functions remain the same)

function setupDownloadPage() {
    const filesContainer = document.getElementById('filesContainer');
    const noFilesMessage = document.getElementById('noFilesMessage');
    const searchInput = document.getElementById('searchInput');
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let files = JSON.parse(localStorage.getItem('files')) || [];
    
    // Filter files by current user
    files = files.filter(file => file.uploadedBy === currentUser.email);
    
    // Display files
    function displayFiles(filesToDisplay) {
        filesContainer.innerHTML = '';
        
        if (filesToDisplay.length === 0) {
            noFilesMessage.classList.remove('hidden');
            filesContainer.classList.add('hidden');
            return;
        }
        
        noFilesMessage.classList.add('hidden');
        filesContainer.classList.remove('hidden');
        
        filesToDisplay.forEach(file => {
            const fileElement = document.createElement('div');
            fileElement.className = 'bg-gray-50 p-4 rounded-lg mb-4';
            fileElement.innerHTML = `
                <div class="flex justify-between items-center mb-2">
                    <div>
                        <h3 class="font-medium">${file.name}</h3>
                        <p class="text-sm text-gray-500">${formatFileSize(file.size)} • ${new Date(file.uploadDate).toLocaleDateString()}</p>
                    </div>
                    <div class="flex space-x-2">
                        <button data-id="${file.id}" class="download-btn px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                            Download
                        </button>
                        <button data-id="${file.id}" class="delete-btn px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm">
                            Delete
                        </button>
                    </div>
                </div>
                ${file.description ? `<p class="text-sm text-gray-600 mb-2">${file.description}</p>` : ''}
                <div class="key-input-container hidden mt-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Enter decryption key:</label>
                    <div class="flex">
                        <input type="text" class="decryption-key flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Paste the decryption key here">
                        <button class="decrypt-btn px-4 py-2 bg-green-600 text-white rounded-r-md hover:bg-green-700">
                            Decrypt & Download
                        </button>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">Key format: 64-character hex string</p>
                </div>
                <div class="key-hint text-xs text-gray-500 mt-1">
                    <span class="font-medium">Hint:</span> Your decryption key was: ${file.keyHex}
                </div>
            `;
            filesContainer.appendChild(fileElement);
        });
        
        // Add event listeners to download buttons
        document.querySelectorAll('.download-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const fileId = e.target.getAttribute('data-id');
                const fileContainer = e.target.closest('.bg-gray-50');
                const keyInputContainer = fileContainer.querySelector('.key-input-container');
                const keyHint = fileContainer.querySelector('.key-hint');
                
                // Toggle the key input field
                keyInputContainer.classList.toggle('hidden');
                keyHint.classList.toggle('hidden');
            });
        });
        
        // Add event listeners to decrypt buttons
        document.querySelectorAll('.decrypt-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const fileContainer = e.target.closest('.bg-gray-50');
                const keyInput = fileContainer.querySelector('.decryption-key');
                const fileId = fileContainer.querySelector('.download-btn').getAttribute('data-id');
                const file = files.find(f => f.id === fileId);
                
                if (!file) return;
                
                const keyHex = keyInput.value.trim();
                
                // Validate key
                if (!keyHex || keyHex.length !== 64 || !/^[0-9a-fA-F]+$/.test(keyHex)) {
                    alert('Please enter a valid 64-character hex decryption key');
                    return;
                }
                
                try {
                    e.target.disabled = true;
                    e.target.textContent = 'Decrypting...';
                    
                    // Convert hex key to Uint8Array
                    const key = hexToKey(keyHex);
                    
                    // Prepare encrypted file data
                    const encryptedFile = {
                        encryptedData: file.encryptedData,
                        iv: file.iv
                    };
                    
                    // Decrypt the file
                    const decryptedBlob = await decryptFile(encryptedFile, key);
                    
                    // Create download link
                    const url = URL.createObjectURL(decryptedBlob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = file.name;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    
                    e.target.textContent = 'Decrypt & Download';
                    e.target.disabled = false;
                    
                    // Hide the key input
                    fileContainer.querySelector('.key-input-container').classList.add('hidden');
                    fileContainer.querySelector('.key-hint').classList.remove('hidden');
                } catch (error) {
                    console.error('Decryption error:', error);
                    alert('Decryption failed. Please check your key and try again.');
                    e.target.textContent = 'Decrypt & Download';
                    e.target.disabled = false;
                }
            });
        });
        
        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const fileId = e.target.getAttribute('data-id');
                if (confirm('Are you sure you want to delete this file? This action cannot be undone.')) {
                    deleteFile(fileId);
                }
            });
        });
    }
    
    // Function to delete a file
    function deleteFile(fileId) {
        let files = JSON.parse(localStorage.getItem('files')) || [];
        files = files.filter(file => file.id !== fileId);
        localStorage.setItem('files', JSON.stringify(files));
        
        // Refresh the display
        files = files.filter(file => file.uploadedBy === currentUser.email);
        displayFiles(files);
        
        // Show message if no files left
        if (files.length === 0) {
            noFilesMessage.classList.remove('hidden');
            filesContainer.classList.add('hidden');
        }
    }
    
    // Initial display
    displayFiles(files);
    
    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredFiles = files.filter(file => 
            file.name.toLowerCase().includes(searchTerm) || 
            (file.description && file.description.toLowerCase().includes(searchTerm))
        );
        displayFiles(filteredFiles);
    });
}
