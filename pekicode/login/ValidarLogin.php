<?php
include "../Conexao.php";
$senha=$_POST['senha'];
$email=$_POST['email']; 
//$selbanco = mysqli_query($conexao,"SELECT * FROM usuario WHERE senha='$senha' AND email='$email'");
$sql_code = "SELECT * FROM usuario WHERE email = '$email'";
    $sql_query = $conexao->query($sql_code) or die("Falha na execução do código SQL " . $conexao->error);

    $quant = $sql_query->num_rows;
    
    //dados corretos + iniciar sessão
    if ($quant == 1) {
        if (!isset($_SESSION)) 
            session_start();
        $dados = mysqli_fetch_assoc($sql_query);
        if(password_verify($senha,$dados['senha']))//verificacao de senha
        {
        $_SESSION['userUsuario'] = $dados['nome'];
        $_SESSION['userId'] = $dados['codigo'];
        $_SESSION['userEmail'] = $dados['email'];
        header('Location: ../exibir.php');
        }else {
            //senha incorreta
            echo "Senha incorreta<br>";
    }
    //dados falsos + error
    }else{
        header('Location: ../index.php');
    }



// if ($selbanco && mysqli_num_rows($selbanco) == 1) {
//     // Redireciona somente se inserção for bem-sucedida
//     $user = mysqli_fetch_assoc($selbanco)['nome'];
//     header("Location: index.php?user=$user");
//     exit;
// }else {
//     // Exibe erro do MySQ
//     echo "usuario invalido";
// }
?>
</body>
</html>
