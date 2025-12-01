document.getElementById('cadastro-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');
    const submitButton = e.target.querySelector('button[type="submit"]');
    
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
    
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;
    
    if (senha !== confirmarSenha) {
        errorMessage.textContent = 'As senhas não conferem!';
        errorMessage.style.display = 'block';
        return;
    }
    
    if (senha.length < 3) {
        errorMessage.textContent = 'A senha deve ter pelo menos 3 caracteres!';
        errorMessage.style.display = 'block';
        return;
    }
    
    submitButton.disabled = true;
    submitButton.textContent = 'Cadastrando...';
    
    try {
        await authService.register({ nome, email, senha });
        
        successMessage.textContent = 'Cadastro realizado com sucesso! Redirecionando...';
        successMessage.style.display = 'block';
        
        setTimeout(() => {
            window.location.href = '/pages/login/index.html';
        }, 1500);
        
    } catch (error) {
        errorMessage.textContent = error.message || 'Erro ao cadastrar. Tente novamente.';
        errorMessage.style.display = 'block';
        submitButton.disabled = false;
        submitButton.textContent = 'Cadastrar';
    }
});
