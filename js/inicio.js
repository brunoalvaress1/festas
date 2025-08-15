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




$(document).ready(function() {
  // Dias disponíveis
  const diasDisponiveis = ['2025-08-17','2025-08-18','2025-08-20','2025-08-22'];

  // Inicializar o datepicker
  $('#datepicker').datepicker({
    format: 'yyyy-mm-dd',
    startDate: '2025-08-01',
    endDate: '2025-12-31',
    autoclose: true,
    beforeShowDay: function(date) {
      const d = date.toISOString().split('T')[0];
      if(diasDisponiveis.includes(d)) {
        return {classes: 'text-success'}; // verde para disponível
      }
      return false; // bloqueia dias não disponíveis
    }
  });

  const codigoCorreto = "MEUCODIGO123";
  let codigoValido = false;

  // Verificar código
  $('#verificarCodigo').click(function() {
    const inputCodigo = $('#codigo').val();
    if(inputCodigo === codigoCorreto) {
      $('#agendamento').show();
      codigoValido = true;
      $('#mensagem').html('<div class="alert alert-success">Código válido! Agora você pode agendar.</div>');
    } else {
      $('#agendamento').hide();
      codigoValido = false;
      $('#mensagem').html('<div class="alert alert-danger">Código inválido!</div>');
    }
  });

  // Abrir Google Calendar
  $('#abrirCalendario').click(function() {
    const dataSelecionada = $('#datepicker').val();
    if(!dataSelecionada) {
      $('#mensagem').html('<div class="alert alert-danger">Escolha uma data!</div>');
      return;
    }
    if(!codigoValido) {
      $('#mensagem').html('<div class="alert alert-danger">Insira o código para agendar!</div>');
      return;
    }

    const dataFormatada = dataSelecionada.replace(/-/g,'');
    const link = `https://calendar.google.com/calendar/r/eventedit?text=Agendamento+Sal%C3%A3o+de+Festas&dates=${dataFormatada}/${dataFormatada}&details=Agendamento+via+site`;
    window.open(link,'_blank');
  });
});