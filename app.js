'use strict';
const root = document.documentElement;
const stage = document.querySelector('.stage');
const commands = [...document.querySelectorAll('.command')];
const commandList = document.getElementById('commands');
const noteTitle = document.getElementById('note-title');
const noteDescription = document.getElementById('note-description');
const noteIndex = document.getElementById('note-index');
let selected = 0;

function selectCommand(index, focus = false) {
  selected = (index + commands.length) % commands.length;
  commands.forEach((command, i) => command.classList.toggle('is-selected', i === selected));
  const command = commands[selected];
  noteTitle.textContent = command.dataset.title;
  noteDescription.textContent = command.dataset.description;
  noteIndex.textContent = String(selected + 1).padStart(2, '0');
  stage.dataset.choice = String(selected);
  if (focus) command.focus();
}
commands.forEach((command, i) => {
  command.addEventListener('pointerenter', () => selectCommand(i));
  command.addEventListener('focus', () => selectCommand(i));
});
commandList.addEventListener('keydown', event => {
  const moves = {ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1};
  if (event.key in moves) {
    event.preventDefault();
    selectCommand(selected + moves[event.key], true);
  } else if (event.key === 'Home' || event.key === 'End') {
    event.preventDefault();
    selectCommand(event.key === 'Home' ? 0 : commands.length - 1, true);
  }
});
selectCommand(0);

const panel = document.getElementById('detail-panel');
const detailTitle = document.getElementById('detail-title');
const detailCategory = document.getElementById('detail-category');
const detailContent = document.getElementById('detail-content');
const closeButton = document.querySelector('.close-panel');
const sectionTabs = [...document.querySelectorAll('.detail-tabs [role="tab"]')];
const tabList = document.querySelector('.detail-tabs');
const detailPaper = document.querySelector('.detail-paper');
let openingControl = null;
const details = {
  team: {title: ['CIENCIA, ARTE', 'Y COMUNIDAD.'], category: 'SOBRE NOSOTROS'},
  networks: {title: ['TODAS NUESTRAS', 'REDES.'], category: 'REDES SOCIALES'},
  projects: {title: ['IDEAS QUE', 'SE JUEGAN.'], category: 'PROYECTOS'},
  contact: {title: ['LA PRÓXIMA IDEA', 'EMPIEZA CONTIGO.'], category: 'CONTACTO'}
};
function openDetail(name, trigger) {
  const detail = details[name];
  const template = document.getElementById(`${name}-template`);
  if (!detail || !template) return;
  const alreadyOpen = panel.open;
  if (!alreadyOpen) openingControl = trigger;
  detailTitle.replaceChildren();
  detail.title.forEach((line, i) => {
    if (i) detailTitle.append(document.createElement('br'));
    detailTitle.append(document.createTextNode(line));
  });
  detailCategory.textContent = detail.category;
  detailContent.replaceChildren(template.content.cloneNode(true));
  detailContent.setAttribute('aria-labelledby', `tab-${name}`);
  sectionTabs.forEach(tab => {
    const active = tab.dataset.action === name;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  detailPaper.scrollTop = 0;
  if (!alreadyOpen) panel.showModal();
  document.body.classList.add('dialog-open');
  if (!alreadyOpen) closeButton.focus();
}
document.addEventListener('click', event => {
  const trigger = event.target.closest('[data-action]');
  if (trigger) openDetail(trigger.dataset.action, trigger);
});
tabList.addEventListener('keydown', event => {
  const index = sectionTabs.indexOf(document.activeElement);
  if (index < 0) return;
  let next = index;
  if (event.key === 'ArrowRight') next = (index + 1) % sectionTabs.length;
  else if (event.key === 'ArrowLeft') next = (index - 1 + sectionTabs.length) % sectionTabs.length;
  else if (event.key === 'Home') next = 0;
  else if (event.key === 'End') next = sectionTabs.length - 1;
  else return;
  event.preventDefault();
  sectionTabs[next].focus();
  openDetail(sectionTabs[next].dataset.action, sectionTabs[next]);
});
closeButton.addEventListener('click', () => panel.close());
panel.addEventListener('click', event => {
  if (event.target !== panel) return;
  const box = panel.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) panel.close();
});
panel.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  if (openingControl?.isConnected) openingControl.focus({preventScroll: true});
});

const motionButton = document.getElementById('motion-control');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let motionEnabled = !reducedMotion.matches;
try {
  if (localStorage.getItem('aukantun-motion-paused') === 'true') motionEnabled = false;
} catch {}
function syncMotion() {
  root.dataset.motion = motionEnabled ? 'on' : 'off';
  motionButton.setAttribute('aria-pressed', String(!motionEnabled));
  motionButton.setAttribute('aria-label', motionEnabled ? 'Pausar animación' : 'Activar animación');
  motionButton.querySelector('.motion-icon').textContent = motionEnabled ? 'Ⅱ' : '▷';
  motionButton.querySelector('.motion-text').textContent = motionEnabled ? 'ANIMACIÓN ON' : 'ANIMACIÓN OFF';
  if (!motionEnabled) resetParallax();
}
motionButton.addEventListener('click', () => {
  motionEnabled = !motionEnabled;
  try { localStorage.setItem('aukantun-motion-paused', String(!motionEnabled)); } catch {}
  syncMotion();
});
reducedMotion.addEventListener('change', event => {
  if (event.matches) {motionEnabled = false; syncMotion();}
});
let pendingFrame = null;
function resetParallax() {
  if (pendingFrame !== null) cancelAnimationFrame(pendingFrame);
  pendingFrame = null;
  root.style.setProperty('--px', '0px');
  root.style.setProperty('--py', '0px');
}
stage.addEventListener('pointermove', event => {
  if (!motionEnabled || event.pointerType !== 'mouse' || innerWidth <= 900 || panel.open) return;
  if (pendingFrame !== null) cancelAnimationFrame(pendingFrame);
  pendingFrame = requestAnimationFrame(() => {
    root.style.setProperty('--px', `${(event.clientX / innerWidth - .5) * 14}px`);
    root.style.setProperty('--py', `${(event.clientY / innerHeight - .5) * 10}px`);
    pendingFrame = null;
  });
});
stage.addEventListener('pointerleave', resetParallax);
document.addEventListener('visibilitychange', () => {
  root.dataset.tabHidden = String(document.hidden);
  if (document.hidden) resetParallax();
});
syncMotion();
