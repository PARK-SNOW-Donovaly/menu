(() => {
  "use strict";

  const languages = ["sk", "en", "hu", "pl", "de"];

  const translate = value => Object.fromEntries(
    languages.map((lang, index) => [
      lang,
      Array.isArray(value)
        ? (value[index] ?? value[0] ?? "")
        : value
    ])
  );

  const categories = [];
  const items = [];

  // Záloha je už zahrnutá v uvedenej cene.
  const deposit = { deposit: 0.15 };

  // Poradie údajov:
  // názov, porcia, cena, popis, alergény, obrázok, top, cenové nastavenie.
  //
  // Cenové nastavenie:
  // { deposit: 0.15 }  = zahrnutá záloha bez zľavy
  // { eligible: false } = produkt bez sezónkovej zľavy

  function group(id, name, rows) {
    categories.push({
      id,
      name: translate(name)
    });

    rows.forEach((
      [
        name,
        portion,
        price,
        description = null,
        allergens = null,
        image = null,
        top = false,
        pricing = {}
      ],
      index
    ) => {
      items.push({
        id: id + "-" + (index + 1),
        category: id,
        name: translate(name),
        portion,
        price,
        description: description ? translate(description) : null,
        allergens,
        image,
        top,
        deposit: pricing.deposit ?? 0,
        seasonEligible: pricing.eligible !== false
      });
    });
  }

  group("liqueurs", [
    "Likéry", "Liqueurs", "Likőrök", "Likiery", "Liköre"
  ], [
    ["Jägermeister 35%", "0,04 l", 4.90],
    ["Jägermeister Orange 35%", "0,04 l", 4.90],
    ["TATRATEA coconut 22%", "0,04 l", 3.90],
    ["TATRATEA original light 35%", "0,04 l", 4.90, null, null, null, true],
    ["TATRATEA hibiscus&red tea 37%", "0,04 l", 3.90],
    ["TATRATEA flower tea 47%", "0,04 l", 3.90],
    ["TATRATEA original 52%", "0,04 l", 4.90],
    ["TATRATEA forest fruit 62%", "0,04 l", 4.90],
    ["TATRATEA apple&pear 67%", "0,04 l", 4.90],
    ["Becherovka 38%", "0,04 l", 3.90],
    ["Karpatské Brandy Špeciál", "0,04 l", 8.90]
  ]);

  group("spirits", [
    "Destiláty", "Spirits", "Röviditalok", "Alkohole mocne", "Spirituosen"
  ], [
    ["Absolut Vodka 40%", "0,04 l", 3.90],
    ["Beefeater Gin 40%", "0,04 l", 3.90],
    ["Malfy Gin Rosa 41%", "0,04 l", 6.90],
    ["Monkey 47 Gin 47%", "0,04 l", 12.90],
    ["Tequila Olmeca Reposado 38%", "0,04 l", 4.90],
    [
      "Spišská Borovička Original 40% Kosher", "0,04 l", 3.90,
      [
        null,
        "juniper spirit.",
        "borókapárlat.",
        "destylat jałowcowy.",
        "wacholderspirituose."
      ]
    ],
    [
      "Spišská Borovička s horcom Original 40% Kosher", "0,04 l", 4.50,
      [
        null,
        "juniper spirit with gentian.",
        "borókapárlat tárniccsal.",
        "destylat jałowcowy z goryczką.",
        "wacholderspirituose mit enzian."
      ]
    ],
    [
      "Spišská Marhuľovica Original 40% Kosher", "0,04 l", 4.90,
      [
        null,
        "apricot spirit.",
        "sárgabarackpárlat.",
        "destylat morelowy.",
        "aprikosenbrand."
      ]
    ],
    [
      "Spišská Slivovica Original 52% Kosher", "0,04 l", 4.90,
      [
        null,
        "plum spirit.",
        "szilvapárlat.",
        "śliwowica.",
        "pflaumenbrand."
      ]
    ],
    [
      "Spišská Hruškovica Original 40% Kosher", "0,04 l", 4.90,
      [
        null,
        "pear spirit.",
        "körtepárlat.",
        "destylat gruszkowy.",
        "birnenbrand."
      ]
    ]
  ]);

  group("rum", [
    "Rum a whiskey", "Rum & whiskey", "Rum és whiskey",
    "Rum i whiskey", "Rum & Whiskey"
  ], [
    [
      [
        "Tuzemský um 38%",
        "Domestic rum spirit 38%",
        "Tuzemský um 38%",
        "Tuzemský um 38%",
        "Tuzemský um 38%"
      ],
      "0,04 l", 3.50
    ],
    ["Captain Morgan Original Spiced Gold 35%", "0,04 l", 4.90],
    ["Bumbu Original 40%", "0,04 l", 9.90],
    ["Bumbu XO 40%", "0,04 l", 12.90, null, null, null, true],
    ["Bumbu Cream 15%", "0,04 l", 7.90],
    ["Ron Millonario Kuytchi 40%", "0,04 l", 10.90],
    ["Ron Millonario 10 Aniversario Reserva 40%", "0,04 l", 10.90],
    ["Zacapa 23YO 40%", "0,04 l", 12.90],
    ["Plantation XO 40%", "0,04 l", 12.90],
    ["Jameson Irish Whiskey 40%", "0,04 l", 4.90],
    ["Chivas Regal 12y 40%", "0,04 l", 6.90],
    ["The Deacon 40%", "0,04 l", 9.90, null, null, null, true]
  ]);

  group("cocktails", [
    "Miešané nápoje", "Cocktails", "Koktélok", "Koktajle", "Cocktails"
  ], [
    ["Italien Spritz", "0,15 l", 7.90],
    ["Cuba Libre", "0,15 l", 7.90, "Havana Club Añejo 3 Años 40%, Pepsi."],
    ["Gin & Tonic", "0,15 l", 6.90, "Beefeater Gin 40%, Schweppes Tonic."],
    ["Jägerbomb", "0,20 l", 7.90, "Jägermeister 35%, Red Bull Energy Drink."]
  ]);

  group("wine", [
    "Víno", "Wine", "Borok", "Wino", "Wein"
  ], [
    [
      "KP Jagnet Veltlínske zelené", "0,25 l", 8.90,
      [
        "biele suché, fľaša",
        "dry white wine, bottle",
        "száraz fehérbor, palack",
        "białe wytrawne, butelka",
        "Trockener Weißwein, Flasche"
      ]
    ],
    [
      "KP Jagnet Frankovka modrá", "0,25 l", 8.90,
      [
        "červené suché, fľaša",
        "dry red wine, bottle",
        "száraz vörösbor, palack",
        "czerwone wytrawne, butelka",
        "Trockener Rotwein, Flasche"
      ]
    ]
  ]);

  group("sparkling", [
    "Šumivé vína a šampanské",
    "Sparkling wine & champagne",
    "Gyöngyözőborok és pezsgők",
    "Wina musujące i szampany",
    "Schaumwein & Champagner"
  ], [
    ["Terra Serena Vino Bianco Frizzante", "0,10 l", 3.90],
    ["Terra Serena Vino Bianco Frizzante", "0,75 l", 29.90],
    ["Bepin De Eto", "0,75 l", 49.00],
    ["G.H.MUMM brut", "0,75 l", 99.00],
    [
      "Luc Belaire", "0,75 l", 99.00,
      [
        "prémiové francúzské šumivé víno · svieže, ovocné a výrazné",
        "premium French sparkling wine · fresh, fruity and distinctive",
        "prémium francia pezsgő · friss, gyümölcsös és karakteres",
        "francuskie wino musujące premium · świeże, owocowe i wyraziste",
        "Französischer Premium-Schaumwein · frisch, fruchtig und ausdrucksstark"
      ],
      null, null, true
    ]
  ]);

  group("beer", [
    "Pivo", "Beer", "Sörök", "Piwo", "Bier"
  ], [
    [
      "Pilsner Urquell 12°", "0,40 l", 4.50,
      ["čapované", "draught beer", "csapolt sör", "piwo lane", "vom Fass"]
    ],
    [
      "Radegast 10°", "0,40 l", 4.20,
      ["čapované", "draught beer", "csapolt sör", "piwo lane", "vom Fass"]
    ],
    [
      [
        "Birell pomelo & grep",
        "Birell pomelo & grep",
        "Birell pomelo és grapefruit",
        "Birell pomelo i grejpfrut",
        "Birell pomelo & grep"
      ],
      "0,40 l", 3.90,
      [
        "čapované nealkoholické pivo, pomelo a grep.",
        "non-alcoholic draught beer, pomelo & grapefruit.",
        "csapolt alkoholmentes sör, pomelo és grapefruit.",
        "lane piwo bezalkoholowe, pomelo i grejpfrut.",
        "alkoholfreies Bier vom Fass, Pomelo und Grapefruit."
      ]
    ],
    [
      [
        "Birell nealkoholické pivo",
        "Birell non-alcoholic beer",
        "Birell alkoholmentes sör",
        "Piwo bezalkoholowe Birell",
        "Birell alkoholfreies Bier"
      ],
      "0,50 l", 4.00,
      ["plechovka", "can", "konzervdoboz", "Puszka", "Dose"],
      null, null, false, deposit
    ]
  ]);

  group("soft", [
    "Nealko nápoje", "Soft drinks", "Üdítőitalok",
    "Napoje bezalkoholowe", "Erfrischungsgetränke"
  ], [
    [
      "Poctivá kola", "0,40 l", 3.20,
      ["čapovaná", "draught", "csapolt", "z nalewaka", "vom Fass"]
    ],
    [
      "Mattoni", "0,50 l", 4.00,
      [
        "perlivá, jemne perlivá, neperlivá",
        "sparkling, lightly sparkling, still",
        "szénsavas, enyhén szénsavas, szénsavmentes",
        "gazowana, lekko gazowana, niegazowana",
        "mit Kohlensäure, wenig Kohlensäure, still"
      ],
      null, null, false, deposit
    ],
    ["Pepsi / Pepsi Max", "0,50 l", 4.00, null, null, null, false, deposit],
    ["7up / Mirinda", "0,50 l", 4.00, null, null, null, false, deposit],
    ["Schweppes Tonic / Pink", "0,50 l", 4.00, null, null, null, false, deposit],
    ["Mattoni Imuno", "0,70 l", 5.00, null, null, null, false, deposit],
    ["Magnesia Plus ", "0,70 l", 5.00, null, null, null, false, deposit],
    [
      "Mattoni #Yess", "0,50 l", 3.50,
      [
        "detský ochutený nápoj",
        "flavoured drink for children",
        "izesített ital gyerekeknek",
        "napój smakowy dla dzieci",
        "aromatisiertes Kindergetränk"
      ],
      null, null, false, deposit
    ],
    [
      [
        "Happy day 100% džús",
        "Happy day 100% juice",
        "Happy day 100%-os gyümölcslé",
        "Sok Happy day 100%",
        "Happy day 100% Saft"
      ],
      "0,33 l", 4.00,
      [
        "pomaranč, jablko, multivitamín",
        "orange, apple, multivitamin",
        "narancs, alma, multivitamin",
        "pomarańcza, jabłko, multiwitamina",
        "Orange, Apfel, Multivitamin"
      ],
      null, null, false, deposit
    ],
    [
      "MyTea", "0,50 l", 4.00,
      [
        "ľadový čaj: broskyňa, citrón",
        "iced tea: peach, lemon",
        "jeges tea: őszibarack, citrom",
        "herbata mrożona: brzoskwiniowa, cytrynowa",
        "eistee: pfirsich, zitrone"
      ],
      null, null, false, deposit
    ],
    [
      "Rauch Yippy", "0,33 l", 3.50,
      [
        "detský ovocný nápoj",
        "flavoured drink for children",
        "izesített ital gyerekeknek",
        "napój owocowy dla dzieci",
        "aromatisiertes Kindergetränk"
      ],
      null, null, false, deposit
    ],
    ["Rauch Sport Isotonic", "0,50 l", 5.00, null, null, null, false, deposit],
    [
      "Cans", "0,33 l", 5.00,
      [
        "Jemne perlivá, bez cukru a sladidiel.",
        "Lightly sparkling, no sugar or sweeteners.",
        "Enyhén szénsavas, cukor és édesítőszerek nélkül.",
        "Lekko gazowany, bez cukru i substancji słodzących.",
        "Leicht sprudelnd, ohne Zucker und Süßungsmittel."
      ],
      null, null, false, deposit
    ],
    ["Red Bull Energy Drink", "0,25 l", 5.00, null, null, null, false, deposit]
  ]);

  group("hot", [
    "Teplé nápoje", "Hot drinks", "Forró italok",
    "Napoje gorące", "Heißgetränke"
  ], [
    ["Espresso", "8 g", 3.80, "Julis Meinl 1862 Vienna", [7]],
    ["Espresso Macchiato", "8 g", 3.90, "Julis Meinl 1862 Vienna", [7]],
    ["Espresso Doppio", "15 g", 5.50, "Julis Meinl 1862 Vienna", [7]],
    ["Cappuccino", "8 g", 4.50, "Julis Meinl 1862 Vienna", [7]],
    ["Latte Macchiato", "8 g", 4.50, "Julis Meinl 1862 Vienna", [7]],
    [
      "Latte Macchiato coconut Tatratea",
      "8 g",
      7.50,
      "Julis Meinl 1862 Vienna, Tatratea Coconut 22%.",
      [7]
    ],
    [
      [
        "Viedenská káva",
        "Viennese coffee",
        "Bécsi kávé",
        "Kawa po wiedeńsku",
        "Wiener Kaffee"
      ],
      "8 g", 4.50,
      [
        "JM 1862 Vienna, šľahačka.",
        "JM 1862 Vienna, whipped cream.",
        "JM 1862 Vienna, tejszínhab.",
        "JM 1862 Vienna, bita śmietana.",
        "JM 1862 Vienna, Schlagsahne."
      ],
      [7]
    ],
    [
      [
        "Horské kakao so šľahačkou",
        "Mountain cocoa with whipped cream",
        "Hegyi kakaó sz whip cream",
        "Górski kakao z bitą śmietaną",
        "Bergkaka mit Schlagsahne"
      ],
      "0,20 l", 5.50, null, [7]
    ],
    [
      [
        "Detský punč",
        "Children's punch",
        "Gyermekpuncs",
        "Dziecięca punch",
        "Kinderpunsch"
      ],
      "0,20 l", 4.50, null, [7]
    ],
    [
      [
        "Čaj porciovaný Julius Meinl",
        "Julius Meinl tea",
        "Julius Meinl filteres tea",
        "Herbata Julius Meinl w saszetce",
        "Julius Meinl Tee"
      ],
      "0,20 l", 2.90,
      [
        "ovocný / bylinkový / pepermintový / zelený / čierny",
        "fruit / herbal / peppermint / green / black",
        "gyümölcstea / gyógytea / borsmentatea / zöld tea / fekete tea",
        "owocowa / ziołowa / miętowa / zielona / czarna",
        "Früchtetee / Kräutertee / Pfefferminztee / Grüntee / Schwarztee"
      ]
    ],
    [
      [
        "Med porciovaný",
        "Portioned honey",
        "Adagolt méz",
        "Porcja miodu",
        "Portionshonig"
      ],
      "1 ks", 1.00
    ],
    [
      [
        "BIO varené červené víno",
        "Mulled red wine",
        "Meleg vörösbor",
        "Gorące czerwone wino",
        "Heiße rote Weine"
      ],
      "0,20 l", 6.90
    ],
    [
      "Bombardino", "0,20 l", 4.90,
      ["šľahačka", "whipped cream", "whip cream", "bita śmietana", "sahne"],
      [3, 7]
    ],
    [
      "Čokobumbu", "0,20 l", 9.90,
      [
        "Bumbu Cream 22%, horské kakao so šľahačkou",
        "Bumbu Cream 22%, mountain cocoa with whipped cream",
        "Bumbu Cream 22%, hegyi kakaó sz whip cream",
        "Bumbu Cream 22%, górski kakao z bitą śmietaną",
        "Bumbu Cream 22%, Bergkakao mit Schlagsahne"
      ],
      [7], null, true
    ]
  ]);

  group("soups", [
    "Polievky", "Soups", "Levesek", "Zupy", "Suppen"
  ], [
    [
      [
        "Kapustnica s údeným mäsom a klobásou, kaizerka",
        "Sauerkraut soup with smoked meat and sausage, Kaiser roll",
        "Savanyú káposztaleves füstölt hússal és kolbásszal, Kaiser zsemle",
        "Zupa kapuściana z wędzonym mięsem i kiełbasą, bułka Kaiser",
        "Sauerkrautsuppe mit geräuchertem Fleisch und Wurst, Kaiserbrötchen"
      ],
      "0,40 l",
      7.50,
      null,
      [1, 3, 5, 8, 9, 13],
      "images/kapustnica.webp"
    ]
  ]);

  group("mains", [
    "Hlavné jedlá", "Main dishes", "Főételek",
    "Dania główne", "Hauptgerichte"
  ], [
    [
      "XXL Hot-dog", "70 g", 10.90,
      [
        "omáčky - kečup / horčica / samurai / hannibal",
        "sauces - ketchup / mustard / samurai / hannibal",
        "szószok - ketchup / mustár / samurai / hannibal",
        "sosy - ketchup / musztarda / samurai / hannibal",
        "Soßen - Ketchup / Senf / Samurai / Hannibal"
      ],
      [1, 7, 10]
    ],
    [
      "Leberkäse v žemli Big Dog", "70 g", 8.90,
      [
        "jalapeño párok, cheddar, horčica/kečup, uhorka, cibuľka",
        "jalapeño sausage, cheddar, mustard/ketchup, pickle, onion",
        ", cheddar, mustár/ketchup, csemegeuborka, hagyma",
        ", cheddar, musztarda/ketchup, ogórek konserwowy, cebula",
        ", Cheddar, Senf/Ketchup, Gewürzgurke, Zwiebel"
      ],
      [1, 3, 7, 10]
    ]
  ]);

  group("desserts", [
    "Dezerty a chuťovinky",
    "Desserts & snacks",
    "Desszertek és harapnivalók",
    "Desery i przekąski",
    "Desserts & Snacks"
  ], [
    ["Donut", "55 g", 4.20, null, [1, 3, 7]],
    ["Kinder Bueno", "1 ks", 2.90],
    [
      [
        "Kinder vajce",
        "Kinder Surprise",
        "Kinder Meglepetés",
        "Kinder Niespodzianka",
        "Kinder Überraschung"
      ],
      "1 ks", 3.50
    ],
    ["Horalka", "1 ks", 2.50],
    [
      [
        "Chipsy Lays MAXX",
        "Lays MAXX chips",
        "Lays MAXX chips",
        "Chipsy Lays MAXX",
        "Lays MAXX Chips"
      ],
      "65 g", 3.90
    ]
  ]);

  window.PARKSNOW_MENU = {
    categories,
    items
  };
})();