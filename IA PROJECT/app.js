const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));

// Traduções / mapeamentos para termos vindos da API
const mapType = (v) => ({ donation: 'Doação', discount: 'Desconto' }[String(v || '').toLowerCase()] || 'Doação');
const mapCategory = (v) => ({
  vegetable: 'Vegetal', vegetables: 'Vegetal', hortifruti: 'Hortifruti', fruit: 'Fruta', fruits: 'Fruta',
  dairy: 'Laticínios', bakery: 'Padaria', meat: 'Carne', grain: 'Grão', corn: 'Milho', lettuce: 'Alface', tomato: 'Tomate',
  potato: 'Batata', banana: 'Banana'
}[String(v || '').toLowerCase()] || (v || 'Categoria'));

function formatDateBR(iso) { try { return new Date(iso).toLocaleDateString('pt-BR'); } catch (_) { return iso || ''; } }

const State = {
  baseUrl: localStorage.getItem('baseUrl') || 'http://localhost:4010',
  token: localStorage.getItem('accessToken') || '',
  user: null,
  location: { lat: -23.55, lng: -46.63 },
  radiusKm: 10,
  lots: []
};

const API = {
  url: () => State.baseUrl.replace(/\/$/, ''),
  headers: () => ({
    'Content-Type': 'application/json',
    ...(State.token ? { 'Authorization': `Bearer ${State.token}` } : {})
  }),
  async get(path) {
    const r = await fetch(`${this.url()}${path}`, { headers: this.headers() });
    if (!r.ok) throw new Error(`GET ${path} → ${r.status}`);
    return r.json().catch(() => ({}));
  },
  async post(path, body) {
    const r = await fetch(`${this.url()}${path}`, { method: 'POST', headers: this.headers(), body: JSON.stringify(body || {}) });
    if (!r.ok) throw new Error(`POST ${path} → ${r.status}`);
    return r.json().catch(() => ({}));
  },
  async put(path, body) {
    const r = await fetch(`${this.url()}${path}`, { method: 'PUT', headers: this.headers(), body: JSON.stringify(body || {}) });
    if (!r.ok) throw new Error(`PUT ${path} → ${r.status}`);
    return r.json().catch(() => ({}));
  },
  async del(path) {
    const r = await fetch(`${this.url()}${path}`, { method: 'DELETE', headers: this.headers() });
    if (!r.ok) throw new Error(`DELETE ${path} → ${r.status}`);
  }
};

const toast = (msg, kind = 'info') => {
  const box = document.createElement('div');
  box.className = 't';
  box.textContent = msg;
  if (kind === 'error') box.style.borderColor = 'var(--danger)';
  if (kind === 'warn') box.style.borderColor = 'var(--warn)';
  $('#toast').appendChild(box);
  setTimeout(() => box.remove(), 4200);
};

