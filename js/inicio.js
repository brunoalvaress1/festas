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


// CONFIGURAÇÃO
const API_KEY = "AIzaSyCitF_NiiKcOYWAfUoLRmw9cWnuUzT2fA4";
const CALENDAR_ID = "https://calendar.google.com/calendar/u/1?cid=YnJ1bm9hdnIyMTNAZ21haWwuY29t";
const CODIGO_CORRETO = "MEUCODIGO123";

// Buscar eventos do Google Calendar
fetch(`https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`)
  .then(response => response.json())
  .then(data => {
    const lista = document.getElementById("lista-datas");
    const hoje = new Date();
    data.items.forEach(evento => {
      if(evento.start && evento.start.date) {
        let dataEvento = new Date(evento.start.date);
        if(dataEvento >= hoje) {
          let li = document.createElement("li");
          li.className = "list-group-item";
          li.textContent = `${evento.start.date} - ${evento.summary || "Reservado"}`;
          lista.appendChild(li);
        }
      }
    });
  });

// Verificar código
document.getElementById("verificarCodigo").addEventListener("click", () => {
  const codigo = document.getElementById("codigo").value;
  if(codigo === CODIGO_CORRETO) {
    document.getElementById("agendamento").style.display = "block";
    document.getElementById("mensagem").innerHTML = `<div class="alert alert-success">Código válido! Escolha a data e agende.</div>`;
  } else {
    document.getElementById("mensagem").innerHTML = `<div class="alert alert-danger">Código inválido!</div>`;
  }
});

// Abrir Google Calendar
document.getElementById("abrirCalendario").addEventListener("click", () => {
  window.open("https://calendar.google.com/calendar/r/eventedit", "_blank");
});