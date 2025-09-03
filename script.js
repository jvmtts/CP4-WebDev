const INITIAL_DATA = [
  { nome:"Andressa Alves", posicao:"Meio-campo", clube:"Corinthians", foto:"https://static.corinthians.com.br/uploads/1750945125ae85d38ba1ba9d131b2a573de17d66e7.png", gols:15, assistencias:10, jogos:28, favorita:false },
  { nome:"Dayana Rodríguez", posicao:"Meio-campo", clube:"Corinthians", foto:"https://static.corinthians.com.br/uploads/175094526199472a1c51895312eb49e4ae3cdac3bf.png", gols:5, assistencias:12, jogos:30, favorita:false },
  { nome:"Mariza", posicao:"Zagueira", clube:"Corinthians", foto:"https://static.corinthians.com.br/uploads/17509466300ed0cd7ead3e168df256f884ccd24f62.png", gols:2, assistencias:1, jogos:32, favorita:false },
  { nome:"Thaís Regina", posicao:"Zagueira", clube:"Corinthians", foto:"https://static.corinthians.com.br/uploads/1750946971a11dc33d9088b82f80dcda9841636229.png", gols:1, assistencias:2, jogos:25, favorita:false },
  { nome:"Letícia Teles", posicao:"Zagueira", clube:"Corinthians", foto:"https://static.corinthians.com.br/uploads/17509463693cf4a6df3a66e0fbed2cbbe2a7fbaaae.png", gols:0, assistencias:0, jogos:18, favorita:false }
];

const STORAGE_KEY = 'jogadoras';

const cardsContainer = document.getElementById('cardsContainer');
const playerForm = document.getElementById('playerForm');
const showAddFormBtn = document.getElementById('showAddFormBtn');
const formSection = document.getElementById('formSection');
const formTitle = document.getElementById('formTitle');
const cancelBtn = document.getElementById('cancelBtn');
const editIndexInput = document.getElementById('editIndex');

const searchInput = document.getElementById('searchInput');
const filterClubSelect = document.getElementById('filterClub');
const sortNameBtn = document.getElementById('sortNameBtn');
const sortPositionBtn = document.getElementById('sortPositionBtn');

const nomeInput = document.getElementById('nome');
const posicaoInput = document.getElementById('posicao');
const clubeInput = document.getElementById('clube');
const fotoInput = document.getElementById('foto');
const golsInput = document.getElementById('gols');
const assistenciasInput = document.getElementById('assistencias');
const jogosInput = document.getElementById('jogos');

let jogadores = [];
let currentSort = null;

function loadInitialDataIfNeeded(){
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
  }
  jogadores = JSON.parse(localStorage.getItem(STORAGE_KEY));
}

function saveToStorage(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jogadoras));
}