// ===== Router =====
const routes = {
  '/home': renderHome,
  '/lots': renderLots,
  '/pantry': renderPantry,
  '/vendor': renderVendor,
  '/login': renderLogin
};
function navigate(hash) {
  const route = (hash || location.hash || '#/home').replace('#', '');
  const view = routes[route] || renderHome;
  $$('nav a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${route}`));
  view().catch(err => toast(err.message || String(err), 'error'));
  requestAnimationFrame(() => $('#app').focus());
}
window.addEventListener('hashchange', () => navigate());

// ===== Auth =====
async function refreshMe() {
  if (!State.token) { setAuthUI(false); return; }
  try {
    const me = await API.get('/users/me');
    State.user = me;
    setAuthUI(true);
  } catch (e) {
    console.warn('users/me falhou (ok no mock):', e.message);
    setAuthUI(!!State.token);
  }
}
function setAuthUI(logged) {
  $('#btn-login').style.display = logged ? 'none' : '';
  $('#btn-logout').style.display = logged ? '' : 'none';
}

// ===== Views =====
async function renderHome() {
  $('#app').innerHTML = `
    <section class="grid cols-2">
      <div class="card">
        <h2 style="margin-top:0">Bem-vinda, Ju 👋</h2>
        <p class="muted">Template <b>JavaScript + CSS (pt-BR)</b> para consumir sua API. Altere a <span class="kbd">Base URL</span> (tecla <b>g</b>) entre <b>mock Prism</b> e <b>backend real</b>.</p>
        <div class="row" style="margin-top:12px; gap:8px">
          <a class="btn primary" href="#/lots">Explorar lotes</a>
          <a class="btn" href="#/vendor">Publicar lote (vendedor)</a>
        </div>
      </div>
      <div class="card">
        <h3 style="margin-top:0">Dicas rápidas</h3>
        <ul class="muted">
          <li>Pressione <span class="kbd">g</span> para abrir <b>Configurações</b>.</li>
          <li>Use <span class="kbd">http://localhost:4010</span> com <b>docker compose up -d prism</b>.</li>
          <li>Faça <b>login</b> para reservar lotes e acessar a despensa.</li>
        </ul>
        <div class="code" aria-label="Exemplo de fetch">fetch(\`${State.baseUrl}/public/lots?...\`)</div>
      </div>
    </section>
  `;
}

async function renderLots() {
  $('#app').innerHTML = `
    <section class="card">
      <h2 style="margin-top:0">Lotes próximos</h2>
      <div class="row" style="flex-wrap:wrap">
        <div class="row" style="flex:2">
          <div>
            <label>Latitude</label>
            <input id="lat" value="${State.location.lat}" inputmode="decimal" />
          </div>
          <div>
            <label>Longitude</label>
            <input id="lng" value="${State.location.lng}" inputmode="decimal" />
          </div>
          <div>
            <label>Raio (km)</label>
            <input id="radius" value="${State.radiusKm}" inputmode="numeric" />
          </div>
        </div>
        <div class="row right" style="flex:1">
          <button class="btn" id="btn-geo">📍 Usar minha localização</button>
          <button class="btn primary" id="btn-buscar">Buscar</button>
        </div>
      </div>
    </section>
    <section class="list" id="list"></section>
  `;

  $('#btn-geo').onclick = () => {
    if (!('geolocation' in navigator)) return toast('Geolocalização não suportada', 'warn');
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;
      $('#lat').value = latitude.toFixed(6);
      $('#lng').value = longitude.toFixed(6);
      toast('Localização atualizada');
    }, err => toast(err.message, 'error'));
  };

  $('#btn-buscar').onclick = buscar;
  await buscar();

  async function buscar() {
    State.location.lat = parseFloat($('#lat').value);
    State.location.lng = parseFloat($('#lng').value);
    State.radiusKm = parseInt($('#radius').value || '10', 10);
    $('#baseUrlText').textContent = State.baseUrl;

    const qs = new URLSearchParams({ lat: State.location.lat, lng: State.location.lng, radius: State.radiusKm });
    const data = await API.get(`/public/lots?${qs.toString()}`);
    State.lots = Array.isArray(data) ? data : (data.items || []);
    renderList(State.lots);
  }

  function renderList(items) {
    const host = $('#list');
    host.innerHTML = '';
    if (!items?.length) { host.innerHTML = `<div class="card muted">Nenhum lote encontrado neste raio.</div>`; return; }
    for (const it of items) {
      const node = document.importNode($('#tpl-lot-card').content, true);
      $('.title', node).textContent = it.title || 'Lote';
      $('.type', node).textContent = mapType(it.type).toUpperCase();
      $('.desc', node).textContent = it.description || '';
      $('.cat', node).textContent = mapCategory(it.category);
      const qty = (it.qty != null ? it.qty : '?') + ' ' + (it.unit || '');
      $('.qty', node).textContent = qty;
      const exp = it.expiresAt ? `Val.: ${formatDateBR(it.expiresAt)}` : 'Sem validade';
      $('.exp', node).textContent = exp;
      $('.dist', node).textContent = `Raio de ${State.radiusKm} km`;
      $('.reserve', node).onclick = async () => {
        if (!State.token) {
          toast('Faça login para reservar', 'warn'); location.hash = '#/login'; return;
        }
        try {
          await API.post(`/lots/${it.id || 'demo'}/reserve`, {});
          toast('Reserva criada!');
        } catch (e) { toast('Não foi possível reservar (o mock pode não suportar).', 'error'); }
      };
      host.appendChild(node);
    }
  }
}

