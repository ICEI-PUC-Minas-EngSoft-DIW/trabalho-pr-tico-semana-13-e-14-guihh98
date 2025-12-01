class FavoritesService {
    async addFavorite(userId, courseData) {
        try {
            const response = await fetch(`${API_URL}/favoritos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: this.generateId(),
                    userId: userId,
                    courseTitle: courseData.title,
                    courseAuthor: courseData.author,
                    courseImage: courseData.image,
                    courseCategory: courseData.category,
                    courseDuration: courseData.duration,
                    courseLevel: courseData.level,
                    courseDescription: courseData.description,
                    createdAt: new Date().toISOString()
                })
            });

            if (!response.ok) {
                throw new Error('Erro ao adicionar favorito');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro ao adicionar favorito:', error);
            throw error;
        }
    }

    async removeFavorite(favoriteId) {
        try {
            const response = await fetch(`${API_URL}/favoritos/${favoriteId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Erro ao remover favorito');
            }

            return true;
        } catch (error) {
            console.error('Erro ao remover favorito:', error);
            throw error;
        }
    }

    async getFavoritesByUser(userId) {
        try {
            const response = await fetch(`${API_URL}/favoritos?userId=${userId}`);
            
            if (!response.ok) {
                throw new Error('Erro ao buscar favoritos');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar favoritos:', error);
            throw error;
        }
    }

    async checkIfFavorite(userId, courseTitle) {
        try {
            const response = await fetch(`${API_URL}/favoritos?userId=${userId}&courseTitle=${encodeURIComponent(courseTitle)}`);
            
            if (!response.ok) {
                throw new Error('Erro ao verificar favorito');
            }

            const favorites = await response.json();
            return favorites.length > 0 ? favorites[0] : null;
        } catch (error) {
            console.error('Erro ao verificar favorito:', error);
            throw error;
        }
    }

    generateId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

const favoritesService = new FavoritesService();
