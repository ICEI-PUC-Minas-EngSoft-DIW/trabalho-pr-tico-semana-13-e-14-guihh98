async function initializeSearch() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('q');
    
    const termoElement = document.getElementById('termo-pesquisa');
    const countElement = document.getElementById('count-resultados');
    const resultsContainer = document.getElementById('resultados-container');
    const noResultsElement = document.getElementById('no-results');
    
    if (!searchTerm) {
        termoElement.textContent = 'Nenhum termo informado';
        return;
    }
    
    termoElement.textContent = searchTerm;
    countElement.textContent = 'Buscando cursos';
    
    try {
        const results = await courseService.searchCourses(searchTerm);
        
        if (results.length === 0) {
            resultsContainer.style.display = 'none';
            noResultsElement.style.display = 'block';
            countElement.style.display = 'none';
        } else {
            countElement.textContent = "";
            noResultsElement.style.display = 'none';
            
            results.forEach(courseData => {
                const card = new Card(
                    courseData.imageUrl, 
                    courseData.title, 
                    courseData.author, 
                    courseData.imageAlt,
                    {
                        category: courseData.category,
                        duration: courseData.duration,
                        level: courseData.level,
                        description: courseData.description,
                        imageUrlLarge: courseData.imageUrlLarge
                    }
                );
                resultsContainer.appendChild(card.createElement());
            });
        }
    } catch (error) {
        console.error('Erro ao buscar cursos:', error);
        countElement.textContent = 'Erro ao buscar cursos. Tente novamente mais tarde.';
        countElement.style.color = 'var(--interactive-error)';
    }
}

document.addEventListener('DOMContentLoaded', initializeSearch);
