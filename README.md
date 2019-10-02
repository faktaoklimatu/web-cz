# O projektu Fakta o klimatu

Shromažďujeme data o klimatu a klimatické změně, která poskytují vědecké instituce (ČHMÚ, NASA, Eurostat a jiné) a zpracováváme z nich grafy a infografiky pro další použití.

Jsme studenti, doktorandi, akademici nebo IT profesionálové. Sami jsme si zkusili vyhledat data o teplotě či emisích, najít určité informace v mnohasetstránkových zprávách IPCC nebo původních článcích. Jde to, ale zabere to hodně času. Musíte umět dobře anglicky a musíte si dohledávat spoustu souvislostí. Běžný novinář nebo politik (ani bězný Čech) většinou nemá tolik trpělivosti nebo dostatečnou úroveň angličtiny a tak si data nevyhledá. Rozhodli jsme se proto, že tu práci, kterou jsme s hledáním dat sami měli, ostatním ušetříme - zpracujeme infografiky, dáme odkazy na původní data i naše zpracované datasety na jedno místo a doplníme základní souvislosti. A dáme je k dispozici všem, pro koho budou užitečné. Doufáme, že se postupně tyto informace dostanou ke všem, kterých se změny klimatu týkají. Tedy ke všem.

# Vývojářská dokumentace

## Jak nahrávat obsah

Nahrávání obsahu vyžaduje drobné technické zkušenosti, schopnost pracovat s verzovacím systémem Git a dodržení tohoto návodu.

Obsah je členěn do sekcí, ke kterým je jedna či více info grafik, které odkazují vždy jeden obrázek.

## Jednotlivé sekce

### Vytvoření sekce

Jednotlivé sekce se zobrazují na úvodní stránce a vytváří se v `_sekce/`. Názvy souborů musí mít vždy formát
`<SLUG>.md`, kde SLUG je nějaké zkrácené smysluplné jméno používající jen znaky anglické abecedy, číslice a znaky jako `-` a `_`.

Co se týče formátu, inspirujte se u existujících, dodržte hlavičku. Váhou určete pořadí na úvodní stránce.

### Vytvoření stránky grafiky

Zobrazují se v sekcích na úvodní stránce, každá infografika musí mít svoji stránku samostatnou stránku v `_infografiky/`.
Názvy souborů musí mít vždy formát `<SLUG>.md`. Soubory jsou pro přehlednost ukládány v složkách podle primárního tagu.

Co se týče formátu, inspirujte se u existujících, dodržte hlavičku. Váhou určíte pořadí v rámci grafik v jedné sekci.
Nezbytné pro správné zobrazení jsou tagy, např. `tags: [ teploty ]`. Zde se vyskytují tagy, podle kterých se infografiky vybírají do sekcí na úvodni stránce.

Obrázky jednotlivých grafik (pouze SVG) a data (aktuálně pouze XLSX) nahrávejte do stejé složky jako infografiky se stejným názvem jako je souor infografiky.

## Změna e-mailové adresy pro kontaktní formulář

V souboru `_config.yml` nakonfigurujte pomocí hodnoty `contact`.

## Jak vyvíjet lokálně

Stránku lze vyvíjet i na svém osobním stroji a experimentovat tak například s novým typem obsahu, stylem stránky...
Je k tomu potřeba si připravit potřebné nástroje, doporučujeme postupovat podle tohoto 
[návodu](https://help.github.com/en/articles/setting-up-your-github-pages-site-locally-with-jekyll) (v případě Ubuntu 
18.04 nutno nejdříve nainstalovat balíčky `libpng-dev zlib1g-dev build-essential dh-autoreconf`). Dále je potřeba 
mít nainstalovaný vektorový editor [Inkscape](https://inkscape.org/) a utilitu `pdf2svg`,
které se používají na konverzi infografik.

Poté již stačí v kořenové složce projektu spustit příkaz `make local`, který sestaví, co je potřeba, zpřístupní web na adrese
http://127.0.0.1:4000 a následně bude monitorovat soubory a v případě jejich změny automaticky sestaví novou verzi stránky.

Po provedení všech změn nezapomeňte pushnout, ideálně do samostatné větve u které následně požádáte o *Pull Request*, aby existovala možnost práci zkontrolovat.

## Jak nasadit novou verzi

Na webu https://faktaoklimatu.cz (resp. https://mukrop.github.io/faktaoklimatu/) se nasadí automaticky každá verze, která je v hlavní větvi (`master`) tohoto repozitáře na GitHubu.

V případě potíží zůstane k dispozici stará verze a důvod selhání bude potřeba získat skrze správce, tím je vlastník tohoto repozitáře.
