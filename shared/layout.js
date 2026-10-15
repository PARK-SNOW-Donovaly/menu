(() => {
  "use strict";

  const script = document.currentScript;
  const siteRoot = new URL("../", script.src);

  const modes = ["system", "light", "dark"];
  const media = window.matchMedia(
    "(prefers-color-scheme: dark)"
  );

  function icon(type) {
    const paths = {
      light:
        "M12 2v2M12 20v2M2 12h2M20 12h2" +
        "M5 5l1.5 1.5M17.5 17.5 19 19" +
        "M5 19l1.5-1.5M17.5 6.5 19 5" +
        "M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0",

      dark:
        "M20 15.5A9 9 0 0 1 8.5 4 9 9 0 1 0 20 15.5Z",

      system:
        "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 3v18"
    };

    const svg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );

    const attributes = {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "1.6",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": "true",
      focusable: "false"
    };

    for (const [key, value] of Object.entries(attributes)) {
      svg.setAttribute(key, value);
    }

    svg.setAttribute("class", "icon");

    const path = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );

    path.setAttribute("d", paths[type]);
    svg.append(path);

    return svg;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderHeader() {
  const header = document.querySelector(
    "[data-site-header]"
  );

  if (!header) return;

  const venue =
    header.dataset.label || "MENU";

  const isMenu =
    document.body.dataset.page === "menu";

  const lightLogo = new URL(
    "assets/parksnow-logo.svg",
    siteRoot
  ).href;

  const darkLogo = new URL(
    "assets/parksnow-logo-dark.svg",
    siteRoot
  ).href;

  const languageControl = isMenu
    ? `
      <label
        class="sr-only"
        for="language"
        data-copy="language"
      >
        Jazyk
      </label>

      <select id="language">
        <option value="sk">SK · Slovenčina</option>
        <option value="en">EN · English</option>
        <option value="hu">HU · Magyar</option>
        <option value="pl">PL · Polski</option>
        <option value="de">DE · Deutsch</option>
      </select>
    `
    : "";

  header.className = "site-header container";

  header.innerHTML = `
    <a
      class="brand"
      href="${siteRoot.href}"
      aria-label="PARK SNOW Donovaly – úvod"
    >
      <img
        class="site-logo site-logo-light"
        src="${lightLogo}"
        alt="PARK SNOW Donovaly"
      >

      <img
        class="site-logo site-logo-dark"
        src="${darkLogo}"
        alt=""
        aria-hidden="true"
      >
    </a>

    <div class="header-actions">
      <span class="venue-tag" data-venue>
        ${escapeHtml(venue)}
      </span>

      ${languageControl}

      <button
        class="theme-toggle"
        type="button"
        data-theme-toggle
        hidden
      >
        <span
          class="theme-icon"
          aria-hidden="true"
        ></span>

        <span class="theme-label">
          Automaticky
        </span>
      </button>
    </div>
  `;
  }

  function renderFooter() {
  const footer = document.querySelector(
    "[data-site-footer]"
  );

  if (!footer) return;

  const venue =
    footer.dataset.label || "DOBRÚ CHUŤ!";

  const informationUrl = new URL(
    "informacie.html",
    siteRoot
  ).href;

  footer.className = "site-footer container";

  footer.innerHTML = `
    <span class="venue-tag">
      ${escapeHtml(venue)}
    </span>

    <p>
      © ${new Date().getFullYear()}
      PARK SNOW Donovaly ·

      <a
        class="footer-link"
        href="${informationUrl}"
      >
        Prevádzkovateľ a súkromie
      </a>

      · Web vytvoril
      <strong>Timotej Kozaňák</strong>
    </p>
  `;
}

  /*
   * Na menu stránkach už vzhľad obsluhuje app.js.
   * Táto časť sa použije iba na hlavnej stránke,
   * informačnej stránke a 404.
   */
  function initializeStandaloneTheme() {
    if (window.MENU_VENUE) {
    return;
    }
    const labels = {
      system: "Automaticky",
      light: "Svetlý",
      dark: "Tmavý"
    };

    let mode = "system";

    try {
      const saved =
        localStorage.getItem("yeti-theme");

      if (modes.includes(saved)) {
        mode = saved;
      }
    } catch {}

    function updateTheme() {
      const resolved = mode === "system"
        ? (media.matches ? "dark" : "light")
        : mode;

      document.documentElement.dataset.theme = resolved;
      document.documentElement.style.colorScheme = resolved;

      const meta = document.querySelector(
        'meta[name="theme-color"]'
      );

      if (meta) {
        meta.content = resolved === "dark"
          ? "#071b2b"
          : "#ffffff";
      }

      document.querySelectorAll("[data-logo]")
        .forEach(image => {
          const filename = resolved === "dark"
            ? "parksnow-logo-dark.svg"
            : "parksnow-logo.svg";

          const source = new URL(
            "assets/" + filename,
            siteRoot
          ).href;

          if (image.src !== source) {
            image.src = source;
          }

          const fallback =
            image.nextElementSibling;

          const showLogo = () => {
            image.hidden = !image.naturalWidth;

            if (fallback) {
              fallback.hidden =
                Boolean(image.naturalWidth);
            }
          };

          image.onload = showLogo;

          image.onerror = () => {
            image.hidden = true;

            if (fallback) {
              fallback.hidden = false;
            }
          };

          if (image.complete) {
            showLogo();
          }
        });

      const next =
        modes[(modes.indexOf(mode) + 1) % modes.length];

      document.querySelectorAll("[data-theme-toggle]")
        .forEach(button => {
          button.hidden = false;

          button.querySelector(".theme-icon")
            ?.replaceChildren(icon(mode));

          const label =
            button.querySelector(".theme-label");

          if (label) {
            label.textContent = labels[mode];
          }

          button.title =
            "Vzhľad: " + labels[mode] +
            ". Prepnúť na: " + labels[next];

          button.setAttribute(
            "aria-label",
            button.title
          );
        });
    }

    document.querySelectorAll("[data-theme-toggle]")
      .forEach(button => {
        button.addEventListener("click", () => {
          mode =
            modes[
              (modes.indexOf(mode) + 1) %
              modes.length
            ];

          try {
            localStorage.setItem(
              "yeti-theme",
              mode
            );
          } catch {}

          updateTheme();
        });
      });

    media.addEventListener("change", () => {
      if (mode === "system") {
        updateTheme();
      }
    });

    window.addEventListener("storage", event => {
      if (
        event.key !== "yeti-theme" &&
        event.key !== null
      ) {
        return;
      }

      mode = modes.includes(event.newValue)
        ? event.newValue
        : "system";

      updateTheme();
    });

    updateTheme();
  }

  function initialize() {
    renderHeader();
    renderFooter();
    initializeStandaloneTheme();
  }
  initialize();
})();