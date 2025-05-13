<html>
<head>
    <title> cadastro de tarefas </title>
    <link rel="stylesheet" href="../style/cadastro.css">
</head>
<body>
    <h1>cadastro de tarefas</h1>
    <form method="POST" action="validarTarefa.php">
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
</body>
</html>