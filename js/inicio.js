 // Atualiza o ano do rodapé
      document.getElementById('ano').textContent = new Date().getFullYear();

      // Abre imagem no modal
      const imgModal = document.getElementById('imgModal');
      const modalImg = document.getElementById('modalImg');
      imgModal.addEventListener('show.bs.modal', (event) => {
        const trigger = event.relatedTarget;
        const src = trigger?.getAttribute('data-img');
        if (src) modalImg.src = src;
      });
      imgModal.addEventListener('hidden.bs.modal', () => { modalImg.src = ''; });

      // Botões de orçamento nos cards de preço preenchem o campo "Pacote"
      document.querySelectorAll('[data-plan]').forEach(btn => {
        btn.addEventListener('click', () => {
          const plano = btn.getAttribute('data-plan');
          document.querySelector('select[name="pacote"]').value = plano;
          document.getElementById('contato').scrollIntoView({ behavior: 'smooth' });
        });
      });

      // Exemplo de envio do formulário (intercepta e monta link de WhatsApp)
      const form = document.getElementById('formContato');
      const btnWhats = document.getElementById('btnWhats');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form));
        const msg = `Olá, gostaria de orçamento para o *${data.pacote}* no dia ${data.data}.\n` +
                    `Nome: ${data.nome}\nTelefone: ${data.telefone}\n` +
                    `Convidados: ${data.convidados || '—'}\n` +
                    `Detalhes: ${data.mensagem || '—'}`;
        const phone = '5519996281803'; // <— coloque o DDI+DDD+número do salão
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
      });

      // Botão WhatsApp isolado (sem submeter)
      btnWhats.addEventListener('click', (e) => {
        e.preventDefault();
        const phone = '5519996281803'; // <— troque pelo número real
        window.open(`https://wa.me/${phone}`, '_blank');
      });




      // Dias disponíveis (exemplo)
const diasDisponiveis = [
  '2025-08-17', '2025-08-18', '2025-08-20', '2025-08-22'
];

const containerDias = document.getElementById('dias-disponiveis');
const inputCodigo = document.getElementById('codigo');
const btnVerificar = document.getElementById('verificarCodigo');
const agendamentoDiv = document.getElementById('agendamento');
const btnAbrirCalendario = document.getElementById('abrirCalendario');
const mensagem = document.getElementById('mensagem');

let diaSelecionado = null;
const codigoCorreto = "MEUCODIGO123"; // Seu código secreto

// Exibir dias disponíveis
diasDisponiveis.forEach(dia => {
  const col = document.createElement('div');
  col.classList.add('col-md-3', 'col-6');
  col.innerHTML = `<div class="dia">${dia}</div>`;
  containerDias.appendChild(col);
});

// Selecionar dia
containerDias.addEventListener('click', (e) => {
  if(e.target.classList.contains('dia')) {
    // Remove seleção anterior
    document.querySelectorAll('.dia').forEach(d => d.classList.remove('selecionado'));
    e.target.classList.add('selecionado');
    diaSelecionado = e.target.innerText;

    mensagem.innerHTML = '<div class="alert alert-info">Agora insira o código para agendar.</div>';
  }
});

// Verificar código
btnVerificar.addEventListener('click', () => {
  if(diaSelecionado === null) {
    mensagem.innerHTML = '<div class="alert alert-danger">Selecione um dia primeiro!</div>';
    return;
  }

  if(inputCodigo.value === codigoCorreto) {
    agendamentoDiv.style.display = 'block';
    mensagem.innerHTML = `<div class="alert alert-success">Código válido! Você pode agendar o dia ${diaSelecionado}.</div>`;
  } else {
    agendamentoDiv.style.display = 'none';
    mensagem.innerHTML = '<div class="alert alert-danger">Código inválido!</div>';
  }
});

// Abrir Google Calendar
btnAbrirCalendario.addEventListener('click', () => {
  if(!diaSelecionado) return;

  const data = diaSelecionado.replace(/-/g, '');
  const link = `https://calendar.google.com/calendar/r/eventedit?text=Agendamento+Sal%C3%A3o+de+Festas&dates=${data}/${data}&details=Agendamento+via+site`;
  window.open(link, '_blank');
});
