# README


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