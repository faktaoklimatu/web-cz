# Data k explaineru Srovnání klimaticko-energetické politiky EU, Číny, USA a Indie

Výřezy ze zdrojových datových sad, filtrované na čtyři regiony (`eu`, `usa`, `cina`, `indie`), případně svět (`svet`). Seskupení a podíly počítá až `assets-local/figures/klimaticka-politika-svetove-regiony/grafy.js`. Při aktualizaci stáhněte stejnou sadu a zachovejte názvy sloupců, protože skript je čte podle jména.

EU = EU27, pokud není uvedeno jinak.

| Soubor | Graf | Zdroj | Poznámka |
|---|---|---|---|
| `emise-ghg.csv` | podíl na světových emisích, emise (celkem, na obyvatele) | [EDGAR 2026](https://edgar.jrc.ec.europa.eu/report_2026), booklet, listy `GHG_totals_by_country` a `GHG_per_capita_by_country` | 1990–2025, Mt CO₂eq a t CO₂eq na obyvatele, bez LULUCF. `svet` = GLOBAL TOTAL (včetně mezinárodní letecké a lodní dopravy). |
| `emise-sektory.csv` | emise podle sektorů na obyvatele | [EDGAR 2026](https://edgar.jrc.ec.europa.eu/report_2026), booklet, list `GHG_by_sector_and_country` | Rok 2025, Mt CO₂eq po sektorech EDGAR a plynech (bez prefixu `GWP_100_AR5_`), bez LULUCF. |
| `emise-co2.csv` | historický podíl CO₂ | [Our World in Data](https://github.com/owid/co2-data), `owid-co2-data.csv` (Global Carbon Budget) | 1950–2024, jen CO₂. Graf používá jen kumulativní podíl na světových emisích. |
| `elektrina-mix.csv` | mix výroby elektřiny, výroba z OZE | [Ember, Yearly electricity data](https://ember-energy.org/data/yearly-electricity-data/), `yearly_full_release_long_format.csv` | Výroba podle paliv v % a TWh. |
| `kapacita.csv` | instalovaný výkon OZE | [Ember, Yearly electricity data](https://ember-energy.org/data/yearly-electricity-data/), `yearly_full_release_long_format.csv` | Instalovaný výkon podle paliv v GW. |
| `populace.csv` | přepočty na obyvatele (mix, OZE) | [OSN, World Population Prospects 2024](https://population.un.org/wpp/) | Počet obyvatel k 1. 7. v mil.; 2024–2025 střední varianta. EU = součet 27 států. |
| `elektromobily.csv` | podíl elektromobilů na prodejích | [Our World in Data, electric-car-sales-share](https://ourworldindata.org/grapher/electric-car-sales-share) (data [IEA Global EV Outlook 2026](https://www.iea.org/reports/global-ev-outlook-2026)) | Podíl na prodejích nových osobních aut v %. |
| `elektrifikace.csv` | míra elektrifikace | [IEA World Energy Balances Highlights 2026](https://www.iea.org/data-and-statistics/data-product/world-energy-balances-highlights), list `TimeSeries_1971-2025` | Electricity / Total final consumption v PJ, 1990–2024. EU = součet 23 uvedených států (chybí Bulharsko, Chorvatsko, Kypr a Malta). |
| `investice.csv` | investice do energetické transformace | [BloombergNEF, Energy Transition Investment Trends 2026](https://about.bnef.com/energy-transition-investment/); HDP: [MMF, World Economic Outlook](https://www.imf.org/external/datamapper/NGDPD@WEO) | Investice 2025 a nominální HDP 2025, obojí v mld. USD. |
