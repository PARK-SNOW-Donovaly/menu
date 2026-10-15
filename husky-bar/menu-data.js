(() => {
  const languages = ["sk", "en", "hu", "pl", "de"];

  const translate = value => Object.fromEntries(
    languages.map((lang, index) => [
      lang,
      Array.isArray(value) ? value[index] : value
    ])
  );

  const categories = [];
  const items = [];

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
      image = null
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
      image
    });
  });
}

  group("liqueurs", ["Likéry", "Liqueurs", "Likőrök", "Likiery", "Liköre"], [
    ["Jägermeister 35%", "0,04 l", 4.90],
    ["Jägermeister Orange 35%", "0,04 l", 4.90],
    ["TATRATEA coconut 22%", "0,04 l", 3.90],
    ["TATRATEA original light 35%", "0,04 l", 4.90],
    ["TATRATEA hibiscus&red tea 37%", "0,04 l", 3.90],
    ["TATRATEA flower tea 47%", "0,04 l", 3.90],
    ["TATRATEA original 52%", "0,04 l", 4.90],
    ["TATRATEA forest fruit 62%", "0,04 l", 4.90],
    ["TATRATEA apple&pear 67%", "0,04 l", 4.90],
    ["Becherovka 38%", "0,04 l", 3.90],
    ["Karpatské Brandy Špeciál", "0,04 l", 8.90]
  ]);

  group("spirits", ["Destiláty", "Spirits", "Röviditalok", "Alkohole mocne", "Spirituosen"], [
    ["Absolut Vodka 40%", "0,04 l", 3.90],
    ["Beefeater Gin 40%", "0,04 l", 3.90],
    ["Malfy Gin Rosa 41%", "0,04 l", 6.90],
    ["Monkey 47 Gin 47%", "0,04 l", 12.90],
    ["Tequila Olmeca Reposado 38%", "0,04 l", 4.90],
    [
      "Spišská Borovička Original 40% Kosher", "0,04 l", 3.90,
      [null, "juniper spirit.", "borókapárlat.", "destylat jałowcowy.", "wacholderspirituose."]
    ],
    [
      "Spišská Borovička s horcom Original 40% Kosher", "0,04 l", 4.50,
      [null, "juniper spirit with gentian.", "borókapárlat tárniccsal.", "destylat jałowcowy z goryczką.", "wacholderspirituose mit enzian."]
    ],
    [
      "Spišská Marhuľovica Original 40% Kosher", "0,04 l", 4.90,
      [null, "apricot spirit.", "sárgabarackpárlat.", "destylat morelowy.", "aprikosenbrand."]
    ],
    [
      "Spišská Slivovica Original 52% Kosher", "0,04 l", 4.90,
      [null, "plum spirit.", "szilvapárlat.", "śliwowica.", "pflaumenbrand."]
    ],
    [
      "Spišská Hruškovica Original 40% Kosher", "0,04 l", 4.90,
      [null, "pear spirit.", "körtepárlat.", "destylat gruszkowy.", "birnenbrand."]
    ]
  ]);

  group("rum", ["Rum a whiskey", "Rum & whiskey", "Rum és whiskey", "Rum i whiskey", "Rum & Whiskey"], [
    [
      ["Tuzemský um 38%", "Domestic rum spirit 38%", "Tuzemský um 38%", "Tuzemský um 38%", "Tuzemský um 38%"],
      "0,04 l", 3.50
    ],
    ["Captain Morgan Original Spiced Gold 35%", "0,04 l", 4.90],
    ["Bumbu Original 40%", "0,04 l", 9.90],
    ["Bumbu XO 40%", "0,04 l", 12.90],
    ["Bumbu Cream 15%", "0,04 l", 7.90],
    ["Ron Millonario Kuytchi 40%", "0,04 l", 10.90],
    ["Ron Millonario 10 Aniversario Reserva 40%", "0,04 l", 10.90],
    ["Zacapa 23YO 40%", "0,04 l", 12.90],
    ["Plantation XO 40%", "0,04 l", 12.90],
    ["Jameson Irish Whiskey 40%", "0,04 l", 4.90],
    ["Chivas Regal 12y 40%", "0,04 l", 6.90],
    ["The Deacon 40%", "0,04 l", 9.90]
  ]);

  group("cocktails", ["Miešané nápoje", "Cocktails", "Koktélok", "Koktajle", "Cocktails"], [
    ["Italien Spritz", "0,15 l", 7.90],
    ["Cuba Libre", "0,15 l", 7.90, "Havana Club Añejo 3 Años 40%, Pepsi."],
    ["Gin & Tonic", "0,15 l", 6.90, "Beefeater Gin 40%, Schweppes Tonic."],
    ["Jägerbomb", "0,20 l", 7.90, "Jägermeister 35%, Red Bull Energy Drink."]
  ]);

  group("wine", ["Víno", "Wine", "Borok", "Wino", "Wein"], [
    [
      "KP Jagnet Veltlínske zelené", "0,25 l", 8.90,
      ["biele suché, fľaša.", "dry white wine, bottle.", "száraz fehérbor, palack.", "białe wytrawne, butelka.", "Trockener Weißwein, Flasche."]
    ],
    [
      "KP Jagnet Frankovka modrá", "0,25 l", 8.90,
      ["červené suché, fľaša.", "dry red wine, bottle.", "száraz vörösbor, palack.", "czerwone wytrawne, butelka.", "Trockener Rotwein, Flasche."]
    ]
  ]);

  group("sparkling", ["Šumivé vína a šampanské", "Sparkling wine & champagne", "Gyöngyözőborok és pezsgők", "Wina musujące i szampany", "Schaumwein & Champagner"], [
    ["Terra Serena Vino Bianco Frizzante", "0,10 l", 3.90],
    ["Terra Serena Vino Bianco Frizzante", "0,75 l", 29.90],
    ["Bepin De Eto", "0,75 l", 49.00],
    ["G.H.MUMM brut", "0,75 l", 99.00],
    ["Luc Belaire", "0,75 l", 99.00]
  ]);

  group("beer", ["Pivo", "Beer", "Sörök", "Piwo", "Bier"], [
    [
      "Pilsner Urquell 12°", "0,40 l", 4.50,
      ["čapované.", "draught beer.", "csapolt sör.", "piwo lane.", "vom Fass."]
    ],
    [
      "Radegast 10°", "0,40 l", 4.20,
      ["čapované.", "draught beer.", "csapolt sör.", "piwo lane.", "vom Fass."]
    ],
    [
      ["Birell pomelo & grep", "Birell pomelo & grep", "Birell pomelo és grapefruit", "Birell pomelo i grejpfrut", "Birell pomelo & grep"],
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
      ["Birell nealkoholické pivo", "Birell non-alcoholic beer", "Birell alkoholmentes sör", "Piwo bezalkoholowe Birell", "Birell alkoholfreies Bier"],
      "0,50 l", 4.00,
      ["plechovka", "can", "konzervdoboz", "Puszka", "Dose"]
    ]
  ]);

    group("soft", ["Nealko nápoje", "Soft drinks", "Üdítőitalok", "Napoje bezalkoholowe", "Erfrischungsgetränke"], [
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
      ]
    ],
    ["Pepsi / Pepsi Max", "0,50 l", 4.00],
    ["7up / Mirinda", "0,50 l", 4.00],
    ["Schweppes Tonic / Pink", "0,50 l", 4.00],
    ["Mattoni Imuno", "0,70 l", 5.00],
    ["Magnesia Plus ", "0,70 l", 5.00],
    [
      "Mattoni #Yess", "0,50 l", 3.50,
      ["detský ochutený nápoj", "flavoured drink for children", "izesített ital gyerekeknek", "napój smakowy dla dzieci", "aromatisiertes Kindergetränk"]
    ],
    [
      ["Happy day 100% džús", "Happy day 100% juice", "Happy day 100%-os gyümölcslé", "Sok Happy day 100%", "Happy day 100% Saft"],
      "0,33 l", 4.00,
      ["pomaranč, jablko, multivitamín", "orange, apple, multivitamin", "narancs, alma, multivitamin", "pomarańcza, jabłko, multiwitamina", "Orange, Apfel, Multivitamin"]
    ],
    [
      "MyTea", "0,50 l", 4.00,
      [
        "ľadový čaj: broskyňa, citrón",
        "iced tea: peach, lemon",
        "jeges tea: őszibarack, citrom",
        "herbata mrożona: brzoskwiniowa, cytrynowa",
        "eistee: Pfirsich, Zitrone"
      ]
    ],
    [
      "Rauch Yippy", "0,33 l", 3.50,
      ["detský ovocný nápoj", "flavoured drink for children", "izesített ital gyerekeknek", "napój owocowy dla dzieci", "aromatisiertes Kindergetränk"]
    ],
    ["Rauch Sport Isotonic", "0,50 l", 5.00],
    [
      "Cans", "0,33 l", 5.00,
      [
        "Jemne perlivá, bez cukru a sladidiel.",
        "Lightly sparkling, no sugar or sweeteners.",
        "Enyhén szénsavas, cukor és édesítőszerek nélkül.",
        "Lekko gazowany, bez cukru i substancji słodzących.",
        "Leicht sprudelnd, ohne Zucker und Süßungsmittel."
      ]
    ],
    [
      "Red Bull Energy Drink", "0,30 l", 5.00
    ]
  ]);

    group("hot", ["Teplé nápoje", "Hot drinks", "Forró italok", "Napoje gorące", "Heißgetränke"], [
    ["Espresso", "8 g", 3.80, "JM 1862 Vienna", [7]],
    ["Espresso Macchiato", "8 g", 3.90, "JM 1862 Vienna", [7]],
    ["Espresso Doppio", "15 g", 5.50, "JM 1862 Vienna", [7]],
    ["Cappuccino", "8 g", 4.50, "JM 1862 Vienna", [7]],
    ["Latte Macchiato", "8 g", 4.50, "JM 1862 Vienna", [7]],
    ["Latte Macchiato coconut Tatratea", "8 g", 7.50, "JM 1862 Vienna, Tatratea Coconut 22%.", [7]],
    ["Flat White", "15 g", 5.90, "JM 1862 Vienna", [7]],
    [
      ["Viedenská káva", "Viennese coffee", "Bécsi kávé", "Kawa po wiedeńsku", "Wiener Kaffee"],
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
      "Babyccino", "0,15 l", 2.90,
      [
        "Mlieko, sirup podľa ponuky, kakao.",
        "Milk, syrup from the available selection, cocoa.",
        "Tej, szirup az aktuális kínálatból, kakaó.",
        "Mleko, syrop według oferty, kakao.",
        "Milch, Sirup nach Angebot, Kakao."
      ],
      [7]
    ],
    ["Matcha Latte", "0,20 l", 4.90, "JM Organic Matcha", [7]],
    ["Ube Latte", "0,20 l", 4.90, null, [7]],
    [
      ["Čaj porciovaný Julius Meinl", "Julius Meinl tea", "Julius Meinl filteres tea", "Herbata Julius Meinl w saszetce", "Julius Meinl Tee"],
      "0,20 l", 2.90
    ],
    [
      ["Čaj z čerstvej mäty", "Fresh mint tea", "Friss mentatea", "Herbata ze świeżej mięty", "Frischer Minztee"],
      "0,20 l", 4.50
    ],
    [
      ["Med porciovaný", "Portioned honey", "Adagolt méz", "Porcja miodu", "Portionshonig"],
      "0,02 l", 1.00
    ]
  ]);

  group("soups", ["Polievky", "Soups", "Levesek", "Zupy", "Suppen"], [
    [
      [
        "Kapustnica s údeným mäsom a klobásou, kaizerka",
        "Sauerkraut soup with smoked meat and sausage, Kaiser roll",
        "Savanyú káposztaleves füstölt hússal és kolbásszal, Kaiser zsemle",
        "Zupa kapuściana z wędzonym mięsem i kiełbasą, bułka Kaiser",
        "Sauerkrautsuppe mit geräuchertem Fleisch und Wurst, Kaiserbrötchen"
      ],
      "0,40 l", 7.50, null, [1, 3, 5, 8, 9, 13], "images/kapustnica.webp"
    ],
    [
      [
        "Paradajková polievka s pestom a mini mozzarellou",
        "Tomato soup with pesto & mini mozzarella",
        "Paradicsomleves pestóval és mini mozzarellával",
        "Zupa pomidorowa z pesto i mini mozzarellą",
        "Tomatensuppe mit Pesto und Mini-Mozzarella"
      ],
      "0,40 l", 5.90, null, [7, 8]
    ]
    
  ]);

  group("mains", ["Hlavné jedlá", "Main dishes", "Főételek", "Dania główne", "Hauptgerichte"], [
    [
      "Freeride Burrito", "120 g", 10.90,
      [
        "Trhané hovädzie/kuracie mäso, cheddar, jalapeño, cibuľa, BBQ omáčka.",
        "Pulled beef/chicken, cheddar, jalapeños, onion, BBQ sauce.",
        "Tépett marha-/csirkehús, cheddar, jalapeño, hagyma, BBQ-szósz.",
        "Szarpana wołowina lub kurczak, cheddar, jalapeño, cebula, sos BBQ.",
        "Gezupftes Rind-/Hühnerfleisch, Cheddar, Jalapeños, Zwiebel, BBQ-Sauce."
      ],
      [1, 7, 10]
    ],
    [
      "Riders Big Dog", "70 g", 8.90,
      [
        "Tradičný spišský párok, cheddar, horčica/kečup, uhorka, cibuľka.",
        "Traditional Spiš sausage, cheddar, mustard/ketchup, pickle, onion.",
        "Hagyományos szepességi virsli, cheddar, mustár/ketchup, csemegeuborka, hagyma.",
        "Tradycyjna kiełbaska spiska, cheddar, musztarda/ketchup, ogórek konserwowy, cebula.",
        "Traditionelles Spiš-Würstchen, Cheddar, Senf/Ketchup, Gewürzgurke, Zwiebel."
      ],
      [1, 3, 7, 10]
    ],
    [
      "The Pit Stop", "150 g", 8.90,
      [
        "Pita chlieb, leberkäse, cheddar, uhorky, chrenová majonéza.",
        "Pita bread, Leberkäse, cheddar, pickles, horseradish mayonnaise.",
        "Pita, Leberkäse, cheddar, csemegeuborka, tormás majonéz.",
        "Pita, leberkäse, cheddar, ogórki konserwowe, majonez chrzanowy.",
        "Pitabrot, Leberkäse, Cheddar, Gewürzgurken, Meerrettichmayonnaise."
      ],
      [1, 3, 7, 10]
    ],
    [
      [
        "Vyprážané kuracie stripsy s hranolkami",
        "Fried chicken strips with fries",
        "Rántott csirkecsíkok sült burgonyával",
        "Smażone stripsy z kurczaka z frytkami",
        "Frittierte Hähnchenstreifen mit Pommes"
      ],
      "150 g / 150 g", 13.90, null, [1, 7]
    ],
    [
      [
        "Trhané hovädzie/kuracie mäso v BBQ omáčke s hranolkami a cheddarovou omáčkou",
        "Pulled beef/chicken in BBQ sauce with fries and cheddar sauce",
        "Tépett marha-/csirkehús BBQ-szószban, sült burgonyával és cheddarszósszal",
        "Szarpana wołowina lub kurczak w sosie BBQ z frytkami i sosem cheddar",
        "Gezupftes Rind-/Hühnerfleisch in BBQ-Sauce mit Pommes und Cheddarsauce"
      ],
      "120 g / 150 g", 13.90, null, null
    ],
    [
      "Pizza", "400 g", 13.90,
      [
        "Podľa ponuky.",
        "Available selection.",
        "Az aktuális kínálat szerint.",
        "Według aktualnej oferty.",
        "Je nach Angebot."
      ],
      [1, 3, 7]
    ]
  ]);

  group("sweet", ["Sladké jedlá", "Sweet dishes", "Édes ételek", "Dania na słodko", "Süße Speisen"], [
    [
      "Yeti Chocolate Ride", "250 g", 8.90,
      [
        "Mini lievance, Nutella krém, jahoda, šľahačka, sekané lentilky.",
        "Mini pancakes, Nutella spread, strawberry, whipped cream, chopped candy-coated chocolate.",
        "Mini palacsinták, Nutella-krém, eper, tejszínhab, aprított csokoládédrazsé.",
        "Mini placuszki, krem Nutella, truskawka, bita śmietana, posiekane draże czekoladowe.",
        "Mini-Pancakes, Nutella-Creme, Erdbeere, Schlagsahne, gehackte Schokolinsen."
      ],
      [1, 3, 7, 8]
    ],
    [
      "Yeti Toffi Trail", "250 g", 8.90,
      [
        "Mini lievance, karamelový krém, banán, karamelový popcorn, šľahačka.",
        "Mini pancakes, caramel spread, banana, caramel popcorn, whipped cream.",
        "Mini palacsinták, karamellkrém, banán, karamellás popcorn, tejszínhab.",
        "Mini placuszki, krem karmelowy, banan, karmelowy popcorn, bita śmietana.",
        "Mini-Pancakes, Karamellcreme, Banane, Karamellpopcorn, Schlagsahne."
      ],
      [1, 3, 7]
    ],
    [
      "Pistachio Downhill", "250 g", 8.90,
      [
        "Belgické vafle, pistáciový krém, čokoláda, maliny, drvené pistácie.",
        "Belgian waffles, pistachio spread, chocolate, raspberries, crushed pistachios.",
        "Belga gofri, pisztáciakrém, csokoládé, málna, tört pisztácia.",
        "Gofry belgijskie, krem pistacjowy, czekolada, maliny, kruszone pistacje.",
        "Belgische Waffeln, Pistaziencreme, Schokolade, Himbeeren, gehackte Pistazien."
      ],
      [1, 3, 7, 8]
    ],
    [
      "Lotus Ride", "250 g", 8.90,
      [
        "Belgické vafle, Lotus krém, Lotus sušienky, vanilková zmrzlina, šľahačka.",
        "Belgian waffles, Lotus spread, Lotus biscuits, vanilla ice cream, whipped cream.",
        "Belga gofri, Lotus-krém, Lotus keksz, vaníliafagylalt, tejszínhab.",
        "Gofry belgijskie, krem Lotus, ciasteczka Lotus, lody waniliowe, bita śmietana.",
        "Belgische Waffeln, Lotus-Creme, Lotus-Kekse, Vanilleeis, Schlagsahne."
      ],
      [1, 3, 7]
    ],
    [
      "Mango Winter Flow", "250 g", 8.90,
      [
        "Belgické vafle, mango, kokosová zmrzlina, kokosové lupienky.",
        "Belgian waffles, mango, coconut ice cream, coconut flakes.",
        "Belga gofri, mangó, kókuszfagylalt, kókuszpehely.",
        "Gofry belgijskie, mango, lody kokosowe, płatki kokosowe.",
        "Belgische Waffeln, Mango, Kokoseis, Kokosflocken."
      ],
      [1, 3, 7]
    ]
  ]);

  group("sides", ["Prílohy", "Sides", "Köretek", "Dodatki", "Beilagen"], [
    [
      ["Hranolky", "Fries", "Sült burgonya", "Frytki", "Pommes"],
      "150 g", 4.90,
      ["S kečupom.", "With ketchup.", "Ketchuppal.", "Z ketchupem.", "Mit Ketchup."],
      null
    ],
    [
      ["Batátové hranolky", "Sweet potato fries", "Édesburgonya-hasábok", "Frytki z batatów", "Süßkartoffelpommes"],
      "150 g", 5.90,
      ["S tatárskou omáčkou.", "With tartar sauce.", "Tartármártással.", "Z sosem tatarskim.", "Mit Remoulade."],
      null
    ],
    [
      ["Pochutiny", "Sauces", "Szószok", "Sosy", "Saucen"],
      "30 g", 1.50,
      [
        "Kečup / tatárska omáčka / horčica.",
        "Ketchup / tartar sauce / mustard.",
        "Ketchup / tartármártás / mustár.",
        "Ketchup / sos tatarski / musztarda.",
        "Ketchup / Remoulade / Senf."
      ],
      null
    ]
  ]);

  group("desserts", ["Dezerty a chuťovinky", "Desserts & snacks", "Desszertek és harapnivalók", "Desery i przekąski", "Desserts & Snacks"], [
    [
      ["Dezert", "Dessert", "Desszert", "Deser", "Dessert"],
      "1 ks", 6.90,
      ["Podľa ponuky.", "Available selection.", "Az aktuális kínálat szerint.", "Według aktualnej oferty.", "Je nach Angebot."],
      [1, 3, 7]
    ],
    ["Donut", "55 g", 4.20, null, [1, 3, 7]],
    ["Kinder Bueno", "1 ks", 2.90],
    [
      ["Kinder vajce", "Kinder Surprise", "Kinder Meglepetés", "Kinder Niespodzianka", "Kinder Überraschung"],
      "1 ks", 3.50
    ],
    ["Horalka", "1 ks", 2.50],
    [
      ["Chipsy Lays MAXX", "Lays MAXX chips", "Lays MAXX chips", "Chipsy Lays MAXX", "Lays MAXX Chips"],
      "65 g", 3.90
    ]
  ]);

  window.PARKSNOW_MENU = {
    categories,
    items
  };
})();