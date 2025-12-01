document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');
    const submitButton = e.target.querySelector('button[type="submit"]');
    
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
    
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;
    
    submitButton.disabled = true;
    submitButton.textContent = 'Entrando...';
    
    try {
        await authService.login(email, senha);
        
        successMessage.textContent = 'Login realizado com sucesso! Redirecionando...';
        successMessage.style.display = 'block';
        
        setTimeout(() => {
            window.location.href = '/index.html';
        }, 1000);
        
    } catch (error) {
        errorMessage.textContent = error.message || 'Email ou senha incorretos.';
        errorMessage.style.display = 'block';
        submitButton.disabled = false;
        submitButton.textContent = 'Entrar';
    }
});
