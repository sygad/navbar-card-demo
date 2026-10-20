var __legacyDecorateClassTS = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1;i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __esm = (fn, res, err) => () => {
  if (fn)
    try {
      res = fn(fn = 0);
    } catch (e) {
      err = [e];
    }
  if (err)
    throw err[0];
  return res;
};

// node_modules/@lit/reactive-element/css-tag.js
class n {
  constructor(t, e, o) {
    if (this._$cssResult$ = true, o !== s)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (e && t === undefined) {
      const e = s !== undefined && s.length === 1;
      e && (t = o.get(s)), t === undefined && ((this.o = t = new CSSStyleSheet).replaceSync(this.cssText), e && o.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
}
var t, e, s, o, r = (t) => new n(typeof t == "string" ? t : t + "", undefined, s), i = (t, ...e) => {
  const o = t.length === 1 ? t[0] : e.reduce((e, s, o) => e + ((t) => {
    if (t._$cssResult$ === true)
      return t.cssText;
    if (typeof t == "number")
      return t;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + t[o + 1], t[0]);
  return new n(o, t, s);
}, S = (s, o) => {
  if (e)
    s.adoptedStyleSheets = o.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else
    for (const e of o) {
      const o = document.createElement("style"), n = t.litNonce;
      n !== undefined && o.setAttribute("nonce", n), o.textContent = e.cssText, s.appendChild(o);
    }
}, c;
var init_css_tag = __esm(() => {
  t = globalThis;
  e = t.ShadowRoot && (t.ShadyCSS === undefined || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  s = Symbol();
  o = new WeakMap;
  c = e ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((t) => {
    let e = "";
    for (const s of t.cssRules)
      e += s.cssText;
    return r(e);
  })(t) : t;
});

// node_modules/@lit/reactive-element/reactive-element.js
var i2, e2, h, r2, o2, n2, a, c2, l, p, d = (t, s) => t, u, f = (t, s) => !i2(t, s), b, y;
var init_reactive_element = __esm(() => {
  init_css_tag();
  init_css_tag();
  ({ is: i2, defineProperty: e2, getOwnPropertyDescriptor: h, getOwnPropertyNames: r2, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object);
  a = globalThis;
  c2 = a.trustedTypes;
  l = c2 ? c2.emptyScript : "";
  p = a.reactiveElementPolyfillSupport;
  u = { toAttribute(t, s) {
    switch (s) {
      case Boolean:
        t = t ? l : null;
        break;
      case Object:
      case Array:
        t = t == null ? t : JSON.stringify(t);
    }
    return t;
  }, fromAttribute(t, s) {
    let i = t;
    switch (s) {
      case Boolean:
        i = t !== null;
        break;
      case Number:
        i = t === null ? null : Number(t);
        break;
      case Object:
      case Array:
        try {
          i = JSON.parse(t);
        } catch (t) {
          i = null;
        }
    }
    return i;
  } };
  b = { attribute: true, type: String, converter: u, reflect: false, useDefault: false, hasChanged: f };
  Symbol.metadata ??= Symbol("metadata"), a.litPropertyMetadata ??= new WeakMap;
  y = class y extends HTMLElement {
    static addInitializer(t) {
      this._$Ei(), (this.l ??= []).push(t);
    }
    static get observedAttributes() {
      return this.finalize(), this._$Eh && [...this._$Eh.keys()];
    }
    static createProperty(t, s = b) {
      if (s.state && (s.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = true), this.elementProperties.set(t, s), !s.noAccessor) {
        const i = Symbol(), h = this.getPropertyDescriptor(t, i, s);
        h !== undefined && e2(this.prototype, t, h);
      }
    }
    static getPropertyDescriptor(t, s, i) {
      const { get: e, set: r } = h(this.prototype, t) ?? { get() {
        return this[s];
      }, set(t) {
        this[s] = t;
      } };
      return { get: e, set(s) {
        const h = e?.call(this);
        r?.call(this, s), this.requestUpdate(t, h, i);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t) {
      return this.elementProperties.get(t) ?? b;
    }
    static _$Ei() {
      if (this.hasOwnProperty(d("elementProperties")))
        return;
      const t = n2(this);
      t.finalize(), t.l !== undefined && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
    }
    static finalize() {
      if (this.hasOwnProperty(d("finalized")))
        return;
      if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
        const t = this.properties, s = [...r2(t), ...o2(t)];
        for (const i of s)
          this.createProperty(i, t[i]);
      }
      const t = this[Symbol.metadata];
      if (t !== null) {
        const s = litPropertyMetadata.get(t);
        if (s !== undefined)
          for (const [t, i] of s)
            this.elementProperties.set(t, i);
      }
      this._$Eh = new Map;
      for (const [t, s] of this.elementProperties) {
        const i = this._$Eu(t, s);
        i !== undefined && this._$Eh.set(i, t);
      }
      this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(s) {
      const i = [];
      if (Array.isArray(s)) {
        const e = new Set(s.flat(1 / 0).reverse());
        for (const s of e)
          i.unshift(c(s));
      } else
        s !== undefined && i.push(c(s));
      return i;
    }
    static _$Eu(t, s) {
      const i = s.attribute;
      return i === false ? undefined : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : undefined;
    }
    constructor() {
      super(), this._$Ep = undefined, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
    }
    _$Ev() {
      this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = new Map, this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
    }
    addController(t) {
      (this._$EO ??= new Set).add(t), this.renderRoot !== undefined && this.isConnected && t.hostConnected?.();
    }
    removeController(t) {
      this._$EO?.delete(t);
    }
    _$E_() {
      const t = new Map, s = this.constructor.elementProperties;
      for (const i of s.keys())
        this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
      t.size > 0 && (this._$Ep = t);
    }
    createRenderRoot() {
      const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
      return S(t, this.constructor.elementStyles), t;
    }
    connectedCallback() {
      this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t) => t.hostConnected?.());
    }
    enableUpdating(t) {}
    disconnectedCallback() {
      this._$EO?.forEach((t) => t.hostDisconnected?.());
    }
    attributeChangedCallback(t, s, i) {
      this._$AK(t, i);
    }
    _$ET(t, s) {
      const i = this.constructor.elementProperties.get(t), e = this.constructor._$Eu(t, i);
      if (e !== undefined && i.reflect === true) {
        const h = (i.converter?.toAttribute !== undefined ? i.converter : u).toAttribute(s, i.type);
        this._$Em = t, h == null ? this.removeAttribute(e) : this.setAttribute(e, h), this._$Em = null;
      }
    }
    _$AK(t, s) {
      const i = this.constructor, e = i._$Eh.get(t);
      if (e !== undefined && this._$Em !== e) {
        const t = i.getPropertyOptions(e), h = typeof t.converter == "function" ? { fromAttribute: t.converter } : t.converter?.fromAttribute !== undefined ? t.converter : u;
        this._$Em = e;
        const r = h.fromAttribute(s, t.type);
        this[e] = r ?? this._$Ej?.get(e) ?? r, this._$Em = null;
      }
    }
    requestUpdate(t, s, i) {
      if (t !== undefined) {
        const e = this.constructor, h = this[t];
        if (i ??= e.getPropertyOptions(t), !((i.hasChanged ?? f)(h, s) || i.useDefault && i.reflect && h === this._$Ej?.get(t) && !this.hasAttribute(e._$Eu(t, i))))
          return;
        this.C(t, s, i);
      }
      this.isUpdatePending === false && (this._$ES = this._$EP());
    }
    C(t, s, { useDefault: i, reflect: e, wrapped: h }, r) {
      i && !(this._$Ej ??= new Map).has(t) && (this._$Ej.set(t, r ?? s ?? this[t]), h !== true || r !== undefined) || (this._$AL.has(t) || (this.hasUpdated || i || (s = undefined), this._$AL.set(t, s)), e === true && this._$Em !== t && (this._$Eq ??= new Set).add(t));
    }
    async _$EP() {
      this.isUpdatePending = true;
      try {
        await this._$ES;
      } catch (t) {
        Promise.reject(t);
      }
      const t = this.scheduleUpdate();
      return t != null && await t, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      if (!this.isUpdatePending)
        return;
      if (!this.hasUpdated) {
        if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
          for (const [t, s] of this._$Ep)
            this[t] = s;
          this._$Ep = undefined;
        }
        const t = this.constructor.elementProperties;
        if (t.size > 0)
          for (const [s, i] of t) {
            const { wrapped: t } = i, e = this[s];
            t !== true || this._$AL.has(s) || e === undefined || this.C(s, undefined, i, e);
          }
      }
      let t = false;
      const s = this._$AL;
      try {
        t = this.shouldUpdate(s), t ? (this.willUpdate(s), this._$EO?.forEach((t) => t.hostUpdate?.()), this.update(s)) : this._$EM();
      } catch (s) {
        throw t = false, this._$EM(), s;
      }
      t && this._$AE(s);
    }
    willUpdate(t) {}
    _$AE(t) {
      this._$EO?.forEach((t) => t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t)), this.updated(t);
    }
    _$EM() {
      this._$AL = new Map, this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$ES;
    }
    shouldUpdate(t) {
      return true;
    }
    update(t) {
      this._$Eq &&= this._$Eq.forEach((t) => this._$ET(t, this[t])), this._$EM();
    }
    updated(t) {}
    firstUpdated(t) {}
  };
  y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d("elementProperties")] = new Map, y[d("finalized")] = new Map, p?.({ ReactiveElement: y }), (a.reactiveElementVersions ??= []).push("2.1.1");
});

// node_modules/lit-html/lit-html.js
function P(t, i) {
  if (!a2(t) || !t.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return s2 !== undefined ? s2.createHTML(i) : i;
}

class N {
  constructor({ strings: t, _$litType$: s }, n) {
    let r;
    this.parts = [];
    let c = 0, a = 0;
    const u = t.length - 1, d = this.parts, [f, v] = V(t, s);
    if (this.el = N.createElement(f, n), C.currentNode = this.el.content, s === 2 || s === 3) {
      const t = this.el.content.firstChild;
      t.replaceWith(...t.childNodes);
    }
    for (;(r = C.nextNode()) !== null && d.length < u; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes())
          for (const t of r.getAttributeNames())
            if (t.endsWith(e3)) {
              const i = v[a++], s = r.getAttribute(t).split(h2), e = /([.?@])?(.*)/.exec(i);
              d.push({ type: 1, index: c, name: e[2], strings: s, ctor: e[1] === "." ? H : e[1] === "?" ? I : e[1] === "@" ? L : k }), r.removeAttribute(t);
            } else
              t.startsWith(h2) && (d.push({ type: 6, index: c }), r.removeAttribute(t));
        if ($.test(r.tagName)) {
          const t = r.textContent.split(h2), s = t.length - 1;
          if (s > 0) {
            r.textContent = i3 ? i3.emptyScript : "";
            for (let i = 0;i < s; i++)
              r.append(t[i], l2()), C.nextNode(), d.push({ type: 2, index: ++c });
            r.append(t[s], l2());
          }
        }
      } else if (r.nodeType === 8)
        if (r.data === o3)
          d.push({ type: 2, index: c });
        else {
          let t = -1;
          for (;(t = r.data.indexOf(h2, t + 1)) !== -1; )
            d.push({ type: 7, index: c }), t += h2.length - 1;
        }
      c++;
    }
  }
  static createElement(t, i) {
    const s = r3.createElement("template");
    return s.innerHTML = t, s;
  }
}
function S2(t, i, s = t, e) {
  if (i === T)
    return i;
  let h = e !== undefined ? s._$Co?.[e] : s._$Cl;
  const o = c3(i) ? undefined : i._$litDirective$;
  return h?.constructor !== o && (h?._$AO?.(false), o === undefined ? h = undefined : (h = new o(t), h._$AT(t, s, e)), e !== undefined ? (s._$Co ??= [])[e] = h : s._$Cl = h), h !== undefined && (i = S2(t, h._$AS(t, i.values), h, e)), i;
}

class M {
  constructor(t, i) {
    this._$AV = [], this._$AN = undefined, this._$AD = t, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: i }, parts: s } = this._$AD, e = (t?.creationScope ?? r3).importNode(i, true);
    C.currentNode = e;
    let h = C.nextNode(), o = 0, n = 0, l = s[0];
    for (;l !== undefined; ) {
      if (o === l.index) {
        let i;
        l.type === 2 ? i = new R(h, h.nextSibling, this, t) : l.type === 1 ? i = new l.ctor(h, l.name, l.strings, this, t) : l.type === 6 && (i = new z(h, this, t)), this._$AV.push(i), l = s[++n];
      }
      o !== l?.index && (h = C.nextNode(), o++);
    }
    return C.currentNode = r3, e;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV)
      s !== undefined && (s.strings !== undefined ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}

class R {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, s, e) {
    this.type = 2, this._$AH = E, this._$AN = undefined, this._$AA = t, this._$AB = i, this._$AM = s, this.options = e, this._$Cv = e?.isConnected ?? true;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return i !== undefined && t?.nodeType === 11 && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = S2(this, t, i), c3(t) ? t === E || t == null || t === "" ? (this._$AH !== E && this._$AR(), this._$AH = E) : t !== this._$AH && t !== T && this._(t) : t._$litType$ !== undefined ? this.$(t) : t.nodeType !== undefined ? this.T(t) : u2(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== E && c3(this._$AH) ? this._$AA.nextSibling.data = t : this.T(r3.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: s } = t, e = typeof s == "number" ? this._$AC(t) : (s.el === undefined && (s.el = N.createElement(P(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === e)
      this._$AH.p(i);
    else {
      const t = new M(e, this), s = t.u(this.options);
      t.p(i), this.T(s), this._$AH = t;
    }
  }
  _$AC(t) {
    let i = A.get(t.strings);
    return i === undefined && A.set(t.strings, i = new N(t)), i;
  }
  k(t) {
    a2(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, e = 0;
    for (const h of t)
      e === i.length ? i.push(s = new R(this.O(l2()), this.O(l2()), this, this.options)) : s = i[e], s._$AI(h), e++;
    e < i.length && (this._$AR(s && s._$AB.nextSibling, e), i.length = e);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(false, true, i);t !== this._$AB; ) {
      const i = t.nextSibling;
      t.remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === undefined && (this._$Cv = t, this._$AP?.(t));
  }
}

class k {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, s, e, h) {
    this.type = 1, this._$AH = E, this._$AN = undefined, this.element = t, this.name = i, this._$AM = e, this.options = h, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String), this.strings = s) : this._$AH = E;
  }
  _$AI(t, i = this, s, e) {
    const h = this.strings;
    let o = false;
    if (h === undefined)
      t = S2(this, t, i, 0), o = !c3(t) || t !== this._$AH && t !== T, o && (this._$AH = t);
    else {
      const e = t;
      let n, r;
      for (t = h[0], n = 0;n < h.length - 1; n++)
        r = S2(this, e[s + n], i, n), r === T && (r = this._$AH[n]), o ||= !c3(r) || r !== this._$AH[n], r === E ? t = E : t !== E && (t += (r ?? "") + h[n + 1]), this._$AH[n] = r;
    }
    o && !e && this.j(t);
  }
  j(t) {
    t === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}

class z {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = undefined, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    S2(this, t);
  }
}
var t2, i3, s2, e3 = "$lit$", h2, o3, n3, r3, l2 = () => r3.createComment(""), c3 = (t) => t === null || typeof t != "object" && typeof t != "function", a2, u2 = (t) => a2(t) || typeof t?.[Symbol.iterator] == "function", d2 = `[ 	
\f\r]`, f2, v, _, m, p2, g, $, y2 = (t) => (i, ...s) => ({ _$litType$: t, strings: i, values: s }), x, b2, w, T, E, A, C, V = (t, i) => {
  const s = t.length - 1, o = [];
  let r, l = i === 2 ? "<svg>" : i === 3 ? "<math>" : "", c = f2;
  for (let i = 0;i < s; i++) {
    const s = t[i];
    let a, u, d = -1, y = 0;
    for (;y < s.length && (c.lastIndex = y, u = c.exec(s), u !== null); )
      y = c.lastIndex, c === f2 ? u[1] === "!--" ? c = v : u[1] !== undefined ? c = _ : u[2] !== undefined ? ($.test(u[2]) && (r = RegExp("</" + u[2], "g")), c = m) : u[3] !== undefined && (c = m) : c === m ? u[0] === ">" ? (c = r ?? f2, d = -1) : u[1] === undefined ? d = -2 : (d = c.lastIndex - u[2].length, a = u[1], c = u[3] === undefined ? m : u[3] === '"' ? g : p2) : c === g || c === p2 ? c = m : c === v || c === _ ? c = f2 : (c = m, r = undefined);
    const x = c === m && t[i + 1].startsWith("/>") ? " " : "";
    l += c === f2 ? s + n3 : d >= 0 ? (o.push(a), s.slice(0, d) + e3 + s.slice(d) + h2 + x) : s + h2 + (d === -2 ? i : x);
  }
  return [P(t, l + (t[s] || "<?>") + (i === 2 ? "</svg>" : i === 3 ? "</math>" : "")), o];
}, H, I, L, j, B = (t, i, s) => {
  const e = s?.renderBefore ?? i;
  let h = e._$litPart$;
  if (h === undefined) {
    const t = s?.renderBefore ?? null;
    e._$litPart$ = h = new R(i.insertBefore(l2(), t), t, undefined, s ?? {});
  }
  return h._$AI(t), h;
};
var init_lit_html = __esm(() => {
  t2 = globalThis;
  i3 = t2.trustedTypes;
  s2 = i3 ? i3.createPolicy("lit-html", { createHTML: (t) => t }) : undefined;
  h2 = `lit$${Math.random().toFixed(9).slice(2)}$`;
  o3 = "?" + h2;
  n3 = `<${o3}>`;
  r3 = document;
  a2 = Array.isArray;
  f2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  v = /-->/g;
  _ = />/g;
  m = RegExp(`>|${d2}(?:([^\\s"'>=/]+)(${d2}*=${d2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  p2 = /'/g;
  g = /"/g;
  $ = /^(?:script|style|textarea|title)$/i;
  x = y2(1);
  b2 = y2(2);
  w = y2(3);
  T = Symbol.for("lit-noChange");
  E = Symbol.for("lit-nothing");
  A = new WeakMap;
  C = r3.createTreeWalker(r3, 129);
  H = class H extends k {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t) {
      this.element[this.name] = t === E ? undefined : t;
    }
  };
  I = class I extends k {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t) {
      this.element.toggleAttribute(this.name, !!t && t !== E);
    }
  };
  L = class L extends k {
    constructor(t, i, s, e, h) {
      super(t, i, s, e, h), this.type = 5;
    }
    _$AI(t, i = this) {
      if ((t = S2(this, t, i, 0) ?? E) === T)
        return;
      const s = this._$AH, e = t === E && s !== E || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, h = t !== E && (s === E || e);
      e && this.element.removeEventListener(this.name, this, s), h && this.element.addEventListener(this.name, this, t), this._$AH = t;
    }
    handleEvent(t) {
      typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
    }
  };
  j = t2.litHtmlPolyfillSupport;
  j?.(N, R), (t2.litHtmlVersions ??= []).push("3.3.1");
});

// node_modules/lit-element/lit-element.js
var s3, i4, o4;
var init_lit_element = __esm(() => {
  init_reactive_element();
  init_lit_html();
  init_reactive_element();
  init_lit_html();
  s3 = globalThis;
  i4 = class i4 extends y {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = undefined;
    }
    createRenderRoot() {
      const t = super.createRenderRoot();
      return this.renderOptions.renderBefore ??= t.firstChild, t;
    }
    update(t) {
      const r = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = B(r, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      super.connectedCallback(), this._$Do?.setConnected(true);
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this._$Do?.setConnected(false);
    }
    render() {
      return T;
    }
  };
  i4._$litElement$ = true, i4["finalized"] = true, s3.litElementHydrateSupport?.({ LitElement: i4 });
  o4 = s3.litElementPolyfillSupport;
  o4?.({ LitElement: i4 });
  (s3.litElementVersions ??= []).push("4.2.1");
});

// node_modules/lit-html/is-server.js
var init_is_server = () => {};

// node_modules/lit/index.js
var init_lit = __esm(() => {
  init_reactive_element();
  init_lit_html();
  init_lit_element();
  init_is_server();
});

// node_modules/@lit/reactive-element/decorators/custom-element.js
var t3 = (t) => (e, o) => {
  o !== undefined ? o.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
var init_custom_element = () => {};

// node_modules/@lit/reactive-element/decorators/property.js
function n4(t) {
  return (e, o) => typeof o == "object" ? r4(t, e, o) : ((t, e, o) => {
    const r = e.hasOwnProperty(o);
    return e.constructor.createProperty(o, t), r ? Object.getOwnPropertyDescriptor(e, o) : undefined;
  })(t, e, o);
}
var o5, r4 = (t = o5, e, r) => {
  const { kind: n, metadata: i } = r;
  let s = globalThis.litPropertyMetadata.get(i);
  if (s === undefined && globalThis.litPropertyMetadata.set(i, s = new Map), n === "setter" && ((t = Object.create(t)).wrapped = true), s.set(r.name, t), n === "accessor") {
    const { name: o } = r;
    return { set(r) {
      const n = e.get.call(this);
      e.set.call(this, r), this.requestUpdate(o, n, t);
    }, init(e) {
      return e !== undefined && this.C(o, undefined, t, e), e;
    } };
  }
  if (n === "setter") {
    const { name: o } = r;
    return function(r) {
      const n = this[o];
      e.call(this, r), this.requestUpdate(o, n, t);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
var init_property = __esm(() => {
  init_reactive_element();
  o5 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
});

// node_modules/@lit/reactive-element/decorators/state.js
function r5(r) {
  return n4({ ...r, state: true, attribute: false });
}
var init_state = __esm(() => {
  init_property();
});

// node_modules/@lit/reactive-element/decorators/event-options.js
var init_event_options = () => {};

// node_modules/@lit/reactive-element/decorators/base.js
var init_base = () => {};

// node_modules/@lit/reactive-element/decorators/query.js
var init_query = __esm(() => {
  init_base();
});

// node_modules/@lit/reactive-element/decorators/query-all.js
var init_query_all = __esm(() => {
  init_base();
});

// node_modules/@lit/reactive-element/decorators/query-async.js
var init_query_async = __esm(() => {
  init_base();
});

// node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
var init_query_assigned_elements = __esm(() => {
  init_base();
});

// node_modules/@lit/reactive-element/decorators/query-assigned-nodes.js
var init_query_assigned_nodes = __esm(() => {
  init_base();
});

// node_modules/lit/decorators.js
var init_decorators = __esm(() => {
  init_custom_element();
  init_property();
  init_state();
  init_event_options();
  init_query();
  init_query_all();
  init_query_async();
  init_query_assigned_elements();
  init_query_assigned_nodes();
});

// node_modules/custom-card-helpers/dist/index.m.js
var NumberFormat, TimeFormat, DOMAINS_TOGGLE, fireEvent = (node, type, detail, options) => {
  options = options || {};
  detail = detail === null || detail === undefined ? {} : detail;
  const event = new Event(type, {
    bubbles: options.bubbles === undefined ? true : options.bubbles,
    cancelable: Boolean(options.cancelable),
    composed: options.composed === undefined ? true : options.composed
  });
  event.detail = detail;
  node.dispatchEvent(event);
  return event;
}, SPECIAL_TYPES, navigate = (_node, path, replace = false) => {
  if (replace) {
    history.replaceState(null, "", path);
  } else {
    history.pushState(null, "", path);
  }
  fireEvent(window, "location-changed", {
    replace
  });
};
var init_index_m = __esm(() => {
  (function(NumberFormat) {
    NumberFormat["language"] = "language";
    NumberFormat["system"] = "system";
    NumberFormat["comma_decimal"] = "comma_decimal";
    NumberFormat["decimal_comma"] = "decimal_comma";
    NumberFormat["space_comma"] = "space_comma";
    NumberFormat["none"] = "none";
  })(NumberFormat || (NumberFormat = {}));
  (function(TimeFormat) {
    TimeFormat["language"] = "language";
    TimeFormat["system"] = "system";
    TimeFormat["am_pm"] = "12";
    TimeFormat["twenty_four"] = "24";
  })(TimeFormat || (TimeFormat = {}));
  DOMAINS_TOGGLE = new Set([
    "fan",
    "input_boolean",
    "light",
    "switch",
    "group",
    "automation"
  ]);
  SPECIAL_TYPES = new Set([
    "call-service",
    "divider",
    "section",
    "weblink",
    "cast",
    "select"
  ]);
});

// src/types/config.ts
var DesktopPosition, NavbarCustomActions, DEFAULT_NAVBAR_CONFIG, STUB_CONFIG;
var init_config = __esm(() => {
  ((DesktopPosition) => {
    DesktopPosition["top"] = "top";
    DesktopPosition["left"] = "left";
    DesktopPosition["bottom"] = "bottom";
    DesktopPosition["right"] = "right";
  })(DesktopPosition ||= {});
  ((NavbarCustomActions) => {
    NavbarCustomActions["openPopup"] = "open-popup";
    NavbarCustomActions["navigateBack"] = "navigate-back";
    NavbarCustomActions["showNotifications"] = "show-notifications";
    NavbarCustomActions["quickbar"] = "quickbar";
    NavbarCustomActions["openEditMode"] = "open-edit-mode";
    NavbarCustomActions["toggleMenu"] = "toggle-menu";
    NavbarCustomActions["logout"] = "logout";
    NavbarCustomActions["customJSAction"] = "custom-js-action";
  })(NavbarCustomActions ||= {});
  DEFAULT_NAVBAR_CONFIG = {
    desktop: {
      min_width: 768,
      mode: "floating",
      position: "bottom" /* bottom */,
      show_labels: false,
      show_popup_label_backgrounds: false
    },
    haptic: {
      double_tap_action: true,
      hold_action: true,
      tap_action: false,
      url: false
    },
    layout: {
      auto_padding: {
        desktop_px: 100,
        enabled: true,
        media_player_px: 100,
        mobile_px: 80
      },
      popup_style: "bubbles",
      reflect_child_state: false
    },
    media_player: {
      album_cover_background: false,
      desktop_position: "bottom-center" /* bottomCenter */
    },
    mobile: {
      autohide: false,
      mode: "docked",
      safe_area: false,
      scrollable: false,
      show_labels: false,
      show_popup_label_backgrounds: false
    },
    routes: [],
    template: undefined
  };
  STUB_CONFIG = {
    routes: [
      { icon: "mdi:home", label: "Home", url: window.location.pathname },
      {
        hold_action: {
          action: "navigate",
          navigation_path: "/config/devices/dashboard"
        },
        icon: "mdi:devices",
        label: "Devices",
        url: `${window.location.pathname}/devices`
      },
      {
        icon: "mdi:creation",
        label: "Automations",
        url: "/config/automation/dashboard"
      },
      { icon: "mdi:cog", label: "Settings", url: "/config/dashboard" },
      {
        icon: "mdi:dots-horizontal",
        label: "More",
        popup: [
          { icon: "mdi:cog", url: "/config/dashboard" },
          {
            icon: "mdi:hammer",
            url: "/developer-tools/yaml"
          },
          {
            icon: "mdi:power",
            tap_action: {
              action: "call-service",
              confirmation: {
                text: "Are you sure you want to restart Home Assistant?"
              },
              service: "homeassistant.restart",
              service_data: {}
            }
          }
        ],
        tap_action: {
          action: "open-popup" /* openPopup */
        }
      }
    ]
  };
});

// src/types/types.ts
function genericGetProperty(obj, key) {
  return key.split(".").reduce((o, k) => o?.[k], obj);
}
function genericSetProperty(obj, key, value, options = { allowDeletion: false }) {
  const paths = key.split(".");
  const finalKey = paths.pop();
  const copy = Array.isArray(obj) ? [...obj] : { ...obj };
  let currentObj = copy;
  let originalObj = obj;
  for (let i = 0;i < paths.length; i++) {
    const p = paths[i];
    if (typeof originalObj[p] !== "object" || originalObj[p] === undefined || originalObj[p] === null) {
      const nextKey = paths[i + 1];
      const isArrayIndex = nextKey !== undefined && !Number.isNaN(Number(nextKey));
      currentObj[p] = isArrayIndex ? [] : {};
    } else {
      currentObj[p] = Array.isArray(originalObj[p]) ? [...originalObj[p]] : { ...originalObj[p] };
    }
    currentObj = currentObj[p];
    originalObj = originalObj[p] ?? {};
  }
  if ((value === null || value === undefined) && options.allowDeletion) {
    delete currentObj[finalKey];
  } else {
    currentObj[finalKey] = value;
  }
  return copy;
}

// src/types/index.ts
var init_types = __esm(() => {
  init_config();
});

// src/utils/base-types/object.ts
function deepMergeKeepArrays(item, newData) {
  if (Array.isArray(newData)) {
    return newData;
  } else if (newData !== null && typeof newData === "object" && item !== null && typeof item === "object") {
    const result = { ...item };
    for (const key in newData) {
      if (newData[key] === null) {
        delete result[key];
      } else if (newData[key] !== undefined) {
        result[key] = deepMergeKeepArrays(item[key], newData[key]);
      }
    }
    return result;
  } else if (newData !== undefined) {
    return newData;
  }
  return item;
}

// src/utils/base-types/string.ts
var mapStringToEnum = (enumType, value) => {
  if (Object.values(enumType).includes(value)) {
    return value;
  }
  return;
}, generateHash = (str) => {
  let hash = 0;
  for (let i = 0;i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
  }
  return hash.toString();
};

// src/utils/docs-links.ts
var BASE_URL = "https://joseluis9595.github.io/lovelace-navbar-card/docs", DOCS_LINKS;
var init_docs_links = __esm(() => {
  DOCS_LINKS = {
    jsTemplate: `${BASE_URL}/advanced/js-templates`,
    styles: `${BASE_URL}/configuration/styles`,
    template: `${BASE_URL}/advanced/navbar-templates`
  };
});

// src/utils/dom.ts
function fireDOMEvent(node, type, data, EventConstructor) {
  const { options, detailOverride } = data ?? {};
  const eventConstructor = EventConstructor || Event;
  const event = new eventConstructor(type, options);
  if (detailOverride !== undefined) {
    event.detail = detailOverride;
  }
  node.dispatchEvent(event);
  return event;
}
var DASHBOARD_PADDING_STYLE_ID = "navbar-card-forced-padding-styles", DEFAULT_STYLES_ID = "navbar-card-default-styles", USER_STYLES_ID = "navbar-card-user-styles", getNavbarTemplates = () => {
  const lovelacePanel = document?.querySelector("home-assistant")?.shadowRoot?.querySelector("home-assistant-main")?.shadowRoot?.querySelector("ha-drawer partial-panel-resolver ha-panel-lovelace");
  if (lovelacePanel) {
    return lovelacePanel.lovelace.config["navbar-templates"];
  }
  return null;
}, forceResetRipple = (target) => {
  const rippleElements = target?.querySelectorAll("ha-ripple");
  rippleElements?.forEach((ripple) => {
    setTimeout(() => {
      ripple.hovered = false;
      ripple.pressed = false;
    }, 10);
  });
}, findHuiRoot = () => {
  return window.document.querySelector("home-assistant")?.shadowRoot?.querySelector("home-assistant-main")?.shadowRoot?.querySelector("ha-panel-lovelace")?.shadowRoot?.querySelector("hui-root");
}, forceOpenEditMode = () => {
  const huiRoot = findHuiRoot();
  if (!huiRoot?.shadowRoot)
    return;
  huiRoot.lovelace.setEditMode(true);
}, removeDashboardPadding = () => {
  const huiRoot = findHuiRoot();
  if (!huiRoot?.shadowRoot)
    return;
  const styleEl = huiRoot.shadowRoot.querySelector(`#${DASHBOARD_PADDING_STYLE_ID}`);
  if (styleEl) {
    styleEl.remove();
  }
}, forceDashboardPadding = (options) => {
  const autoPaddingEnabled = options?.autoPadding?.enabled ?? DEFAULT_NAVBAR_CONFIG.layout?.auto_padding?.enabled;
  const huiRoot = findHuiRoot();
  if (!huiRoot?.shadowRoot) {
    console.warn("[navbar-card] Could not find hui-root. Custom padding styles will not be applied.");
    return;
  }
  const totalPaddings = {
    desktop: {
      ["top" /* top */]: 0,
      ["bottom" /* bottom */]: 0,
      ["left" /* left */]: 0,
      ["right" /* right */]: 0
    },
    mobile: {
      bottom: 0
    }
  };
  let styleEl = huiRoot.shadowRoot.querySelector(`#${DASHBOARD_PADDING_STYLE_ID}`);
  if (!autoPaddingEnabled) {
    if (styleEl) {
      styleEl.remove();
    }
    return;
  }
  const desktopMinWidth = options?.desktop?.min_width ?? 768;
  const desktopPosition = options?.desktop?.position ?? DEFAULT_NAVBAR_CONFIG.desktop.position;
  const mobileMaxWidth = desktopMinWidth - 1;
  let cssText = "";
  const desktopPaddingPx = options?.autoPadding?.desktop_px ?? DEFAULT_NAVBAR_CONFIG.layout?.auto_padding?.desktop_px ?? 0;
  totalPaddings.desktop[desktopPosition] += desktopPaddingPx;
  const mobilePaddingPx = options?.autoPadding?.mobile_px ?? DEFAULT_NAVBAR_CONFIG.layout?.auto_padding?.mobile_px ?? 0;
  totalPaddings.mobile.bottom += mobilePaddingPx;
  const mediaPlayerPaddingPx = options?.autoPadding?.media_player_px ?? DEFAULT_NAVBAR_CONFIG.layout?.auto_padding?.media_player_px ?? 0;
  const mediaPlayerPosition = options?.widgetPositions?.media_player ?? null;
  if (mediaPlayerPosition) {
    switch (mediaPlayerPosition) {
      case "top-left" /* topLeft */:
      case "top-center" /* topCenter */:
      case "top-right" /* topRight */:
        totalPaddings.desktop["top" /* top */] += mediaPlayerPaddingPx;
        break;
      case "bottom-center" /* bottomCenter */:
      case "bottom-right" /* bottomRight */:
      case "bottom-left" /* bottomLeft */:
        totalPaddings.desktop["bottom" /* bottom */] += mediaPlayerPaddingPx;
        break;
    }
    totalPaddings.mobile.bottom += mediaPlayerPaddingPx;
  }
  if (totalPaddings.desktop["top" /* top */] > 0) {
    cssText += `
      @media (min-width: ${desktopMinWidth}px) {
        :not(.edit-mode) > hui-view:before {
          content: "";
          display: block;
          height: ${totalPaddings.desktop["top" /* top */]}px;
          width: 100%;
          background-color: transparent;
        }
      }
    `;
  }
  if (totalPaddings.desktop["bottom" /* bottom */] > 0) {
    cssText += `
      @media (min-width: ${desktopMinWidth}px) {
        :not(.edit-mode) > hui-view:after {
          content: "";
          display: block;
          height: ${totalPaddings.desktop["bottom" /* bottom */]}px;
          width: 100%;
          background-color: transparent;
        }
      }
    `;
  }
  if (totalPaddings.desktop["left" /* left */] > 0) {
    cssText += `
      @media (min-width: ${desktopMinWidth}px) {
       :not(.edit-mode) > #view {
            padding-left: ${totalPaddings.desktop["left" /* left */]}px !important;
          }
      }
    `;
  }
  if (totalPaddings.desktop["right" /* right */] > 0) {
    cssText += `
      @media (min-width: ${desktopMinWidth}px) {
       :not(.edit-mode) > #view {
            padding-right: ${totalPaddings.desktop["right" /* right */]}px !important;
          }
      }
    `;
  }
  if (totalPaddings.mobile.bottom > 0) {
    cssText += `
        @media (max-width: ${mobileMaxWidth}px) {
          :not(.edit-mode) > hui-view:after {
            content: "";
            display: block;
            height: ${totalPaddings.mobile.bottom}px;
            width: 100%;
            background-color: transparent;
            }
          }
        `;
  }
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = DASHBOARD_PADDING_STYLE_ID;
    styleEl.textContent = cssText;
    huiRoot.shadowRoot.appendChild(styleEl);
  } else {
    styleEl.textContent = cssText;
  }
}, createStyleElement = (root, id, styles) => {
  const rootEl = root.shadowRoot;
  let styleEl = rootEl?.querySelector(`#${id}`);
  if (styleEl) {
    styleEl.remove();
  }
  styleEl = document.createElement("style");
  styleEl.id = id;
  styleEl.textContent = styles.cssText;
  rootEl?.appendChild(styleEl);
}, injectStyles = (root, defaultStyles, userStyles) => {
  createStyleElement(root, DEFAULT_STYLES_ID, defaultStyles);
  createStyleElement(root, USER_STYLES_ID, userStyles);
}, preventEventDefault = (e) => {
  e.preventDefault();
  e.stopPropagation();
}, scrollToTop = () => {
  window.scrollTo({
    behavior: "smooth",
    left: 0,
    top: 0
  });
}, matchesCurrentNavigationPath = (url) => {
  const pathname = window.location.pathname;
  if (!url)
    return false;
  if (url.startsWith("/")) {
    return pathname === url;
  }
  const normalizedPathname = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  const normalizedUrl = url.endsWith("/") ? url.slice(0, -1) : url;
  return normalizedPathname.endsWith(`/${normalizedUrl}`);
}, conditionallyRender = (condition, renderContent) => {
  if (condition) {
    return renderContent();
  }
  return x`<div class="loader-container">
    <span class="loader"></span>
  </div>`;
}, supportsHAComponent = (component) => {
  return customElements?.get(component) != null;
};
var init_dom = __esm(() => {
  init_lit();
  init_config();
});

// src/utils/haptic.ts
var shouldTriggerHaptic = (context, actionType, isNavigation = false) => {
  const hapticConfig = context.config?.haptic ?? DEFAULT_NAVBAR_CONFIG.haptic;
  if (typeof hapticConfig === "boolean") {
    return hapticConfig;
  }
  if (isNavigation) {
    return hapticConfig.url ?? DEFAULT_NAVBAR_CONFIG.haptic.url;
  }
  switch (actionType) {
    case "tap":
      return hapticConfig.tap_action ?? DEFAULT_NAVBAR_CONFIG.haptic.tap_action;
    case "hold":
      return hapticConfig.hold_action ?? DEFAULT_NAVBAR_CONFIG.haptic.hold_action;
    case "double_tap":
      return hapticConfig.double_tap_action ?? DEFAULT_NAVBAR_CONFIG.haptic.double_tap_action;
    default:
      return false;
  }
}, triggerHaptic = (context, actionType, isNavigation = false) => {
  if (shouldTriggerHaptic(context, actionType, isNavigation)) {
    fireDOMEvent(window, "haptic", { detailOverride: "selection" });
  }
};
var init_haptic = __esm(() => {
  init_types();
  init_utils();
});

// src/utils/template.ts
var templateFunctionCache, isTemplate = (value) => {
  if (typeof value !== "string")
    return false;
  const trimmed = value.trim();
  return trimmed.startsWith("[[[") && trimmed.endsWith("]]]");
}, cleanTemplate = (value) => {
  if (!isTemplate(value))
    return null;
  return value.trim().slice(3, -3).trim();
}, wrapTemplate = (value) => {
  return isTemplate(value) ? value : `[[[${value}]]]`;
}, processTemplate = (hass, navbar, template, options) => {
  if (template == null || !isTemplate(template)) {
    return template;
  }
  try {
    const clean = cleanTemplate(template);
    if (clean === null) {
      console.error(`[navbar-card] Invalid template format: ${template}`);
      if (options?.returnNullIfInvalid)
        return null;
      return template;
    }
    const hashed = generateHash(clean);
    let func = templateFunctionCache.get(hashed);
    if (!func) {
      func = new Function("states", "user", "hass", "navbar", clean);
      templateFunctionCache.set(hashed, func);
    }
    const result = func(hass.states, hass.user, hass, {
      isDesktop: navbar?.isDesktop ?? false
    });
    if (result === undefined) {
      if (!options?.disableEmptyReturnCheck) {
        console.error(`[navbar-card] Template did not return a value: ${template}`);
      }
      if (options?.returnNullIfInvalid)
        return null;
      return template;
    }
    return result;
  } catch (err) {
    console.error(`[navbar-card] Error evaluating template: ${err}`);
    if (options?.returnNullIfInvalid)
      return null;
    return template;
  }
}, processBadgeTemplate = (hass, template) => {
  if (!(hass && template))
    return false;
  try {
    const func = new Function("states", `return ${template}`);
    return Boolean(func(hass.states));
  } catch (err) {
    console.error("[navbar-card] Error evaluating badge template:", err);
    return false;
  }
};
var init_template = __esm(() => {
  init_utils();
  templateFunctionCache = new Map;
});

// src/utils/index.ts
var init_utils = __esm(() => {
  init_docs_links();
  init_dom();
  init_haptic();
  init_template();
});

// src/lib/action-handler.ts
var ACTIONS_WITH_CUSTOM_ENTITY, QUICKBAR_MODES, openQuickbarViaKeyboard = (action) => {
  const isMac = navigator.platform.toUpperCase().includes("MAC");
  let key;
  if (action.mode) {
    switch (action.mode) {
      case "devices":
        key = "d";
        break;
      case "entities":
        key = "e";
        break;
      case "commands":
      default:
        key = "c";
        break;
    }
  } else {
    key = "k";
  }
  document.dispatchEvent(new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    key,
    ...action.mode ? {} : isMac ? { metaKey: true } : { ctrlKey: true }
  }));
}, openQuickbar = (action) => {
  const haRoot = document.querySelector("home-assistant");
  if (typeof haRoot?._showQuickBar !== "function") {
    openQuickbarViaKeyboard(action);
    return;
  }
  const syntheticEvent = {
    composedPath: () => [document.body],
    defaultPrevented: false,
    preventDefault: () => {
      return;
    }
  };
  haRoot._showQuickBar(syntheticEvent, action.mode ? QUICKBAR_MODES[action.mode] : undefined);
}, executeAction = (params) => {
  const { context, target, action, actionType, data } = params;
  const { route, popupItem } = data;
  forceResetRipple(target);
  if (action?.action !== "open-popup" /* openPopup */) {
    if (route != null) {
      route.popup.close();
    } else if (popupItem != null) {
      popupItem.closeParentPopup();
    }
  }
  switch (action?.action) {
    case "open-popup" /* openPopup */: {
      if (!route)
        return;
      const popupItems = route.popup.items;
      if (!popupItems) {
        console.error(`[navbar-card] No popup items found for route: ${route.label}`);
      } else {
        triggerHaptic(context, actionType);
        route.popup.open(target);
      }
      break;
    }
    case "toggle-menu" /* toggleMenu */:
      triggerHaptic(context, actionType);
      fireDOMEvent(context, "hass-toggle-menu", {
        options: {
          bubbles: true,
          composed: true
        }
      });
      break;
    case "quickbar" /* quickbar */:
      triggerHaptic(context, actionType);
      openQuickbar(action);
      break;
    case "show-notifications" /* showNotifications */:
      triggerHaptic(context, actionType);
      fireDOMEvent(context, "hass-show-notifications", {
        options: {
          bubbles: true,
          composed: true
        }
      });
      break;
    case "navigate-back" /* navigateBack */:
      triggerHaptic(context, actionType, true);
      window.history.back();
      break;
    case "open-edit-mode" /* openEditMode */:
      triggerHaptic(context, actionType);
      forceOpenEditMode();
      break;
    case "custom-js-action" /* customJSAction */:
      triggerHaptic(context, actionType);
      processTemplate(context._hass, context, action.code, {
        disableEmptyReturnCheck: true
      });
      break;
    case "logout" /* logout */:
      triggerHaptic(context, actionType);
      context._hass.auth.revoke();
      break;
    default:
      if (action != null) {
        triggerHaptic(context, actionType);
        if (action.action === "navigate" && matchesCurrentNavigationPath(action.navigation_path)) {
          scrollToTop();
          return;
        }
        const extractedEntity = ACTIONS_WITH_CUSTOM_ENTITY.includes(action.action) ? action.entity ?? action.entity_id : undefined;
        setTimeout(() => {
          fireDOMEvent(context, "hass-action", {
            detailOverride: {
              action: actionType,
              config: {
                [`${actionType}_action`]: action,
                entity: extractedEntity
              }
            },
            options: { bubbles: true, composed: true }
          });
        }, 10);
      } else if (actionType === "tap" && (route?.url || popupItem?.url)) {
        triggerHaptic(context, actionType, true);
        const destinationUrl = route?.url ?? popupItem?.url ?? "";
        if (matchesCurrentNavigationPath(destinationUrl)) {
          scrollToTop();
          return;
        }
        navigate(context, destinationUrl);
      }
      break;
  }
};
var init_action_handler = __esm(() => {
  init_index_m();
  init_types();
  init_utils();
  ACTIONS_WITH_CUSTOM_ENTITY = ["more-info", "toggle"];
  QUICKBAR_MODES = {
    commands: "command",
    devices: "device",
    entities: "entity"
  };
});

// src/styles/editor.ts
var EDITOR_STYLES, DRAGGABLE_ITEM_STYLES;
var init_editor = __esm(() => {
  init_lit();
  EDITOR_STYLES = i`
  .navbar-editor {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .navbar-editor ha-input {
    width: 100%;
  }

  .navbar-editor ha-button {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .navbar-editor .navbar-template-toggle-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5em;
    padding: 0px !important;
    border-radius: 99px;
    font-size: 0.85em;
    font-weight: 600;
    border: 0px;
    padding: 4px 8px !important;
    cursor: pointer;
  }

  .reset-overrides-button {
    white-space: nowrap;
  }

  .editor-section {
    display: flex;
    flex-direction: column;
    gap: 1em;
    padding: 12px;
  }

  .editor-row {
    gap: 6px;
    display: flex;
    flex-direction: row;
  }

  .editor-row-item {
    flex: 1;
  }

  .editor-row-item ha-input {
    width: 100%;
  }

  @media (max-width: 600px) {
    .editor-row {
      flex-direction: column !important;
      gap: 0.5em;
    }
    .editor-grid {
      grid-template-columns: 1fr !important;
    }
    .editor-row-item {
      width: 100%;
    }
  }

  .editor-label {
    font-weight: 500;
  }

  .routes-container {
    display: flex;
    flex-direction: column;
    gap: 0.25em;
  }

  ha-expansion-panel h4[slot='header'],
  ha-expansion-panel h5[slot='header'],
  ha-expansion-panel h6[slot='header'] {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.7em;
    padding: 0.2em 0.5em 0.2em 0;
    height: 40px;
    margin: 0px !important;
    margin-left: 1em;
  }

  ha-expansion-panel h4[slot='header'] .expansion-panel-title,
  ha-expansion-panel h5[slot='header'] .expansion-panel-title,
  ha-expansion-panel h6[slot='header'] .expansion-panel-title {
    flex: 1;
  }

  .draggable-item-header {
    display: flex;
    align-items: center;
    gap: 0.7em;
    padding: 0.2em 0.5em 0.2em 0;
  }

  .draggable-item-header-title {
    font-weight: bold;
    color: var(--primary-color);
  }

  .draggable-item-header-summary {
    flex: 1;
    opacity: 0.7;
    font-size: 0.95em;
    display: flex;
    align-items: center;
    gap: 0.3em;
  }

  .draggable-item-header-image {
    height: 1.2em;
    vertical-align: middle;
  }

  .draggable-item-editor {
    display: flex;
    flex-direction: column;
    gap: 1em;
    background: var(--primary-background-color);
    border-radius: 8px;
    padding: 1em 1.2em 1.2em 1.2em;
    margin: 1em 0em;
  }

  .popup-controls {
    display: flex;
    gap: 0.5em;
    margin-bottom: 1em;
  }

  .editor-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
  }

  .editor-divider {
    margin: 1.5em 0 1em 0;
    border: none;
    border-top: 1px solid #e0e0e0;
    height: 1px;
    background: none;
  }

  .add-popup-btn {
    margin-top: 1em;
  }

  .template-editor-container {
    display: flex;
    flex-direction: column;
    gap: 0.3em;
    margin-bottom: 0.7em;
  }

  .template-editor-helper {
    font-size: 0.93em;
    color: var(--secondary-text-color, #888);
  }

  .quickbar-mode-container {
    display: flex;
    flex-direction: column;
  }

  .templatable-field-container {
    display: flex;
    flex-direction: row;
  }

  .templatable-field-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 0.5em;
  }

  .templatable-field-header-label {
    flex: 1;
  }

  /* Custom Editor inputs */

  .editor-select-field {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .editor-select {
    cursor: pointer;
    width: 100%;
    box-sizing: border-box;
    min-height: 48px;
    padding: 10px 12px;
    padding-right: 32px;
    border-radius: var(--ha-border-radius-sm, 4px); /* TODO JLAQ: review this variable */
    border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.14));
    background: var(--input-fill-color, var(--card-background-color, #fff));
    color: var(--primary-text-color, #000);
    outline: none;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;

    /* Remove default dropdown arrow */
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;

    /* Add our own dropdown icon */
    background-image: linear-gradient(
      135deg,
      transparent 50%,
      var(--secondary-text-color, #666) 50%
    );
    background-position: right 12px center;
    background-repeat: no-repeat;
    background-size: 8px 6px;
  }

  .editor-select:hover:not(:disabled) {
    border-color: color-mix(
      in srgb,
      var(--primary-color, #03a9f4) 40%,
      var(--divider-color, rgba(0, 0, 0, 0.14))
    );
    background-color: color-mix(
      in srgb,
      var(--primary-color, #03a9f4) 4%,
      var(--input-fill-color, var(--card-background-color, #fff))
    );
  }

  .editor-select:focus {
    border-color: var(--primary-color, #03a9f4);
    box-shadow: 0 0 0 1px
      color-mix(in srgb, var(--primary-color, #03a9f4) 30%, transparent);
  }

  .editor-select:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .editor-select-helper {
    font-size: 0.9em;
    color: var(--secondary-text-color, #666);
  }

  /* Custom Tabs Styles */

  .editor-tab-nav {
    margin-bottom: 0.25em;
    display: flex;
    background: var(--card-background-color, #fff);
    border-radius: 8px;
    border: 1px solid var(--divider-color, #e0e0e0);
  }

  .editor-tab-button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 6px 8px;
    border: none;
    background: transparent;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 12px;
    font-weight: 600;
    color: var(--secondary-text-color, #666);
    position: relative;
    overflow: hidden;
  }

  .editor-tab-button:hover {
    background: color-mix(
      in srgb,
      var(--primary-color, #03a9f4) 10%,
      transparent
    );
  }

  .editor-tab-button.active {
    background: var(--primary-color, #03a9f4);
    color: white;
  }

  .editor-tab-button ha-icon {
    --mdc-icon-size: 18px;
  }

  .loader-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 60px;
  }

  .loader {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: inline-block;
    border: 2px solid transparent;
    border-top: 4px solid var(--primary-color, #03a9f4);
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
  DRAGGABLE_ITEM_STYLES = i`
  .draggable-item {
    border: 1.5px dashed transparent;
    border-radius: 8px;
    transition:
      border-color 0.2s,
      background 0.2s;
    background: none;
    position: relative;
  }

  .draggable-item.drag-over {
    border-color: var(--primary-color, #03a9f4);
    background: rgba(3, 169, 244, 0.08);
  }

  .draggable-item.dragging {
    opacity: 0.6;
    background: #eee;
    z-index: 2;
  }

  .drag-handle {
    cursor: grab;
    margin-right: 8px;
    color: var(--primary-color, #03a9f4);
    vertical-align: middle;
    display: inline-flex;
    align-items: center;
  }

  .delete-btn ha-icon {
    color: var(--error-color, #db4437) !important;
  }
`;
});

// src/styles/index.ts
var HOST_STYLES, NAVBAR_CONTAINER_STYLES, MEDIA_PLAYER_STYLES, ROUTE_STYLES, POPUP_STYLES, SCROLLABLE_STYLES, AUTOHIDE_STYLES, COMPONENTS_STYLES, getDefaultStyles = () => {
  return i`
    ${HOST_STYLES}
    ${NAVBAR_CONTAINER_STYLES}
    ${MEDIA_PLAYER_STYLES}
    ${ROUTE_STYLES}
    ${POPUP_STYLES}
    ${SCROLLABLE_STYLES}
    ${AUTOHIDE_STYLES}
    ${COMPONENTS_STYLES}
  `;
}, getEditorStyles = () => {
  return i`
    ${EDITOR_STYLES}
    ${DRAGGABLE_ITEM_STYLES}
  `;
};
var init_styles = __esm(() => {
  init_lit();
  init_editor();
  HOST_STYLES = i`
  :host {
    /* Sizes */
    --navbar-border-radius: var(--ha-card-border-radius, 12px);
    --navbar-badge-icon-size: 12px;
    --navbar-badge-size: 16px;
    --navbar-route-icon-size: 24px;
    --navbar-route-image-size: 32px;

    /* Colors */
    --navbar-background-color: var(--card-background-color);
    --navbar-primary-color: var(--primary-color);

    /* Box shadow configuration */
    --navbar-box-shadow: 0px -1px 4px 0px rgba(0, 0, 0, 0.14);
    --navbar-box-shadow-desktop: var(--material-shadow-elevation-2dp);
    --navbar-box-shadow-mobile-floating: var(--material-shadow-elevation-2dp);
    
    /* Controls the left margin of the navbar when in desktop mode (the width of HA sidebar) */
    --navbar-left-margin: var(--ha-sidebar-width, var(--mdc-drawer-width, 0px));
    
    /* Controls the edge inset of the navbar when in desktop mode (the width of HA sidebar) */
    --navbar-edge-inset: 16px;

    /* Scrollable mobile navbar (mobile.scrollable) */
    --navbar-scrollable-route-width: 25%;
    --navbar-scrollable-fade-size: 24px;

    /* Auto-hide (mobile.autohide) */
    --navbar-autohide-duration: 0.25s;
    --navbar-autohide-easing: cubic-bezier(0.2, 0, 0, 1);
    --navbar-autohide-tab-width: 96px;
    --navbar-autohide-tab-height: 36px;
    --navbar-autohide-tab-icon-size: 33px;

    /* Z index configuration */
    --navbar-z-index: 3;
    --navbar-media-player-z-index: 4;
    --navbar-popup-backdrop-z-index: 900;
    --navbar-popup-z-index: 901;
  }
`;
  NAVBAR_CONTAINER_STYLES = i`
  .navbar {
    display: flex;
    flex-direction: column;
    width: 100vw;
    position: fixed;
    gap: 10px;
    left: 0;
    right: 0;
    bottom: 0;
    top: unset;
    z-index: var(--navbar-z-index);
  }

  ha-card {
    background: var(--navbar-background-color);
    border-radius: 0px;
    box-shadow: var(--navbar-box-shadow);
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 12px;
    gap: 10px;
  }

  .navbar-card {
    justify-content: space-between;
    width: 100%;
    gap: 2px;
  }

  /* Edit mode styles */
  .navbar.edit-mode {
    position: relative !important;
    flex-direction: column !important;
    left: unset !important;
    right: unset !important;
    bottom: unset !important;
    width: auto !important;
    top: unset !important;
    transform: none !important;
  }

  .navbar.edit-mode ha-card {
    width: 100% !important;
    flex-direction: row !important;
  }

  /* Mobile floating style */
  .navbar-card.mobile.floating {
    border: none !important;
    box-shadow: var(--navbar-box-shadow-mobile-floating) !important;
    border-radius: var(--navbar-border-radius) !important;
    margin-bottom: 10px;
    width: 90%;
  }

  /* Safe area: padding for "docked", margin for "floating" */
  .navbar.mobile.safe-area:not(.floating) .navbar-card {
    padding-bottom: calc(12px + var(--safe-area-inset-bottom, 0px));
  }

  .navbar.mobile.safe-area.floating .navbar-card {
    margin-bottom: calc(10px + var(--safe-area-inset-bottom, 0px));
  }

  /* Desktop mode styles */
  .navbar.desktop {
    width: auto;
    justify-content: space-evenly;
    --navbar-route-icon-size: 28px;
  }

  .navbar-card.desktop {
    border-radius: var(--navbar-border-radius);
    box-shadow: var(--navbar-box-shadow-desktop);
    padding: 12px 8px;
    justify-content: center;
    gap: 10px;
  }

  .navbar.desktop.bottom {
    flex-direction: column;
    top: unset;
    right: unset;
    bottom: var(--navbar-edge-inset);
    left: calc(50% + var(--navbar-left-margin, 0px) / 2);
    transform: translate(-50%, 0);
  }

  .navbar-card.desktop.bottom {
    flex-direction: row;
  }

  .navbar.desktop.top {
    flex-direction: column;
    bottom: unset;
    right: unset;
    top: var(--navbar-edge-inset);
    left: calc(50% + var(--navbar-left-margin, 0px) / 2);
    transform: translate(-50%, 0);
  }

  .navbar-card.desktop.top {
    flex-direction: row;
  }

  .navbar.desktop.left {
    flex-direction: row-reverse;
    left: calc(var(--navbar-left-margin, 0px) + var(--navbar-edge-inset));
    right: unset;
    bottom: unset;
    top: 50%;
    transform: translate(0, -50%);
  }

  .navbar-card.desktop.left {
    flex-direction: column;
    align-items: center;
  }

  .navbar.desktop.right {
    flex-direction: row;
    right: var(--navbar-edge-inset);
    left: unset;
    bottom: unset;
    top: 50%;
    transform: translate(0, -50%);
  }

  .navbar-card.desktop.right {
    flex-direction: column;
    align-items: center;
  }

  /* Desktop docked mode styles */
  .navbar-card.desktop.docked {
    border-radius: 0px;
  }

  .navbar.desktop.docked.bottom {
    bottom: 0px;
    left: var(--navbar-left-margin, 0px);
    right: 0px;
    width: auto;
    transform: none;
  }

  .navbar-card.desktop.docked.bottom {
    width: 100%;
    border-radius: 0px;
  }

  .navbar.desktop.docked.top {
    top: 0px;
    left: var(--navbar-left-margin, 0px);
    right: 0px;
    width: auto;
    transform: none;
  }

  .navbar-card.desktop.docked.top {
    width: 100%;
    border-radius: 0px;
  }

  .navbar.desktop.docked.left {
    left: var(--navbar-left-margin, 0px);
    top: 0px;
    bottom: 0px;
    height: 100%;
    width: auto;
    transform: none;
  }

  .navbar-card.desktop.docked.left {
    height: 100%;
    border-radius: 0px;
  }

  .navbar.desktop.docked.right {
    right: 0px;
    top: 0px;
    bottom: 0px;
    height: 100%;
    width: auto;
    transform: none;
  }

  .navbar-card.desktop.docked.right {
    height: 100%;
    border-radius: 0px;
  }
`;
  MEDIA_PLAYER_STYLES = i`
  .media-player.error {
    padding: 0px !important;
  }

  .media-player.error ha-alert {
    width: 100%;
  }

  .media-player {
    cursor: pointer;
    width: 90%;
    overflow: hidden;
    position: relative;
    box-shadow: var(--navbar-box-shadow-mobile-floating);
    border-radius: var(--navbar-border-radius);
    display: flex;
    flex-direction: row;
  }

  :is(.media-player, .media-player-carousel).mobile {
    border: none;
    align-self: center;
  }

  .media-player.desktop {
    width: 100%;
    max-width: 400px;
  }

  /* Center media player when inside navbar (wider than max-width) */
  :is(.media-player, .media-player-carousel).desktop:not(.position-absolute) {
    align-self: center;
  }

  :is(.media-player, .media-player-carousel).desktop.position-absolute {
    position: fixed;
    width: 400px;
    z-index: var(--navbar-media-player-z-index);
  }

  :is(.media-player, .media-player-carousel).desktop.position-absolute.top-left {
    left: var(--navbar-edge-inset);
    top: calc(var(--header-height) + var(--navbar-edge-inset));
  }
  :is(.media-player, .media-player-carousel).desktop.position-absolute.top-center {
    left: 50%;
    top: calc(var(--header-height) + var(--navbar-edge-inset));
    transform: translateX(-50%);
  }
  :is(.media-player, .media-player-carousel).desktop.position-absolute.top-right {
    right: var(--navbar-edge-inset);
    top: calc(var(--header-height) + var(--navbar-edge-inset));
  }
  :is(.media-player, .media-player-carousel).desktop.position-absolute.bottom-left {
    left: calc(var(--navbar-left-margin, 0px) + var(--navbar-edge-inset));
    bottom: var(--navbar-edge-inset);
  }
  :is(.media-player, .media-player-carousel).desktop.position-absolute.bottom-center {
    left: 50%;
    bottom: var(--navbar-edge-inset);
    transform: translateX(-50%);
  }
  :is(.media-player, .media-player-carousel).desktop.position-absolute.bottom-right {
    right: var(--navbar-edge-inset);
    bottom: var(--navbar-edge-inset);
  }

  .media-player .media-player-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: blur(20px);
    opacity: 0.3;
    z-index: 0;
  }

  .media-player .media-player-image {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    object-fit: cover;
    margin-right: 6px;
  }

  .media-player .media-player-icon-fallback {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--disabled-color);
  }

  .media-player .media-player-info {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
  }

  .media-player .media-player-title {
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
  }

  .media-player .media-player-artist {
    font-size: 12px;
    color: var(--secondary-text-color);
  }

  .media-player .media-player-button {
  }

  .media-player .media-player-button.media-player-button-play-pause {
  }

  .media-player .media-player-progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
  }

  .media-player .media-player-progress-bar-fill {
    background-color: var(--navbar-primary-color);
    height: 100%;
  }

  /* Media player carousel */

  .media-player-carousel {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    border: none;
  }

  .media-player-carousel.desktop {
    width: 100%;
    max-width: 400px;
  }

  .media-player-viewport {
    width: 100%;
    overflow: hidden;
    touch-action: pan-y;
    user-select: none;
  }

  .media-player-track {
    display: flex;
    gap: 12px;
    will-change: transform;
  }

  .media-player-carousel .media-player {
    flex: 0 0 100%;
    min-width: 0;
    width: 100%;
    border: none;
  }

  .media-player-dots {
    display: flex;
    justify-content: center;
    gap: 6px;
    padding-top: 6px;
  }

  .media-player-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--disabled-color);
    transition: background 0.2s, transform 0.2s;
  }

  .media-player-dot.active {
    background: var(--navbar-primary-color);
    transform: scale(1.1);
  }
`;
  ROUTE_STYLES = i`
  .route {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 100%;
    position: relative;
    text-decoration: none;
    color: var(--primary-text-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    --icon-primary-color: var(--state-inactive-color);
    overflow: hidden;
  }

  /* Button styling */
  .button {
    max-width: 60px;
    position: relative;
    height: 36px;
    width: 100%;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .button.active {
    background: color-mix(
      in srgb,
      var(--navbar-primary-color) 30%,
      transparent
    );
    --icon-primary-color: var(--navbar-primary-color);
  }

  /* Icon and Image styling */
  .icon {
    --mdc-icon-size: var(--navbar-route-icon-size);
  }

  .image {
    width: var(--navbar-route-image-size);
    height: var(--navbar-route-image-size);
    object-fit: contain;
  }

  .image.active {
  }

  /* Label styling */
  .label {
    flex: 1;
    width: 100%;
    text-align: center;
    font-size: var(--paper-font-caption_-_font-size, 12px);
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .label.active {
    color: var(--navbar-primary-color);
  }

  /* Badge styling */
  .badge {
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 999px;
    width: 12px;
    height: 12px;
  }
  .badge.with-counter {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--navbar-badge-size);
    width: auto !important;
    min-width: var(--navbar-badge-size);
    padding: 0px 2px;
    font-weight: bold;
    font-size: 11px;
    line-height: 11px;
  }
  .badge.with-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--navbar-badge-size);
    height: var(--navbar-badge-size);
    line-height: 0;
  }
  .badge-icon {
    --icon-primary-color: currentColor;
    --mdc-icon-size: var(--navbar-badge-icon-size);
  }

  /* Desktop mode styles */
  .desktop .route .label {
    flex: unset;
  }
  .desktop .route {
    height: 60px;
    width: 70px;
  }
  .desktop .button {
    flex: unset;
    height: 100%;
  }

  .desktop .route:has(.label) .button {
    height: 40px;
  }
`;
  POPUP_STYLES = i`
  /****************************************/
  /* Backdrop */
  /****************************************/
  .navbar-popup-backdrop {
    position: fixed;
    background: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: var(--navbar-popup-backdrop-z-index);
    transition: opacity 0.2s ease;
  }

  .navbar-popup-backdrop.visible {
    opacity: 1;
  }

  /****************************************/
  /* Main popup container */
  /****************************************/
  .navbar-popup {
    pointer-events: none;
    position: fixed;
    opacity: 0;
    padding: 6px;
    gap: 10px;
    z-index: var(--navbar-popup-z-index);

    display: flex;
    justify-content: center;

    transition: all 0.2s ease;
    transform-origin: bottom left;
  }

  .navbar-popup.open-up {
    flex-direction: column-reverse;
    margin-bottom: 32px;
    transform: translate(0, -100%);
  }

  .navbar-popup.open-bottom {
    flex-direction: column;
    margin-top: 32px;
  }

  .navbar-popup.open-right {
    flex-direction: row;
    margin-left: 32px;
  }

  .navbar-popup.open-right.popuplabelbackground {
    gap: 24px;
  }

  .navbar-popup.open-left {
    flex-direction: row-reverse;
    margin-right: 32px;
  }

  .navbar-popup.open-left.popuplabelbackground {
    gap: 24px;
  }

  .navbar-popup.label-right {
    align-items: flex-start;
  }

  .navbar-popup.label-left {
    align-items: flex-end;
  }

  .navbar-popup.visible {
    opacity: 1;
  }

  .navbar-popup.popuplabelbackground {
    padding-left: 0px;
  }

  /****************************************/
  /* Popup item styles */
  /****************************************/

  .popup-item {
    pointer-events: auto;
    cursor: pointer;
    color: var(--primary-text-color);
    display: flex;
    flex-direction: column;
    --icon-primary-color: var(--primary-text-color);
    display: flex;
    flex-direction: row-reverse;
    width: fit-content;
    height: fit-content;
    gap: 6px;
    align-items: center;

    opacity: 0;
    transform: translateY(10px);
    transition: filter 0.2s ease;
    transition: all 0.2s ease;
  }

  .navbar-popup.visible .popup-item {
    opacity: 1;
    transform: translateY(0);
    transition-delay: calc(var(--index) * var(--popup-item-stagger-step, 0.05s));
  }

  .popup-item.label-bottom {
    flex-direction: column;
    max-width: 80px;
  }

  .popup-item.label-left {
    flex-direction: row-reverse;
  }

  .popup-item.label-right {
    flex-direction: row;
  }

  .popup-item.label-left .label {
    text-align: end;
  }

  .popup-item.label-right .label {
    text-align: start;
  }

  .popup-item .button {
    width: 50px;
    height: 50px;
    background: var(--navbar-background-color);
    box-shadow: var(--navbar-box-shadow-desktop);
  }

  .popup-item .button.popuplabelbackground {
    width: 100%;
    max-width: unset;
    padding-left: 8px;
    padding-right: 8px;
    flex-direction: row;
    gap: 4px;
  }

  .popup-item.active {
    --icon-primary-color: var(--navbar-primary-color);
  }

  .popup-item.popuplabelbackground {
    max-width: unset;
  }

  .popup-item.active .button {
    color: var(--navbar-primary-color);
    background: color-mix(in srgb, var(--navbar-primary-color) 30%, white);
  }

  /****************************************/
  /* Panel style (layout.popup_style: panel) */
  /****************************************/

  /* Light dim, no blur: the page stays readable behind the menu */
  .navbar.popup-panel ~ .navbar-popup-backdrop {
    background: rgba(0, 0, 0, 0.15);
  }

  /* The bar stays above the dim, bright and tappable, while a menu is open */
  .navbar.popup-panel.popup-open {
    z-index: calc(var(--navbar-popup-z-index) + 1);
  }

  /* One panel holding every item, instead of loose bubbles */
  .navbar.popup-panel ~ .navbar-popup {
    background: var(--navbar-background-color);
    border-radius: 18px;
    padding: 6px;
    gap: 2px;
    min-width: 200px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    align-items: stretch;
  }

  /* Opening upwards, lift the panel clear of the bar (margins have no effect,
     since the popup is positioned by its top edge) */
  .navbar.popup-panel ~ .navbar-popup.open-up {
    margin-bottom: 0;
    transform: translate(0, calc(-100% - 14px));
  }

  /* Each item is a full-width row: icon, then label */
  .navbar.popup-panel ~ .navbar-popup .popup-item {
    width: auto;
    max-width: none;
    flex-direction: row;
    justify-content: flex-start;
    gap: 12px;
    padding: 2px 14px 2px 2px;
    border-radius: 12px;
  }

  .navbar.popup-panel ~ .navbar-popup .popup-item .button {
    width: 40px;
    height: 40px;
    background: transparent;
    box-shadow: none;
  }

  .navbar.popup-panel ~ .navbar-popup .popup-item .label {
    font-size: 15px;
    text-align: start;
    white-space: nowrap;
  }

  /* Selected row: tinted row instead of a tinted circle */
  .navbar.popup-panel ~ .navbar-popup .popup-item.active {
    background: color-mix(in srgb, var(--navbar-primary-color) 16%, transparent);
  }
  .navbar.popup-panel ~ .navbar-popup .popup-item.active .button {
    background: transparent;
  }
`;
  SCROLLABLE_STYLES = i`
  /* Routes keep a fixed width and the bar scrolls sideways */
  .navbar-card.mobile.scrollable {
    --navbar-fade-start: 0px;
    --navbar-fade-end: 0px;
    overflow-x: auto;
    justify-content: flex-start;
    gap: 0;
    scrollbar-width: none;
    /* Fade out whichever ends still have routes scrolled out of view */
    -webkit-mask-image: linear-gradient(
      to right,
      transparent 0,
      #000 var(--navbar-fade-start),
      #000 calc(100% - var(--navbar-fade-end)),
      transparent 100%
    );
    mask-image: linear-gradient(
      to right,
      transparent 0,
      #000 var(--navbar-fade-start),
      #000 calc(100% - var(--navbar-fade-end)),
      transparent 100%
    );
  }
  .navbar-card.mobile.scrollable::-webkit-scrollbar {
    display: none;
  }
  .navbar-card.mobile.scrollable[data-fade-start] {
    --navbar-fade-start: var(--navbar-scrollable-fade-size);
  }
  .navbar-card.mobile.scrollable[data-fade-end] {
    --navbar-fade-end: var(--navbar-scrollable-fade-size);
  }
  .navbar-card.mobile.scrollable .route {
    flex: 0 0 var(--navbar-scrollable-route-width);
    min-width: var(--navbar-scrollable-route-width);
  }
`;
  AUTOHIDE_STYLES = i`
  .navbar.mobile:is(.autohide-slide, .autohide-minimize, .autohide-toggle) {
    transition: transform var(--navbar-autohide-duration)
      var(--navbar-autohide-easing);
  }

  /* slide: off the bottom edge */
  .navbar.mobile.autohide-slide.away {
    transform: translateY(calc(100% + 8px));
  }

  /* minimize: clip the bar to a pill around the selected route */
  .navbar.mobile.autohide-minimize .navbar-card {
    clip-path: inset(0 0 0 0 round 0);
    transition:
      clip-path 0.3s var(--navbar-autohide-easing),
      transform 0.3s var(--navbar-autohide-easing);
  }
  .navbar.mobile.autohide-minimize.away {
    filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.25));
  }
  .navbar.mobile.autohide-minimize.away .navbar-card {
    clip-path: inset(var(--navbar-pill-clip, 0) round 20px);
    transform: translateX(var(--navbar-pill-shift, 0px));
  }

  /* toggle: arrow tab joined to the top of the bar */
  .autohide-tab {
    display: flex;
    align-self: center;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
    width: var(--navbar-autohide-tab-width);
    height: var(--navbar-autohide-tab-height);
    /* Cancels the .navbar gap, and overlaps the card's top border, so the
       tab joins the bar */
    margin-bottom: -11px;
    padding: 0;
    border: none;
    border-radius: calc(var(--navbar-autohide-tab-height) * 0.6)
      calc(var(--navbar-autohide-tab-height) * 0.6) 0 0;
    background: var(--navbar-background-color);
    color: var(--secondary-text-color);
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    --mdc-icon-size: var(--navbar-autohide-tab-icon-size);
  }
  .navbar.floating .autohide-tab {
    margin-bottom: 0;
    border-radius: calc(var(--navbar-autohide-tab-height) * 0.6);
  }
  .autohide-tab ha-icon {
    transition: transform var(--navbar-autohide-duration)
      var(--navbar-autohide-easing);
  }
  .navbar.mobile.autohide-toggle.away {
    transform: translateY(
      calc(100% - var(--navbar-autohide-tab-height))
    );
  }
  .navbar.mobile.autohide-toggle.away .autohide-tab ha-icon {
    transform: rotate(180deg);
  }

  @media (prefers-reduced-motion: reduce) {
    .navbar.mobile,
    .navbar.mobile .navbar-card,
    .autohide-tab ha-icon {
      transition: none !important;
    }
  }
