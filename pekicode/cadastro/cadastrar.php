<html>
<head>
    <title> cadastro </title>
    <link rel="stylesheet" href="../style/cadastro.css">
</head>
<body>
    <h1>cadastro do Sistema</h1>
    <form method="POST" id="formulario" action="validarCadastro.php">
        <table>
            <tr>
                <td>Usuario:</td>
                <td><input name="user" required type="text"></td>
            </tr>
            <tr>
                <td>Senha:</td>
                <td><input name="senha" required type="password"></td>
            </tr>
            <tr>
                <td>email:</td>
                <td><input name="email" required type="email"></td>
            </tr>
        </table>
        <br>
        <button type="submit">Cadastrar</button>
    <p id="erro" style="color: red; display: none;"></p>
    </form>
<script>
document.getElementById('formulario').addEventListener('submit', function(e) {
  const form = this;
  const nome = form.user.value.trim();
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
</script>
</body>
</html>