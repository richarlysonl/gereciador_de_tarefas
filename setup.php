<?php
include "Conexao.php"; // ou defina manualmente a conexão

$sql = file_get_contents("sql.txt");

if ($conexao->multi_query($sql)) {
    echo "Banco de dados criado com sucesso!";
} else {
    echo "Erro ao criar o banco: " . $conexao->error;
}
?>