`;
  COMPONENTS_STYLES = i`
  .navbar-icon-button {
    position: relative;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: none;
    background: transparent;
    color: var(--primary-text-color);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
    outline: none;
  }

  .navbar-icon-button.primary {
    background-color: var(--navbar-primary-color);
    color: var(--text-primary-color, #fff);
  }
`;
});

// node_modules/@kipk/load-ha-components/dist/load-ha-components.js
function copyResult(result) {
  return {
    requested: [...result.requested],
    alreadyDefined: [...result.alreadyDefined],
    loaded: [...result.loaded],
    missing: [...result.missing],
    attemptedStrategies: [...result.attemptedStrategies]
  };
}
function normalizeComponents(components) {
  const requested = components ?? DEFAULT_HA_COMPONENTS;
  const uniqueComponents = new Set;
  for (const component of requested) {
    const normalized = component.trim();
    if (normalized) {
      uniqueComponents.add(normalized);
    }
  }
  return [...uniqueComponents];
}
function getTimeoutMs(timeoutMs) {
  return typeof timeoutMs === "number" && Number.isFinite(timeoutMs) && timeoutMs > 0 ? timeoutMs : DEFAULT_TIMEOUT_MS;
}
function getDiscoveryMode(discovery) {
  return discovery === "card" ? "card" : "targeted";
}
function createError(message, cause) {
  const error = new Error(message);
  if (cause !== undefined) {
    error.cause = cause;
  }
  return error;
}
function withTimeout(promise, timeoutMs, description) {
  let timeoutId;
  const source = Promise.resolve(promise).catch((error) => {
    throw createError(`Failed while ${description}`, error);
  });
  const timeout = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(createError(`Timed out while ${description}`));
    }, timeoutMs);
  });
  return Promise.race([source, timeout]).finally(() => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
  });
}
function hasDom() {
  return typeof window !== "undefined" && typeof document !== "undefined" && hasCustomElementsRegistry();
}
function hasCustomElementsRegistry() {
  return typeof customElements !== "undefined" && customElements !== null && typeof customElements.get === "function" && typeof customElements.whenDefined === "function";
}
function isDefined(component) {
  return customElements.get(component) !== undefined;
}
function getStrategiesForComponent(component) {
  return COMPONENT_STRATEGIES[component] ?? ["config-automation"];
}
function getRequiredStrategies(components) {
  const strategies = new Set;
  for (const component of components) {
    for (const strategy of getStrategiesForComponent(component)) {
      strategies.add(strategy);
    }
  }
  return [...strategies];
}
function getRouteLoad(routerOptions, urlPath, owner) {
  const load = routerOptions?.routes?.[urlPath]?.load;
  if (typeof load !== "function") {
    throw createError(`No load() route for ${urlPath} in ${owner}`);
  }
  return load;
}
async function loadRootPanel(componentName, urlPath, timeoutMs) {
  if (!hasDom()) {
    throw createError("A DOM environment is required to load Home Assistant components");
  }
  await withTimeout(customElements.whenDefined("partial-panel-resolver"), timeoutMs, "waiting for partial-panel-resolver");
  const resolver = document.createElement("partial-panel-resolver");
  if (!resolver) {
    throw createError("Failed to create partial-panel-resolver");
  }
  const panels = {
    [urlPath]: {
      url_path: urlPath,
      component_name: componentName
    }
  };
  let routerOptions;
  if (typeof resolver._getRoutes === "function") {
    routerOptions = resolver._getRoutes(panels);
  } else if (typeof resolver._updateRoutes === "function") {
    resolver.hass = { panels };
    const updateResult = resolver._updateRoutes();
    if (updateResult !== null && typeof updateResult === "object" && "then" in updateResult && typeof updateResult.then === "function") {
      Promise.resolve(updateResult).catch(() => {
        return;
      });
    }
    routerOptions = resolver.routerOptions;
  } else {
    throw createError("partial-panel-resolver exposes neither _getRoutes() nor _updateRoutes()");
  }
  const load = getRouteLoad(routerOptions, urlPath, "partial-panel-resolver");
  await withTimeout(load.call(routerOptions?.routes?.[urlPath]), timeoutMs, `loading ${componentName} panel`);
}
function getConfigRoutes(timeoutMs) {
  if (configRoutesPromise) {
    return configRoutesPromise;
  }
  let sharedPromise;
  sharedPromise = (async () => {
    await loadRootPanel("config", "tmp", timeoutMs);
    await withTimeout(customElements.whenDefined("ha-panel-config"), timeoutMs, "waiting for ha-panel-config");
    const configPanel = document.createElement("ha-panel-config");
    if (!configPanel) {
      throw createError("Failed to create ha-panel-config");
    }
    if (!configPanel.routerOptions?.routes) {
      throw createError("ha-panel-config exposes no routes");
    }
    return configPanel.routerOptions;
  })().catch((error) => {
    if (configRoutesPromise === sharedPromise) {
      configRoutesPromise = undefined;
    }
    throw error;
  });
  configRoutesPromise = sharedPromise;
  return sharedPromise;
}
async function loadConfigRoute(routeName, timeoutMs) {
  const routerOptions = await getConfigRoutes(timeoutMs);
  const load = getRouteLoad(routerOptions, routeName, "ha-panel-config");
  await withTimeout(load.call(routerOptions.routes?.[routeName]), timeoutMs, `loading ${routeName} route`);
}
function loadHistory(timeoutMs) {
  return loadRootPanel("history", "history", timeoutMs);
}
function loadMediaBrowser(timeoutMs) {
  return loadRootPanel("media-browser", "media-browser", timeoutMs);
}
function loadStrategy(strategy, timeoutMs) {
  const existing = strategyPromises.get(strategy);
  if (existing) {
    return existing;
  }
  let sharedPromise;
  sharedPromise = strategyLoaders[strategy](timeoutMs).catch((error) => {
    if (strategyPromises.get(strategy) === sharedPromise) {
      strategyPromises.delete(strategy);
    }
    throw error;
  });
  strategyPromises.set(strategy, sharedPromise);
  return sharedPromise;
}
function createResult(requested, alreadyDefined, attemptedStrategies) {
  const missing = requested.filter((component) => !isDefined(component));
  const alreadyDefinedSet = new Set(alreadyDefined);
  return {
    requested: [...requested],
    alreadyDefined: [...alreadyDefined],
    loaded: requested.filter((component) => !alreadyDefinedSet.has(component) && !missing.includes(component)),
    missing,
    attemptedStrategies: [...attemptedStrategies]
  };
}
function invalidateUnverifiedStrategies(missing, attemptedPromises, discovery) {
  for (const [strategy, promise] of attemptedPromises) {
    if (discovery === "card" || missing.some((component) => getStrategiesForComponent(component).includes(strategy))) {
      if (strategyPromises.get(strategy) === promise) {
        strategyPromises.delete(strategy);
      }
    }
  }
}
async function loadHaComponents(components, options) {
  const requested = normalizeComponents(components);
  const attemptedStrategies = [];
  const alreadyDefined = hasCustomElementsRegistry() ? requested.filter(isDefined) : [];
  if (alreadyDefined.length === requested.length) {
    return createResult(requested, alreadyDefined, attemptedStrategies);
  }
  if (!hasDom()) {
    const alreadyDefinedSet = new Set(alreadyDefined);
    const result = {
      requested: [...requested],
      alreadyDefined: [...alreadyDefined],
      loaded: [],
      missing: requested.filter((component) => !alreadyDefinedSet.has(component)),
      attemptedStrategies
    };
    throw new HaComponentsLoadError(result, createError("A DOM environment is required to load Home Assistant components"));
  }
  const timeoutMs = getTimeoutMs(options?.timeoutMs);
  const discovery = getDiscoveryMode(options?.discovery);
  const attemptedPromises = new Map;
  let failure;
  try {
    for (const strategy of getRequiredStrategies(requested.filter((component) => !alreadyDefined.includes(component)))) {
      const currentlyMissing = requested.filter((component) => !isDefined(component));
      if (!currentlyMissing.some((component) => getStrategiesForComponent(component).includes(strategy))) {
        continue;
      }
      attemptedStrategies.push(strategy);
      const promise = loadStrategy(strategy, timeoutMs);
      attemptedPromises.set(strategy, promise);
      await promise;
    }
    if (discovery === "card") {
      for (const strategy of CARD_DISCOVERY_STRATEGIES) {
        if (attemptedPromises.has(strategy)) {
          continue;
        }
        if (requested.every(isDefined)) {
          break;
        }
        attemptedStrategies.push(strategy);
        const promise = loadStrategy(strategy, timeoutMs);
        attemptedPromises.set(strategy, promise);
        await promise;
      }
    }
  } catch (error) {
    failure = error;
  }
  const result = createResult(requested, alreadyDefined, attemptedStrategies);
  if (failure !== undefined || result.missing.length > 0) {
    invalidateUnverifiedStrategies(result.missing, attemptedPromises, discovery);
    throw new HaComponentsLoadError(result, failure);
  }
  return result;
}
var DEFAULT_TIMEOUT_MS = 1e4, HaComponentsLoadError, DEFAULT_HA_COMPONENTS, COMPONENT_STRATEGIES, CARD_DISCOVERY_STRATEGIES, strategyPromises, configRoutesPromise, strategyLoaders;
var init_load_ha_components = __esm(() => {
  HaComponentsLoadError = class HaComponentsLoadError extends Error {
    result;
    cause;
    constructor(result, cause) {
      super(result.missing.length > 0 ? `Unable to load Home Assistant components: ${result.missing.join(", ")}` : "Unable to load Home Assistant components");
      this.name = "HaComponentsLoadError";
      this.result = copyResult(result);
      this.cause = cause;
    }
  };
  DEFAULT_HA_COMPONENTS = [
    "ha-form",
    "ha-icon",
    "ha-icon-button",
    "ha-selector",
    "ha-input",
    "ha-entity-picker",
    "ha-select",
    "ha-dialog",
    "ha-sortable",
    "ha-svg-icon",
    "ha-alert",
    "ha-button"
  ];
  COMPONENT_STRATEGIES = {
    "ha-target-picker": ["history"],
    "ha-date-range-picker": ["history"],
    "ha-time-input": ["history"],
    "ha-textarea": ["history"],
    "ha-country-picker": ["config-general"],
    "ha-currency-picker": ["config-general"],
    "ha-language-picker": ["config-general"],
    "ha-timezone-picker": ["config-general"],
    "ha-map": ["config-general"],
    "ha-entity-marker": ["config-general"],
    "ha-select-box": ["config-general"],
    "ha-label-picker": ["config-labels"],
    "ha-media-player-picker": ["media-browser"],
    "ha-tts-voice-picker": ["media-browser"],
    "ha-media-player-browse": ["media-browser"],
    "ha-media-browser-thumbnail": ["media-browser"],
    "ha-media-manage-button": ["media-browser"],
    "ha-browse-media-manual": ["media-browser"],
    "ha-browse-media-tts": ["media-browser"]
  };
  CARD_DISCOVERY_STRATEGIES = [
    "config-automation",
    "history",
    "config-general",
    "config-labels",
    "media-browser"
  ];
  strategyPromises = new Map;
  strategyLoaders = {
    "config-automation": (timeoutMs) => loadConfigRoute("automation", timeoutMs),
    history: loadHistory,
    "config-general": (timeoutMs) => loadConfigRoute("general", timeoutMs),
    "config-labels": (timeoutMs) => loadConfigRoute("labels", timeoutMs),
    "media-browser": loadMediaBrowser
  };
});

// node_modules/@kipk/load-ha-components/dist/index.js
var init_dist = __esm(() => {
  init_load_ha_components();
});

// src/editor/ui/renderDropdown.ts
var renderHAComboBox = (value, onChange, options) => {
  return x`
      <ha-combo-box
        helper=${options.helper}
        helperPersistent=${options.helperPersistent}
        label=${options.label}
        .items=${options.items}
        .value=${value ?? options.defaultValue ?? null}
        .disabled=${options.disabled}
        .hideClearIcon=${!options.allowEmptyValue}
        @value-changed="${(e) => {
    onChange(e.detail.value ?? null);
  }}" />
    `;
}, renderHTMLSelect = (value, onChange, options) => {
  const currentValue = value ?? options.defaultValue ?? null;
  const currentValueStr = currentValue !== null && currentValue !== undefined ? String(currentValue) : "";
  return x`
      <div class="editor-select-field">
        <label class="editor-label">${options.label}</label>
        <select
          class="editor-select"
          .value=${currentValueStr}
          ?disabled=${options.disabled}
          @change=${(e) => {
    const value = e.target.value;
    if (value === "") {
      onChange(null);
      return;
    }
    const selectedItem = options.items.find((item) => String(item.value) === value);
    onChange(selectedItem?.value ?? null);
  }}>
          ${options.allowEmptyValue ? x`<option value="">
            &ndash;
            </option>` : x``}
          ${options.items.map((item) => x`<option
              value=${String(item.value)}
              ?selected=${String(item.value) === currentValueStr}>
              ${item.label}
            </option>`)}
        </select>
        ${options.helper ? x`<div class="editor-select-helper">
                ${options.helper}
              </div>` : x``}
      </div>
    `;
}, renderDropdown = (value, onChange, options) => {
  if (supportsHAComponent("ha-combo-box")) {
    return renderHAComboBox(value, onChange, options);
  }
  return renderHTMLSelect(value, onChange, options);
};
var init_renderDropdown = __esm(() => {
  init_lit();
  init_utils();
});

// src/navbar-card-editor.ts
var HAActions, GENERIC_JS_TEMPLATE_HELPER, BOOLEAN_JS_TEMPLATE_HELPER, STRING_JS_TEMPLATE_HELPER, NavbarCardEditor;
var init_navbar_card_editor = __esm(() => {
  init_dist();
  init_lit();
  init_decorators();
  init_renderDropdown();
  init_action_handler();
  init_types();
  init_utils();
  init_docs_links();
  init_styles();
  ((HAActions) => {
    HAActions["tap_action"] = "tap_action";
    HAActions["hold_action"] = "hold_action";
    HAActions["double_tap_action"] = "double_tap_action";
  })(HAActions ||= {});
  GENERIC_JS_TEMPLATE_HELPER = x`Insert valid Javascript code without [[[
  ]]].
  <a
    href="${DOCS_LINKS.jsTemplate}"
    target="_blank"
    rel="noopener"
    >See documentation</a
  >
  for more info.`;
  BOOLEAN_JS_TEMPLATE_HELPER = x`${GENERIC_JS_TEMPLATE_HELPER}<br />Must
  return a <strong>boolean</strong> value`;
  STRING_JS_TEMPLATE_HELPER = x`${GENERIC_JS_TEMPLATE_HELPER}<br />Must
  return a <strong>string</strong> value`;
  NavbarCardEditor = class NavbarCardEditor extends i4 {
    constructor() {
      super(...arguments);
      this._config = { routes: [] };
      this._loadingComponents = false;
      this._templateModeByField = {};
      this._lazyLoadedSections = {
        ["routes" /* routes */]: false
      };
      this.addMediaPlayer = () => {
        const players = this._config.media_player?.players ?? [];
        const newPlayer = { entity: "" };
        this.updateConfig({
          media_player: {
            ...this._config.media_player,
            players: [...players, newPlayer]
          }
        });
      };
      this.removeMediaPlayer = (playerIndex) => {
        const players = [...this._config.media_player?.players ?? []];
        players.splice(playerIndex, 1);
        this.updateConfigByKey("media_player.players", players.length === 0 ? null : players);
      };
      this.addRouteOrPopup = (routeIndex) => {
        let routes = [...this._config.routes ?? []];
        const newItemData = {
          icon: "mdi:alert-circle-outline",
          label: "",
          url: ""
        };
        if (routeIndex == null) {
          routes = [...routes, newItemData];
        } else {
          const popup = [...routes[routeIndex].popup || [], newItemData];
          routes[routeIndex] = { ...routes[routeIndex], popup };
        }
        this.updateConfig({ routes });
      };
      this.removeRouteOrPopup = (routeIndex, popupIndex) => {
        if (!this._config.routes || this._config.routes.length == 0)
          return;
        const routes = [...this._config.routes];
        if (popupIndex == null) {
          routes.splice(routeIndex, 1);
          if (routes.length === 0) {
            this.updateConfigByKey("routes", null);
            return;
          }
          this.updateConfig({ routes });
          return;
        }
        const popup = [...routes[routeIndex].popup || []];
        popup.splice(popupIndex, 1);
        if (popup.length === 0) {
          this.updateConfigByKey(`routes.${routeIndex}.popup`, null);
          return;
        }
        routes[routeIndex] = { ...routes[routeIndex], popup };
        this.updateConfig({ routes });
      };
      this._resetToTemplateOnly = () => {
        const type = this._config.type;
        this._config = {
          ...type != null ? { type } : {},
          template: this._config.template
        };
        this._dispatchConfigChangedEvent();
      };
    }
    firstUpdated(_changedProperties) {
      super.firstUpdated(_changedProperties);
      this._templateModeByField = {};
      this._loadingComponents = true;
      loadHaComponents([
        "ha-form",
        "ha-tooltip",
        "ha-icon",
        "ha-button",
        "ha-combo-box",
        "ha-input",
        "ha-switch",
        "ha-expansion-panel",
        "ha-code-editor",
        "ha-radio",
        "ha-alert",
        "ha-formfield",
        "ha-selector",
        "ha-icon-button"
      ]).catch((error) => {
        console.warn("[navbar-card] Failed to load some HA editor components", error);
      }).finally(() => {
        this._loadingComponents = false;
      });
    }
    markSectionAsLazyLoaded(section) {
      if (this._lazyLoadedSections[section])
        return;
      this._lazyLoadedSections[section] = true;
      setTimeout(() => {
        this.requestUpdate();
      }, 200);
    }
    _dispatchConfigChangedEvent() {
      this.dispatchEvent(new CustomEvent("config-changed", {
        detail: {
          config: this._config
        }
      }));
    }
    setConfig(config) {
      this._config = config;
    }
    updateConfig(newConfig) {
      this._config = deepMergeKeepArrays(this._config, newConfig);
      this._dispatchConfigChangedEvent();
    }
    updateConfigByKey(key, value) {
      this._config = genericSetProperty(this._config, key, value, {
        allowDeletion: true
      });
      this._dispatchConfigChangedEvent();
    }
    _hasTemplateOverrides() {
      const { template: _template, routes, ...rest } = this._config;
      const hasExtraFields = Object.keys(rest).some((k) => k !== "type" && rest[k] != null);
      const hasRoutes = Array.isArray(routes) && routes.length > 0;
      return hasExtraFields || hasRoutes;
    }
    _isTemplateMode(configKey) {
      const modeByField = this._templateModeByField[String(configKey)];
      if (modeByField !== undefined)
        return modeByField;
      return isTemplate(genericGetProperty(this._config, configKey));
    }
    _setTemplateMode(configKey, isTemplate) {
      this._templateModeByField = {
        ...this._templateModeByField,
        [String(configKey)]: isTemplate
      };
    }
    makeHelpTooltipIcon(options) {
      return x`<ha-tooltip .placement="right" .content=${options.tooltip}>
      <ha-icon icon="mdi:help-circle"></ha-icon>
    </ha-tooltip>`;
    }
    makeComboBox(options) {
      return renderDropdown(genericGetProperty(this._config, options.configKey) ?? options.defaultValue ?? null, (value) => {
        this.updateConfigByKey(options.configKey, value);
      }, options);
    }
    makeNavigationPicker(options) {
      return this.makeSelector({
        configKey: options.configKey,
        disabled: options.disabled,
        label: options.label,
        selector: { navigation: {} }
      });
    }
    makeSelector(options) {
      const value = options.value !== undefined ? options.value : genericGetProperty(this._config, options.configKey) ?? "";
      return x`
      <div style="display: flex; align-items: center; width: 100%;">
        ${options.tooltip ? this.makeHelpTooltipIcon({ tooltip: options.tooltip }) : ""}
        <ha-selector
          style="flex: 1; width: 100%;"
          .hass=${this.hass}
          .label=${options.label}
          .helper=${options.helper}
          .selector=${options.selector}
          .value=${value}
          .disabled=${options.disabled ?? false}
          @value-changed=${(e) => {
        let next = e.detail.value;
        if (options.mapValue) {
          next = options.mapValue(next);
        }
        this.updateConfigByKey(options.configKey, next === "" || next == null ? null : next);
      }}></ha-selector>
      </div>
    `;
    }
    makeTextInput(options) {
      return this.makeSelector({
        configKey: options.configKey,
        disabled: options.disabled,
        helper: options.helper,
        label: options.label,
        mapValue: options.type === "number" ? (value) => {
          if (value === "" || value == null)
            return null;
          const parsed = parseInt(String(value), 10);
          return Number.isNaN(parsed) ? null : parsed;
        } : undefined,
        selector: {
          text: {
            autocomplete: options.autocomplete,
            placeholder: options.placeholder,
            suffix: options.suffix,
            type: options.type === "textarea" || options.type == null ? "text" : options.type
          }
        },
        tooltip: options.tooltip
      });
    }
    makeEntityPicker(options) {
      return this.makeSelector({
        configKey: options.configKey,
        disabled: options.disabled,
        label: options.label,
        selector: {
          entity: {
            filter: options.includeDomains?.length ? { domain: options.includeDomains } : undefined
          }
        }
      });
    }
    makeIconPicker(options) {
      return this.makeSelector({
        configKey: options.configKey,
        disabled: options.disabled,
        label: options.label,
        selector: { icon: {} }
      });
    }
    makeColorPicker(options) {
      return this.makeSelector({
        configKey: options.configKey,
        disabled: options.disabled,
        label: options.label,
        selector: {
          ui_color: {
            include_none: true
          }
        },
        tooltip: options.tooltip
      });
    }
    makeTemplatable(options) {
      const value = genericGetProperty(this._config, options.configKey);
      const isTemplate = this._isTemplateMode(options.configKey);
      const toggleMode = () => {
        if (isTemplate) {
          this._setTemplateMode(options.configKey, false);
          const uiValue = typeof value === "string" ? (cleanTemplate(value) ?? "").trim() : "";
          this.updateConfigByKey(options.configKey, uiValue === "" ? null : uiValue);
        } else {
          this._setTemplateMode(options.configKey, true);
          const templateSource = typeof value === "string" ? (cleanTemplate(value) ?? "").trim() : "";
          this.updateConfigByKey(options.configKey, templateSource === "" ? null : wrapTemplate(templateSource));
        }
      };
      const buttonLabel = isTemplate ? "Switch to UI input" : "Switch to template";
      const buttonIcon = isTemplate ? "mdi:format-text" : "mdi:code-braces";
      return x`
      <div class="templatable-field">
        <div class="templatable-field-header">
          <ha-button
            @click=${toggleMode}
            outlined
            size="small"
            variant="neutral"
            appearance="plain">
            <ha-icon slot="start" icon="${buttonIcon}"></ha-icon>
            <span>${buttonLabel}</span>
          </ha-button>
        </div>
        ${isTemplate ? this.makeTemplateEditor({
        allowNull: true,
        configKey: options.configKey,
        helper: options.templateHelper,
        label: options.label,
        tooltip: options.tooltip
      }) : options.inputType === "string" ? this.makeTextInput({
        configKey: options.configKey,
        disabled: options.disabled,
        helper: "textHelper" in options ? options.textHelper : undefined,
        label: options.label,
        placeholder: "placeholder" in options ? options.placeholder : undefined,
        tooltip: options.tooltip
      }) : options.inputType === "number" ? this.makeEntityPicker({
        configKey: options.configKey,
        disabled: options.disabled,
        label: options.label
      }) : options.inputType === "icon" ? this.makeIconPicker({
        configKey: options.configKey,
        disabled: options.disabled,
        label: options.label
      }) : options.inputType === "switch" ? this.makeSwitch({
        configKey: options.configKey,
        defaultValue: "defaultValue" in options ? options.defaultValue : undefined,
        disabled: options.disabled,
        label: options.label
      }) : options.inputType === "entity" ? this.makeEntityPicker({
        configKey: options.configKey,
        disabled: options.disabled,
        excludeDomains: "excludeDomains" in options ? options.excludeDomains : undefined,
        includeDomains: "includeDomains" in options ? options.includeDomains : undefined,
        label: options.label
      }) : options.inputType === "color" ? this.makeColorPicker({
        configKey: options.configKey,
        disabled: options.disabled,
        label: options.label,
        tooltip: options.tooltip
      }) : x``}
      </div>
    `;
    }
    makeTemplateEditor(options) {
      return x`
      <div class="template-editor-container">
        <label class="editor-label">${options.label} </label>
        <ha-code-editor
          autofocus
          autocomplete-entities
          autocomplete-icons
          .hass=${this.hass}
          .value=${cleanTemplate(genericGetProperty(this._config, options.configKey) ?? "")}
          @value-changed=${(e) => {
        this._setTemplateMode(options.configKey, true);
        const templateValue = e.target.value?.trim() == "" ? null : wrapTemplate(e.target.value);
        this.updateConfigByKey(options.configKey, templateValue);
      }}></ha-code-editor>
        ${options.helper ? x`<div class="template-editor-helper">${options.helper}</div>` : x``}
      </div>
    `;
    }
    makeSwitch(options) {
      const raw = genericGetProperty(this._config, options.configKey);
      return this.makeSelector({
        configKey: options.configKey,
        disabled: options.disabled,
        label: options.label,
        mapValue: (next) => Boolean(next),
        selector: { boolean: {} },
        tooltip: options.tooltip,
        value: raw ?? options.defaultValue ?? false
      });
    }
    makeButton(options) {
      return x`<ha-button @click=${options.onClick} outlined hasTrailingIcon>
      <ha-icon slot="start" icon=${options.icon}></ha-icon>
      <span>${options.text}</span>
    </ha-button>`;
    }
    _createListDragHandlers(dragData) {
      return {
        onDragEnd: (e) => {
          e.currentTarget.classList.remove("dragging");
        },
        onDragLeave: (e) => {
          e.currentTarget.classList.remove("drag-over");
        },
        onDragOver: (e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = "move";
          e.currentTarget.classList.add("drag-over");
        },
        onDragStart: (e) => {
          e.dataTransfer?.setData("application/json", JSON.stringify(dragData));
          e.dataTransfer.effectAllowed = "move";
          e.currentTarget.classList.add("dragging");
        }
      };
    }
    _renderDraggableItem(options) {
      const handlers = this._createListDragHandlers(options.dragData);
      return x`
      <div
        class="draggable-item"
        @dragover=${handlers.onDragOver}
        @dragleave=${handlers.onDragLeave}
        @drop=${options.onDrop}>
        <ha-expansion-panel outlined>
          <div
            slot="header"
            class="draggable-item-header"
            draggable="true"
            @dragstart=${handlers.onDragStart}
            @dragend=${handlers.onDragEnd}>
            <span class="drag-handle" title="Drag to reorder">
              <ha-icon icon="mdi:drag"></ha-icon>
            </span>
            <div class="draggable-item-header-title">${options.headerTitle}</div>
            <span class="draggable-item-header-summary">${options.headerSummary}</span>
            <ha-icon-button
              @click=${(e) => {
        e.preventDefault();
        e.stopPropagation();
        options.onDelete();
      }}
              class="delete-btn"
              label=${options.deleteLabel}>
              <ha-icon icon="mdi:delete"></ha-icon>
            </ha-icon-button>
          </div>
          <div class="draggable-item-editor">${options.body}</div>
        </ha-expansion-panel>
      </div>
    `;
    }
    makeDraggableRouteEditor(item, routeIndex, popupIndex) {
      const isPopup = popupIndex != null;
      const usesTemplate = !isPopup && isTemplate(item.popup);
      const baseConfigKey = isPopup ? `routes.${routeIndex}.popup.${popupIndex}` : `routes.${routeIndex}`;
      const onDrop = (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove("drag-over");
        const dragData = JSON.parse(e.dataTransfer?.getData("application/json") || "{}");
        if (dragData.popupIndex != null !== (popupIndex != null))
          return;
        if (popupIndex == null) {
          if (dragData.routeIndex === routeIndex)
            return;
          const routes = [...this._config.routes];
          const [moved] = routes.splice(dragData.routeIndex, 1);
          routes.splice(routeIndex, 0, moved);
          this.updateConfig({ routes });
        } else if (typeof popupIndex === "number" && typeof dragData.popupIndex === "number" && dragData.routeIndex === routeIndex) {
          if (dragData.popupIndex === popupIndex)
            return;
          const routes = [...this._config.routes];
          const popups = [...routes[routeIndex].popup || []];
          const [moved] = popups.splice(dragData.popupIndex, 1);
          popups.splice(popupIndex, 0, moved);
          routes[routeIndex] = { ...routes[routeIndex], popup: popups };
          this.updateConfig({ routes });
        }
      };
      return this._renderDraggableItem({
        body: x`
            <div class="editor-row">
              <div class="editor-row-item">
                ${this.makeNavigationPicker({
          configKey: `${baseConfigKey}.url`,
          label: "URL"
        })}
              </div>
            </div>

            ${this.makeTemplatable({
          configKey: `${baseConfigKey}.label`,
          inputType: "string",
          label: "Label",
          templateHelper: STRING_JS_TEMPLATE_HELPER
        })}
            ${this.makeTemplatable({
          configKey: `${baseConfigKey}.selected_color`,
          inputType: "string",
          label: "Selected color",
          templateHelper: STRING_JS_TEMPLATE_HELPER
        })}
            ${this.makeTemplatable({
          configKey: `${baseConfigKey}.icon`,
          inputType: "icon",
          label: "Icon"
        })}
            ${this.makeTemplatable({
          configKey: `${baseConfigKey}.icon_selected`,
          inputType: "icon",
          label: "Icon selected"
        })}
            ${this.makeTemplatable({
          configKey: `${baseConfigKey}.icon_color`,
          inputType: "color",
          label: "Icon color"
        })}
            ${this.makeTemplatable({
          configKey: `${baseConfigKey}.image`,
          inputType: "string",
          label: "Image",
          placeholder: "URL of the image"
        })}
            ${this.makeTemplatable({
          configKey: `${baseConfigKey}.image_selected`,
          inputType: "string",
          label: "Image selected",
          placeholder: "URL of the image"
        })}

            <div class="editor-divider"></div>

            <ha-expansion-panel outlined>
              <h5 slot="header">
                <ha-icon icon="mdi:star-circle-outline"></ha-icon>
                Badge
              </h5>
              <div class="editor-section">
                ${this.makeTemplatable({
          configKey: `${baseConfigKey}.badge.color`,
          inputType: "string",
          label: "Color",
          templateHelper: STRING_JS_TEMPLATE_HELPER,
          textHelper: "Color of the badge in any CSS valid format (red, #ff0000, rgba(255,0,0,1)...)"
        })}
                ${this.makeTemplatable({
          configKey: `${baseConfigKey}.badge.show`,
          inputType: "switch",
          label: "Show",
          templateHelper: BOOLEAN_JS_TEMPLATE_HELPER
        })}
                ${this.makeTemplatable({
          configKey: `${baseConfigKey}.badge.icon`,
          inputType: "icon",
          label: "Icon",
          templateHelper: STRING_JS_TEMPLATE_HELPER
        })}
                ${this.makeTemplatable({
          configKey: `${baseConfigKey}.badge.icon_color`,
          inputType: "color",
          label: "Icon color",
          templateHelper: STRING_JS_TEMPLATE_HELPER
        })}
                ${this.makeTemplatable({
          configKey: `${baseConfigKey}.badge.count`,
          inputType: "string",
          label: "Count",
          templateHelper: STRING_JS_TEMPLATE_HELPER
        })}
                ${this.makeTemplatable({
          configKey: `${baseConfigKey}.badge.text_color`,
          inputType: "string",
          label: "Text color",
          templateHelper: STRING_JS_TEMPLATE_HELPER
        })}
              </div>
            </ha-expansion-panel>

            ${!isPopup ? x`
                  <ha-expansion-panel outlined>
                    <h5 slot="header">
                      <ha-icon icon="mdi:menu"></ha-icon>
                      Popup/Submenu
                    </h5>
                    <div class="editor-section">
                      <div class="editor-tab-nav">
                        <button
                          class="editor-tab-button ${!usesTemplate ? "active" : ""}"
                          @click=${() => {
          if (!usesTemplate)
            return;
          let parsedPopup = [];
          try {
            parsedPopup = JSON.parse(cleanTemplate(item.popup?.toString()) ?? "[]");
          } catch (_e) {
            parsedPopup = [];
          }
          this.updateConfigByKey(`${baseConfigKey}.popup`, parsedPopup);
        }}>
                          <ha-icon icon="mdi:palette"></ha-icon>
                          UI editor
                        </button>
                        <button
                          class="editor-tab-button ${usesTemplate ? "active" : ""}"
                          @click=${() => {
          if (usesTemplate)
            return;
          this.updateConfigByKey(`${baseConfigKey}.popup`, wrapTemplate(JSON.stringify(item.popup ?? [], null, 2)));
        }}>
                          <ha-icon icon="mdi:code-tags"></ha-icon>
                          Use template
                        </button>
                      </div>

                      ${usesTemplate ? this.makeTemplateEditor({
          configKey: `${baseConfigKey}.popup`,
          helper: GENERIC_JS_TEMPLATE_HELPER,
          label: "Popup"
        }) : x`<div class="routes-container">
                              ${(item.popup ?? []).map((popupItem, index) => {
          return this.makeDraggableRouteEditor(popupItem, routeIndex, index);
        })}
                            </div>
                            ${this.makeButton({
          icon: "mdi:plus",
          onClick: () => this.addRouteOrPopup(routeIndex),
          text: "Add Popup item"
        })}`}
                    </div>
                  </ha-expansion-panel>
                ` : x``}

            <ha-expansion-panel outlined>
              <h5 slot="header">
                <ha-icon icon="mdi:cog"></ha-icon>
                Advanced features
              </h5>
              <div class="editor-section">
                ${this.makeTemplatable({
          configKey: `${baseConfigKey}.hidden`,
          inputType: "switch",
          label: "Hidden",
          templateHelper: BOOLEAN_JS_TEMPLATE_HELPER
        })}
                ${!isPopup ? this.makeTemplatable({
          configKey: `${baseConfigKey}.selected`,
          inputType: "switch",
          label: "Selected",
          templateHelper: BOOLEAN_JS_TEMPLATE_HELPER
        }) : x``}
              </div>
            </ha-expansion-panel>

            ${Object.values(HAActions).map((type) => {
          const key = `${baseConfigKey}.${type}`;
          const actionValue = genericGetProperty(this._config, key);
          const label = this._chooseLabelForAction(type);
          return x`
                ${actionValue != null ? this.makeActionSelector({
            actionType: type,
            configKey: key
          }) : x`
                      <ha-button
                      @click=${() => this.updateConfigByKey(key, {
            action: "none"
          })}
                        style="margin-bottom: 1em;"
                        outlined
                        hasTrailingIcon>
                        <ha-icon slot="start" icon="mdi:plus"></ha-icon>
                        <span>Add ${label}</span>
                      </ha-button>
                    `}
              `;
        })}
      `,
        deleteLabel: isPopup ? "Delete popup" : "Delete route",
        dragData: { popupIndex, routeIndex },
        headerSummary: x`
        ${item.image != null ? x`<img src="${item.image}" class="draggable-item-header-image" />` : x`<ha-icon icon="${item.icon}"></ha-icon>`}
        ${item.label ? processTemplate(this.hass, undefined, item.label) : ""}
      `,
        headerTitle: isPopup ? "Popup item" : "Route",
        onDelete: () => this.removeRouteOrPopup(routeIndex, popupIndex),
        onDrop
      });
    }
    _chooseIconForAction(actionType) {
      switch (actionType) {
        case "hold_action" /* hold_action */:
          return "mdi:gesture-tap-hold";
        case "double_tap_action" /* double_tap_action */:
          return "mdi:gesture-double-tap";
        case "tap_action" /* tap_action */:
        default:
          return "mdi:gesture-tap";
      }
    }
    _chooseLabelForAction(actionType) {
      switch (actionType) {
        case "tap_action" /* tap_action */:
          return "Tap action";
        case "hold_action" /* hold_action */:
          return "Hold action";
        case "double_tap_action" /* double_tap_action */:
          return "Double tap action";
        default:
          return "";
      }
    }
    isCustomAction(value) {
      if (value === "none")
        return false;
      return Object.values(NavbarCustomActions).includes(value);
    }
    renderTemplateEditor() {
      const availableTemplates = getNavbarTemplates();
      return x`
      <ha-expansion-panel outlined>
        <h4 slot="header">
          <ha-icon icon="mdi:bookmark-outline"></ha-icon>
          Navbar template
        </h4>
        <div class="editor-section">
          ${this.makeComboBox({
        allowEmptyValue: true,
        configKey: "template",
        helper: x`Reusable template name used for this card.
              <a
                href="${DOCS_LINKS.template}"
                target="_blank"
                rel="noopener"
                >Check the documentation</a
              >
              for more info.`,
        items: Object.entries(availableTemplates ?? {}).map(([key]) => ({
          label: key,
          value: key
        })),
        label: "Template"
      })}
        </div></ha-expansion-panel
      >
    `;
    }
    renderStylesEditor() {
      return x`
      <ha-expansion-panel outlined>
        <h4 slot="header">
          <ha-icon icon="mdi:code-braces"></ha-icon>
          CSS Styles
        </h4>
        <div class="editor-section">
          <ha-alert alert-type="info" title="Custom CSS Styles">
            Use this section to change the appearance of
            <code>navbar-card</code>.<br />
            Enter your CSS code here (no <code>"styles: |"</code> prefix
            needed).<br />
            <a
              href="${DOCS_LINKS.styles}"
              target="_blank"
              rel="noopener"
              >See documentation</a
            >
            for examples.
          </ha-alert>
          <ha-code-editor
            mode="yaml"
            autofocus
            autocomplete-entities
            autocomplete-icons
            .hass=${this.hass}
            .value=${this._config.styles}
            @value-changed=${(e) => {
        const trimmedStyles = e.target.value?.trim() == "" ? null : e.target.value;
        this.updateConfig({ styles: trimmedStyles });
      }}></ha-code-editor>
        </div>
      </ha-expansion-panel>
    `;
    }
    renderLayoutEditor() {
      const autoPaddingEnabled = genericGetProperty(this._config, "layout.auto_padding.enabled") ?? DEFAULT_NAVBAR_CONFIG.layout?.auto_padding?.enabled;
      return x`
      <ha-expansion-panel outlined>
        <h4 slot="header">
          <ha-icon icon="mdi:view-grid"></ha-icon>
          Layout
        </h4>
        <div class="editor-section">
          <label class="editor-label">Reflect child state</label>
          ${this.makeSwitch({
        configKey: "layout.reflect_child_state",
        defaultValue: DEFAULT_NAVBAR_CONFIG.layout?.reflect_child_state,
        label: "Display routes as selected if any of its popup items is selected"
      })}
        </div>
        <div class="editor-section">
          ${this.makeComboBox({
        configKey: "layout.popup_style",
        defaultValue: DEFAULT_NAVBAR_CONFIG.layout?.popup_style,
        items: [
          { label: "Bubbles", value: "bubbles" },
          { label: "Panel", value: "panel" }
        ],
        label: "Popup style"
      })}
        </div>
        <div class="editor-section">
          <label class="editor-label">Auto padding</label>
          ${this.makeSwitch({
        configKey: "layout.auto_padding.enabled",
        defaultValue: DEFAULT_NAVBAR_CONFIG.layout?.auto_padding?.enabled,
        label: "Enable auto padding"
      })}
          ${this.makeTextInput({
        configKey: "layout.auto_padding.desktop_px",
        disabled: !autoPaddingEnabled,
        helper: "Padding for desktop mode. 0 to disable.",
        label: "Desktop padding",
        placeholder: DEFAULT_NAVBAR_CONFIG.layout?.auto_padding?.desktop_px?.toString(),
        suffix: "px",
        type: "number"
      })}
          ${this.makeTextInput({
        configKey: "layout.auto_padding.mobile_px",
        disabled: !autoPaddingEnabled,
        helper: "Padding for mobile mode. 0 to disable.",
        label: "Mobile padding",
        placeholder: DEFAULT_NAVBAR_CONFIG.layout?.auto_padding?.mobile_px?.toString(),
        suffix: "px",
        type: "number"
      })}
        </div>
      </ha-expansion-panel>
    `;
    }
    renderHapticEditor() {
      const hapticRawValue = genericGetProperty(this._config, "haptic");
      const hapticValue = typeof hapticRawValue === "boolean" ? hapticRawValue : undefined;
      return x`
      <ha-expansion-panel outlined>
        <h4 slot="header">
          <ha-icon icon="mdi:vibrate"></ha-icon>
          Haptic
        </h4>
        <div class="editor-section">
          ${this.makeSwitch({
        configKey: "haptic.url",
        defaultValue: hapticValue,
        label: "When pressing routes with URL configured"
      })}
          ${this.makeSwitch({
        configKey: "haptic.tap_action",
        defaultValue: hapticValue,
        label: "When executing the 'tap_action' configured for a route"
      })}
          ${this.makeSwitch({
        configKey: "haptic.hold_action",
        defaultValue: hapticValue,
        label: "When executing the 'hold_action' configured for a route"
      })}
          ${this.makeSwitch({
        configKey: "haptic.double_tap_action",
        defaultValue: hapticValue,
        label: "When executing the 'double_tap_action' configured for a route"
      })}
        </div>
      </ha-expansion-panel>
    `;
    }
    renderMediaPlayerEditor() {
      const players = this._config.media_player?.players ?? [];
      return x`
      <ha-expansion-panel outlined>
        <h4 slot="header">
          <ha-icon icon="mdi:music"></ha-icon>
          Media player
        </h4>
        <div class="editor-section">
          ${this.makeSwitch({
        configKey: "media_player.album_cover_background",
        defaultValue: DEFAULT_NAVBAR_CONFIG.media_player?.album_cover_background,
        label: "Show album cover background"
      })}
          ${this.makeComboBox({
        configKey: "media_player.desktop_position",
        defaultValue: DEFAULT_NAVBAR_CONFIG.media_player?.desktop_position,
        items: [
          { label: "Top left", value: "top-left" /* topLeft */ },
          { label: "Top center", value: "top-center" /* topCenter */ },
          { label: "Top right", value: "top-right" /* topRight */ },
          { label: "Bottom left", value: "bottom-left" /* bottomLeft */ },
          { label: "Bottom center", value: "bottom-center" /* bottomCenter */ },
          { label: "Bottom right", value: "bottom-right" /* bottomRight */ }
        ],
        label: "Desktop position"
      })}
          ${this.makeTemplatable({
        configKey: "media_player.show",
        inputType: "switch",
        label: "Show media player widget",
        templateHelper: BOOLEAN_JS_TEMPLATE_HELPER
      })}
        </div>
        <div class="editor-section">
          <label class="editor-label">Players</label>
          <div class="routes-container">
            ${players.map((player, i) => this.makeDraggablePlayerEditor(player, i))}
          </div>
          ${this.makeButton({
        icon: "mdi:plus",
        onClick: () => this.addMediaPlayer(),
        text: "Add player"
      })}
        </div>
      </ha-expansion-panel>
    `;
    }
    makeDraggablePlayerEditor(player, playerIndex) {
      const baseConfigKey = `media_player.players.${playerIndex}`;
      const onDrop = (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove("drag-over");
        const dragData = JSON.parse(e.dataTransfer?.getData("application/json") || "{}");
        const fromIndex = dragData.playerIndex;
        if (typeof fromIndex !== "number" || fromIndex === playerIndex)
          return;
        const players = [...this._config.media_player?.players ?? []];
        const [moved] = players.splice(fromIndex, 1);
        players.splice(playerIndex, 0, moved);
        this.updateConfig({
          media_player: {
            ...this._config.media_player,
            players
          }
        });
      };
      return this._renderDraggableItem({
        body: x`
          ${this.makeTemplatable({
          configKey: `${baseConfigKey}.entity`,
          includeDomains: ["media_player"],
          inputType: "entity",
          label: "Media player entity"
        })}
          ${this.makeTemplateEditor({
          configKey: `${baseConfigKey}.show`,
          helper: BOOLEAN_JS_TEMPLATE_HELPER,
          label: "Show"
        })}
          ${this.makeTemplatable({
          configKey: `${baseConfigKey}.icon`,
          inputType: "icon",
          label: "Icon",
          templateHelper: STRING_JS_TEMPLATE_HELPER
        })}
          ${this.makeTemplatable({
          configKey: `${baseConfigKey}.title`,
          inputType: "string",
          label: "Title",
          templateHelper: STRING_JS_TEMPLATE_HELPER
        })}
          ${this.makeTemplatable({
          configKey: `${baseConfigKey}.subtitle`,
          inputType: "string",
          label: "Subtitle",
          templateHelper: STRING_JS_TEMPLATE_HELPER
        })}
          ${Object.values(HAActions).map((type) => {
          const key = `${baseConfigKey}.${type}`;
          const actionValue = genericGetProperty(this._config, key);
          const label = this._chooseLabelForAction(type);
          return x`
              ${actionValue != null ? this.makeActionSelector({
            actionType: type,
            configKey: key
          }) : x`
                    <ha-button
                      @click=${() => this.updateConfigByKey(key, {
            action: "none"
          })}
                      style="margin-bottom: 1em;"
                      outlined
                      hasTrailingIcon>
                      <ha-icon slot="start" icon="mdi:plus"></ha-icon>
                      <span>Add ${label}</span>
                    </ha-button>
                  `}
            `;
        })}
      `,
        deleteLabel: "Delete player",
        dragData: { playerIndex },
        headerSummary: x`
        ${processTemplate(this.hass, undefined, player.entity) || "No entity"}
      `,
        headerTitle: `Player`,
        onDelete: () => this.removeMediaPlayer(playerIndex),
        onDrop
      });
    }
    renderDesktopEditor() {
      const labelVisibility = genericGetProperty(this._config, "desktop.show_labels") ?? DEFAULT_NAVBAR_CONFIG.desktop?.show_labels;
      return x`
      <ha-expansion-panel outlined>
        <h4 slot="header">
          <ha-icon icon="mdi:laptop"></ha-icon>
          Desktop options
        </h4>
        <div class="editor-section">
          ${this.makeComboBox({
        configKey: "desktop.mode",
        defaultValue: DEFAULT_NAVBAR_CONFIG.desktop?.mode,
        items: [
          { label: "Floating", value: "floating" },
          { label: "Docked", value: "docked" }
        ],
        label: "Mode"
      })}
          <div class="editor-row">
            <div class="editor-row-item">
              ${this.makeComboBox({
        configKey: "desktop.position",
        defaultValue: DEFAULT_NAVBAR_CONFIG.desktop?.position,
        items: [
          { label: "Top", value: "top" /* top */ },
          { label: "Bottom", value: "bottom" /* bottom */ },
          { label: "Left", value: "left" /* left */ },
          { label: "Right", value: "right" /* right */ }
        ],
        label: "Position"
      })}
            </div>
            <div class="editor-row-item">
              ${this.makeTextInput({
        configKey: "desktop.min_width",
        helper: "Min screen width for desktop mode to be active.",
        label: "Min width",
        suffix: "px",
        type: "number"
      })}
            </div>
          </div>
          ${this.makeComboBox({
        configKey: "desktop.show_labels",
        defaultValue: DEFAULT_NAVBAR_CONFIG.desktop?.show_labels,
        items: [
          { label: "Always", value: true },
          { label: "Never", value: false },
          { label: "Popup only", value: "popup_only" },
          { label: "Routes only", value: "routes_only" }
        ],
        label: "Show labels"
      })}
          ${this.makeSwitch({
        configKey: "desktop.show_popup_label_backgrounds",
        defaultValue: DEFAULT_NAVBAR_CONFIG.desktop?.show_popup_label_backgrounds,
        disabled: ![true, "popup_only"].includes(labelVisibility),
        label: "Show popup label backgrounds"
      })}
          ${this.makeTemplateEditor({
        configKey: "desktop.hidden",
        helper: BOOLEAN_JS_TEMPLATE_HELPER,
        label: "Hidden"
      })}
        </div>
      </ha-expansion-panel>
    `;
    }
    renderMobileEditor() {
      const labelVisibility = genericGetProperty(this._config, "mobile.show_labels") ?? DEFAULT_NAVBAR_CONFIG.mobile?.show_labels;
      return x`
      <ha-expansion-panel outlined>
        <h4 slot="header">
          <ha-icon icon="mdi:cellphone"></ha-icon>
          Mobile options
        </h4>
        <div class="editor-section">
          ${this.makeComboBox({
        configKey: "mobile.mode",
        defaultValue: DEFAULT_NAVBAR_CONFIG.mobile?.mode,
        items: [
          { label: "Floating", value: "floating" },
          { label: "Docked", value: "docked" }
        ],
        label: "Mode"
      })}
          ${this.makeComboBox({
        configKey: "mobile.show_labels",
        defaultValue: DEFAULT_NAVBAR_CONFIG.mobile?.show_labels,
        items: [
          { label: "Always", value: true },
          { label: "Never", value: false },
          { label: "Popup only", value: "popup_only" },
          { label: "Routes only", value: "routes_only" }
        ],
        label: "Show labels"
      })}
          ${this.makeSwitch({
        configKey: "mobile.show_popup_label_backgrounds",
        defaultValue: DEFAULT_NAVBAR_CONFIG.mobile?.show_popup_label_backgrounds,
        disabled: ![true, "popup_only"].includes(labelVisibility),
        label: "Show popup label backgrounds"
      })}
          ${this.makeSwitch({
        configKey: "mobile.safe_area",
        defaultValue: DEFAULT_NAVBAR_CONFIG.mobile?.safe_area,
        label: "Respect safe area insets"
      })}
          ${this.makeSwitch({
        configKey: "mobile.scrollable",
        defaultValue: DEFAULT_NAVBAR_CONFIG.mobile?.scrollable,
        label: "Scroll sideways, keeping the selected route centred"
      })}
          ${this.makeComboBox({
        configKey: "mobile.autohide",
        defaultValue: DEFAULT_NAVBAR_CONFIG.mobile?.autohide,
        items: [
          { label: "Off", value: false },
          { label: "Slide away on scroll", value: "slide" },
          { label: "Minimize on scroll", value: "minimize" },
          { label: "Arrow toggle", value: "toggle" }
        ],
        label: "Auto-hide"
      })}
          ${this.makeTemplateEditor({
        configKey: "mobile.hidden",
        helper: BOOLEAN_JS_TEMPLATE_HELPER,
        label: "Hidden"
      })}
        </div>
      </ha-expansion-panel>
    `;
    }
    renderRoutesEditor() {
      return x`
      <ha-expansion-panel
        outlined
        @expanded-changed=${(e) => {
        if (e.target.expanded) {
          this.markSectionAsLazyLoaded("routes" /* routes */);
        }
      }}>
        <h4 slot="header">
          <ha-icon icon="mdi:routes"></ha-icon>
          Routes
        </h4>
        <div class="editor-section">
          ${conditionallyRender(this._lazyLoadedSections["routes" /* routes */], () => x`
              <div class="routes-container">
                ${(this._config.routes ?? []).map((route, i) => {
        return this.makeDraggableRouteEditor(route, i);
      })}
              </div>
            `)}
          ${this.makeButton({
        icon: "mdi:plus",
        onClick: () => this.addRouteOrPopup(),
        text: "Add Route"
      })}
        </div>
      </ha-expansion-panel>
    `;
    }
    makeActionSelector(options) {
      const ACTIONS = [
        { label: "Home Assistant action", value: "hass_action" },
        { label: "Open Popup", value: "open-popup" /* openPopup */ },
        { label: "Navigate Back", value: "navigate-back" /* navigateBack */ },
        { label: "Toggle Menu", value: "toggle-menu" /* toggleMenu */ },
        { label: "Quickbar", value: "quickbar" /* quickbar */ },
        { label: "Open Edit Mode", value: "open-edit-mode" /* openEditMode */ },
        { label: "Logout current user", value: "logout" /* logout */ },
        {
          label: "Custom JS Action",
          value: "custom-js-action" /* customJSAction */
        },
        {
          label: "Show Notifications",
          value: "show-notifications" /* showNotifications */
        }
      ].filter((action) => !options.disabledActions?.includes(action.value));
      const raw = genericGetProperty(this._config, options.configKey);
      const selected = this.isCustomAction(raw?.action) ? raw?.action : "hass_action";
      return x`
      <ha-expansion-panel outlined>
        <h5 slot="header" style="display: flex; flex-direction: row">
          <div class="expansion-panel-title">
            <ha-icon
              icon="${this._chooseIconForAction(options.actionType)}"></ha-icon>
            ${this._chooseLabelForAction(options.actionType)}
          </div>
          <ha-icon-button
            .label=${`Remove ${options.actionType}`}
            class="delete-btn"
            @click=${(e) => {
        e.stopPropagation();
        this.updateConfigByKey(options.configKey, null);
      }}>
            <ha-icon icon="mdi:delete"></ha-icon>
          </ha-icon-button>
        </h5>
        <div class="editor-section">
          <div class="editor-select-field">
            <label class="editor-label">
              ${this._chooseLabelForAction(options.actionType)}
            </label>
            <select
              class="editor-select"
              .value=${selected}
              ?disabled=${options.disabled}
              @change=${(e) => {
        const newSel = e.target.value;
        if (newSel === "hass_action") {
          this.updateConfigByKey(options.configKey, {
            action: "none"
          });
        } else {
          this.updateConfigByKey(options.configKey, {
            action: newSel
          });
        }
      }}>
              ${ACTIONS.map((action) => x`<option
                  value=${action.value}
                  ?selected=${action.value === selected}>
                  ${action.label}
                </option>`)}
            </select>
          </div>

          ${selected === "quickbar" /* quickbar */ ? x`
                <div class="quickbar-mode-container">
                  <ha-formfield label="Devices">
                    <ha-radio
                      name="quickbar-mode"
                      value="devices"
                      label="Devices"
                      .checked=${raw?.mode === "devices"}
                      @change=${() => {
        this.updateConfigByKey(options.configKey, {
          action: "quickbar" /* quickbar */,
          mode: "devices"
        });
      }}></ha-radio>
                  </ha-formfield>
                  <ha-formfield label="Entities">
                    <ha-radio
                      name="quickbar-mode"
                      value="entities"
                      label="Entities"
                      .checked=${raw?.mode === "entities"}
                      @change=${() => {
        this.updateConfigByKey(options.configKey, {
          action: "quickbar" /* quickbar */,
          mode: "entities"
        });
      }}></ha-radio>
                  </ha-formfield>
                  <ha-formfield label="Commands">
                    <ha-radio
                      name="quickbar-mode"
                      value="commands"
                      label="Commands"
                      .checked=${raw?.mode === "commands"}
                      @change=${() => {
        this.updateConfigByKey(options.configKey, {
          action: "quickbar" /* quickbar */,
          mode: "commands"
        });
      }}></ha-radio>
                  </ha-formfield>
                </div>
              ` : x``}
          ${selected === "custom-js-action" /* customJSAction */ ? this.makeTemplateEditor({
        configKey: `${options.configKey}.code`,
        helper: GENERIC_JS_TEMPLATE_HELPER,
        label: "Code"
      }) : x``}
          ${selected === "hass_action" ? x`
                <ha-form
                  .hass=${this.hass}
                  .data=${typeof raw === "object" ? { action: raw } : {}}
                  .schema=${[
        {
          label: this._chooseLabelForAction(options.actionType),
          name: "action",
          required: true,
          selector: {
            ui_action: {
              default_action: "none"
            }
          }
        }
      ]}
                  @value-changed=${(ev) => {
        const formValue = ev.detail.value;
        const flatValue = formValue.action && typeof formValue.action === "object" ? formValue.action : formValue;
        this.updateConfigByKey(options.configKey, flatValue.action != null ? flatValue : { action: "none" });
      }}></ha-form>
              ` : x``}
          ${selected === "hass_action" && ACTIONS_WITH_CUSTOM_ENTITY.includes(raw?.action) ? this.makeEntityPicker({
        configKey: `${options.configKey}.entity`,
        disabled: options.disabled,
        label: ""
      }) : x``}
        </div>
      </ha-expansion-panel>
    `;
    }
    render() {
      return x`
    ${conditionallyRender(!this._loadingComponents, () => x`
      <div class="navbar-editor">
        ${this._config.template != null && this._config.template?.trim() != "" ? x`
              <ha-alert alert-type="warning">
                You have the <code>template</code> field configured for
                navbar-card. Using the editor will override the props for
                <strong>this card only</strong>, but will not update the
                template defined in your dashboard.
                <br />
                <a
                  href="${DOCS_LINKS.template}"
                  target="_blank"
                  rel="noopener"
                  >Check the documentation</a
                >
                to know how to configure your navbar-card templates.
                <ha-button
                  class="reset-overrides-button"
                  slot="action"
                  .disabled=${!this._hasTemplateOverrides()}
                  @click=${this._resetToTemplateOnly}>
                  Reset overrides
                </ha-button>
              </ha-alert>
            ` : x``}
        ${this.renderTemplateEditor()} ${this.renderRoutesEditor()}
        ${this.renderDesktopEditor()} ${this.renderMobileEditor()}
        ${this.renderLayoutEditor()} ${this.renderMediaPlayerEditor()}
        ${this.renderHapticEditor()} ${this.renderStylesEditor()}
      </div>
    `)}`;
    }
    static styles = getEditorStyles();
  };
  __legacyDecorateClassTS([
    n4({ attribute: false })
  ], NavbarCardEditor.prototype, "hass", undefined);
  __legacyDecorateClassTS([
    r5()
  ], NavbarCardEditor.prototype, "_config", undefined);
  __legacyDecorateClassTS([
    r5()
  ], NavbarCardEditor.prototype, "_loadingComponents", undefined);
  __legacyDecorateClassTS([
    r5()
  ], NavbarCardEditor.prototype, "_templateModeByField", undefined);
  __legacyDecorateClassTS([
    r5()
  ], NavbarCardEditor.prototype, "_lazyLoadedSections", undefined);
  NavbarCardEditor = __legacyDecorateClassTS([
    t3("navbar-card-editor")
  ], NavbarCardEditor);
});

// src/navbar-card.ts
init_lit();
init_decorators();

// node_modules/lit-html/directives/style-map.js
init_lit_html();

// node_modules/lit-html/directive.js
var t4 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e5 = (t) => (...e) => ({ _$litDirective$: t, values: e });

class i5 {
  constructor(t) {}
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, i) {
    this._$Ct = t, this._$AM = e, this._$Ci = i;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
}

// node_modules/lit-html/directives/style-map.js
var n5 = "important";
var i6 = " !" + n5;
var o6 = e5(class extends i5 {
  constructor(t) {
    if (super(t), t.type !== t4.ATTRIBUTE || t.name !== "style" || t.strings?.length > 2)
      throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return Object.keys(t).reduce((e, r) => {
      const s = t[r];
      return s == null ? e : e + `${r = r.includes("-") ? r : r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s};`;
    }, "");
  }
  update(e, [r]) {
    const { style: s } = e.element;
    if (this.ft === undefined)
      return this.ft = new Set(Object.keys(r)), this.render(r);
    for (const t of this.ft)
      r[t] == null && (this.ft.delete(t), t.includes("-") ? s.removeProperty(t) : s[t] = null);
    for (const t in r) {
      const e = r[t];
      if (e != null) {
        this.ft.add(t);
        const r = typeof e == "string" && e.endsWith(i6);
        t.includes("-") || r ? s.setProperty(t, r ? e.slice(0, -11) : e, r ? n5 : "") : s[t] = e;
      }
    }
    return T;
  }
});
// src/components/media-player.ts
init_lit();

// node_modules/lit-html/directives/class-map.js
init_lit_html();
var e6 = e5(class extends i5 {
  constructor(t) {
    if (super(t), t.type !== t4.ATTRIBUTE || t.name !== "class" || t.strings?.length > 2)
      throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return " " + Object.keys(t).filter((s) => t[s]).join(" ") + " ";
  }
  update(s, [i]) {
    if (this.st === undefined) {
      this.st = new Set, s.strings !== undefined && (this.nt = new Set(s.strings.join(" ").split(/\s/).filter((t) => t !== "")));
      for (const t in i)
        i[t] && !this.nt?.has(t) && this.st.add(t);
      return this.render(i);
    }
    const r = s.element.classList;
    for (const t of this.st)
      t in i || (r.remove(t), this.st.delete(t));
    for (const t in i) {
      const s = !!i[t];
      s === this.st.has(t) || this.nt?.has(t) || (s ? (r.add(t), this.st.add(t)) : (r.remove(t), this.st.delete(t)));
    }
    return T;
  }
});
// src/lib/event-detection.ts
init_action_handler();
var LONG_PRESS_DELAY = 500;
var DOUBLE_TAP_DELAY = 250;

class EventDetectionDirective extends i5 {
  constructor(partInfo) {
    super(partInfo);
    this.lastTapTime = 0;
    this.holdTriggered = false;
    this.boundHandlers = {};
    if (partInfo.type !== t4.ELEMENT) {
      throw new Error("The `eventDetection` directive can only be used on elements.");
    }
  }
  render(_config) {
    return;
  }
  update(part, [config]) {
    const element = part.element;
    this.abortController?.abort();
    this.abortController = new AbortController;
    const { signal } = this.abortController;
    if (!(config.tap || config.hold || config.doubleTap))
      return;
    this.boundHandlers.tap = config.tap ? (ev, target) => executeAction({
      action: config.tap,
      actionType: "tap",
      context: config.context,
      data: { popupItem: config.popupItem, route: config.route },
      target: target ?? ev.currentTarget
    }) : undefined;
    this.boundHandlers.hold = config.hold ? (ev, target) => executeAction({
      action: config.hold,
      actionType: "hold",
      context: config.context,
      data: { popupItem: config.popupItem, route: config.route },
      target: target ?? ev.currentTarget
    }) : undefined;
    this.boundHandlers.doubleTap = config.doubleTap ? (ev, target) => executeAction({
      action: config.doubleTap,
      actionType: "double_tap",
      context: config.context,
      data: { popupItem: config.popupItem, route: config.route },
      target: target ?? ev.currentTarget
    }) : undefined;
    if (this.boundHandlers.hold) {
      const startHold = (ev) => {
        const targetElement = ev.currentTarget;
        this.holdTriggered = false;
        clearTimeout(this.holdTimeout);
        this.holdTimeout = window.setTimeout(() => {
          this.holdTriggered = true;
          this.boundHandlers.hold?.(ev, targetElement);
        }, LONG_PRESS_DELAY);
      };
      const cancelHold = () => {
        if (this.holdTimeout) {
          clearTimeout(this.holdTimeout);
          this.holdTimeout = undefined;
        }
      };
      element.addEventListener("pointerdown", startHold, { signal });
      element.addEventListener("pointerup", cancelHold, { signal });
      element.addEventListener("pointercancel", cancelHold, { signal });
      element.addEventListener("pointerleave", cancelHold, { signal });
    }
    if (this.boundHandlers.tap || this.boundHandlers.doubleTap) {
      element.addEventListener("click", (ev) => this.handleClick(ev, DOUBLE_TAP_DELAY), { signal });
    }
  }
  handleClick(ev, doubleTapDelay) {
    if (this.holdTriggered)
      return;
    const targetElement = ev.currentTarget;
    const now = Date.now();
    const delta = now - this.lastTapTime;
    this.lastTapTime = now;
    const hasDoubleTap = !!this.boundHandlers.doubleTap;
    const hasTap = !!this.boundHandlers.tap;
    if (hasDoubleTap && delta < doubleTapDelay) {
      clearTimeout(this.clickTimeout);
      this.lastTapTime = 0;
      this.boundHandlers.doubleTap?.(ev, targetElement);
      return;
    }
    if (hasTap) {
      if (hasDoubleTap) {
        clearTimeout(this.clickTimeout);
        this.clickTimeout = window.setTimeout(() => {
          this.boundHandlers.tap?.(ev, targetElement);
        }, doubleTapDelay);
      } else {
        this.boundHandlers.tap?.(ev, targetElement);
      }
    }
  }
  disconnected() {
    this.abortController?.abort();
  }
}
var eventDetection = e5(EventDetectionDirective);

// src/components/media-player.ts
init_types();
init_utils();
var CAROUSEL_GAP = 12;

class MediaPlayer {
  constructor(_navbarCard) {
    this._navbarCard = _navbarCard;
    this._activeIndex = 0;
    this._trackPointerId = null;
    this._dragStartX = 0;
    this._dragOffset = 0;
    this._isDragging = false;
    this.isVisible = () => {
      const config = this._navbarCard.config?.media_player;
      const players = config?.players ?? [];
      if (players.length === 0)
        return { visible: false };
      if (config?.show != null) {
        const widgetVisible = processTemplate(this._navbarCard._hass, this._navbarCard, config.show);
        if (!widgetVisible)
          return { visible: false };
      }
      for (const player of players) {
        const result = this._isPlayerVisible(player);
        if (result.visible || result.error)
          return result;
      }
      return { visible: false };
    };
    this.render = (options) => {
      const { visible } = this.isVisible();
      if (!visible)
        return x``;
      const allPlayers = this._navbarCard.config?.media_player?.players ?? [];
      const visiblePlayers = allPlayers.filter((p) => this._isPlayerVisible(p).visible);
      this._activeIndex = Math.max(0, Math.min(this._activeIndex, visiblePlayers.length - 1));
      if (visiblePlayers.length <= 1) {
        return this._renderSingle(visiblePlayers[0], options);
      }
      return this._renderCarousel(visiblePlayers, options);
    };
    this._handlePlayPause = (e, entity) => {
      e.preventDefault();
      e.stopPropagation();
      const state = this._navbarCard._hass.states[entity];
      if (!state)
        return;
      const action = state.state === "playing" ? "media_pause" : "media_play";
      this._navbarCard._hass.callService("media_player", action, {
        entity_id: entity
      });
    };
    this._handleSkipNext = (e, entity) => {
      e.preventDefault();
      e.stopPropagation();
      this._navbarCard._hass.callService("media_player", "media_next_track", {
        entity_id: entity
      });
    };
    this._onPointerDown = (e) => {
      if (e.button !== 0)
        return;
      this._trackPointerId = e.pointerId;
      this._dragStartX = e.clientX;
      this._dragOffset = 0;
      this._isDragging = false;
    };
    this._onPointerMove = (e) => {
      if (e.pointerId !== this._trackPointerId)
        return;
      const dx = e.clientX - this._dragStartX;
      if (!this._isDragging) {
        if (Math.abs(dx) < 10)
          return;
        this._isDragging = true;
        e.currentTarget.setPointerCapture(e.pointerId);
      }
      e.preventDefault();
      const count = this._navbarCard.config?.media_player?.players?.length ?? 0;
      const atEdge = this._activeIndex === 0 && dx > 0 || this._activeIndex === count - 1 && dx < 0;
      this._dragOffset = atEdge ? dx * 0.2 : dx;
      this._navbarCard.requestUpdate();
    };
    this._onPointerUp = (e) => {
      if (e.pointerId !== this._trackPointerId)
        return;
      this._trackPointerId = null;
      if (!this._isDragging)
        return;
      const el = e.currentTarget;
      el.releasePointerCapture(e.pointerId);
      const threshold = el.offsetWidth * 0.3;
      const count = this._navbarCard.config?.media_player?.players?.length ?? 0;
      if (this._dragOffset < -threshold && this._activeIndex < count - 1) {
        this._activeIndex++;
      } else if (this._dragOffset > threshold && this._activeIndex > 0) {
        this._activeIndex--;
      }
      this._dragOffset = 0;
      this._isDragging = false;
      this._navbarCard.requestUpdate();
    };
    this._onPointerCancel = (e) => {
      if (e.pointerId !== this._trackPointerId)
        return;
      this._trackPointerId = null;
      this._isDragging = false;
      this._dragOffset = 0;
      this._navbarCard.requestUpdate();
    };
  }
  get desktop_position() {
    return this._navbarCard.config?.media_player?.desktop_position ?? DEFAULT_NAVBAR_CONFIG.media_player.desktop_position;
  }
  _isPlayerVisible(player) {
    const entity = this._resolveEntity(player);
    const state = this._navbarCard._hass.states[entity ?? ""];
    if (!(state && entity)) {
      return { error: `Entity not found "${entity}"`, visible: true };
    }
    if (player.show != null) {
      return {
        visible: processTemplate(this._navbarCard._hass, this._navbarCard, player.show)
      };
    }
    return { visible: ["playing", "paused"].includes(state.state) };
  }
  _resolveEntity(player) {
    return processTemplate(this._navbarCard._hass, this._navbarCard, player.entity);
  }
  _resolveIcon(player) {
    return player.icon ? processTemplate(this._navbarCard._hass, this._navbarCard, player.icon) : null;
  }
  _resolveTitle(player, state) {
    return player.title ? processTemplate(this._navbarCard._hass, this._navbarCard, player.title) : state.attributes.media_title ?? "";
  }
  _resolveSubtitle(player, state) {
    return player.subtitle ? processTemplate(this._navbarCard._hass, this._navbarCard, player.subtitle) : state.attributes.media_artist ?? "";
  }
  _renderSingle(player, options) {
    const entity = this._resolveEntity(player);
    const state = this._navbarCard._hass.states[entity ?? ""];
    if (!(state && entity)) {
      return x`<ha-card class="media-player error">
        <ha-alert alert-type="error">Entity not found "${entity}"</ha-alert>
      </ha-card>`;
    }
    const deviceClass = this._navbarCard.isDesktop ? "desktop" : "mobile";
    return x`
      <ha-card
        class="${e6({
      "media-player": true,
      "position-absolute": !options.isInsideNavbar,
      [(this.desktop_position ?? DEFAULT_NAVBAR_CONFIG.media_player.desktop_position).toString()]: true,
      [deviceClass]: true
    })}"
        ${eventDetection({
      context: this._navbarCard,
      doubleTap: player.double_tap_action,
      hold: player.hold_action,
      tap: player.tap_action ?? { action: "more-info", entity }
    })}>
        ${this._renderCardContent(player, entity, state)}
      </ha-card>
    `;
  }
  _renderCarousel(players, options) {
    const deviceClass = this._navbarCard.isDesktop ? "desktop" : "mobile";
    const pct = -(this._activeIndex * 100);
    const gapPx = -(this._activeIndex * CAROUSEL_GAP) + this._dragOffset;
    const transition = this._isDragging ? "none" : "transform 0.3s ease-out";
    const transform = `translateX(calc(${pct}% + ${gapPx}px))`;
    return x`
      <div
        class="${e6({
      "media-player-carousel": true,
      "position-absolute": !options.isInsideNavbar,
      [(this.desktop_position ?? DEFAULT_NAVBAR_CONFIG.media_player.desktop_position).toString()]: true,
      [deviceClass]: true
    })}">
        <div
          class="media-player-viewport"
          @pointerdown=${this._onPointerDown}
          @pointermove=${this._onPointerMove}
          @pointerup=${this._onPointerUp}
          @pointercancel=${this._onPointerCancel}>
          <div
            class="media-player-track"
            style="transform: ${transform}; transition: ${transition}">
            ${players.map((p) => this._renderSlide(p))}
          </div>
        </div>
        <div class="media-player-dots">
          ${players.map((_, i) => x`<span
                class="${e6({
      active: i === this._activeIndex,
      "media-player-dot": true
    })}"></span>`)}
        </div>
      </div>
    `;
  }
  _renderSlide(player) {
    const entity = this._resolveEntity(player);
    const state = this._navbarCard._hass.states[entity ?? ""];
    if (!(state && entity)) {
      return x`<ha-card class="media-player error">
        <ha-alert alert-type="error">Entity not found "${entity}"</ha-alert>
      </ha-card>`;
    }
    return x`
      <ha-card
        class="media-player"
        ${eventDetection({
      context: this._navbarCard,
      doubleTap: player.double_tap_action,
      hold: player.hold_action,
      tap: player.tap_action ?? { action: "more-info", entity }
    })}>
        ${this._renderCardContent(player, entity, state)}
      </ha-card>
    `;
  }
  _renderCardContent(player, entity, state) {
    const image = state.attributes.entity_picture_local ?? state.attributes.entity_picture;
    const pos = state.attributes.media_position;
    const dur = state.attributes.media_duration;
    const progress = pos != null && dur != null && dur > 0 ? pos / dur : null;
    const icon = this._resolveIcon(player);
    const title = this._resolveTitle(player, state);
    const subtitle = this._resolveSubtitle(player, state);
    const albumBg = this._navbarCard.config?.media_player?.album_cover_background ?? DEFAULT_NAVBAR_CONFIG.media_player.album_cover_background;
    return x`
      <div
        class="media-player-bg"
        style=${albumBg ? `background-image: url(${image});` : ""}></div>
      ${progress != null ? x`<div class="media-player-progress-bar">
              <div
                class="media-player-progress-bar-fill"
                style="width: ${progress * 100}%"></div>
            </div>` : x``}
      ${image && !icon ? x`<img
              class="media-player-image"
              src=${image}
              alt=${title || ""} />` : x`<ha-icon
              class="media-player-image media-player-icon-fallback"
              icon=${icon ?? "mdi:music"}></ha-icon>`}
      <div class="media-player-info">
        <span class="media-player-title">${title || ""}</span>
        <span class="media-player-artist">${subtitle || ""}</span>
      </div>
      <button
        class="navbar-icon-button media-player-button media-player-button-play-pause primary"
        appearance="accent"
        variant="brand"
        @click=${(e) => this._handlePlayPause(e, entity)}
        @pointerdown=${preventEventDefault}
        @pointerup=${preventEventDefault}>
        <ha-icon
          icon=${state.state === "playing" ? "mdi:pause" : "mdi:play"}></ha-icon>
      </button>
      <button
        class="navbar-icon-button media-player-button media-player-button-skip"
        appearance="plain"
        variant="neutral"
        @click=${(e) => this._handleSkipNext(e, entity)}
        @pointerdown=${preventEventDefault}
        @pointerup=${preventEventDefault}>
        <ha-icon icon="mdi:skip-next"></ha-icon>
      </button>
    `;
  }
}

// src/components/navbar/badge/badge.ts
init_lit();

// src/components/color.ts
var hexToDecimal = (hex) => parseInt(hex, 16);
var decimalToHex = (decimal) => decimal.toString(16).padStart(2, "0");
var isValidInt = (value) => {
  try {
    const parsedValue = parseInt(value, 10);
    if (Number.isNaN(parsedValue))
      return false;
  } catch {
    return false;
  }
  return true;
};
var hue2rgb = (p, q, t) => {
  let adjustedT = t;
  if (adjustedT < 0)
    adjustedT += 1;
  if (adjustedT > 1)
    adjustedT -= 1;
  if (adjustedT < 1 / 6)
    return p + (q - p) * 6 * adjustedT;
  if (adjustedT < 1 / 2)
    return q;
  if (adjustedT < 2 / 3)
    return p + (q - p) * (2 / 3 - adjustedT) * 6;
  return p;
};
var complementaryRGBColor = (r, g, b) => {
  if (Math.max(r, g, b) === Math.min(r, g, b)) {
    return { b: 255 - b, g: 255 - g, r: 255 - r };
  }
  let rNorm = r / 255;
  let gNorm = g / 255;
  let bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const d = max - min;
  const l = (max + min) / 2;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  switch (max) {
    case rNorm:
      h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
      break;
    case gNorm:
      h = (bNorm - rNorm) / d + 2;
      break;
    case bNorm:
      h = (rNorm - gNorm) / d + 4;
      break;
  }
  h = Math.round(h * 60 + 180) % 360 / 360;
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  rNorm = hue2rgb(p, q, h + 1 / 3);
  gNorm = hue2rgb(p, q, h);
  bNorm = hue2rgb(p, q, h - 1 / 3);
  return {
    b: Math.round(bNorm * 255),
    g: Math.round(gNorm * 255),
    r: Math.round(rNorm * 255)
  };
};

class Color {
  static colorCache = new Map;
  constructor(data) {
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 255;
    if (data instanceof Color) {
      this.r = data.r;
      this.g = data.g;
      this.b = data.b;
      this.a = data.a;
    } else if (typeof data == "string") {
      if (data.startsWith("#")) {
        this._parseHexString(data);
      } else if (data.startsWith("rgb(")) {
        this._parseRGBString(data);
      } else if (data.startsWith("rgba(")) {
        this._parseRGBAString(data);
      } else if (isValidInt(data)) {
        this._parseHexString(`#${data}`);
      } else {
        try {
          this._readColorFromDOM(data);
        } catch {
          throw Error(`Format not supported for color string: "${data}"`);
        }
      }
    } else if (Array.isArray(data)) {
      this._parseColorArray(data);
    } else {
      throw Error(`Format not supported for color: "${typeof data}"`);
    }
  }
  static from(color) {
    const normalizedColor = color.toLowerCase().trim();
    const cached = Color.colorCache.get(normalizedColor);
    if (cached) {
      return cached;
    }
    const newColor = new Color(normalizedColor);
    Color.colorCache.set(normalizedColor, newColor);
    return newColor;
  }
  _readColorFromDOM(color) {
    const d = document.createElement("div");
    d.style.color = color;
    document.body.appendChild(d);
    const parsedColor = window.getComputedStyle(d).color;
    this._parseRGBString(parsedColor);
  }
  _parseColorArray(data) {
    const colorArray = data.map((x) => parseInt(x, 10));
    if (colorArray.length < 3) {
      throw Error(`Invalid array format color string: "${data}"
Supported formats: [r,g,b] | [r,g,b,a]`);
    }
    this.r = colorArray[0];
    this.g = colorArray[1];
    this.b = colorArray[2];
    this.a = colorArray.length > 3 ? colorArray[3] : this.a;
  }
  _parseRGBString(data) {
    const colorString = data.replace("rgb(", "").replace(")", "");
    const colorComponents = colorString.split(",");
    if (data.indexOf("rgb(") == -1 || colorComponents.length != 3) {
      throw Error(`Invalid 'rgb(r,g,b)' format for color string: "${data}"`);
    }
    this.r = parseInt(colorComponents[0], 10);
    this.g = parseInt(colorComponents[1], 10);
    this.b = parseInt(colorComponents[2], 10);
  }
  _parseRGBAString(data) {
    const colorString = data.replace("rgba(", "").replace(")", "");
    const colorComponents = colorString.split(",");
    if (data.indexOf("rgba(") == -1 || colorComponents.length != 4) {
      throw Error(`Invalid 'rgba(r,g,b,a)' format for color string: "${data}"`);
    }
    this.r = parseInt(colorComponents[0], 10);
    this.g = parseInt(colorComponents[1], 10);
    this.b = parseInt(colorComponents[2], 10);
    this.a = parseInt(colorComponents[3], 10);
  }
  _parseHexString(data) {
    const colorString = data.replace("#", "");
    switch (colorString.length) {
      case 3:
        this.r = hexToDecimal(colorString.slice(0, 1) + colorString.slice(0, 1));
        this.g = hexToDecimal(colorString.slice(1, 2) + colorString.slice(1, 2));
        this.b = hexToDecimal(colorString.slice(2, 3) + colorString.slice(2, 3));
        break;
      case 6:
        this.r = hexToDecimal(colorString.slice(0, 2));
        this.g = hexToDecimal(colorString.slice(2, 4));
        this.b = hexToDecimal(colorString.slice(4, 6));
        break;
      case 8:
        this.r = hexToDecimal(colorString.slice(0, 2));
        this.g = hexToDecimal(colorString.slice(2, 4));
        this.b = hexToDecimal(colorString.slice(4, 6));
        this.a = hexToDecimal(colorString.slice(6, 8));
        break;
      default:
        throw Error(`Invalid hex format for color string: "${data}"`);
    }
  }
  opacity(opacity) {
    this.a = Math.max(0, Math.min(opacity * 255, 255));
    return this;
  }
  complementary() {
    const { r, g, b } = complementaryRGBColor(this.r, this.g, this.b);
    return new Color([r, g, b, this.a]);
  }
  shade(percent) {
    let R = this.r * (100 + percent) / 100;
    let G = this.g * (100 + percent) / 100;
    let B = this.b * (100 + percent) / 100;
    R = R < 255 ? R : 255;
    G = G < 255 ? G : 255;
    B = B < 255 ? B : 255;
    R = Math.round(R);
    G = Math.round(G);
    B = Math.round(B);
    const brightness = Math.round((R * 299 + G * 587 + B * 114) / 1000);
    if (brightness == 0)
      return this.complementary();
    if (brightness < 80 && percent < 100)
      return this.shade(percent + 50);
    return new Color([R, G, B]);
  }
  contrastingColor() {
    return new Color(this.luma() >= 165 ? "#000" : "#fff");
  }
  luma() {
    return 0.2126 * this.r + 0.7152 * this.g + 0.0722 * this.b;
  }
  rgb() {
    return { b: this.b, g: this.g, r: this.r };
  }
  rgba() {
    return { a: this.a, b: this.b, g: this.g, r: this.r };
  }
  rgbaString() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }
  hex() {
    return `#${decimalToHex(this.r)}${decimalToHex(this.g)}${decimalToHex(this.b)}`;
  }
  hexa() {
    return `#${decimalToHex(this.a)}${decimalToHex(this.r)}${decimalToHex(this.g)}${decimalToHex(this.b)}`;
  }
  array() {
    return [this.r, this.g, this.b, this.a];
  }
}
var option = new Option;
var isColor = (value) => {
  if (typeof value !== "string")
    return false;
  option.style.color = value;
  return option.style.color !== "";
};
// src/components/navbar/badge/badge.ts
init_utils();

