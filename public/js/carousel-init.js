async function loadCardData() {
    try {
        const response = await fetch('../data/cardData.json');
        const cardData = await response.json();
        return cardData;
    } catch (error) {
        console.error('Erro ao carregar dados dos cards:', error);
        return null;
    }
}

async function initializeCarousels() {
    const cardData = await loadCardData();
    
    if (!cardData) {
        console.error('Falha ao carregar dados dos cards');
        return;
    }

    const rendaFixaCarousel = new Carousel('renda-fixa-carousel');
    const rendaFixaCards = cardData.rendaFixa.map(data => 
        new Card(data.imageUrl, data.title, data.author, data.imageAlt, {
            category: data.category,
            duration: data.duration,
            level: data.level,
            description: data.description,
            imageUrlLarge: data.imageUrlLarge
        })
    );
    rendaFixaCarousel.addCards(rendaFixaCards);

    const topLastMonthCarousel = new Carousel('top-last-month-carousel');
    const topLastMonthCards = cardData.topLastMonth.map(data => 
        new Card(data.imageUrl, data.title, data.author, data.imageAlt, {
            category: data.category,
            duration: data.duration,
            level: data.level,
            description: data.description,
            imageUrlLarge: data.imageUrlLarge
        })
    );
    topLastMonthCarousel.addCards(topLastMonthCards);
}

document.addEventListener('DOMContentLoaded', initializeCarousels);