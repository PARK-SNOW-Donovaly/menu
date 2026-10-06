(() => {
  "use strict";

  const languages = ["sk", "en", "hu", "pl", "de"];
  const locales = ["sk-SK", "en-IE", "hu-HU", "pl-PL", "de-DE"];

  const venue = window.MENU_VENUE;
  const { messages, allergenNames } = window.MENU_TEXTS;

  const foodCategories = new Set([
    "soups",
    "mains",
    "sweet",
    "sides",
    "desserts"
  ]);

  const modes = ["system", "light", "dark"];
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  const $ = id => document.getElementById(id);

  // Doplnkové preklady nových funkcií.
  // Pôvodné texty zostávajú v texts.js.
  const extra = {
    pricing: [
      "Zobrazenie cien",
      "Price display",
      "Árak megjelenítése",
      "Wyświetlanie cen",
      "Preisanzeige"
    ],

    regular: [
      "Bežné ceny",
      "Standard prices",
      "Normál árak",
      "Ceny standardowe",
      "Reguläre Preise"
    ],

    seasonal: [
      "So sezónkou −{discount} %",
      "With season pass −{discount}%",
      "Szezonbérlettel −{discount}%",
      "Z karnetem −{discount}%",
      "Mit Saisonpass −{discount} %"
    ],

    regularNote: [
      "",
      "",
      "",
      "",
      ""
    ],

    seasonNote: [
      "",
      "",
      "",
      "",
      ""
    ],

    noDiscount: [
      "Bez sezónkovej zľavy",
      "No season pass discount",
      "Bérletkedvezmény nélkül",
      "Bez rabatu z karnetem",
      "Ohne Saisonpassrabatt"
    ],

    top: [
      "Top produkt",
      "Top pick",
      "Kedvencünk",
      "Polecamy",
      "Unsere Empfehlung"
    ],

    reviewLabel: [
      "Tvoja skúsenosť",
      "Your experience",
      "A te élményed",
      "Twoje wrażenia",
      "Dein Erlebnis"
    ],

    reviewTitle: [
      "Chutilo ti u nás? Daj o tom vedieť!",
      "How was your visit? Let us know!",
      "Hogy ízlett? Oszd meg velünk!",
      "Jak Ci smakowało? Daj nam znać!",
      "Wie hat es dir geschmeckt? Sag es uns!"
    ],

    reviewText: [
      "Podeľ sa o svoju skúsenosť z návštevy. Tvoja spätná väzba nám pomáha byť ešte lepší. Ďakujeme!",
      "Share your experience. Your feedback helps us improve. Thank you!",
      "Oszd meg a látogatásod élményét! Visszajelzésed segít, hogy még jobbak legyünk. Köszönjük!",
      "Podziel się wrażeniami z wizyty. Twoja opinia pomaga nam być jeszcze lepszymi. Dziękujemy!",
      "Teile deine Erfahrungen mit uns. Dein Feedback hilft uns, noch besser zu werden. Vielen Dank!"
    ],

    reviewButton: [
      "Napísať recenziu",
      "Write a review",
      "Értékelés írása",
      "Napisz opinię",
      "Bewertung schreiben"
    ]
  };

  // ÚLOŽISKO A STAV

  function read(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function save(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {}
  }

  const requested = new URLSearchParams(location.search).get("lang");

  let lang = languages.includes(requested)
    ? requested
    : read("yeti-menu-language");

  if (!languages.includes(lang)) lang = "sk";

  let mode = read("yeti-theme");
  if (!modes.includes(mode)) mode = "system";

  let category = "all";
  let seasonPrices = false;
  let ready = false;

  const discount = Number(venue.seasonDiscount);

  const hasDiscount =
    Number.isFinite(discount) &&
    discount > 0 &&
    discount <= 100;

  const tx = key => String(
    extra[key]?.[languages.indexOf(lang)] ??
    messages[key]?.[languages.indexOf(lang)] ??
    key
  )
    .replaceAll("{bar}", venue.name)
    .replaceAll("{discount}", String(hasDiscount ? discount : 0));

  const local = value => (
    typeof value === "string"
      ? value
      : (value?.[lang] ?? value?.sk ?? "")
  );

  const normalize = value => String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

  const data = () => window.PARKSNOW_MENU || {
    categories: [],
    items: []
  };

  function el(tag, className, text) {
    const node = document.createElement(tag);

    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;

    return node;
  }

  // SVG IKONY — BEZ EMOJI

  function icon(type) {
    const paths = {
      arrow: "M5 19 19 5M5 5h14v14",
      star: "M12 1v22M1 12h22M4 4l16 16M4 20 20 4",
      light:
        "M12 2v2M12 20v2M2 12h2M20 12h2" +
        "M5 5l1.5 1.5M17.5 17.5 19 19" +
        "M5 19l1.5-1.5M17.5 6.5 19 5" +
        "M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0",
      dark: "M20 15.5A9 9 0 0 1 8.5 4 9 9 0 1 0 20 15.5Z",
      system: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 3v18"
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

  function linkContents(link, text) {
    link.replaceChildren(
      el("span", "", text.replace(/[↗\uFE0E\uFE0F]/g, "").trim()),
      icon("arrow")
    );
  }

  // VZHĽAD A LOGO

  function updateTheme() {
    const resolved = mode === "system"
      ? (media.matches ? "dark" : "light")
      : mode;

    document.documentElement.dataset.theme = resolved;
    document.documentElement.style.colorScheme = resolved;

    const meta = document.querySelector('meta[name="theme-color"]');

    if (meta) {
      meta.content = resolved === "dark" ? "#071b2b" : "#ffffff";
    }

    if (!ready) return;

    document.querySelectorAll("[data-logo]").forEach(image => {
      const path =
        "../assets/parksnow-logo" +
        (resolved === "dark" ? "-dark" : "") +
        ".svg";

      if (image.getAttribute("src") !== path) {
        image.src = path;
      }
    });

    const next = modes[(modes.indexOf(mode) + 1) % modes.length];

    document.querySelectorAll("[data-theme-toggle]").forEach(button => {
      button.hidden = false;

      button.querySelector(".theme-icon")
        ?.replaceChildren(icon(mode));

      const label = button.querySelector(".theme-label");

      if (label) label.textContent = tx(mode);

      button.title =
        tx("theme") + ": " + tx(mode) + ". " +
        tx("next") + ": " + tx(next);

      button.setAttribute("aria-label", button.title);
    });
  }

  updateTheme();

  media.addEventListener("change", () => {
    if (mode === "system") updateTheme();
  });

  window.addEventListener("storage", event => {
    if (event.key !== "yeti-theme" && event.key !== null) return;

    mode = modes.includes(event.newValue)
      ? event.newValue
      : "system";

    updateTheme();
  });

  // CENY

  function priceCents(item) {
    const base = Math.round(Number(item.price) * 100);

    if (
      !seasonPrices ||
      !hasDiscount ||
      item.seasonEligible === false
    ) {
      return base;
    }

    // Záloha je súčasťou bežnej ceny, ale nepodlieha zľave.
    const deposit = Math.min(
      base,
      Math.max(0, Math.round(Number(item.deposit || 0) * 100))
    );

    return (
      Math.round((base - deposit) * (100 - discount) / 100) +
      deposit
    );
  }

  function setPrice(node, item) {
    node.textContent = new Intl.NumberFormat(
      locales[languages.indexOf(lang)],
      {
        style: "currency",
        currency: "EUR"
      }
    ).format(priceCents(item) / 100);

    const discounted =
      seasonPrices &&
      hasDiscount &&
      item.seasonEligible !== false;

    node.classList.toggle("is-season-price", discounted);

    const label = discounted
      ? tx("seasonal")
      : (seasonPrices ? tx("noDiscount") : tx("regular"));

    node.setAttribute("aria-label", node.textContent + " — " + label);
    node.title = label;
  }

  function renderPricing() {
    const controls = $("price-controls");
    if (!controls) return;

    controls.hidden = !hasDiscount;

    controls.querySelectorAll("[data-price-mode]").forEach(button => {
      const selected =
        (button.dataset.priceMode === "season") === seasonPrices;

      button.setAttribute("aria-pressed", String(selected));
    });

    $("price-note").textContent = tx(
      seasonPrices ? "seasonNote" : "regularNote"
    );
  }

  // SEZÓNKA

  function renderPromo() {
    document.querySelectorAll("[data-promo]").forEach(container => {
      container.hidden = venue.seasonPromotion === false;
      if (container.hidden) return;

      const badge = el(
        "span",
        "promo-badge",
        hasDiscount ? "−" + discount + " %" : tx("passBadge")
      );

      const copy = el("div", "promo-copy");
      const link = el("a", "promo-link");

      link.href = "https://parksnow.sk/sk/zima/donovalska-sezonka/";
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      linkContents(link, tx("buy"));

      link.setAttribute(
        "aria-label",
        tx("buy") + " — " + tx("newTab")
      );

      copy.append(
        el("p", "eyebrow", tx("passLabel")),
        el("h2", "", tx("passTitle")),
        el("p", "promo-description", tx("passText"))
      );

      if (hasDiscount) {
        copy.append(el("p", "promo-discount", tx("discount")));
      }

      copy.append(link);

      if (hasDiscount) {
        copy.append(el("p", "promo-proof", tx("passProof")));
      }

      container.replaceChildren(badge, copy);
    });
  }

  // RECENZIE

  function renderReview() {
    const banner = $("review-banner");
    if (!banner) return;

    banner.hidden = !venue.reviewURL;
    if (!venue.reviewURL) return;

    $("review-label").textContent =
      tx("reviewLabel") + " · " + venue.name;

    $("review-link").href = venue.reviewURL;

    linkContents($("review-link"), tx("reviewButton"));
  }

  // DOPLNKOVÉ INFORMÁCIE

  function renderInformation() {
    const options = {
      coffee: ["coffeeTitle", "coffeeNote"],
      gin: ["ginTitle", "ginNote"],
      deposit: ["depositTitle", "depositNote"],
      allergy: ["allergens", "allergyNote"]
    };

    const pairs = (venue.notes || ["allergy"])
      .map(id => options[id])
      .filter(pair => pair && pair.every(key => messages[key]));

    $("notes")?.replaceChildren(
      ...pairs.map(([title, text]) => {
        const row = el("div", "note-row");

        row.append(
          el("dt", "", tx(title)),
          el("dd", "", tx(text))
        );

        return row;
      })
    );

    $("allergen-list")?.replaceChildren(
      ...allergenNames[languages.indexOf(lang)]
        .map(name => el("li", "", name))
    );
  }

  // KATEGÓRIE

  function renderCategories() {
    const options = [
      { id: "all", name: tx("all") },
      ...data().categories
    ];

    $("categories").replaceChildren(
      ...options.map(option => {
        const button = el(
          "button",
          "category-button",
          local(option.name)
        );

        button.type = "button";

        button.setAttribute(
          "aria-pressed",
          String(category === option.id)
        );

        button.addEventListener("click", () => {
          category = option.id;

          for (const child of $("categories").children) {
            child.setAttribute(
              "aria-pressed",
              String(child === button)
            );
          }

          renderItems();
        });

        return button;
      })
    );
  }

  // JEDNA POLOŽKA

  function renderItem(item) {
    const article = el("article", "menu-item");

    if (foodCategories.has(item.category) && item.image) {
      const image = el("img", "item-image");

      Object.assign(image, {
        alt: local(item.name),
        loading: "lazy",
        decoding: "async",
        width: 960,
        height: 720
      });

      image.addEventListener(
        "error",
        () => image.remove(),
        { once: true }
      );

      image.src = item.image;
      article.append(image);
    }

    const top = el("div", "item-top");

    const heading = el(
      category === "all" ? "h4" : "h3",
      "",
      local(item.name)
    );

    if (item.top) {
      heading.classList.add("product-title-with-badge");

      heading.append(
        document.createTextNode(" "),
        el("span", "product-badge", tx("top"))
      );
    }

    const price = el("span", "item-price");
    price.dataset.priceId = item.id;

    setPrice(price, item);

    top.append(heading, price);
    article.append(top);

    if (local(item.description)) {
      article.append(
        el("p", "item-description", local(item.description))
      );
    }

    if (item.portion) {
      const unit = ["ks", "pc", "db", "szt.", "Stk."][
        languages.indexOf(lang)
      ];

      article.append(
        el(
          "p",
          "item-portion",
          item.portion.replace(/\bks\b/g, unit)
        )
      );
    }

    if (Array.isArray(item.allergens) && item.allergens.length) {
      const details = el("details", "item-allergens");
      const list = allergenNames[languages.indexOf(lang)];

      details.append(
        el(
          "summary",
          "",
          tx("allergens") + ": " + item.allergens.join(", ")
        ),
        el(
          "p",
          "",
          item.allergens
            .map(number => number + " – " + list[number - 1])
            .join(" · ")
        )
      );

      article.append(details);
    }

    return article;
  }

  // ZOZNAM A VYHĽADÁVANIE

  function renderItems() {
    const menu = data();
    const query = normalize($("search").value);

    const items = menu.items.filter(item => {
      const matchesCategory =
        category === "all" || item.category === category;

      const matchesQuery = normalize(
        local(item.name) + " " + local(item.description)
      ).includes(query);

      return matchesCategory && matchesQuery;
    });

    const selected = menu.categories.find(
      entry => entry.id === category
    );

    $("category-title").textContent = category === "all"
      ? tx("all")
      : local(selected?.name);

    $("result-count").textContent =
      tx("count") + ": " + items.length;

    const fragment = document.createDocumentFragment();

    if (category === "all") {
      menu.categories.forEach(group => {
        const members = items.filter(
          item => item.category === group.id
        );

        if (!members.length) return;

        const section = el("section", "menu-group");
        const title = el("h3", "group-title", local(group.name));

        title.id = "group-" + group.id;

        section.setAttribute("aria-labelledby", title.id);

        const grid = el("div", "items-grid");
        grid.append(...members.map(renderItem));

        section.append(title, grid);
        fragment.append(section);
      });
    } else {
      const grid = el("div", "items-grid");
      grid.append(...items.map(renderItem));
      fragment.append(grid);
    }

    $("items").replaceChildren(fragment);
    $("empty-state").hidden = items.length > 0;

    $("empty-title").textContent = menu.items.length
      ? tx("noResults")
      : tx(window.PARKSNOW_MENU ? "pending" : "unavailable");

    $("empty-text").textContent = menu.items.length
      ? tx("noResultsText")
      : "";

    $("clear-search").hidden = menu.items.length === 0;
  }

  // VYKRESLENIE STRÁNKY

  function render() {
    document.documentElement.lang = lang;

    document.title =
      (document.body.dataset.page === "menu"
        ? tx("all") + " · "
        : "") +
      venue.name + " · PARK SNOW";

    document.querySelectorAll("[data-copy]").forEach(node => {
      node.textContent = tx(node.dataset.copy);
    });

    document.querySelectorAll("[data-credit]").forEach(node => {
      node.replaceChildren(
        document.createTextNode(
          "© " + new Date().getFullYear() +
          " PARK SNOW Donovaly · " + tx("credit") + " "
        ),
        el("strong", "", "Timotej Kozaňák")
      );
    });

    document.querySelectorAll("[data-language]").forEach(link => {
      link.classList.toggle(
        "is-preferred",
        link.dataset.language === lang
      );
    });

    document.querySelectorAll("[data-venue]").forEach(node => {
      node.textContent = venue.name;
    });

    document.querySelectorAll("[data-pdf]").forEach(link => {
      link.hidden = !venue.pdf;

      if (venue.pdf) link.href = venue.pdf;

      linkContents(link, tx("pdf"));
    });

    if ($("validity")) {
      const parts = [tx("prices")];

      if (venue.validFrom) {
        const date = new Intl.DateTimeFormat(
          locales[languages.indexOf(lang)]
        ).format(new Date(venue.validFrom + "T12:00:00"));

        parts.push(tx("validFrom") + " " + date + ".");
      }

      if (venue.priceAuthor) {
        parts.push(
          tx("priceAuthor") + " " + venue.priceAuthor + "."
        );
      }

      $("validity").textContent = parts.join(" ");
    }

    renderPromo();
    renderReview();
    updateTheme();

    if (document.body.dataset.page !== "menu") return;

    $("language").value = lang;
    $("search").placeholder = tx("search");

    $("categories").setAttribute(
      "aria-label",
      tx("categories")
    );

    renderPricing();
    renderCategories();
    renderItems();
    renderInformation();
  }

  // SPUSTENIE

  function boot() {
    ready = true;

    document.querySelectorAll("[data-logo]").forEach(image => {
      const fallback = image.nextElementSibling;

      const show = () => {
        image.hidden = !image.naturalWidth;
        if (fallback) fallback.hidden = !!image.naturalWidth;
      };

      image.addEventListener("load", show);

      image.addEventListener("error", () => {
        image.hidden = true;
        if (fallback) fallback.hidden = false;
      });

      if (image.complete) show();
    });

    document.querySelectorAll(
      ".hero-star, .decorative-star"
    ).forEach(node => {
      node.replaceChildren(icon("star"));
    });

    document.querySelectorAll(".language-arrow").forEach(node => {
      node.replaceChildren(icon("arrow"));
    });

    document.querySelectorAll("[data-theme-toggle]").forEach(button => {
      button.addEventListener("click", () => {
        mode = modes[(modes.indexOf(mode) + 1) % modes.length];
        save("yeti-theme", mode);
        updateTheme();
      });
    });

    document.querySelectorAll("[data-language]").forEach(link => {
      link.addEventListener("click", () => {
        save("yeti-menu-language", link.dataset.language);
      });
    });

    if (document.body.dataset.page === "menu") {
      $("language").addEventListener("change", event => {
        if (!languages.includes(event.target.value)) return;

        lang = event.target.value;
        save("yeti-menu-language", lang);

        $("search").value = "";

        const url = new URL(location.href);
        url.searchParams.set("lang", lang);

        try {
          history.replaceState(null, "", url);
        } catch {}

        render();
      });

      $("search").addEventListener("input", renderItems);

      $("clear-search").addEventListener("click", () => {
        category = "all";
        $("search").value = "";

        renderCategories();
        renderItems();

        $("search").focus();
      });

      document.querySelectorAll("[data-price-mode]").forEach(button => {
        button.addEventListener("click", () => {
          seasonPrices =
            hasDiscount &&
            button.dataset.priceMode === "season";

          renderPricing();

          const byId = new Map(
            data().items.map(item => [item.id, item])
          );

          // Menia sa len ceny. Obrázky, filtre a otvorené
          // alergény zostávajú na svojom mieste.
          document.querySelectorAll("[data-price-id]").forEach(node => {
            const item = byId.get(node.dataset.priceId);
            if (item) setPrice(node, item);
          });
        });
      });
    }

    const backToTop = $("back-to-top");

if (backToTop) {
  const updateBackToTop = () => {
    backToTop.hidden = window.scrollY < 600;
  };

  window.addEventListener("scroll", updateBackToTop, {
    passive: true
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
        ? "auto"
        : "smooth"
    });
  });

  updateBackToTop();
}
    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, {
      once: true
    });
  } else {
    boot();
  }
})();