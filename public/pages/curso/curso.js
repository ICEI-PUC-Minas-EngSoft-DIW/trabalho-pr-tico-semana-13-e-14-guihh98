document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    
    const title = urlParams.get('title');
    const author = urlParams.get('author');
    const image = urlParams.get('image');
    const category = urlParams.get('category');
    const duration = urlParams.get('duration');
    const level = urlParams.get('level');
    const description = urlParams.get('description');
    
    document.getElementById('curso-img').src = image;
    document.getElementById('curso-img').alt = title;
    document.getElementById('curso-title').textContent = title;
    document.getElementById('curso-author').textContent = author;
    document.getElementById('curso-category').textContent = category;
    document.getElementById('curso-duration').textContent = duration;
    document.getElementById('curso-level').textContent = level;
    document.getElementById('curso-description').textContent = description;
    
    document.title = title + ' - Curso';
});