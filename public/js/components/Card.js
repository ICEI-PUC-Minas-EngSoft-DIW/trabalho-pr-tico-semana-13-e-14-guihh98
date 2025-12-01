class Card {
    constructor(imageUrl, title, author, imageAlt = '', additionalData = {}) {
        this.imageUrl = imageUrl;
        this.title = title;
        this.author = author;
        this.imageAlt = imageAlt;
        this.additionalData = additionalData;
    }

    render() {
        return `
            <div class="card" style="cursor: pointer;">
                <img src="${this.imageUrl}" alt="${this.imageAlt}">
                <div class="card-text">
                    <p>${this.title}</p>
                    <span>${this.author}</span>
                </div>
            </div>
        `;
    }

    createElement() {
        const cardContainer = document.createElement('div');
        cardContainer.innerHTML = this.render();
        const cardElement = cardContainer.firstElementChild;
        
        cardElement.addEventListener('click', () => {
            this.navigateToCourse();
        });
        
        return cardElement;
    }

    navigateToCourse() {
        const courseData = {
            title: this.title,
            author: this.author,
            image: this.additionalData.imageUrlLarge || this.imageUrl,
            category: this.additionalData.category,
            duration: this.additionalData.duration,
            level: this.additionalData.level,
            description: this.additionalData.description
        };

        const params = new URLSearchParams(courseData);
        const courseURL = `/pages/curso/index.html?${params.toString()}`;
        
        window.location.href = courseURL;
    }
}

class Carousel {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.cards = [];
    }

    addCard(card) {
        this.cards.push(card);
        if (this.container) {
            this.container.appendChild(card.createElement());
        }
    }

    addCards(cards) {
        cards.forEach(card => this.addCard(card));
    }

    render() {
        if (!this.container) return;
        
        this.container.innerHTML = '';
        this.cards.forEach(card => {
            this.container.appendChild(card.createElement());
        });
    }
}