async function renderPantry() {
  if (!State.token) { toast('Faça login para acessar a despensa', 'warn'); location.hash = '#/login'; return; }
  $('#app').innerHTML = `
    <section class="grid cols-2">
      <div class="card">
        <h2 style="margin-top:0">Minha despensa</h2>
        <div id="pantry-list" class="list"></div>
      </div>
      <div class="card">
        <h3 style="margin-top:0">Adicionar item</h3>
        <label>Nome</label>
        <input id="pi-name" placeholder="Ex.: Tomate" />
        <div class="row">
          <div>
            <label>Quantidade</label>
            <input id="pi-qty" type="number" min="0" step="0.1" />
          </div>
          <div>
            <label>Unidade</label>
            <input id="pi-unit" placeholder="kg, un, L" />
          </div>
        </div>
        <label>Data de validade</label>
        <input id="pi-exp" type="date" />
        <div class="row right" style="margin-top:10px">
          <button class="btn primary" id="pi-save">Salvar</button>
        </div>
      </div>
    </section>
  `;

  $('#pi-save').onclick = async () => {
    const body = {
      name: $('#pi-name').value,
      qty: Number($('#pi-qty').value || 0),
      unit: $('#pi-unit').value || 'un',
      expiresAt: $('#pi-exp').value || new Date().toISOString().slice(0, 10),
      category: 'geral', status: 'active'
    };
    try { await API.post('/pantry/items', body); toast('Item adicionado'); await load(); }
    catch (e) { toast('Falha ao salvar (o mock pode não suportar).', 'error'); }
  };

  await load();

  async function load() {
    try {
      const list = await API.get('/pantry/items');
      const host = $('#pantry-list');
      host.innerHTML = '';
      (list || []).forEach(it => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `<b>${it.name || 'Item'}</b><div class="muted small">${(it.qty || '?')} ${(it.unit || '')} • Val.: ${it.expiresAt ? formatDateBR(it.expiresAt) : '-'}</div>`;
        host.appendChild(div);
      });
    } catch (e) {
      $('#pantry-list').innerHTML = `<div class="card muted">Sem dados (o mock pode retornar vazio).</div>`
    }
  }
}

async function renderVendor() {
  $('#app').innerHTML = `
    <section class="grid cols-2">
      <div class="card">
        <h2 style="margin-top:0">Publicar lote</h2>
        <label>Título</label>
        <input id="lot-title" placeholder="Ex.: Hortifruti de hoje" />
        <label>Descrição</label>
        <textarea id="lot-desc" rows="3" placeholder="Informações úteis"></textarea>
        <div class="row">
          <div><label>Categoria</label><input id="lot-cat" placeholder="hortifruti" /></div>
          <div><label>Quantidade</label><input id="lot-qty" type="number" min="0" step="0.1" /></div>
          <div><label>Unidade</label><input id="lot-unit" placeholder="kg" /></div>
        </div>
        <div class="row">
          <div>
            <label>Tipo</label>
            <select id="lot-type"><option value="donation">doação</option><option value="discount">desconto</option></select>
          </div>
          <div>
            <label>Data de validade</label>
            <input id="lot-exp" type="date" />
          </div>
        </div>
        <div class="row right" style="margin-top:10px">
          <button class="btn primary" id="lot-save">Publicar</button>
        </div>
      </div>
      <div class="card">
        <h3 style="margin-top:0">Meus lotes</h3>
        <div id="vendor-lots" class="list"></div>
      </div>
    </section>
  `;

  $('#lot-save').onclick = async () => {
    if (!State.token) { toast('Faça login para publicar', 'warn'); location.hash = '#/login'; return; }
    const body = {
      title: $('#lot-title').value, description: $('#lot-desc').value,
      category: $('#lot-cat').value, qty: Number($('#lot-qty').value || 0), unit: $('#lot-unit').value || 'kg',
      type: $('#lot-type').value, status: 'available',
      expiresAt: $('#lot-exp').value || new Date().toISOString().slice(0, 10)
    };
    try { await API.post('/lots', body); toast('Lote publicado!'); await loadMine(); }
    catch (e) { toast('Falha ao publicar (pode exigir verificação de vendedor).', 'error'); }
  };

  await loadMine();

  async function loadMine() {
    try {
      const list = await API.get('/lots'); // ideal filtrar por vendor
      const host = $('#vendor-lots'); host.innerHTML = '';
      (list || []).forEach(it => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `<b>${it.title || 'Lote'}</b><div class="muted small">${mapCategory(it.category)} • ${it.qty || '?'} ${it.unit || ''}</div>`;
        host.appendChild(div);
      });
    } catch (e) { $('#vendor-lots').innerHTML = `<div class="card muted">Sem dados (o mock pode retornar vazio).</div>` }
  }
}

