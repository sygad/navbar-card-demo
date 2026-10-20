// Mock Home Assistant dashboard running the real navbar-card build, so the
// new options can be tried in any browser. Views are faked; navigation uses
// the same history + `location-changed` mechanism as Home Assistant.

import ICONS from './icons.js';

const BASE = new URL('.', import.meta.url).pathname; // e.g. /navbar-card-demo/
const OPTIONS_KEY = 'navbar-demo-options';

export const DEFAULT_OPTIONS = {
  autohide: 'minimize',
  mode: 'docked',
  popup_style: 'panel',
  scrollable: true,
};

// ---------------------------------------------------------------------------
// Stand-ins for Home Assistant's own elements (same approach as the card's
// docs screenshot harness)

customElements.define(
  'ha-card',
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' }).innerHTML = `
        <style>:host{display:block;position:relative;box-sizing:border-box;
        background:var(--ha-card-background,var(--card-background-color));
        border-radius:var(--ha-card-border-radius,12px);
        color:var(--primary-text-color)}</style><slot></slot>`;
    }
  },
);

customElements.define(
  'ha-icon',
  class extends HTMLElement {
    static observedAttributes = ['icon'];
    set icon(value) {
      this._icon = value;
      this._render();
    }
    get icon() {
      return this._icon;
    }
    attributeChangedCallback(_name, _old, value) {
      this.icon = value;
    }
    connectedCallback() {
      this._render();
    }
    _render() {
      this.style.display = 'inline-flex';
      this.innerHTML = `<svg viewBox="0 0 24 24" style="width:var(--mdc-icon-size,24px);height:var(--mdc-icon-size,24px);fill:var(--icon-primary-color,currentColor);display:block"><path d="${ICONS[this._icon] ?? ''}"/></svg>`;
    }
  },
);

// ---------------------------------------------------------------------------
// Fake dashboard

const VIEWS = [
  { icon: 'mdi:home', id: 'home', title: 'Home' },
  { icon: 'mdi:sofa', id: 'lounge', title: 'Lounge' },
  { icon: 'mdi:kettle', id: 'kitchen', title: 'Kitchen' },
  { icon: 'mdi:chair-rolling', id: 'office', title: 'Office' },
  { icon: 'mdi:bed', id: 'bedroom', title: 'Bedroom' },
  { icon: 'mdi:shower-head', id: 'bathroom', title: 'Bathroom' },
  { icon: 'mdi:flower', id: 'garden', title: 'Garden' },
  { icon: 'mdi:garage-variant', id: 'garage', title: 'Garage' },
  { icon: 'mdi:lightning-bolt', id: 'energy', title: 'Energy' },
  { icon: 'mdi:shield-check', id: 'security', title: 'Security' },
  { icon: 'mdi:play-circle', id: 'media', title: 'Media' },
];

const TILES = [
  ['mdi:lightbulb', 'Ceiling light', 'On · 80%', true],
  ['mdi:lightbulb-outline', 'Lamp', 'Off', false],
  ['mdi:thermometer', 'Temperature', '20.5 °C', false],
  ['mdi:water-percent', 'Humidity', '48 %', false],
  ['mdi:blinds-horizontal', 'Blinds', 'Open', true],
  ['mdi:fan', 'Fan', 'Off', false],
  ['mdi:motion-sensor', 'Motion', 'Clear', false],
  ['mdi:door-closed', 'Door', 'Closed', false],
  ['mdi:speaker', 'Speaker', 'Playing', true],
  ['mdi:television-classic', 'TV', 'Off', false],
  ['mdi:lock', 'Lock', 'Locked', true],
  ['mdi:robot-vacuum', 'Vacuum', 'Docked', false],
];

const url = id => `${BASE}app/${id}`;

const navbarConfig = options => ({
  layout: { popup_style: options.popup_style, reflect_child_state: true },
  mobile: {
    autohide: options.autohide === 'off' ? false : options.autohide,
    mode: options.mode,
    scrollable: options.scrollable,
    show_labels: true,
  },
  routes: [
    ...VIEWS.slice(0, 9).map(view => ({
      icon: view.icon,
      label: view.title,
      url: url(view.id),
    })),
    {
      icon: 'mdi:dots-horizontal-circle-outline',
      label: 'More',
      popup: VIEWS.slice(9).map(view => ({
        icon: view.icon,
        label: view.title,
        url: url(view.id),
      })),
      tap_action: { action: 'open-popup' },
    },
  ],
});

const tile = ([icon, name, state, on]) => `
  <div class="tile${on ? ' on' : ''}">
    <span class="tile-icon"><ha-icon icon="${icon}"></ha-icon></span>
    <span><b>${name}</b><small>${state}</small></span>
  </div>`;

const renderView = () => {
  const id = location.pathname.split('/app/')[1]?.replace(/\/$/, '') || 'home';
  const view = VIEWS.find(v => v.id === id) ?? VIEWS[0];
  document.title = `${view.title} · navbar-card demo`;
  document.querySelector('#title').textContent = view.title;
  const sections = ['Lights & climate', 'Devices', 'Sensors', 'More devices'];
  document.querySelector('#view').innerHTML = sections
    .map(
      (name, i) => `
      <h2>${name}</h2>
      <div class="grid">${TILES.slice((i * 3) % 12)
        .concat(TILES)
        .slice(0, 6)
        .map(tile)
        .join('')}</div>`,
    )
    .join('');
};

// ---------------------------------------------------------------------------
// Options: from the page around the iframe (postMessage), else this browser

const readOptions = () => {
  try {
    return {
      ...DEFAULT_OPTIONS,
      ...JSON.parse(localStorage.getItem(OPTIONS_KEY) ?? '{}'),
    };
  } catch {
    return { ...DEFAULT_OPTIONS };
  }
};

// Created once navbar-card.js has defined the element
let card = null;

const applyOptions = options => {
  try {
    localStorage.setItem(OPTIONS_KEY, JSON.stringify(options));
  } catch {
    // storage blocked: options last for this page only
  }
  card?.setConfig(navbarConfig(options));
};

window.addEventListener('message', event => {
  if (event.origin !== location.origin) return;
  if (event.data?.type === 'navbar-demo-options') {
    applyOptions({ ...readOptions(), ...event.data.options });
  }
});

// The card hands actions to Home Assistant as `hass-action` events; play
// Home Assistant's part for navigation
window.addEventListener('hass-action', event => {
  const { action, config } = event.detail ?? {};
  const actionConfig = config?.[`${action}_action`];
  if (actionConfig?.action === 'navigate') {
    history.pushState(null, '', actionConfig.navigation_path);
    window.dispatchEvent(new CustomEvent('location-changed'));
  }
});

// In Home Assistant each view has its own card and state updates arrive all
// the time; this demo keeps one card, so nudge it to re-render on navigation
const onNavigate = () => {
  renderView();
  if (card?._hass) card.hass = { ...card._hass };
};
window.addEventListener('location-changed', onNavigate);
window.addEventListener('popstate', onNavigate);

// ---------------------------------------------------------------------------

if (!location.pathname.includes('/app/')) {
  // Arriving from 404.html after a reload of a view, or fresh
  const view = sessionStorage.getItem('navbar-demo-view') || 'home';
  sessionStorage.removeItem('navbar-demo-view');
  history.replaceState(null, '', url(view));
}
renderView();

await import(`${BASE}navbar-card.js`);
await customElements.whenDefined('navbar-card');
card = document.createElement('navbar-card');
card.setConfig(navbarConfig(readOptions()));
card.hass = {
  callService() {},
  language: 'en',
  locale: { language: 'en' },
  panels: {},
  states: {},
  themes: { darkMode: matchMedia('(prefers-color-scheme: dark)').matches },
  user: { is_admin: true, name: 'Demo' },
};
document.body.appendChild(card);
