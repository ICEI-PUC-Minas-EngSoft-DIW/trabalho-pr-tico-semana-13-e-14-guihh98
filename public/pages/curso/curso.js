let currentFavorite = null;
let courseData = {};

document.addEventListener('DOMContentLoaded', async function() {
    
    const urlParams = new URLSearchParams(window.location.search);
    
    const title = urlParams.get('title');
    const author = urlParams.get('author');
    const image = urlParams.get('image');
    const category = urlParams.get('category');
    const duration = urlParams.get('duration');
    const level = urlParams.get('level');
    const description = urlParams.get('description');
    
    courseData = { title, author, image, category, duration, level, description };
    
    console.log('testando os dados do cutso', courseData);
    
    document.getElementById('curso-img').src = image;
    document.getElementById('curso-img').alt = title;
    document.getElementById('curso-title').textContent = title;
    document.getElementById('curso-author').textContent = author;
    document.getElementById('curso-category').textContent = category;
    document.getElementById('curso-description').textContent = description;
    
    document.title = title + ' - Curso';
    
    console.log('teste do checkFavoriteStatus');
    await checkFavoriteStatus();
    
    console.log('teste do cutton setupFavoriteButton');
    setupFavoriteButton();
});

async function checkFavoriteStatus() {
    const user = authService.getCurrentUser();
    
    if (!user) {
        return;
    }
    
    try {
        currentFavorite = await favoritesService.checkIfFavorite(user.id, courseData.title);
        updateFavoriteButton();
    } catch (error) {
        console.error('Erro ao verificar status de favorito:', error);
    }
}

function updateFavoriteButton() {
    const btn = document.getElementById('btn-favorite');
    
    if (currentFavorite) {
        btn.textContent = 'Remover dos Favoritos';
        btn.classList.add('favorited');
    } else {
        btn.textContent = 'Adicionar aos Favoritos';
        btn.classList.remove('favorited');
    }
}

function setupFavoriteButton() {
    const btn = document.getElementById('btn-favorite');
    
    console.log('Botão encontrado:', btn);
    
    if (!btn) {
        console.error('ERRO: Botão btn-favorite não foi encontrado!');
        return;
    }
    
    btn.addEventListener('click', async function(e) {
        console.log('cliqueii no botão de favorito');
        
        const user = authService.getCurrentUser();
        console.log('teste', user);
        
        if (!user) {
            alert('Você precisa estar logado para favoritar cursos!');
            return;
        }
        
        btn.disabled = true;
        const originalText = btn.textContent;
        btn.textContent = 'Processando...';
        
        try {
            if (currentFavorite) {
                await favoritesService.removeFavorite(currentFavorite.id);
                currentFavorite = null;
                alert('Curso removido dos favoritos!');
            } else {
                const favorite = await favoritesService.addFavorite(user.id, courseData);
                currentFavorite = favorite;
                alert('Curso adicionado aos favoritos!');
            }
            
            updateFavoriteButton();
        } catch (error) {
            console.error('Erro ao processar favorito:', error);
            alert('Erro ao processar favorito. Tente novamente.');
            btn.textContent = originalText;
        } finally {
            btn.disabled = false;
        }
    });
    
    console.log('Event listener adicionado com sucesso');
}