async function renderLogin() {
  $('#app').innerHTML = `
    <section class="grid cols-2">
      <form class="card" id="frm-login">
        <h2 style="margin-top:0">Entrar</h2>
        <label>E-mail</label>
        <input id="lg-email" type="email" autocomplete="email" required />
        <label>Senha</label>
        <input id="lg-pass" type="password" autocomplete="current-password" required />
        <div class="row right" style="margin-top:10px">
          <button class="btn primary" type="submit">Entrar</button>
        </div>
        <p class="muted small">No mock (Prism) esta rota retorna genérico; o token real virá do backend.</p>
      </form>
      <form class="card" id="frm-register">
        <h3 style="margin-top:0">Criar conta</h3>
        <label>Nome</label>
        <input id="rg-name" />
        <label>E-mail</label>
        <input id="rg-email" type="email" />
        <label>Senha</label>
        <input id="rg-pass" type="password" />
        <div class="row right" style="margin-top:10px">
          <button class="btn" type="submit">Cadastrar</button>
        </div>
      </form>
    </section>
  `;

  $('#frm-login').onsubmit = async (e) => {
    e.preventDefault();
    try {
      const out = await API.post('/auth/login', { email: $('#lg-email').value, password: $('#lg-pass').value });
      State.token = out.accessToken || out.token || '';
      if (!State.token) { toast('Login OK (mock), mas sem token. No backend real virá o JWT.', 'warn'); }
      localStorage.setItem('accessToken', State.token);
      setAuthUI(true); toast('Sessão iniciada!'); location.hash = '#/home';
    } catch (err) { toast('Falha no login', 'error'); }
  };

  $('#frm-register').onsubmit = async (e) => {
    e.preventDefault();
    try { await API.post('/auth/register', { name: $('#rg-name').value, email: $('#rg-email').value, password: $('#rg-pass').value }); toast('Conta criada'); }
    catch (e) { toast('Falha ao cadastrar', 'error'); }
  };
}

// ===== Global UI =====
$('#btn-login').onclick = () => location.hash = '#/login';
$('#btn-logout').onclick = () => { State.token = ''; localStorage.removeItem('accessToken'); setAuthUI(false); toast('Sessão encerrada'); };

$('#btn-settings').onclick = openSettings;
document.addEventListener('keydown', (e) => { if (e.key.toLowerCase() === 'g') openSettings(); });
function openSettings() {
  $('#baseUrl').value = State.baseUrl;
  $('#accessToken').value = State.token;
  $('#dlg-settings').showModal();
}
$('#dlg-settings').addEventListener('close', () => {
  if ($('#dlg-settings').returnValue === 'ok') {
    State.baseUrl = $('#baseUrl').value || State.baseUrl;
    State.token = $('#accessToken').value || State.token;
    localStorage.setItem('baseUrl', State.baseUrl);
    localStorage.setItem('accessToken', State.token);
    $('#baseUrlText').textContent = State.baseUrl;
    setAuthUI(!!State.token);
    toast('Configurações salvas');
  }
});

// Init
$('#baseUrlText').textContent = State.baseUrl;
refreshMe();
navigate();
