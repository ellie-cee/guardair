class v2PredictiveSearch extends HTMLElement {
  constructor() {
    super();

    this.form = this.querySelector("form");
    this.input = this.querySelector('input[name="q"]');

    this.readConfig();

    this.initiate();
  }

  readConfig() {
    this.predictiveSearchTitle = this.getAttribute("title") || "Search results";
    this.viewAllText = this.getAttribute("view-all-text") || "View all";

    // Read classess
    this.classes = {
      title: this.getAttribute("title-classes") || "",
      viewAll: this.getAttribute("view-all-classes") || "",
      results: this.getAttribute("results-classes") || "",
    };
  }

  initiate() {
    this.input.addEventListener("input", this.onInput.bind(this));

    this.input.addEventListener("blur", () => {
      setTimeout(() => {
        if (this.focused === false) {
          this.predictiveSearchContainer.classList.remove(
            "v2-predictive-search__wrapper--visible",
          );
        }
      });
    });

    this.input.addEventListener("focus", () => {
      if (this.results.innerHTML.trim() !== "") {
        this.predictiveSearchContainer.classList.add(
          "v2-predictive-search__wrapper--visible",
        );
      }
    });
    document.addEventListener("click", (e) => {
      // If the click is outside the search container
      if (e.target.closest("v2-predictive-search") === null) {
        this.focused = false;
        // if the search field is not focused
        if (this.input.matches(":focus") === false) {
          this.predictiveSearchContainer.classList.remove(
            "v2-predictive-search__wrapper--visible",
          );
        }
      } else {
        this.focused = true;
      }
    });

    // Create the results container
    this.predictiveSearchContainer = document.createElement("div");

    this.predictiveSearchContainer.classList.add(
      "v2-predictive-search__wrapper",
    );
    this.predictiveSearchContainer.classList.add(
      ...this.classes.results.split(" "),
    );
    this.predictiveSearchContainer.innerHTML = `
      <div class="v2-predictive-search__header ${this.classes.title}">
        <span>${this.predictiveSearchTitle}</span>
        <span class="v2-predictive-search__close">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="icon icon-close" fill="none" viewBox="0 0 18 17">
  <path d="M.865 15.978a.5.5 0 00.707.707l7.433-7.431 7.579 7.282a.501.501 0 00.846-.37.5.5 0 00-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 10-.707-.708L8.991 7.853 1.413.573a.5.5 0 10-.693.72l7.563 7.268-7.418 7.417z" fill="currentColor">
</path></svg>
      </span>
      </div>
      <div class="v2-predictive-search__results"></div>
      <div class="v2-predictive-search__footer">
      <a class="v2-predictive-search__view_all ${this.classes.viewAll}" href="/search?q=${this.input.value}">${this.viewAllText}</a>
      </div>
    `;

    this.results = this.predictiveSearchContainer.querySelector(
      ".v2-predictive-search__results",
    );
    this.viewAll = this.predictiveSearchContainer.querySelector(
      ".v2-predictive-search__view_all",
    );

    this.closeButton = this.predictiveSearchContainer.querySelector('.v2-predictive-search__close');
    if (this.closeButton) {
      this.closeButton.addEventListener('click', () => {
        this.predictiveSearchContainer.classList.remove(
          "v2-predictive-search__wrapper--visible",
        );
      });
    }
  }

  onInput(e) {
    const value = e.target.value;
    if (value.length > 2) {
      this.fetchResults(value);
    } else {
      this.predictiveSearchContainer.classList.remove(
        "v2-predictive-search__wrapper--visible",
      );
    }
  }

  async fetchResults(value) {
    const url = `/search/suggest.json?q=${value}&resources[limit]=5&resources[type]=product&resources[options][fields]=title,variants.title,variants.sku`;

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      await this.renderResults(data.resources?.results?.products);
    }

    if (this.results.innerHTML.trim() === "") {
      this.predictiveSearchContainer.classList.remove(
        "v2-predictive-search__wrapper--visible",
      );
      return;
    }

    this.predictiveSearchContainer.classList.add(
      "v2-predictive-search__wrapper--visible",
    );
  }

  async renderResults(results) {
    this.results.innerHTML = "";

    results.forEach((result) => {
      const resultElement = this.renderProduct(result);
      this.results.append(...resultElement.children);
    });

    this.viewAll.href = `/search?q=${this.input.value}`;
  }

  renderProduct(product) {
    const productElement = document.createElement("div");
    productElement.classList.add("v2-predictive-search__product");
    productElement.innerHTML = `
      <a href="${product.url}" class="v2-predictive-search__product-img">
        <img src="${product.image}" alt="${product.title}">
      </a>
      <a 
        href="${product.url}"
        class="v2-predictive-search__product-title">
        ${product.title}
      </a>
    `;

    return productElement;
  }

  connectedCallback() {
    this.form.insertAdjacentElement("afterend", this.predictiveSearchContainer);
  }
}

customElements.define("v2-predictive-search", v2PredictiveSearch);
