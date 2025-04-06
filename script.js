const cacheBuster = new Date().getTime();
let componentsData = [];
let sortDirection = { name: 1, repo: 1 }; // 1 for ascending, -1 for descending

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
    componentList.innerHTML = ''; // Clear existing rows
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
}

// Add sorting event listeners
function addSortListeners() {
    const sortButtons = document.querySelectorAll('.sort-btn');
    sortButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sortKey = button.getAttribute('data-sort');
            sortTable(sortKey);
        });
    });
}

// Sort table function
function sortTable(key) {
    sortDirection[key] = sortDirection[key] * -1; // Toggle direction
    const sortedData = [...componentsData].sort((a, b) => {
        const valueA = key === 'name' ? a.name.toLowerCase() : a.repo.toLowerCase();
        const valueB = key === 'name' ? b.name.toLowerCase() : b.repo.toLowerCase();
        if (valueA < valueB) return -sortDirection[key];
        if (valueA > valueB) return sortDirection[key];
        return 0;
    });
    renderTable(sortedData);
}