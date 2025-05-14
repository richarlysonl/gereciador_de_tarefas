
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/index.css">
    <title>Document</title>
</head>
<body>
    <a href="cadastro/cadastrar.php"><button name="cadastrar">cadastrar</button></a>
    <?php
    include "Conexao.php";
    session_start();
     if(isset($_SESSION['userUsuario'])){
        echo "<a href='exibir.php'><button name='exibir'>exibir</button></a>";
        echo "<a href='login/validarLogout.php'><button name='sair'>sair</button></a>";
    }
    else{
        echo "<a href='login/logar.php'><button name='logar'>logar</button></a>";
    }
    ?>
    
</script>
</body>
</html>