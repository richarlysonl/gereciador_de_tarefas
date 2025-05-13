<!--Encerrar sessão-->
<?php
if (!isset($_SESSION)) {
    session_start();
}
if ($_SESSION['userUsuario'] == "") {
    die(header('Location: ../index.php'));
}