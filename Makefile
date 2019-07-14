INFOGRAPHICS=$(wildcard assets/data/*/*.svg)
INFOGRAPHICS_PDF=$(INFOGRAPHICS:.svg=.pdf)
INFOGRAPHICS_PNG=$(INFOGRAPHICS:.svg=_600.png) $(INFOGRAPHICS:.svg=_1200.png) $(INFOGRAPHICS:.svg=_1920.png) $(INFOGRAPHICS:.svg=_6000.png)
INFOGRAPHICS_GENERATED=$(INFOGRAPHICS_PDF) $(INFOGRAPHICS_PNG)
REPO_URL=https://github.com/mukrop/faktaoklimatu

all: web

local: web
	jekyll serve

web: _includes/version.html $(INFOGRAPHICS_GENERATED)

clean:
	rm -rf assets/data/*/*.pdf assets/data/*/*.png

_includes/version.html: .git/COMMIT_EDITMSG
	echo -n 'Poslední změna: <a target="_blank" ' >$@
	echo -n 'href="$(REPO_URL)/commit/'`git rev-parse HEAD`'" ' >>$@
	echo -n 'title="commit '`git rev-parse --short HEAD`'">' >>$@
	echo -n `git log -1 --date=short --format=%cd` >>$@
	echo '</a>' >>$@

%.pdf: %.svg
	inkscape --without-gui --export-area-page --export-background=white --export-pdf=$@ --file=$<

%_600.png: %.svg
	inkscape --without-gui --export-area-page --export-background=white --export-width=600 --export-height=400 --export-png=$@ --file=$<

%_1200.png: %.svg
	inkscape --without-gui --export-area-page --export-background=white --export-width=1200 --export-height=800 --export-png=$@ --file=$<

%_1920.png: %.svg
	inkscape --without-gui --export-area-page --export-background=white --export-width=1920 --export-height=1280 --export-png=$@ --file=$<

%_6000.png: %.svg
	inkscape --without-gui --export-area-page --export-background=white --export-width=6000 --export-height=4000 --export-png=$@ --file=$<

.PHONY: all web local clean
