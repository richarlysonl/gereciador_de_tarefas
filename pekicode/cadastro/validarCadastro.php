<?php
include "../Conexao.php";
$user = $_POST['user'];
$senha = $_POST['senha'];
$hash = password_hash($senha, PASSWORD_DEFAULT);
$email = $_POST['email'];
if ($user != "" && $senha != "" && $email != "")//verifica se o usuario, senha e email não estão vazios
    $sql_consulta = "SELECT * FROM usuario WHERE email = '$email'";
$resultado = $conexao->query($sql_consulta) or die("Falha na execução do código SQL " . $conexao->error);
$quant = $resultado->num_rows;
//verifica se o usuario já existe no banco de dados
if ($quant == 0) {
    session_start();
    //dados corretos + iniciar sessão
    $sql_insert = "INSERT INTO usuario (email,nome,senha) VALUES ('$email','$user','$hash')";
    $sql_query = $conexao->query($sql_insert) or die("Falha na execução do código SQL " . $conexao->error);
    $sessao = $conexao->query($sql_consulta) or die("Falha na execução do código SQL " . $conexao->error);
    $dados = mysqli_fetch_assoc($sessao);
    $_SESSION['userUsuario'] = $dados['nome'];
    $_SESSION['userId'] = $dados['codigo'];
    $_SESSION['userEmail'] = $dados['email'];
    header('Location: ../exibir.php');
} else {
    echo "usuario invalido";
}