class Badge {
  constructor(_navbarCard, _route) {
    this._navbarCard = _navbarCard;
    this._route = _route;
  }
  get show() {
    const badge = this._route.data.badge;
    if (!badge)
      return false;
    if (badge.show) {
      return processTemplate(this._navbarCard._hass, this._navbarCard, badge.show) ?? false;
    }
    if (badge.template) {
      return processBadgeTemplate(this._navbarCard._hass, badge.template);
    }
    return false;
  }
  get count() {
    return processTemplate(this._navbarCard._hass, this._navbarCard, this._route.data.badge?.count) ?? null;
  }
  get icon() {
    const icon = processTemplate(this._navbarCard._hass, this._navbarCard, this._route.data.badge?.icon);
    return typeof icon === "string" && icon.trim() !== "" ? icon.trim() : null;
  }
  get backgroundColor() {
    return processTemplate(this._navbarCard._hass, this._navbarCard, this._route.data.badge?.color) ?? "red";
  }
  get textColor() {
    return processTemplate(this._navbarCard._hass, this._navbarCard, this._route.data.badge?.text_color) ?? null;
  }
  get iconColor() {
    return processTemplate(this._navbarCard._hass, this._navbarCard, this._route.data.badge?.icon_color) ?? null;
  }
  render() {
    if (!this.show)
      return E;
    const icon = this.icon;
    const count = this.count;
    const backgroundColor = this.backgroundColor;
    const hasIcon = icon != null;
    const hasCounter = !hasIcon && count != null;
    const configuredForegroundColor = hasIcon ? this.iconColor ?? this.textColor : this.textColor;
    const foregroundColor = configuredForegroundColor ?? Color.from(backgroundColor).contrastingColor().hex();
    return x`
      <div
        class=${e6({
      active: this._route.selected,
      badge: true,
      "with-counter": hasCounter,
      "with-icon": hasIcon
    })}
        style=${o6({
      backgroundColor,
      color: foregroundColor
    })}>
        ${hasIcon ? x`<ha-icon class="badge-icon" .icon=${icon}></ha-icon>` : count ?? E}
      </div>
    `;
  }
}
// src/components/navbar/icon/icon.ts
init_lit();
init_utils();