function renderCards(list){
  cardsContainer.innerHTML = '';
  if (list.length === 0) {
    cardsContainer.innerHTML = `<p style="color:var(--muted); padding:10px">Nenhuma jogadora encontrada.</p>`;
    return;
  }

  list.forEach((p, index) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="top">
        <img class="player-photo" src="${p.foto}" alt="${p.nome}" />
        <div class="player-info">
          <h3>${p.nome}</h3>
          <p>${p.posicao} • ${p.clube}</p>
        </div>
        <button title="Favoritar" data-index="${index}" class="icon-btn favorite ${p.favorita ? 'active' : ''}">${p.favorita ? '★' : '☆'}</button>
      </div>
      <div class="stats">
        <div><strong>Gols</strong><div>${p.gols}</div></div>
        <div><strong>Assist.</strong><div>${p.assistencias}</div></div>
        <div><strong>Jogos</strong><div>${p.jogos}</div></div>
      </div>
      <div class="card-actions">
        <div style="color:var(--muted); font-size:13px;">${p.clube}</div>
        <div class="action-buttons">
          <button class="icon-btn edit-btn" data-index="${index}" title="Editar">✎</button>
          <button class="icon-btn delete-btn" data-index="${index}" title="Excluir">🗑</button>
        </div>
      </div>
    `;

    card.querySelector('.favorite').addEventListener('click', () => toggleFavorite(index));
    card.querySelector('.edit-btn').addEventListener('click', () => openEditForm(index));
    card.querySelector('.delete-btn').addEventListener('click', () => deletePlayer(index));

    cardsContainer.appendChild(card);
  });
}

function addPlayer(player){
  jogadores.push(player);
  saveToStorage();
  alert('Jogadora adicionada com sucesso!');
  refreshUI();
}

function updatePlayer(index, newData){
  jogadores[index] = newData;
  saveToStorage();
  alert('Jogadora editada com sucesso!');
  refreshUI();
}

function deletePlayer(index){
  if (!confirm(`Remover ${jogadores[index].nome}?`)) return;
  jogadores.splice(index,1);
  saveToStorage();
  alert('Jogadora removida com sucesso!');
  refreshUI();
}

function toggleFavorite(index){
  jogadores[index].favorita = !jogadores[index].favorita;
  saveToStorage();
  refreshUI();
}

function openAddForm(){
  formTitle.textContent = 'Adicionar Jogadora';
  editIndexInput.value = -1;
  playerForm.reset();
  formSection.classList.remove('hidden');
}

function openEditForm(index){
  const p = jogadores[index];
  formTitle.textContent = 'Editar Jogadora';
  editIndexInput.value = index;
  nomeInput.value = p.nome;
  posicaoInput.value = p.posicao;
  clubeInput.value = p.clube;
  fotoInput.value = p.foto;
  golsInput.value = p.gols;
  assistenciasInput.value = p.assistencias;
  jogosInput.value = p.jogos;
  formSection.classList.remove('hidden');
}

playerForm.addEventListener('submit', function(e){
  e.preventDefault();
  const nome = nomeInput.value.trim();
  const posicao = posicaoInput.value.trim();
  const clube = clubeInput.value.trim();
  const foto = fotoInput.value.trim();
  const gols = Number(golsInput.value);
  const assistencias = Number(assistenciasInput.value);
  const jogos = Number(jogosInput.value);

  if (!nome || !posicao || !clube || !foto) {
    alert('Por favor preencha todos os campos.');
    return;
  }

  const data = { nome, posicao, clube, foto, gols, assistencias, jogos, favorita:false };

  const editIndex = parseInt(editIndexInput.value, 10);
  if (editIndex >= 0) {
    data.favorita = jogadores[editIndex].favorita;
    updatePlayer(editIndex, data);
  } else {
    addPlayer(data);
  }

  playerForm.reset();
  formSection.classList.add('hidden');
});

cancelBtn.addEventListener('click', () => {
  playerForm.reset();
  formSection.classList.add('hidden');
});

function applyFiltersAndRender(){
  let list = jogadores.slice();

  const q = searchInput.value.trim().toLowerCase();
  if (q) {
    list = list.filter(p =>
      p.nome.toLowerCase().includes(q) ||
      p.posicao.toLowerCase().includes(q)
    );
  }

  const clubFilter = filterClubSelect.value;
  if (clubFilter) {
    list = list.filter(p => p.clube === clubFilter);
  }

  if (currentSort === 'nome') {
    list.sort((a,b) => a.nome > b.nome ? 1 : -1);
  } else if (currentSort === 'posicao') {
    list.sort((a,b) => a.posicao > b.posicao ? 1 : -1);
  }

  renderCards(list);
}

searchInput.addEventListener('input', applyFiltersAndRender);
filterClubSelect.addEventListener('change', applyFiltersAndRender);

sortNameBtn.addEventListener('click', () => {
  currentSort = 'nome';
  applyFiltersAndRender();
});
sortPositionBtn.addEventListener('click', () => {
  currentSort = 'posicao';
  applyFiltersAndRender();
});

function populateClubFilter(){
  let clubs = [];
  jogadores.forEach(p => {
    if (!clubs.includes(p.clube)) {
      clubs.push(p.clube);
    }
  });
  clubs.sort();

  filterClubSelect.innerHTML = '<option value="">Filtrar por clube (Todos)</option>';
  clubs.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    filterClubSelect.appendChild(opt);
  });
}

function refreshUI(){
  populateClubFilter();
  applyFiltersAndRender();
}

function init(){
  loadInitialDataIfNeeded();
  refreshUI();
  showAddFormBtn.addEventListener('click', openAddForm);
}

init();
