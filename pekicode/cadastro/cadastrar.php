<html>
<head>
    <title> cadastro </title>
</head>
<body>
    <h1>cadastro do Sistema</h1>
    <form method="POST" id="form" action="validarCadastro.php">
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
    </form>
</body>
</html>