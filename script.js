
const reservas = [];

function filtrar(periodo) {
    const agora = new Date();
    let filtradas = [];

    if (periodo === 'dia') {
        filtradas = reservas.filter(r => new Date(r.datahora).toDateString() === agora.toDateString());
    } else if (periodo === 'semana') {
        const inicioSemana = new Date(agora);
        inicioSemana.setDate(agora.getDate() - agora.getDay());
        const fimSemana = new Date(inicioSemana);
        fimSemana.setDate(inicioSemana.getDate() + 6);
        filtradas = reservas.filter(r => new Date(r.datahora) >= inicioSemana && new Date(r.datahora) <= fimSemana);
    } else if (periodo === 'mes') {
        filtradas = reservas.filter(r => new Date(r.datahora).getMonth() === agora.getMonth());
    } else if (periodo === 'ano') {
        filtradas = reservas.filter(r => new Date(r.datahora).getFullYear() === agora.getFullYear());
    }

    document.getElementById('reservas').innerHTML = filtradas.map(r => `<p>${r.nome} reservou ${r.sala} em ${r.datahora} para ${r.motivo}</p>`).join('');
}

document.getElementById('reservaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    const nome = form.nome.value;
    const oab = form.oab.value;
    const sala = form.sala.value;
    const datahora = form.datahora.value;
    const motivo = form.motivo.value;

    const data = new Date(datahora);
    const hora = data.getHours();
    const diaSemana = data.getDay();

    const jaReservado = reservas.some(r => r.sala === sala && r.datahora === datahora);

    if (jaReservado) {
        document.getElementById('avisos').innerText = 'Horário já reservado para esta sala.';
        return;
    }

    if (diaSemana === 0 || diaSemana === 6 || hora < 8 || hora > 15) {
        document.getElementById('avisos').innerText = 'Horário fora do expediente (segunda a sexta, 8h às 16h).';
        return;
    }

    reservas.push({ nome, oab, sala, datahora, motivo });
    document.getElementById('avisos').innerText = 'Reserva realizada com sucesso!';
    form.reset();
});