class Icon {
  constructor(_navbarCard, _route) {
    this._navbarCard = _navbarCard;
    this._route = _route;
  }
  get icon() {
    return processTemplate(this._navbarCard._hass, this._navbarCard, this._route.data.icon);
  }
  get image() {
    return processTemplate(this._navbarCard._hass, this._navbarCard, this._route.data.image);
  }
  get iconSelected() {
    return processTemplate(this._navbarCard._hass, this._navbarCard, this._route.data.icon_selected);
  }
  get imageSelected() {
    return processTemplate(this._navbarCard._hass, this._navbarCard, this._route.data.image_selected);
  }
  get iconColor() {
    try {
      const rawValue = processTemplate(this._navbarCard._hass, this._navbarCard, this._route.data.icon_color);
      if (!isColor(rawValue))
        return null;
      return rawValue;
    } catch (_err) {
      return null;
    }
  }
  render() {
    const isSelected = this._route.selected;
    const resolvedImage = this.image;
    const resolvedImageSelected = this.imageSelected;
    const resolvedIcon = this.icon;
    const resolvedIconSelected = this.iconSelected;
    const resolvedIconColor = this.iconColor;
    if (!(resolvedImage || resolvedIcon)) {
      return x``;
    }
    return resolvedImage ? x` <img
          class=${e6({
      active: isSelected,
      image: true
    })}
          src="${isSelected && resolvedImageSelected ? resolvedImageSelected : resolvedImage}"
          alt="${this._route.label || ""}" />` : x` <ha-icon
          class=${e6({
      active: isSelected,
      icon: true
    })}
          style="--icon-primary-color: ${resolvedIconColor ?? "inherit"}"
          icon="${isSelected && resolvedIconSelected ? resolvedIconSelected : resolvedIcon}"></ha-icon>`;
  }
}
// src/components/navbar/route/base-route.ts
init_utils();

