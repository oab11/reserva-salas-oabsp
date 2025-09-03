
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
    const data = form.data.value;
    const hora = form.hora.value;
    const motivo = form.motivo.value;
    const datahora = `${data}T${hora}`;

    const dataObj = new Date(datahora);
    const diaSemana = dataObj.getDay();

    const jaReservado = reservas.some(r => r.sala === sala && r.datahora === datahora);

    if (jaReservado) {
        document.getElementById('avisos').innerText = 'Horário já reservado para esta sala.';
        return;
    }

    if (diaSemana === 0 || diaSemana === 6) {
        document.getElementById('avisos').innerText = 'Horário fora do expediente (segunda a sexta).';
        return;
    }

    reservas.push({ nome, oab, sala, datahora, motivo });
    document.getElementById('avisos').innerText = 'Reserva realizada com sucesso!';
    form.reset();
});
