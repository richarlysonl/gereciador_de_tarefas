<?php
include "../Conexao.php";
include "../protect.php";
$codigo=$_GET['codigo'];
if($codigo != "")
    $selbanco = mysqli_query($conexao,"DELETE FROM tarefa WHERE codigo = $codigo");
if (!$selbanco) {
    echo "Erro ao inserir: " . mysqli_error($conexao);
}else{
    // Redireciona somente se inserção for bem-sucedida
    header("Location: ../exibir.php");
    exit;
}
?>