<?php
include "Conexao.php";
include "protect.php";
$query = "SELECT * FROM tarefa WHERE usuario_id = {$_SESSION['userId']}";
$resultado = mysqli_query($conexao, $query);
if ($resultado) {
    echo "<table border='1'>";
    echo "<tr><th>editar</th><th>excluir</th><th>concluida</th><th>id</th><th>nome</th><th>usuario_id</th><th>descricao</th></tr>";
    while ($linha = mysqli_fetch_assoc($resultado)) {
        if ($linha['concluida'] == 0) {
            echo "<tr class='nao-concluida'>";
        } else {
            echo "<tr class='concluida'>";
        }
        echo "<td>" . "<a href='editar/editar.php?codigo=$linha[codigo]'><button>editar</button></a>" . "</td>";
        echo "<td>" . "<a href='excluir/validarExcluir.php?codigo=$linha[codigo]'><button>excluir</button></a>" . "</td>";
        echo "<td>" . "<a href='tarefa/concluida.php?codigo={$linha['codigo']}&concluida={$linha['concluida']}'><button>" . ($linha['concluida'] ? '✅ Concluído' : '⬜ Pendente') . "</button></a></td>";
        echo "<td>" . $linha['codigo'] . "</td>";
        echo "<td>" . $linha['nome'] . "</td>";
        echo "<td>" . $linha['usuario_id'] . "</td>";
        echo "<td>" . $linha['descricao'] . "</td>";
        
        echo "</tr>";
    }
    echo "</table>";
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <style>
    </style>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
    <style>
        .concluida {
            background-color: rgb(3, 90, 0);
        }
        .nao-concluida {
            background-color: rgb(128, 4, 4);
        }
        a {
            text-decoration: none;
            color: black;
        }
    </style>
<body>
    <a href='tarefa/adicionarTarefa.php'><button name='exibir'>adicionar tarefa</button></a>
    <a href="index.php"><button name="voltar">voltar</button></a>
</body>
</html>