class BaseRoute {
  constructor(_navbarCard, data) {
    this._navbarCard = _navbarCard;
    this.data = data;
    this._shouldShowLabels = () => {
      if (this instanceof PopupItem && this._navbarCard.config?.layout?.popup_style === "panel") {
        return true;
      }
      const config = this._navbarCard.isDesktop ? this._navbarCard.config?.desktop?.show_labels : this._navbarCard.config?.mobile?.show_labels;
      if (typeof config === "boolean")
        return config;
      return config === "popup_only" && this instanceof PopupItem || config === "routes_only" && !(this instanceof PopupItem);
    };
    this._shouldShowLabelBackground = () => {
      const enabled = this._navbarCard.isDesktop ? this._navbarCard.config?.desktop?.show_popup_label_backgrounds : this._navbarCard.config?.mobile?.show_popup_label_backgrounds;
      return !!enabled;
    };
  }
  get url() {
    return this.data.url;
  }
  get icon() {
    return this._iconInstance ??= new Icon(this._navbarCard, this);
  }
  get badge() {
    return this._badgeInstance ??= new Badge(this._navbarCard, this);
  }
  get selected_color() {
    return processTemplate(this._navbarCard._hass, this._navbarCard, this.data.selected_color, { returnNullIfInvalid: true });
  }
  get label() {
    if (!this._shouldShowLabels())
      return null;
    return processTemplate(this._navbarCard._hass, this._navbarCard, this.data.label) ?? " ";
  }
  get hidden() {
    return processTemplate(this._navbarCard._hass, this._navbarCard, this.data.hidden);
  }
  get selected() {
    return this.data.selected != null ? processTemplate(this._navbarCard._hass, this._navbarCard, this.data.selected) : matchesCurrentNavigationPath(this.url);
  }
  get tap_action() {
    return this.data.tap_action;
  }
  get hold_action() {
    return this.data.hold_action;
  }
  get double_tap_action() {
    return this.data.double_tap_action;
  }
}
// src/components/navbar/route/popup/popup.ts
init_lit();
init_types();

