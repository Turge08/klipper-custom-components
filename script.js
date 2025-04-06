// Generate a unique query parameter to bust the cache
const cacheBuster = new Date().getTime();
fetch(`components.json?cb=${cacheBuster}`)
    .then(response => response.json())
    .then(data => {
        const componentList = document.getElementById('component-list');
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
    })
    .catch(error => console.error('Error loading components:', error));
