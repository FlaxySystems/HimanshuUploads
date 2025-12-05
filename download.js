// Sample file data with your file
const filesData = [
    { 
        id: 1, 
        name: 'The Colonial Era in India Notes CBSE 8', 
        size: '2. 5 MB', 
        downloads: 1234, 
        icon: '📚', 
        url: 'https://raw.githubusercontent.com/HimanshuGurjarIN/sst/main/THE_COLONIAL_ERA_IN_INDIA_(%20Notes)%5B1%5D.pdf' 
    },
    { id: 2, name: 'React Tutorial', size: '1.8 MB', downloads: 856, icon: '⚛️', url: '#' },
    { id: 3, name: 'Web Development Guide', size: '4.2 MB', downloads: 567, icon: '🌐', url: '#' },
    { id: 4, name: 'UI Design Mockup', size: '120 MB', downloads: 2341, icon: '🎨', url: '#' },
    { id: 5, name: 'JavaScript Basics', size: '45 MB', downloads: 3456, icon: '✨', url: '#' },
    { id: 6, name: 'Python Programming', size: '3.1 MB', downloads: 4567, icon: '🐍', url: '#' },
    { id: 7, name: 'Design System Document', size: '2.2 MB', downloads: 789, icon: '🎭', url: '#' },
    { id: 8, name: 'Brand Colors Palette', size: '1.5 MB', downloads: 432, icon: '🌈', url: '#' },
    { id: 9, name: 'Product Demo Video', size: '250 MB', downloads: 5678, icon: '🎬', url: '#' },
    { id: 10, name: 'Node.js Installation', size: '80 MB', downloads: 2134, icon: '🟢', url: '#' },
    { id: 11, name: 'CSS Grid Tutorial', size: '1.9 MB', downloads: 1876, icon: '🎯', url: '#' },
    { id: 12, name: 'Project Report 2025', size: '3.5 MB', downloads: 654, icon: '📊', url: '#' },
    { id: 13, name: 'Screenshot Collection', size: '2.8 MB', downloads: 321, icon: '📸', url: '#' },
    { id: 14, name: 'Tutorial Series Ep1', size: '180 MB', downloads: 3421, icon: '🎥', url: '#' },
    { id: 15, name: 'Development Tools Pack', size: '75 MB', downloads: 2876, icon: '🛠️', url: '#' },
];

// Pagination settings
const itemsPerPage = 6;
let currentPage = 1;
let currentSearchTerm = '';

// Initialize downloads page
document.addEventListener('DOMContentLoaded', function() {
    renderFiles();
    setupEventListeners();
});

function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            currentSearchTerm = this.value.toLowerCase();
            currentPage = 1;
            renderFiles();
        });
    }

    // Pagination buttons
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const totalPages = getTotalPages();
            if (currentPage < totalPages) {
                currentPage++;
                renderFiles();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                renderFiles();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
}

function getFilteredFiles() {
    return filesData.filter(file => {
        const matchesSearch = file.name.toLowerCase().includes(currentSearchTerm);
        return matchesSearch;
    });
}

function getTotalPages() {
    const filteredFiles = getFilteredFiles();
    return Math.ceil(filteredFiles.length / itemsPerPage);
}

function renderFiles() {
    const filteredFiles = getFilteredFiles();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedFiles = filteredFiles. slice(startIndex, endIndex);

    const filesContainer = document.getElementById('files-container');
    filesContainer.innerHTML = '';

    if (paginatedFiles.length === 0) {
        filesContainer.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem;"><p style="color: #6b7280; font-size: 1.125rem;">No files found.  Try a different search.</p></div>';
    } else {
        paginatedFiles.forEach((file, index) => {
            const fileCard = createFileCard(file, index);
            filesContainer.appendChild(fileCard);
        });
    }

    updatePaginationInfo();
}

function createFileCard(file, index) {
    const card = document.createElement('div');
    card.className = 'file-card card-hover stagger-item';
    card.style.animationDelay = `${index * 0.05}s`;
    
    card.innerHTML = `
        <div class="file-card-header">
            <span class="icon">${file.icon}</span>
        </div>
        <div class="file-card-body">
            <h3 class="file-card-title" title="${file.name}">${file.name}</h3>
            <div class="file-card-info">
                <span>📦 ${file.size}</span>
                <span>📥 ${file.downloads}</span>
            </div>
            <div class="file-card-footer">
                <a href="${file.url}" download class="download-btn">Download</a>
            </div>
        </div>
    `;
    return card;
}

function updatePaginationInfo() {
    const pageInfo = document.getElementById('page-info');
    const totalPages = getTotalPages();
    
    if (pageInfo) {
        pageInfo. textContent = `Page ${currentPage} of ${totalPages}`;
    }

    // Disable/enable buttons
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages || totalPages === 0;
}