class Popup {
  constructor(_navbarCard, _popupItemData) {
    this._navbarCard = _navbarCard;
    this._popupItems = [];
    this._shouldShowLabelBackground = () => {
      const enabled = this._navbarCard.isDesktop ? this._navbarCard.config?.desktop?.show_popup_label_backgrounds : this._navbarCard.config?.mobile?.show_popup_label_backgrounds;
      return !!enabled;
    };
    this._onPopupKeyDownListener = (e) => {
      if (e.key === "Escape" && this._navbarCard.focusedPopup) {
        e.preventDefault();
        this.close();
      }
    };
    _popupItemData.forEach((_itemData, _index) => {
      this._popupItems.push(new PopupItem(this._navbarCard, this, _itemData, _index));
    });
  }
  get items() {
    return this._popupItems;
  }
  get backdrop() {
    return this._navbarCard.shadowRoot?.querySelector(".navbar-popup-backdrop") ?? null;
  }
  open(target) {
    const anchorRect = target.getBoundingClientRect();
    const { style, labelPositionClassName, popupDirectionClassName } = this._getPopupStyles(anchorRect, !this._navbarCard.isDesktop ? "mobile" : this._navbarCard.config?.desktop?.position ?? "bottom" /* bottom */);
    const popupStaggerStep = this._getPopupStaggerStepSeconds(this.items.length);
    this._navbarCard.focusedPopup = x`
      <div class="navbar-popup-backdrop"></div>
      <div
        class=${e6({
      "navbar-popup": true,
      [popupDirectionClassName]: true,
      [labelPositionClassName]: true,
      desktop: this._navbarCard.isDesktop ?? false,
      mobile: !this._navbarCard.isDesktop,
      popuplabelbackground: this._shouldShowLabelBackground()
    })}
        style="${style}; --popup-item-stagger-step: ${popupStaggerStep}s;">
        ${this.items.map((popupItem) => popupItem.render(popupDirectionClassName, labelPositionClassName)).filter((x) => x != null)}
      </div>
    `;
    requestAnimationFrame(() => {
      const popup = this._navbarCard.shadowRoot?.querySelector(".navbar-popup");
      const backdrop = this._navbarCard.shadowRoot?.querySelector(".navbar-popup-backdrop");
      if (popup && backdrop) {
        popup.classList.add("visible");
        backdrop.classList.add("visible");
      }
    });
    window.addEventListener("keydown", this._onPopupKeyDownListener);
    setTimeout(() => {
      if (this.backdrop) {
        this._backdropClickListener = (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.close();
        };
        this.backdrop.addEventListener("click", this._backdropClickListener);
      }
    }, 400);
  }
  close() {
    const popup = this._navbarCard.shadowRoot?.querySelector(".navbar-popup");
    if (this._backdropClickListener && this.backdrop) {
      this.backdrop.removeEventListener("click", this._backdropClickListener);
      this._backdropClickListener = undefined;
    }
    if (popup && this.backdrop) {
      popup.classList.remove("visible");
      this.backdrop.classList.remove("visible");
      setTimeout(() => {
        this._navbarCard.focusedPopup = null;
      }, 200);
    } else {
      this._navbarCard.focusedPopup = null;
    }
    window.removeEventListener("keydown", this._onPopupKeyDownListener);
  }
  _getPopupStaggerStepSeconds(itemsCount) {
    const maxTotalStaggerDelaySeconds = 0.25;
    const minStepSeconds = 0.01;
    const maxStepSeconds = 0.05;
    const staggeredTransitions = Math.max(itemsCount - 1, 1);
    const dynamicStep = maxTotalStaggerDelaySeconds / staggeredTransitions;
    return Math.max(minStepSeconds, Math.min(maxStepSeconds, dynamicStep));
  }
  _getPopupStyles(anchorRect, position) {
    const { top, left, x, width, height } = anchorRect;
    const windowWidth = window.innerWidth;
    const positions = {
      bottom: null,
      left: {
        dir: "open-right",
        label: "label-bottom",
        style: i`
          top: ${top}px;
          left: ${x + width}px;
        `
      },
      mobile: null,
      right: {
        dir: "open-left",
        label: "label-bottom",
        style: i`
          top: ${top}px;
          right: ${windowWidth - x}px;
        `
      },
      top: {
        dir: "open-bottom",
        label: "label-right",
        style: i`
          top: ${top + height}px;
          left: ${x}px;
        `
      }
    };
    if (positions[position]) {
      return {
        labelPositionClassName: positions[position].label,
        popupDirectionClassName: positions[position].dir,
        style: positions[position].style
      };
    }
    const isRightSide = x > windowWidth / 2;
    return isRightSide ? {
      labelPositionClassName: "label-left",
      popupDirectionClassName: "open-up",
      style: i`
            top: ${top}px;
            right: ${windowWidth - x - width}px;
          `
    } : {
      labelPositionClassName: "label-right",
      popupDirectionClassName: "open-up",
      style: i`
            top: ${top}px;
            left: ${left}px;
          `
    };
  }
}
// src/components/navbar/route/popup/popup-item.ts
init_lit();
class PopupItem extends BaseRoute {
  constructor(_navbarCard, _parentPopup, _data, _index) {
    super(_navbarCard, _data);
    this._parentPopup = _parentPopup;
    this._index = _index;
  }
  closeParentPopup() {
    this._parentPopup.close();
  }
  render(popupDirectionClassName, labelPositionClassName) {
    if (this.hidden)
      return null;
    const showLabelBackground = this._shouldShowLabelBackground();
    return x`<div
      class=${e6({
      "popup-item": true,
      [popupDirectionClassName]: true,
      [labelPositionClassName]: true,
      active: this.selected,
      popuplabelbackground: showLabelBackground
    })}
      style=${o6({
      "--index": this._index
    })}
      ${eventDetection({
      context: this._navbarCard,
      doubleTap: this.double_tap_action,
      hold: this.hold_action,
      popupItem: this,
      tap: this.tap_action ?? {
        action: "navigate",
        navigation_path: this.url ?? ""
      }
    })}>
      <div
        class=${e6({
      button: true,
      popuplabelbackground: showLabelBackground
    })}>
        ${this.icon.render()}
        <md-ripple></md-ripple>
        ${this.badge.render()}
        ${showLabelBackground && this.label ? x`<div class="label">${this.label}</div>` : x``}
      </div>
      ${!showLabelBackground && this.label ? x`<div class="label">${this.label}</div>` : x``}
    </div>`;
  }
}
// src/components/navbar/route/route.ts
init_lit();
init_utils();

