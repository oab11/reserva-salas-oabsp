
<?php
$data = $_POST['data'] ?? '';
$hora = $_POST['hora'] ?? '';
sala = $_POST['sala'] ?? '';
$arquivo = 'reservas.json';

$reserva = [
    'nome' => $_POST['nome'],
    'oab' => $_POST['oab'],
    'sala' => $sala,
    'datahora' => "$data T $hora",
    'motivo' => $_POST['motivo']
];

$reservas = file_exists($arquivo) ? json_decode(file_get_contents($arquivo), true) : [];

foreach ($reservas as $r) {
    if ($r['sala'] === $sala && $r['datahora'] === $reserva['datahora']) {
        header("Location: index.html?msg=Horário já reservado para esta sala.");
        exit;
    }
}

$reservas[] = $reserva;
file_put_contents($arquivo, json_encode($reservas, JSON_PRETTY_PRINT));
header("Location: index.html?msg=Reserva realizada com sucesso!");
exit;
?>
