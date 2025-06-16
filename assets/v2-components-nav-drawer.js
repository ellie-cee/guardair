(() => {
  class NavDrawer extends HTMLElement {
    constructor() {
      super();
      this.direction = this.getAttribute("direction") || "left";
      if (this.direction === "right") {
        this.classList.add("nav-drawer--right");
      } else {
        this.classList.add("nav-drawer--left");
      }

      this.toggleSelector = this.getAttribute("toggle") || "";
      document.body.addEventListener("click", (e) => {
        if (e.target.closest(this.toggleSelector)) {
          this.toggleNavDrawer();
        } else if (this.classList.contains("nav-drawer--open") && !e.target.closest("v2-nav-drawer")) {
            this.toggleNavDrawer();
        }
      });
    }

    toggleNavDrawer() {
      this.classList.toggle("nav-drawer--open");
    }
  }

  customElements.define("v2-nav-drawer", NavDrawer);
})();