class Route extends BaseRoute {
  constructor(_navbarCard, _routeData) {
    super(_navbarCard, _routeData);
    this._routeData = _routeData;
    this._validateRoute();
  }
  get popup() {
    return this._popupInstance ??= new Popup(this._navbarCard, processTemplate(this._navbarCard._hass, this._navbarCard, this._routeData.popup) ?? this._routeData.popup ?? this._routeData.submenu ?? []);
  }
  get isSelfOrChildActive() {
    if (this._navbarCard.config?.layout?.reflect_child_state && !this.selected) {
      return this.popup.items.some((item) => item.selected);
    }
    return this.selected;
  }
  render() {
    if (this.hidden)
      return null;
    const isActive = this.isSelfOrChildActive;
    return x`
      <div
        class=${e6({
      active: isActive,
      route: true
    })}
        style=${o6({
      "--navbar-primary-color": this.selected_color ?? null
    })}
        ${eventDetection({
      context: this._navbarCard,
      doubleTap: this.double_tap_action,
      hold: this.hold_action,
      route: this,
      tap: this.tap_action ?? {
        action: "navigate",
        navigation_path: this.url ?? ""
      }
    })}>
        <div
          class=${e6({
      active: isActive,
      button: true
    })}
          style=${o6({
      "--navbar-primary-color": this.selected_color ?? null
    })}>
          ${this.icon.render()}
          <ha-ripple></ha-ripple>
          ${this.badge.render()}
        </div>
        ${this.label ? x`<div
              class=${e6({
      active: isActive,
      label: true
    })}>
              ${this.label}
            </div>` : x``}
      </div>
    `;
  }
  _validateRoute() {
    if (!(this.data.icon || this.data.image)) {
      throw new Error('Each route must have either an "icon" or "image" property configured');
    }
    if (!(this._routeData.popup || this.tap_action || this.hold_action || this.url || this.double_tap_action)) {
      throw new Error("Each route must have at least one actionable property (url, popup, tap_action, hold_action, double_tap_action)");
    }
    if (this.tap_action && !this.tap_action.action) {
      throw new Error('"tap_action" must have an "action" property');
    }
    if (this.hold_action && !this.hold_action.action) {
      throw new Error('"hold_action" must have an "action" property');
    }
    if (this.double_tap_action && !this.double_tap_action.action) {
      throw new Error('"double_tap_action" must have an "action" property');
    }
  }
}
// src/lib/scrollable.ts
var MAX_CENTER_ATTEMPTS = 40;
var CENTER_RETRY_MS = 50;
var EDGE_TOLERANCE = 2;

