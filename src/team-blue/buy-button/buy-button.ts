/* eslint-disable no-use-before-define, no-console, class-methods-use-this */
/* globals HTMLElement, window, CustomEvent */

  export class BlueBuy extends HTMLElement {

    static get tag() {
        return "cpgmni-blue-buy";
    }
    static get observedAttributes() {
      return ["sku"];
    }
    public log(...args: any) {
      console.log("🔘 blue-buy", ...args);
    }
    private prices: any = {
      t_eicher: "58,00 €",
      t_fendt: "54,00 €",
      t_porsche: "66,00 €",
    };

    private state = {
      count: 0,
    };

    public shadowRoot: any = this.attachShadow({mode: "open"});
    constructor() {
      super(); // always call super() first in the constructor.
    }

    public connectedCallback() {
      this.addToCart = this.addToCart.bind(this);
      const sku = this.getAttribute("sku");
      // @ts-ignore
      BlueBuy.log("connected", sku);
      this.render();
      const button = this.shadowRoot.getElementById( "buy" );
      if ( button != null ) {
        button.addEventListener("click", this.addToCart);
      }
    }
    public addToCart() {
      // @ts-ignore
      BlueBuy.log('event sent "blue:basket:changed"');
      this.state.count += 1;
      const eventProperties = {bubbles: true, detail: { text: this.state.count}, composed: true};
      const event = new CustomEvent("blue:basket:changed", eventProperties);
      window.dispatchEvent(event);
    }
    public render() {
      const sku = this.getAttribute("sku");
      const price = sku != null ? this.prices[sku] : 13.15;
      this.shadowRoot.innerHTML = ` <link rel="stylesheet" href="team-blue/buy-button/buy-button.css">
                                            <button id="buy" type="button">buy for ${price}</button>`;
    }
    public attributeChangedCallback(attr: any, oldValue: any, newValue: any) {
      // @ts-ignore
      BlueBuy.log("attributeChanged", attr, oldValue, newValue);
      this.render();
    }
    public disconnectedCallback() {
      const button = this.shadowRoot.getElementById("buy");
      if (button != null ) {
        button.removeEventListener("click", this.addToCart);
      }
      const sku = this.getAttribute("sku");
      // @ts-ignore
      BlueBuy.log("disconnected", sku);
    }
  }

  window.customElements.define(BlueBuy.tag, BlueBuy);