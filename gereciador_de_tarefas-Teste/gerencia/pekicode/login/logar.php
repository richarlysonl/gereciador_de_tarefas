<html>
<head>
    <title> cadastro </title>
    <link rel="stylesheet" href="../style/cadastro.css">
</head>
<body>
    <h1>cadastro do Sistema</h1>
    <form method="POST"action="ValidarLogin.php">
        <table>
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
        <button type="submit">logar</button>
    </form>
</body>
</html>