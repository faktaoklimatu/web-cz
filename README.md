# O projektu Fakta o klimatu

[![Build Status](https://travis-ci.com/faktaoklimatu/web-cz.svg?branch=master)](https://travis-ci.com/faktaoklimatu/web-cz)

Projekt Fakta o klimatu usiluje o zkvalitnění společenské diskuse o klimatické změně. Snažíme se dodávat srozumitelné údaje široké veřejnosti a vizuálně zpracovávat vědecké informace, aby bylo rozhodování ve věcech týkajících se klimatu založené na aktuálních a ověřených datech.

Debata o klimatické změně je komplikovaná a na všech stranách plná zbytečných emocí, polopravd a mýtů. Chceme poutat pozornost na důležitá témata a stavět most mezi vědci a lidmi, kterých se změny klimatu týkají. A to jsou všichni lidé.

Jsme [tým profesionálů zabývajících se různými obory]](CONTRIBUTORS.md) – přírodovědou, informatikou, pedagogikou nebo komunikací. Pracuje na dobrovolnické bázi a finance na provoz získáváme od dárců, nepracujeme na ničí objednávku. Při naší činnosti komunikujeme s politiky, energetickými firmami i aktivistickými hnutími. Fakta o klimatu jsou však nezávislý projekt, který může podpořit každý.

## Dokumentace pro obsahové editory

Chcete-li vyvíjet lokálně (tj. mít možnost sestavit si stránky u sebe), budete potřebovat linuxové prostředí (WSL ve Windows 10 je dostatečné). Aktuálně máme otestovanou funkčnost pro systémy Ubuntu, Fedora a Windows 10 (WSL1). Podporujeme dva způsoby lokálního sestavování stránek:

* pomocí lokální instalace (aktuálně stabilnější), nebo
* pomocí kontejnerů (do budoucna možná jednodušší, ale aktuálně méně stabilní).

Základní průběh vývoje pak vypadá následovně:

1. Aktualizujete si lokální verzi git repozitáře (`git checkout master && git pull`).
2. Vytvořte si samostatnou větev z aktuální produkční verze (`git checkout -b moje-nova-vetev`).
3. Udělejte potřebné změny (úpravy textu, infografik, ...).
4. Sestavte si stránky lokálně a zkontrolujte svoji práci vizuálně (`make local -j4`).
5. Spusťte lokální testy (`make check`).
    * Poznámka: Nejprve se pouští testy na naše stránky, které musí projít. Pak se pouští kontrola dostupnosti externích odkazů, která nemusí projít (ani neprochází, jelikož některé stránky nejsou úplně zodpovědně dostupné...).
6. Udělejte _commit_ své práce, podívejte se na konvence níže (`git add <zmenene-soubory>`, pak `git commit`).
7. Odešlete své změny na GitHub server (`git push`).
8. Založte _pull request_ na GitHubu a označte vhodné lidi pro kontrolu vaší práce.

### Konvence v repozitáři

* Nadpisy _issues_ a _pull requestů_ jsou psány v češtině s diakritikou a začínají velkým písmenem. Udržte je krátké a věcné.
* Text a diskuze v issue může být méně formální, klidně bez diakritiky a klidně ve slovenštině.
* Snažte se každému _issue_ přiradit vhodné štítky a projekt. Jestli nevíte zvolit, přidejte štítek _na roztřízení_.
* Nadpisy ke _commitům_ pište v češtině s diakritikou, velkým prvním písmenem a bez tečky na konci. Snažte se udržet je krátké (ideálně do 50 znaků).
* Detailní popis _commitů_ může mít dle potřeby klidně i několik řádků. Používejte odrážky nebo celé věty (s tečkou na konci).
* Chcete-li po přijetí commitu do produkce automaticky zavřít odpovídající _issue_ na GitHubu, přidejte větu _Resolves #257._ (257 nahraďte za dané číslo issue). Viz také [dokumentace](https://docs.github.com/en/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue).

### Lokální instalace

Lokální instalace má tyto prerekvizity (nainstalujte do systému):

* Vývojářská verze knihoven ruby (typicky balík `ruby-dev`)
* GNU Make (balík `make` nebo součást základních vývojářských balíků jako je `build-essential`).
* Jekyll a Bundler (balíky `jekyll` a `bundler`)
* Inkscape ve verzi alespoň 1.0 (balík `inkscape`, zkontrolujte si však verzi!)

Na Ubuntu 20.10 nebo novějším bude tedy instalace prerekvizit vypadat následovně: `sudo apt install jekyll ruby bundler inkscape build-essential`. Správnost instalace všech součástí ověříte sestavením stránek pomocí `make local -j4`.

### Instalace v kontejneru

Kontejnery umožňují oddělit programy nutné pro sestavení a spuštění webu od zbytku vašeho operačního systému. Zároveň vytvoří konzistentní prostředí, které je téměř totožné s tím, ve kterém se sestavuje živý, publikovaný web.

* Pro správu kontejnerů používáme balíček [Podman](https://podman.io), ale použití s [Dockerem](https://www.docker.com/) je téměř totožné.
* Kromě správce kontejnerů je jedinou další prerekvizitou Make.
* (Pokud vaše distribuce nepoužívá SELinux, tento krok přeskočte.) Aby měl kontejner ke zdroji přístup, je potřeba upravit bezpečnostní kontext celého adresáře pomocí `sudo chcon -Rt svirt_sandbox_file_t .`
* Pro sestavení webu, vytvoření kontejneru a smazání kontejneru použijte Make cíle `container`, `build-container` a `delete-container`.
* Po úspěšném sestavení webu se objeví se hláška `Server running... press ctrl-c to stop.`. Vygenerovaný web je po dobu běhu kontejneru přístupný na adrese <http://localhost:4000/>.
* _Poznámka:_ Pokud přidáváte novou stránku, měníte infografiky/obrázky nebo datové soubory, je potřeba kontejner zastavit a znovu spustit, aby se vygenerovaly všechny potřebné soubory. Pokud pouze upravujete texty, není třeba kontejner restartovat.

### Tipy a triky v případě technických problémů

* Jekyll padá s nedostatečnými právy zápisu: Pravděpodobně mícháte-li build přes kontejner a lokální instalaci. Smažte podsložky `vendor`, `.cache` a `_site` ve `web-core` a zkuste znova.
* Sestavení padá s tím, že Inkscape nezná použité argumenty: Pravděpodobně máte verzi Inkscape nižší než 1.0.
* Změny v souborech se nepromítají do lokálně zobrazeného webu na `localhost:4000`: Pravděpodobně jste změnili obsah, který je předzpracováván před spuštěním Jekyllu (například PDF infografik). Zastavte lokálně sestavený web a dejte ho sestavit znova.
* V `git status` vidím změny v souboru `web-core`, i když jsem v něm nic nedělal: Nejste-li vývojář [web-core](https://github.com/faktaoklimatu/web-core), netrapte se tím. Dost možná to znova zmizí, až příště sestavíte web.

## Dokumentace pro webové vývojáře

Plnou vývojářskou dokumentaci najdete v [repozitáři s webovým systém](https://github.com/faktaoklimatu/web-core).
