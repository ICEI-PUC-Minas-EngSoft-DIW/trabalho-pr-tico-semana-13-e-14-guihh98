const API_URL = 'http://localhost:3000';

class AuthService {
    async register(userData) {
        try {
            const response = await fetch(`${API_URL}/usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: userData.nome,
                    email: userData.email,
                    senha: userData.senha,
                    login: userData.email
                })
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar usuário');
            }

            const user = await response.json();
            return user;
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            throw error;
        }
    }

    async login(email, senha) {
        try {
            const response = await fetch(`${API_URL}/usuarios?email=${email}&senha=${senha}`);
            
            if (!response.ok) {
                throw new Error('Erro ao fazer login');
            }

            const users = await response.json();
            
            if (users.length === 0) {
                throw new Error('Email ou senha inválidos');
            }

            const user = users[0];
            this.setCurrentUser(user);
            return user;
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            throw error;
        }
    }

    logout() {
        sessionStorage.removeItem('currentUser');
        window.location.href = '/index.html';
    }

    setCurrentUser(user) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
    }

    getCurrentUser() {
        const userJson = sessionStorage.getItem('currentUser');
        return userJson ? JSON.parse(userJson) : null;
    }

    isLoggedIn() {
        return this.getCurrentUser() !== null;
    }
}

const authService = new AuthService();
