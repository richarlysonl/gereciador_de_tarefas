<html>
<head>
    <title> cadastro de tarefas </title>
    <link rel="stylesheet" href="../style/cadastro.css">
</head>
<body>
    <h1>cadastro de tarefas</h1>
    <form method="POST" id="formulario" action="validarTarefa.php">
        <table>
            <tr>
                <td>nome:</td>
                <td><input name="nome" required type="text"></td>
            </tr>
            <tr>
                <td>descrição:</td>
                <td><input name="descricao" required type="text"></td>
            </tr>
        </table>
        <br>
        <button type="submit">adicionar</button>
    </form>
    <script>
document.getElementById('formulario').addEventListener('submit', function(e) {
  const form = this;
  const nome = form.nome.value.trim();
  const descricao = form.descricao.value.trim();
  const erro = document.getElementById('erro');

  erro.style.display = 'none';

  if (!nome || !descricao) {
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