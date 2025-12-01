class Header {
    constructor() {
        this.isLoggedIn = false;
        this.currentUser = null;
        this.checkAuth();
    }

    checkAuth() {
        if (typeof authService !== 'undefined') {
            this.isLoggedIn = authService.isLoggedIn();
            this.currentUser = authService.getCurrentUser();
        }
    }

    render() {
        const authButtons = this.isLoggedIn 
            ? `
                <div class="header-buttons">
                    <span class="user-name">Olá, ${this.currentUser.nome.split(' ')[0]}</span>
                    <button class="btn-signout">Sign Out</button>
                </div>
            `
            : `
                <div class="header-buttons">
                    <button class="btn-signin">Sign In</button>
                    <button class="btn-signup">Sign Up</button>
                </div>
            `;

        return `
            <header>
                <input type="search" name="search" id="search" placeholder="Pesquisar 🔎">
                <div class="logo-container">
                    <img src="/assets/logo.png" alt="Logo" class="logo">
                </div>
                ${authButtons}
            </header>
            <nav>
                <ul>
                    <li><a href="/index.html">Home</a></li>
                    <li><a href="/pages/calendar/index.html">Calendar</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
        `;
    }

    insertIntoPage() {
        const body = document.body;
        const headerHTML = this.render();
        body.insertAdjacentHTML('afterbegin', headerHTML);
        this.attachEventListeners();
    }

    attachEventListeners() {
        const searchInput = document.getElementById('search');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const searchTerm = e.target.value.trim();
                    if (searchTerm) {
                        window.location.href = `/pages/resultados/index.html?q=${encodeURIComponent(searchTerm)}`;
                    }
                }
            });
        }

        const signInBtn = document.querySelector('.btn-signin');
        const signUpBtn = document.querySelector('.btn-signup');
        const signOutBtn = document.querySelector('.btn-signout');

        if (signInBtn) {
            signInBtn.addEventListener('click', () => {
                window.location.href = '/pages/login/index.html';
            });
        }

        if (signUpBtn) {
            signUpBtn.addEventListener('click', () => {
                window.location.href = '/pages/cadastro/index.html';
            });
        }

        if (signOutBtn) {
            signOutBtn.addEventListener('click', () => {
                if (confirm('Deseja realmente sair?')) {
                    authService.logout();
                }
            });
        }
    }
}

function initializeHeader() {
    const header = new Header();
    header.insertIntoPage();
}