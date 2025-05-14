<?php
include "../Conexao.php";
include "../protect.php"; 
header("Location: ../exibir.php");
$codigo=$_GET['codigo'];
$concluida = $_GET['concluida'];
$valor = ($concluida == '0') ? '1' : '0'; // Define o valor a ser atualizado (1 para concluída, 0 para não concluída)
$selbanco = mysqli_query($conexao,"UPDATE tarefa SET concluida='$valor' WHERE codigo = $codigo"); // Atualiza o status da tarefa para concluída
?>