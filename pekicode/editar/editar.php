<html>
<head>
    <title> cadastro de tarefas </title>
</head>
<body>
    <h1>cadastro de tarefas</h1>
    <?php 
    $codigo = $_GET['codigo'];
    echo("<form method='POST' action='validarEditar.php?codigo=$codigo'>"); ?>
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