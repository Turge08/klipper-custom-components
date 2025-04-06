fetch('components.json')
    .then(response => response.json())
    .then(data => {
        const componentList = document.getElementById('component-list');
        data.forEach(component => {
            const div = document.createElement('div');
            div.innerHTML = `
                <h3>${component.name}</h3>
                <p>${component.description || 'No description provided'}</p>
                <a href="${component.repo}" target="_blank">GitHub Repository</a>
            `;
            componentList.appendChild(div);
        });
    })
    .catch(error => console.error('Error loading components:', error));
