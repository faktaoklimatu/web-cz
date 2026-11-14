# web-cz: pravidla pro ETS2 blog

Platí pro práci na ETS2 blogu (`collections/_explainers/ets2-zranitelne-domacnosti.md`, větev `ets2-blog-zranitelne-domacnosti`). Repozitář je publikovaný výstup. Analýza, R skripty a metodika jsou v samostatné dílně (Google Drive, složka ETS2) a do repozitáře se nekopírují.

## Obsah a styl
- **ETS2 vždy v podmiňovacím způsobu** („zavedení ETS2 by…“). Vláda ETS2 odmítá, nepíšeme, že se stane jistě.
- **Každé tvrzení je inline hypertextový odkaz** na zdroj, bez závorek. U ukazatelů uvádíme rok.
- **Absolutní čísla jen za Česko.** Žádné celoevropské sumy v eurech.
- **Čísla jen v základním scénáři** (asi 60 €/t, rok 2028). Počty domácností zaokrouhlujeme, přesné intervaly spolehlivosti patří do poznámky.
- **Jednoduchý jazyk, ne úřednický.** Online verze je krátká, detaily patří do expanderů nebo do PDF.
- Text převzatý z blogu v dílně se nemění, jen se přenáší. Změny textu navrhuje autor.

## Data a grafy
- **Data grafů nepsat ručně.** Generují je R skripty z dílny a ukládají do `_data/ets2/`. Grafy a mapa se na webu kreslí z těchto souborů.
- **Mikrodata (ČSÚ ENERGO, SILC, SRÚ) ani nic, z čeho by šla odvodit, nikdy nepatří do repozitáře.** Do `_data/ets2/` jen agregáty (archetypy, decily, ORP), nikdy řádky za domácnosti. Nic neodvozovat z malých buněk. Mikrodata jsou lokálně v `~/Documents/ČSÚ` a nekopírují se.

- **Pracujeme s archetypy** (typové domácnosti), ne s celostátními průměry. Neuvádět jediný „průměr za všechny“ tam, kde se archetypy liší.
- **Terminologie:** „ohrožení energetickou chudobou (2M)“.
- **Konzistence čísel:** každý podíl a procento má čitatele i jmenovatele ve stejném rozsahu. Shodná čísla u skupin, které se mají lišit, jsou varování. Při změně čísla ji zkontrolovat v textu, expanderech i kalkulačce.
- **Data pro web vznikají v R v dílně.** Skripty smí spustit autor i Claude (postup v `ETS2/CLAUDE.md`). Čísla se v repozitáři ručně nepřepočítávají.
- **Název ukazatele:** „ohrožení energetickou chudobou (2M)“, ne „drahé bydlení“. Energetickou chudobu uvádět jen s přepočteným prahem po ETS2.
- **Dálkové teplo** je archetyp „byt na teple ze zdroje v ETS2“, asi 380 tis. domácností a dolní odhad. Nezaměňovat s celým dálkovým teplem (velké teplárny jsou už v ETS1).
- Energetická krize 2022–23 není argument proti datům ze SRÚ a SILC.
- Finální analýza poběží na novém SILC/SRÚ, čísla v textu se pak mohou změnit. Proto je neduplikovat ručně na více místech.

## Struktura (ETS2 blog)
- Komponenty: `includes-local/ets2-blog/`, styly `assets-local/_ets2-blog.scss`, skript `assets-local/js/ets2-blog.js`.
- Rozbalovací boxy dělá `expander.html`, shrnutí `tldr.html`. Klikací popovery a poznámky pod zdrojem jsou vlastní komponenty (`pop-inline`, `note-wrap`).
- Placeholdery, které zůstávají otevřené: `#ODKAZ-PDF-studie`, `#ODKAZ-MF-hlavni-report`, autoři vizualizace a editace. Grafy a mapa jsou zatím vynechané (v `.md` komentáře `TODO graf …`).

## Postup
- **Před změnou hotového výstupu nejdřív navrhnout změny a počkat na souhlas.**
- Pracuje se na větvi, ne v `master`. Změny z `master` se přenášejí rebasem, bez merge commitů.
- Místní server: `make local -j2` (Ruby 3.3 z Homebrew), běží na <http://localhost:4000/>.
