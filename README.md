# O projektu Fakta o klimatu

Shromažďujeme data o klimatu a klimatické změně, která poskytují vědecké instituce (ČHMÚ, NASA, Eurostat a jiné) a zpracováváme z nich grafy, infografiky a přístupné datasety pro další použití.

Jsme studenti, doktorandi, akademici nebo IT profesionálové. Sami jsme si zkusili vyhledat data o teplotě či emisích, najít určité informace v mnohasetstránkových zprávách IPCC nebo původních článcích. Jde to, ale zabere to hodně času. Musíte umět dobře anglicky a musíte si dohledávat spoustu souvislostí. Běžný novinář nebo politik (ani bězný Čech) většinou nemá tolik trpělivosti nebo dostatečnou úroveň angličtiny a tak si data nevyhledá. Rozhodli jsme se proto, že tu práci, kterou jsme s hledáním dat sami měli, ostatním ušetříme - zpracujeme infografiky, dáme odkazy na původní data i naše zpracované datasety na jedno místo a doplníme základní souvislosti. A dáme je k dispozici všem, pro koho budou užitečné. Doufáme, že se postupně tyto informace dostanou ke všem, kterých se změny klimatu týkají. Tedy ke všem.

# Vývojářská dokumentace

## Jak nahrávat obsah

Nahrávání obsahu vyžaduje drobné technické zkušenosti, schopnost pracovat s verzovacím systémem Git a dodržení tohoto návodu.

## Titulní stránka

Obsah je členěn do sekcí, ke kterým je jedna či více info grafik, které odkazují vždy jeden obrázek. Po sekcích následuje seznam studií, datasetů a dalších stránek. Obsah sekcí odpovídá tématům (`tags-topics`) definovaných u jednotlivých objektů. Metadata těchto sekcí (název, popis, ...) jsou uloženy v `_data/tags.yml`. Obsah ostatních částí (studie, datasety, stránky) je definován v souboru titulní stránky (`_stranky/index.md`)

### Vytvoření stránky grafiky

Zobrazují se v sekcích na úvodní stránce, každá infografika musí mít svoji stránku samostatnou stránku ve složce `_infografiky/`.
Názvy souborů musí mít vždy formát `<SLUG>.md`. Soubory jsou pro přehlednost ukládány ve složkách podle primárního tématu.

Co se týče formátu, inspirujte se u existujících a dodržujte hlavičku. Váhou určíte pořadí v rámci grafik v jedné sekci – stránky s nižší váhou se zobrazí před stránkami s váhou vyšší. Nezbytné pro správné zobrazení jsou témata (`tags-topics`) a oblasti (`tags-scope`). Zde se vyskytují tagy, podle kterých se infografiky vybírají do sekcí na úvodní stránce.

Obrázky jednotlivých grafik (pouze PDF) nahrávejte do stejné složky jako infografiky se stejným názvem jako je soubor infografiky.

## Jak vyvíjet lokálně

_Fakta o klimatu_ lze vyvíjet a testovat i lokálně na vlastním stroji. Můžete tak okamžitě vidět, jak bude například nová infografika, stránka datasetu nebo studie vypadat na živém webu. Zároveň lze experimentovat například s novým typem obsahu, stylem stránek atd.

Aktuálně podporujeme dva způsoby lokálního vývoje: pomocí kontejnerů (preferovaný způsob), nebo ruční instalací nutných balíčků. Oba způsoby jsme prozatím ozkoušeli a fungují pouze na populárních linuxových distribucích (Fedora, Ubuntu atd.).

### Kontejnery

Kontejnery umožňují oddělit programy nutné pro sestavení a spuštění webu od zbytku vašeho operačního systému. Zároveň vytvoří konzistentní prostředí, které je téměř totožné s tím, ve kterém se sestavuje živý, publikovaný web.

Následující instrukce předpokládají, že pracujete na distribuci Fedora, ačkoliv pro ostatní distribuce by měly fungovat též, s minimálními změnami. Pro správu kontejnerů používáme balíček [Podman](https://podman.io), který je na Fedoře předinstalovaný, ale použití s [Dockerem](https://www.docker.com/) je téměř totožné (viz níže).

Jedinou další prerekvizitou je program Make, který není v základní výbavě většiny distribucí. Na Fedoře jej nainstalujete jednoduše pomocí správce balíčků:
```bash
sudo dnf install -y make
```

Prvním krokem je získání zdrojového kódu webu. Zadáním následujících příkazů do terminálu jej stáhnete z našeho GitHubového projektu pomocí Gitu do adresáře `faktaoklimatu`:
```bash
git clone https://github.com/faktaoklimatu/web.git faktaoklimatu
cd faktaoklimatu
```

Aby měl kontejner ke zdroji přístup, je potřeba upravit bezpečnostní kontext celého adresáře. (Pokud vaše distribuce nepoužívá SELinux, tento krok přeskočte.) V terminálu v adresáři se zdrojovým kódem spusťte následující příkaz:
```bash
sudo chcon -Rt svirt_sandbox_file_t .
```

Následně stačí v terminálu zadat
```bash
make container
```

Při prvním spuštění tento příkaz stáhne a připraví software potřebný pro vývoj webu. To může chvíli trvat, v závislosti na rychlosti připojení, většinou do patnácti minut. (Další spuštění jsou už rychlejší.) Následně se kontejner spustí, sestaví web ze zdrojových kódů a spustí webový server.

Jakmile je vše připraveno, objeví se hláška `Server running... press ctrl-c to stop.`. Vygenerovaný web je po dobu běhu kontejneru přístupný na adrese <http://localhost:4000/>. Změny, které provedete například v doprovodných textech infografik nebo na jiných stránkách, se rychle promítnou i zde.

Kontejner zastavíte stisknutím <kbd>Ctrl</kbd>+<kbd>C</kbd>. Znovu jej spustíte opět příkazem `make container`. Při dalších spuštěních se automaticky provádí už jen nezbytné kroky (např. generování obrázků nových infografik nebo generování nových HTML stránek).

**Poznámka:** Pokud přidáváte novou stránku, např. novou infografiku, je potřeba kontejner zastavit a znovu spustit, aby se vygenerovaly všechny potřebné soubory. Pokud pouze upravujete texty, není třeba kontejner restartovat.

### Ruční instalace

Je k tomu potřeba si připravit potřebné nástroje, doporučujeme postupovat podle tohoto [návodu](https://help.github.com/en/articles/setting-up-your-github-pages-site-locally-with-jekyll) (v případě Ubuntu 18.04 nutno nejdříve nainstalovat balíčky `build-essential libpng-dev ruby-dev zlib1g-dev`). Dále je potřeba mít nainstalovaný vektorový editor [Inkscape](https://inkscape.org/) a utilitu `pdf2svg`, které se používají na konverzi infografik.

Poté již stačí v kořenové složce projektu spustit příkaz `make local`, který sestaví, co je potřeba, zpřístupní web na adrese <http://localhost:4000> a následně bude monitorovat soubory a v případě jejich změny automaticky sestaví novou verzi stránky.

Po provedení všech změn nezapomeňte pushnout, ideálně do samostatné větve u které následně požádáte o *Pull Request*, aby existovala možnost práci zkontrolovat.

## Jak nasadit novou verzi

Na webu https://faktaoklimatu.cz se nasadí automaticky každá verze, která je v hlavní větvi (`master`) tohoto repozitáře na GitHubu.

V případě potíží zůstane k dispozici stará verze a důvod selhání bude potřeba získat skrze správce, tím je vlastník tohoto repozitáře.
