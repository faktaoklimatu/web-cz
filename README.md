# O projektu Fakta o klimatu

[![Build Status](https://travis-ci.com/faktaoklimatu/web-cz.svg?branch=master)](https://travis-ci.com/faktaoklimatu/web-cz)

Projekt _Fakta o klimatu_ usiluje o zkvalitnění společenské diskuse o klimatické změně. Snažíme se dodávat srozumitelné údaje široké veřejnosti a vizuálně zpracovávat vědecké informace, aby bylo rozhodování ve věcech týkajících se klimatu založené na aktuálních, kredibilních a ověřených datech.

Debata o klimatické změně je komplikovaná a na všech stranách plná zbytečných emocí, polopravd a mýtů. Chceme poutat pozornost na důležitá témata a stavět most mezi vědci a lidmi, kterých se změny klimatu týkají. A to jsou všichni lidé.

Jsme [tým profesionálů zabývajících se různými obory](CONTRIBUTORS.md) – přírodovědou, IT, společenskými vědami, pedagogikou nebo komunikací. Finance na provoz získáváme od dárců, nepracujeme na ničí objednávku. Při naší činnosti komunikujeme s odborníky, politiky, energetickými firmami i aktivistickými hnutími. _Fakta o klimatu_ jsou však nezávislý projekt, který [může podpořit každý](https://www.darujme.cz/projekt/1203742).

## Konvence v repozitáři

* Při vývoji postupujte dle [návodů v systému Notion](https://faktaoklimatu.notion.site/Workflow-GitHub-57f94afa90864f51845b2be4c553cb6b).
* Při psaní textů dodržujte české typografické konvence, viz [dokument v systému Notion](https://faktaoklimatu.notion.site/Stylistika-a-typografie-86b57bf7662c46738c35e4381e48db47).
* Nadpisy _issues_ a _pull requestů_ jsou psány v češtině s diakritikou a začínají velkým písmenem. Udržte je krátké a věcné.
* Text a diskuze v issue může být méně formální, klidně bez diakritiky a klidně ve slovenštině.
* Snažte se každému _issue_ přiradit vhodné štítky a projekt. Jestli nevíte zvolit, přidejte štítek _na roztřízení_.
* Nadpisy ke _commitům_ pište v češtině s diakritikou, velkým prvním písmenem a bez tečky na konci. Snažte se udržet je krátké (ideálně do 50 znaků).
* Detailní popis _commitů_ může mít dle potřeby klidně i několik řádků. Používejte odrážky nebo celé věty (s tečkou na konci).
* Chcete-li po přijetí commitu do produkce automaticky zavřít odpovídající _issue_ na GitHubu, přidejte větu _Resolves #257._ (257 nahraďte za dané číslo issue). Viz také [dokumentace](https://docs.github.com/en/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue).

## Lokální vývoj pro obsahové editory

Chcete-li vyvíjet lokálně (tj. mít možnost sestavit si stránky u sebe), budete potřebovat linuxové prostředí (WSL ve Windows 10 je dostatečné). Aktuálně máme otestovanou funkčnost pro systémy Ubuntu, Fedora a Windows 10 (WSL1). Podporujeme dva způsoby lokálního sestavování stránek:

* pomocí lokální instalace (aktuálně stabilnější), nebo
* pomocí kontejnerů (do budoucna možná jednodušší, ale aktuálně méně stabilní).

WSL si dobře rozumí s VSCode, nejlépe postupovat podle [tohoto postupu](https://learn.microsoft.com/en-us/windows/wsl/tutorials/wsl-vscode).

### Lokální instalace

Lokální instalace má tyto prerekvizity (nainstalujte do systému):

* Vývojářská verze knihoven ruby (typicky balík `ruby-dev`)
* GNU Make (balík `make` nebo součást základních vývojářských balíků jako je `build-essential`).
* Jekyll a Bundler (balíky `jekyll` a `bundler`)
* Inkscape ve verzi alespoň 1.0 (balík `inkscape`, zkontrolujte si však verzi!)
* ImageMagick (balík `imagemagick`)

Na **Ubuntu 20.10** nebo novějším bude tedy instalace prerekvizit vypadat následovně: `sudo apt install jekyll ruby bundler inkscape build-essential imagemagick`. Správnost instalace všech součástí ověříte sestavením stránek pomocí `make local -j4`.

Máte-li problém spustit Inkscape s chybou `Wrong __data_start/_end pair`, nastavte proměnnou `export _INKSCAPE_GC="disable"` (detaily viz [GitLab issue](https://gitlab.com/inkscape/inkscape/-/issues/1420)).

Na **Mac OS** funguje kombinace [postupu dle Jekyllu](https://jekyllrb.com/docs/installation/macos/), zbytek lze nainstalovat pomocí Homebrew (https://brew.sh/), tedy:
* `brew install imagemagick`
* `brew install inkscape` (k instalaci standardních aplikací přes Homebrew je potřeba napoprvé ještě `brew tap homebrew/cask`)
  * Z důvodu opakovaných problémů s novými verzemi Inkscape doporučujeme nainstalovat verzi 1.0.2 pomocí příkazu: `brew install --cask https://raw.githubusercontent.com/yurikoles/homebrew-cask/6c532489cf2d608ed58121640ee60284f67e523a/Casks/inkscape.rb`, případně stáhnout .dmg soubor z [inkscape.org](https://inkscape.org/release/inkscape-1.0.2/) 
* Také je třeba nastavit PATH: 
  * `echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc`
  * případně `echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.bash_profile`
  * pravděpodobně bude třeba restartovat okno příkazového řádku, aby se aktualizovala hodnota PATH
* pro `bundler` použij `gem install bundler:2.2.15`
Inkscape standardně není v `$PATH`, tak je potřeba přidat pomocí
* `sudo mkdir /usr/local/bin`,
* `sudo ln -s /Applications/Inkscape.app/Contents/MacOS/inkscape /usr/local/bin/inkscape`.
Na novějších MacOS je potřeba Inkscape pustit - pokud se instaloval z dmg. -, aby mu OS dal permisions.

### Instalace v kontejneru

Kontejnery umožňují oddělit programy nutné pro sestavení a spuštění webu od zbytku vašeho operačního systému. Zároveň vytvoří konzistentní prostředí, které je téměř totožné s tím, ve kterém se sestavuje živý, publikovaný web.

* Pro správu kontejnerů používáme balíček [Podman](https://podman.io), ale použití s [Dockerem](https://www.docker.com/) je téměř totožné.
* Kromě správce kontejnerů je jedinou další prerekvizitou Make.
* (Pokud vaše distribuce nepoužívá SELinux, tento krok přeskočte.) Aby měl kontejner ke zdroji přístup, je potřeba upravit bezpečnostní kontext celého adresáře pomocí `sudo chcon -Rt svirt_sandbox_file_t .`
* Pro sestavení webu, vytvoření kontejneru a smazání kontejneru použijte Make cíle `container`, `build-container` a `delete-container`.
* Po úspěšném sestavení webu se objeví se hláška `Server running... press ctrl-c to stop.`. Vygenerovaný web je po dobu běhu kontejneru přístupný na adrese <http://localhost:4000/>.
* _Poznámka:_ Pokud přidáváte novou stránku, měníte infografiky/obrázky nebo datové soubory, je potřeba kontejner zastavit a znovu spustit, aby se vygenerovaly všechny potřebné soubory. Pokud pouze upravujete texty, není třeba kontejner restartovat.

### Tipy a triky v případě technických problémů

* Jekyll padá s nedostatečnými právy zápisu: Pravděpodobně mícháte-li build přes kontejner a lokální instalaci. Smažte všechny artefakty vzniklé při sestavování pomocí `make clean-build`.
* Sestavení padá na instalaci http_parser.rb, `An error occurred while installing http_parser.rb (0.6.0), and Bundler cannot continue.`: Je možné že adresa složky, ve které spouštíte instalaci obsahuje mezery. Odstraněním mezer z názvu složek lze problém vyřešit.
* Sestavení padá s tím, že Inkscape nezná použité argumenty: Pravděpodobně máte verzi Inkscape nižší než 1.0.
* Konvertování SVG, PNG a PDF trvá příliš dlouho (System has run out of application memory): Zkuste nainstalovat Inkscape ve verzi 1.0.2.
* Změny v souborech se nepromítají do lokálně zobrazeného webu na `localhost:4000`: Pravděpodobně jste změnili obsah, který je předzpracováván před spuštěním Jekyllu (například PDF infografik). Zastavte lokálně sestavený web a dejte ho sestavit znova.
* V `git status` vidím změny v souboru `web-core`, i když jsem v něm nic nedělal: Nejste-li vývojář [web-core](https://github.com/faktaoklimatu/web-core), netrapte se tím. Dost možná to znova zmizí, až příště sestavíte web.

## Dokumentace pro webové vývojáře

Plnou vývojářskou dokumentaci najdete v [repozitáři s webovým systém](https://github.com/faktaoklimatu/web-core).
