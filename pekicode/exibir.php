<?php
include "Conexao.php";
include "protect.php";
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minhas Tarefas</title>
    <link rel="stylesheet" href="style/exibir.css">
</head>
<body>

<header>
    <div class="menu-topo">
        <span class="usuario">Olá, <?php echo htmlspecialchars($_SESSION['userUsuario']); ?>!</span>
        <nav>
            <a href="tarefa/adicionarTarefa.php"><button>Adicionar Tarefa</button></a>
            <a href="login/validarLogout.php"><button>Sair</button></a>
        </nav>
    </div>
</header>

<main>
    <h1>Suas Tarefas</h1>

    <?php
    $query = "SELECT * FROM tarefa WHERE usuario_id = {$_SESSION['userId']}";
    $resultado = mysqli_query($conexao, $query);

    if ($resultado) {
        echo "<table>";
        echo "<tr><th>Editar</th><th>Excluir</th><th>Status</th><th>Nome</th><th>Descrição</th></tr>";
        while ($linha = mysqli_fetch_assoc($resultado)) {
            $classe = $linha['concluida'] ? 'concluida' : 'nao-concluida';
            echo "<tr class='{$classe}'>";
            echo "<td><a href='editar/editar.php?codigo={$linha['codigo']}'><button>Editar</button></a></td>";
            echo "<td><a href='tarefa/validarExcluir.php?codigo={$linha['codigo']}'><button>Excluir</button></a></td>";
            echo "<td><a href='tarefa/concluida.php?codigo={$linha['codigo']}&concluida={$linha['concluida']}'><button>" . ($linha['concluida'] ? '✅ Concluído' : '⬜ Pendente') . "</button></a></td>";
            echo "<td>{$linha['nome']}</td>";
            echo "<td>{$linha['descricao']}</td>";
            echo "</tr>";
        }
        echo "</table>";
    } else {
        echo "<p>Erro ao buscar tarefas.</p>";
    }
    ?>
</main>

</body>
</html>
