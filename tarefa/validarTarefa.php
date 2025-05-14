<?php
include "../Conexao.php";
include "../protect.php";
$nome=$_POST['nome'];
$user_id=$_SESSION['userId'];
$descricao=$_POST['descricao'];
if($nome != "" && $user_id != "" && $descricao != "")
$selbanco = mysqli_query($conexao,"INSERT INTO tarefa (nome,usuario_id,descricao,concluida) VALUES ('$nome','$user_id','$descricao','0')");
if (!$selbanco) {
    echo "Erro ao inserir: " . mysqli_error($conexao);
}else{
    // Redireciona somente se inserção for bem-sucedida
    header("Location: ../exibir.php");
    exit;
}
?>