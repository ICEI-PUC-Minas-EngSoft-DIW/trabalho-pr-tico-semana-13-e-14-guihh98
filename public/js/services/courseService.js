const API_URL = 'http://localhost:3000';

class CourseService {
    async getRendaFixa() {
        try {
            const response = await fetch(`${API_URL}/rendaFixa`);
            if (!response.ok) {
                throw new Error('Erro ao buscar cursos de Renda Fixa');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar cursos de Renda Fixa:', error);
            throw error;
        }
    }

    async getTopLastMonth() {
        try {
            const response = await fetch(`${API_URL}/topLastMonth`);
            if (!response.ok) {
                throw new Error('Erro ao buscar Top do Mês');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar Top do Mês:', error);
            throw error;
        }
    }

    async getAllCourses() {
        try {
            const [rendaFixa, topLastMonth] = await Promise.all([
                this.getRendaFixa(),
                this.getTopLastMonth()
            ]);
            return { rendaFixa, topLastMonth };
        } catch (error) {
            console.error('Erro ao buscar todos os cursos:', error);
            throw error;
        }
    }
}

const courseService = new CourseService();
