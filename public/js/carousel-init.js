async function initializeCarousels() {
    try {
        const cardData = await courseService.getAllCourses();
        
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
    } catch (error) {
        console.error('Erro ao inicializar carrosséis:', error);
    }
}

document.addEventListener('DOMContentLoaded', initializeCarousels);