class ScrollableController {
  constructor(_host) {
    this._host = _host;
    this._centeredFor = null;
    this._centering = false;
    this.onScroll = (event) => {
      this.updateEdges(event.currentTarget);
    };
    _host.addController(this);
  }
  get enabled() {
    return !!this._host.config?.mobile?.scrollable && this._host.isDesktop === false && !this._host.isInEditMode;
  }
  hostConnected() {
    this._centeredFor = null;
  }
  hostUpdated() {
    if (!this.enabled)
      return;
    if (this._centering || this._centeredFor === window.location.pathname) {
      return;
    }
    this._centering = true;
    requestAnimationFrame(() => this._center());
  }
  updateEdges(bar) {
    const max = bar.scrollWidth - bar.clientWidth;
    const position = Math.abs(bar.scrollLeft);
    bar.toggleAttribute("data-fade-start", position > EDGE_TOLERANCE);
    bar.toggleAttribute("data-fade-end", position < max - EDGE_TOLERANCE);
  }
  static centerRoute(bar, route) {
    const barRect = bar.getBoundingClientRect();
    const routeRect = route.getBoundingClientRect();
    bar.scrollTo({
      behavior: "instant",
      left: bar.scrollLeft + (routeRect.left + routeRect.width / 2) - (barRect.left + barRect.width / 2)
    });
  }
  _center(attempt = 0) {
    const bar = this._host.shadowRoot?.querySelector(".navbar-card");
    const active = bar?.querySelector(".route.active");
    if (!bar || bar.clientWidth === 0) {
      if (attempt < MAX_CENTER_ATTEMPTS) {
        setTimeout(() => this._center(attempt + 1), CENTER_RETRY_MS);
      } else {
        this._centering = false;
      }
      return;
    }
    this._centering = false;
    this._centeredFor = window.location.pathname;
    if (active && bar.scrollWidth > bar.clientWidth) {
      ScrollableController.centerRoute(bar, active);
    }
    this.updateEdges(bar);
  }
}

// src/lib/autohide.ts
var HIDE_AFTER_PX = 24;
var SHOW_AFTER_PX = 12;
var TOP_ZONE_PX = 80;
var BOTTOM_ZONE_PX = 24;
var PILL_PADDING_PX = 4;
var SWALLOW_TAP_MS = 600;
var COLLAPSED_STORAGE_KEY = "navbar-card-collapsed";
var readCollapsed = () => {
  try {
    return window.localStorage.getItem(COLLAPSED_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
};
var writeCollapsed = (collapsed) => {
  try {
    if (collapsed)
      window.localStorage.setItem(COLLAPSED_STORAGE_KEY, "1");
    else
      window.localStorage.removeItem(COLLAPSED_STORAGE_KEY);
  } catch {}
};

class AutohideController {
  constructor(_host) {
    this._host = _host;
    this.away = false;
    this.collapsed = readCollapsed();
    this.pill = null;
    this._lastY = 0;
    this._travel = 0;
    this._frameRequested = false;
    this._swallowing = false;
    this.toggleCollapsed = (event) => {
      event?.stopPropagation();
      this.collapsed = !this.collapsed;
      writeCollapsed(this.collapsed);
      this._host.requestUpdate();
    };
    this.interceptTap = {
      capture: true,
      handleEvent: (event) => {
        const scrolledAway = this.isAway && (this.mode === "slide" || this.mode === "minimize");
        if (event.type === "pointerdown" && scrolledAway) {
          this._swallowing = true;
          clearTimeout(this._swallowTimer);
          this._swallowTimer = setTimeout(() => {
            this._swallowing = false;
          }, SWALLOW_TAP_MS);
          this._setAway(false);
        }
        if (this._swallowing) {
          event.stopPropagation();
          event.preventDefault();
        }
      }
    };
    this._onScroll = () => {
      if (this._frameRequested)
        return;
      this._frameRequested = true;
      requestAnimationFrame(this._handleScroll);
    };
    this._handleScroll = () => {
      this._frameRequested = false;
      const mode = this.mode;
      const y = window.scrollY;
      const delta = y - this._lastY;
      this._lastY = y;
      if (delta === 0 || mode !== "slide" && mode !== "minimize")
        return;
      if (Math.sign(delta) !== Math.sign(this._travel))
        this._travel = 0;
      this._travel += delta;
      const atTop = y < TOP_ZONE_PX;
      const atBottom = y + window.innerHeight >= document.documentElement.scrollHeight - BOTTOM_ZONE_PX;
      if (atTop || atBottom && mode === "slide")
        this._setAway(false);
      else if (this._travel > HIDE_AFTER_PX)
        this._setAway(true);
      else if (this._travel < -SHOW_AFTER_PX)
        this._setAway(false);
    };
    this._onNavigate = () => {
      this._lastY = window.scrollY;
      this._travel = 0;
      this._setAway(false);
    };
    _host.addController(this);
  }
  get mode() {
    const mode = this._host.config?.mobile?.autohide;
    if (!mode || this._host.isDesktop !== false || this._host.isInEditMode) {
      return null;
    }
    return mode;
  }
  get isAway() {
    const mode = this.mode;
    if (!mode || this._host.focusedPopup)
      return false;
    return mode === "toggle" ? this.collapsed : this.away;
  }
  hostConnected() {
    this._lastY = window.scrollY;
    this._travel = 0;
    this.away = false;
    window.addEventListener("scroll", this._onScroll, { passive: true });
    window.addEventListener("location-changed", this._onNavigate);
    window.addEventListener("popstate", this._onNavigate);
  }
  hostDisconnected() {
    window.removeEventListener("scroll", this._onScroll);
    window.removeEventListener("location-changed", this._onNavigate);
    window.removeEventListener("popstate", this._onNavigate);
    clearTimeout(this._swallowTimer);
  }
  _measurePill() {
    const bar = this._host.shadowRoot?.querySelector(".navbar-card");
    const active = bar?.querySelector(".route.active");
    if (!(bar && active))
      return null;
    if (bar.scrollWidth > bar.clientWidth) {
      ScrollableController.centerRoute(bar, active);
    }
    const barRect = bar.getBoundingClientRect();
    const routeRect = active.getBoundingClientRect();
    const inset = (value) => `${Math.max(0, value - PILL_PADDING_PX)}px`;
    const clip = [
      inset(routeRect.top - barRect.top),
      inset(barRect.right - routeRect.right),
      inset(barRect.bottom - routeRect.bottom),
      inset(routeRect.left - barRect.left)
    ].join(" ");
    const shift = barRect.left + barRect.width / 2 - (routeRect.left + routeRect.width / 2);
    return { clip, shift: `${shift}px` };
  }
  _setAway(away) {
    if (away === this.away)
      return;
    if (away && this.mode === "minimize")
      this.pill = this._measurePill();
    this.away = away;
    this._host.requestUpdate();
  }
}

// src/navbar-card.ts
init_styles();
init_types();
init_utils();
init_docs_links();
// package.json
var version = "1.7.1";

// src/navbar-card.ts
window.customCards = window.customCards || [];
window.customCards.push({
  description: "Full-width bottom nav on mobile and flexible desktop nav that can be placed on any side.",
  name: "Navbar card",
  preview: true,
  type: "navbar-card"
});

class NavbarCard extends i4 {
  constructor() {
    super(...arguments);
    this._mediaPlayer = new MediaPlayer(this);
    this._scrollable = new ScrollableController(this);
    this._autohide = new AutohideController(this);
    this._routes = [];
    this.focusedPopup = null;
    this.widgetVisibility = {};
    this._onDesktopChange = (event) => {
      this.isDesktop = event.matches;
    };
  }
  set hass(hass) {
    this._hass = hass;
    const { visible } = this._mediaPlayer.isVisible();
    const prevMediaPlayerPosition = this.widgetVisibility.media_player ?? null;
    const nextMediaPlayerPosition = visible ? this._mediaPlayer.desktop_position : null;
    if (visible) {
      this.widgetVisibility.media_player = nextMediaPlayerPosition;
    } else {
      this.widgetVisibility.media_player = null;
    }
    if (prevMediaPlayerPosition !== nextMediaPlayerPosition) {
      forceDashboardPadding({
        autoPadding: this.config?.layout?.auto_padding,
        desktop: this.config?.desktop ?? DEFAULT_NAVBAR_CONFIG.desktop,
        mobile: this.config?.mobile ?? DEFAULT_NAVBAR_CONFIG.mobile,
        widgetPositions: this.widgetVisibility
      });
    }
  }
  get isInEditMode() {
    return !!this._inEditDashboardMode || !!this._inEditCardMode || !!this._inPreviewMode;
  }
  get desktopPosition() {
    return mapStringToEnum(DesktopPosition, this.config?.desktop?.position) ?? "bottom" /* bottom */;
  }
  static getStubConfig() {
    return STUB_CONFIG;
  }
  static async getConfigElement() {
    await Promise.resolve().then(() => (init_navbar_card_editor(), {}));
    return document.createElement("navbar-card-editor");
  }
  connectedCallback() {
    super.connectedCallback();
    forceResetRipple(this);
    this._detectModes();
    this._watchDesktop();
    injectStyles(this, getDefaultStyles(), this.config?.styles ? r(this.config.styles) : i``);
    forceDashboardPadding({
      autoPadding: this.config?.layout?.auto_padding,
      desktop: this.config?.desktop ?? DEFAULT_NAVBAR_CONFIG.desktop,
      mobile: this.config?.mobile ?? DEFAULT_NAVBAR_CONFIG.mobile,
      widgetPositions: this.widgetVisibility
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this._unwatchDesktop();
    removeDashboardPadding();
    this.focusedPopup = null;
  }
  setConfig(config) {
    let mergedConfig = config;
    if (config?.template) {
      const templates = getNavbarTemplates();
      if (templates) {
        const templateConfig = templates[config.template];
        if (templateConfig) {
          mergedConfig = deepMergeKeepArrays(templateConfig, config);
        }
      } else {
        console.warn(`[navbar-card] No templates configured in this dashboard. Please refer to "templates" documentation for more information.

${DOCS_LINKS.template}
`);
      }
    }
    if (!mergedConfig.routes) {
      throw new Error('"routes" param is required for navbar card');
    }
    if (JSON.stringify(mergedConfig) === JSON.stringify(this.config))
      return;
    this._routes = mergedConfig.routes.map((route) => new Route(this, route));
    this.config = mergedConfig;
    if (this.isConnected)
      this._watchDesktop();
  }
  updated(_changedProperties) {
    super.updated(_changedProperties);
  }
  render() {
    if (!this.config || this._shouldHide())
      return x``;
    const deviceClass = this.isDesktop ? "desktop" : "mobile";
    const editClass = this.isInEditMode ? "edit-mode" : "";
    const mobileModeClass = this.config.mobile?.mode === "floating" ? "floating" : "";
    const desktopModeClass = this.isDesktop && this.config.desktop?.mode === "docked" ? "docked" : "";
    const safeAreaClass = !this.isDesktop && this.config.mobile?.safe_area ? "safe-area" : "";
    const scrollableClass = this._scrollable.enabled ? "scrollable" : "";
    const popupOpenClass = this.focusedPopup ? "popup-open" : "";
    const popupStyleClass = this.config.layout?.popup_style === "panel" ? "popup-panel" : "";
    const autohideMode = this._autohide.mode;
    const autohideClass = autohideMode ? `autohide-${autohideMode}` : "";
    const awayClass = this._autohide.isAway ? "away" : "";
    const pill = autohideMode === "minimize" ? this._autohide.pill : null;
    const shouldRenderMediaPlayerInsideNavbar = this._shouldRenderMediaPlayerInsideNavbar();
    return x`
      ${!shouldRenderMediaPlayerInsideNavbar ? this._mediaPlayer.render({
      isInsideNavbar: false
    }) : x``}
      <div
        class="navbar ${editClass} ${deviceClass} ${this.desktopPosition} ${mobileModeClass} ${desktopModeClass} ${safeAreaClass} ${autohideClass} ${awayClass} ${popupOpenClass} ${popupStyleClass}"
        style=${o6({
      "--navbar-pill-clip": pill?.clip ?? null,
      "--navbar-pill-shift": pill?.shift ?? null
    })}
        @pointerdown=${this._autohide.interceptTap}
        @pointerup=${this._autohide.interceptTap}
        @click=${this._autohide.interceptTap}>
        ${autohideMode === "toggle" ? this._renderAutohideToggle() : x``}
        ${shouldRenderMediaPlayerInsideNavbar ? this._mediaPlayer.render({
      isInsideNavbar: true
    }) : x``}
        <ha-card
          class="navbar-card ${deviceClass} ${this.desktopPosition} ${mobileModeClass} ${desktopModeClass} ${scrollableClass}"
          @scroll=${this._scrollable.onScroll}>
          ${this._routes.map((route) => route.render()).filter(Boolean)}
        </ha-card>
      </div>
      ${this.focusedPopup ?? x``}
    `;
  }
  _renderAutohideToggle() {
    const collapsed = this._autohide.collapsed;
    return x`
      <button
        type="button"
        class="autohide-tab"
        aria-expanded=${!collapsed}
        aria-label=${collapsed ? "Show navigation" : "Hide navigation"}
        @click=${this._autohide.toggleCollapsed}>
        <ha-icon icon="mdi:chevron-down"></ha-icon>
      </button>
    `;
  }
  _shouldRenderMediaPlayerInsideNavbar() {
    if (!this.isDesktop)
      return true;
    if (this.isInEditMode)
      return true;
    if (this.hidden)
      return false;
    const mediaPlayerDesktopPosition = this._mediaPlayer.desktop_position;
    const navbarPosition = this.desktopPosition;
    return navbarPosition === "bottom" /* bottom */ && mediaPlayerDesktopPosition === "bottom-center" /* bottomCenter */ || navbarPosition === "top" /* top */ && mediaPlayerDesktopPosition === "top-center" /* topCenter */;
  }
  _watchDesktop() {
    const media = `(min-width: ${this.config?.desktop?.min_width ?? 768}px)`;
    if (this._desktopQuery?.media === media) {
      this.isDesktop = this._desktopQuery.matches;
      return;
    }
    this._unwatchDesktop();
    this._desktopQuery = window.matchMedia(media);
    this._desktopQuery.addEventListener("change", this._onDesktopChange);
    this.isDesktop = this._desktopQuery.matches;
  }
  _unwatchDesktop() {
    this._desktopQuery?.removeEventListener("change", this._onDesktopChange);
    this._desktopQuery = undefined;
  }
  _shouldHide() {
    if (this.isInEditMode)
      return false;
    const desktopHidden = processTemplate(this._hass, this, this.config?.desktop?.hidden);
    const mobileHidden = processTemplate(this._hass, this, this.config?.mobile?.hidden);
    return !this.isInEditMode && (this.isDesktop && desktopHidden || !this.isDesktop && mobileHidden);
  }
  _detectModes() {
    const homeAssistantRoot = document.querySelector("body > home-assistant");
    this._inEditDashboardMode = this.parentElement?.closest("hui-card-edit-mode") != null;
    this._inEditCardMode = !!homeAssistantRoot?.shadowRoot?.querySelector("hui-dialog-edit-card")?.shadowRoot?.querySelector("ha-dialog");
    this._inPreviewMode = this.parentElement?.closest(".card > .preview") != null;
  }
}
__legacyDecorateClassTS([
  n4({ attribute: false })
], NavbarCard.prototype, "_hass", undefined);
__legacyDecorateClassTS([
  r5()
], NavbarCard.prototype, "_inEditDashboardMode", undefined);
__legacyDecorateClassTS([
  r5()
], NavbarCard.prototype, "_inEditCardMode", undefined);
__legacyDecorateClassTS([
  r5()
], NavbarCard.prototype, "_inPreviewMode", undefined);
__legacyDecorateClassTS([
  r5()
], NavbarCard.prototype, "config", undefined);
__legacyDecorateClassTS([
  r5()
], NavbarCard.prototype, "_routes", undefined);
__legacyDecorateClassTS([
  r5()
], NavbarCard.prototype, "focusedPopup", undefined);
__legacyDecorateClassTS([
  r5()
], NavbarCard.prototype, "isDesktop", undefined);
__legacyDecorateClassTS([
  r5()
], NavbarCard.prototype, "widgetVisibility", undefined);
NavbarCard = __legacyDecorateClassTS([
  t3("navbar-card")
], NavbarCard);
console.info(`%c navbar-card%cv${version} `, `background-color: #555;
      padding: 6px 8px;
      padding-right: 6px;
      color: #fff;
      font-weight: 800;
      font-family: 'Segoe UI', Roboto, system-ui, sans-serif;
      text-shadow: 0 1px 0 rgba(1, 1, 1, 0.3);
      border-radius: 16px 0 0 16px;`, `background-color:rgb(0, 135, 197);
      padding: 6px 8px;
      padding-left: 6px;
      color: #fff;
      font-weight: 800;
      font-family: 'Segoe UI', Roboto, system-ui, sans-serif;
      text-shadow: 0 1px 0 rgba(1, 1, 1, 0.3);
      border-radius: 0 16px 16px 0;`);
export {
  NavbarCard
};
