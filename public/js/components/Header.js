class Header {
    render() {
        return `
            <header>
                <input type="search" name="search" id="search" placeholder="Pesquisar 🔎">
                <div class="logo-container">
                    <img src="/assets/logo.png" alt="Logo" class="logo">
                </div>
                <div class="header-buttons">
                    <button class="btn-signin">Sign In</button>
                    <button class="btn-signup">Sign Up</button>
                </div>
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
    }
}

function initializeHeader() {
    const header = new Header();
    header.insertIntoPage();
}