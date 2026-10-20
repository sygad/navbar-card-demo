# navbar-card demo: scrolling, auto-hide and panel menus

Live demo: **https://sygad.github.io/navbar-card-demo/**

A browser demo of three options proposed for
[navbar-card](https://github.com/joseluis9595/lovelace-navbar-card), the
navigation bar for Home Assistant dashboards. It runs the real card, built from
the proposal branch, inside a mock dashboard, so it works without a Home
Assistant install.

| Option | What it does |
| --- | --- |
| `mobile.scrollable: true` | More routes than fit on a phone: the bar scrolls sideways, the selected route is centred when a view opens, and the edges fade while there is more to scroll |
| `mobile.autohide: slide` | The bar slides off while you scroll down and returns when you scroll up (Material "hide on scroll") |
| `mobile.autohide: minimize` | The bar shrinks to a pill showing the current page; tap it or scroll up to expand (iOS 26 tab bar) |
| `mobile.autohide: toggle` | An arrow tab on top of the bar folds it away and back, remembered per device |
| `layout.popup_style: panel` | A popup shows as one list of icon and label rows, with a light dim that leaves the bar usable |

On a computer, the page shows a phone with switches for each option. On a
phone, open [the demo full screen](https://sygad.github.io/navbar-card-demo/app.html).

## Files

- `index.html`: the page with the phone and the option switches
- `app.html`, `app.js`: the mock dashboard; stands in for Home Assistant's
  `ha-card`, `ha-icon` and navigation
- `navbar-card.js`: the card, built from
  [`feature/scrollable-autohide-popup-panel`](https://github.com/sygad/lovelace-navbar-card/tree/feature/scrollable-autohide-popup-panel)
- `icons.js`: the Material Design Icons paths the demo uses (Apache 2.0)
- `404.html`: lets GitHub Pages reload a view's address (`/app/<view>`)

navbar-card is by [joseluis9595](https://github.com/joseluis9595) under the MIT
licence.
