<?php
$host="localhost";
$user="root";
$pass="";
$banco="gerenciamento_de_tarefas";
$conexao = mysqli_connect($host, $user, $pass, $banco);
if (!$conexao) {
    die("Erro na conexão: " . mysqli_connect_error());
}