<?php
session_start(); // Inicia a sessão
include "../Conexao.php"; // Inclui o arquivo de conexão com o banco de dados
session_destroy(); // Destroi a sessão
header('Location: ../index.php'); // Redireciona para a página de login
exit; // Encerra o script
?>