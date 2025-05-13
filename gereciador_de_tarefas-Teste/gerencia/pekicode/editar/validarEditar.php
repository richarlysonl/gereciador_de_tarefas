<?php
include "../Conexao.php";
include "../protect.php";
$nome=$_POST['nome'];
$user_id=$_SESSION['userId'];
$descricao=$_POST['descricao'];
$codigo=$_GET['codigo'];
if($nome != "" && $user_id != "" && $descricao != "")
    $selbanco = mysqli_query($conexao,"UPDATE tarefa SET nome='$nome', usuario_id='$user_id', descricao='$descricao' WHERE codigo = $codigo");
if (!$selbanco) {
    echo "Erro ao inserir: " . mysqli_error($conexao);
}else{
    // Redireciona somente se inserção for bem-sucedida
    header("Location: ../exibir.php");
    exit;
}
?>