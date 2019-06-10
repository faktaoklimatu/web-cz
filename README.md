# README

## Jak nahrávat obsah

Nahrávání obsahu vyžaduje drobné technické zkušenosti, schopnost pracovat s verzovacím systémem Git a dodržení tohoto návodu.

Obsah je členěn do sekcí, ke kterým je jedna či více info grafik, které odkazují vždy jeden obrázek.

Jednotlivé sekce

### Vytvoření sekce

Jednotlivé sekce se zobrazují na úvodní stránce a vytváří se v `_posts/sections/`. Názvy souborů musí mít vždy formát:
`YYYY-MM-DD-<SLUG>.md`, kde SLUG je nějaké zkrácené smysluplné jméno používající jen znaky anglické abecedy, číslice a znaky jako `-` a `_`.

Co se týče formátu, inspirujte se u existujících, dodržte hlavičku. Váhou určete pořadí na úvodní stránce.

### Vytvoření stránky grafiky

Zobrazují se v galerii na úvodní stránce, každá infografika musí mít svoji stránku samostatnou stránku v `_posts/graphics/`.
Názvy souborů musí mít vždy formát `YYYY-MM-DD-<SLUG>.md`. Pro přehlednost je doporučeno dávat název souboru stejný jako u sekce a
rozlišovat je pomocí číselného suffixu (`__2.md`).

Co se týče formátu, inspirujte se u existujících, dodržte hlavičku. Váhou určíte pořadí v rámci grafik v jedné sekci.
Nezbytné pro správné zobrazení jsou následující tagy:

- `tags: sections-zmeny-teplot`, zde zadejte název typu (`sections-`) doplněný o SLUG.
- `image: assets/data/zmeny-teplot/zmeny-teplot-1.jpg` adresa v rámci repozitáře.

Obrázky jednotlivých grafik nahrávejte do složky `assets/data/` do struktury dle vlastního uvážení.

## Změna e-mailové adresy pro kontaktní formulář

V souboru `_config.yml` nakonfigurujte pomocí hodnoty `contact`.

## Jak vyvíjet lokálně

Stránku lze vyvíjet i na svém osobním stroji a experimentovat tak například s novým typem obsahu, stylem stránky...
Je k tomu potřeba si připravit potřebné nástroje, doporučujeme postupovat podle tohoto [návodu](https://help.github.com/en/articles/setting-up-your-github-pages-site-locally-with-jekyll).

Poté již stačí v kořenové složce projektu spustit příkaz `jekyll serve`, který zpřístupní web na adrese
http://127.0.0.1:4000 a následně bude monitorovat soubory a v případě jejich změny automaticky sestaví novou verzi stránky.

Po provedení všech změn nezapomeňte pushnout, ideálně do samostatné větve u které následně požádáte o *Pull Request*, aby existovala možnost práci zkontrolovat.

## Jak nasadit novou verzi

Na webu https://www.faktaoklimatu.cz (https://mukrop.github.io/faktaoklimatu/) se nasadí automaticky každá verze, která je v hlavní větvi (`master`) tohoto repozitáře
na GitHubu.

V případě potíží zůstane k dispozici stará verze a důvod selhání bude potřeba získat skrze správce, tím je vlastník tohoto repozitáře.

## Funkcionalita k dokončení

- Galerie
- Lightboxy
- ScrollSpy v hlavním menu
- Layout lightboxu a stránky detailu infografiky