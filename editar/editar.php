<?php
include "../protect.php";
?>
<html>
<head>
    <title> Editar Tarefa </title>
    <link rel="stylesheet" href="../style/cadastro.css">
</head>
<body>
    <h1> Editar Tarefa</h1>
    <?php 
    $codigo = $_GET['codigo'];
    $nome = $_GET['nome'];
    $descricao = $_GET['descricao'];
    echo("<form method='POST' id='formulario' action='validarEditar.php?codigo=$codigo'>"); ?>
        <table>
            <tr>
                <td>nome:</td>
                <?php echo"<td><input name='nome' required value='$nome' type='text'></td>"; ?>
            </tr>
            <tr>
                <td>descrição:</td>
                <?php echo"<td><input name='descricao' required value='$descricao' type='text'></td>"; ?>
            </tr>
            <p id="erro" style="color: red; display: none;"></p>
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