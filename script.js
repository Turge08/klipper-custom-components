fetch('components.json')
    .then(response => response.json())
    .then(data => {
        const componentList = document.getElementById('component-list');
        data.forEach(component => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${component.name}</td>
                <td>${component.description || 'No description provided'}</td>
                <td><a href="${component.repo}" target="_blank">GitHub</a></td>
            `;
            componentList.appendChild(row);
        });
    })
    .catch(error => console.error('Error loading components:', error));
