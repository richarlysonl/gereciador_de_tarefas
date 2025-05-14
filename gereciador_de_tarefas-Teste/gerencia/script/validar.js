alert('Olá, mundo!');

document.getElementById('formulario').addEventListener('submit', function(e) {
  const form = this;
  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  const senha = form.senha.value.trim();
  const erro = document.getElementById('erro');

  erro.style.display = 'none';

  if (!email || !senha || !nome) {
    e.preventDefault();
    erro.textContent = 'Todos os campos são obrigatórios.';
    erro.style.display = 'block';
    return;
  }

  if (!form.checkValidity()) {
    e.preventDefault();
    form.reportValidity();
    return;
  }

  // Se chegou aqui, o formulário é enviado normalmente para o PHP
});