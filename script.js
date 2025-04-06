const cacheBuster = new Date().getTime();
let componentsData = [];
let currentSortKey = null;
let sortDirection = 1; // 1 for ascending, -1 for descending

// Fetch and initial render
fetch(`components.json?cb=${cacheBuster}`)
    .then(response => response.json())
    .then(data => {
        componentsData = data;
        renderTable(componentsData);
        addSortListeners();
    })
    .catch(error => console.error('Error loading components:', error));

// Render table function
function renderTable(data) {
    const componentList = document.getElementById('component-list');
    componentList.innerHTML = '';
    data.forEach(component => {
        const repoUrl = `https://github.com/${component.repo}`;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td data-label="Name">${component.name}</td>
            <td data-label="Description">${component.description || 'No description provided'}</td>
            <td data-label="Repository"><a href="${repoUrl}" target="_blank">${component.repo}</a></td>
        `;
        componentList.appendChild(row);
    });
    updateSortArrows();
}

// Add sorting event listeners
function addSortListeners() {
    const sortButtons = document.querySelectorAll('.sort-btn');
    sortButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sortKey = button.getAttribute('data-sort');
            if (currentSortKey === sortKey) {
                sortDirection *= -1;
            } else {
                sortDirection = 1;
            }
            currentSortKey = sortKey;
            sortTable(sortKey);
        });
    });
}

// Sort table function
function sortTable(key) {
    const sortedData = [...componentsData].sort((a, b) => {
        const valueA = key === 'name' ? a.name.toLowerCase() : a.repo.toLowerCase();
        const valueB = key === 'name' ? b.name.toLowerCase() : b.repo.toLowerCase();
        if (valueA < valueB) return -sortDirection;
        if (valueA > valueB) return sortDirection;
        return 0;
    });
    renderTable(sortedData);
}

// Update sort arrows
function updateSortArrows() {
    const arrows = document.querySelectorAll('.sort-arrow');
    arrows.forEach(arrow => {
        const button = arrow.parentElement;
        const sortKey = button.getAttribute('data-sort');
        arrow.textContent = sortKey === currentSortKey ? (sortDirection === 1 ? '↑' : '↓') : '';
    });
}