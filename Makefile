INFOGRAPHICS_FOLDER=assets/infographics
INFOGRAPHICS_SRC=$(wildcard _infografiky/*/*.svg)
INFOGRAPHICS_SVG=$(addprefix assets/infographics/,$(notdir $(INFOGRAPHICS_SRC)))
INFOGRAPHICS_PDF=$(INFOGRAPHICS_SVG:.svg=.pdf)
INFOGRAPHICS_PNG=$(INFOGRAPHICS_SVG:.svg=_600.png) $(INFOGRAPHICS_SVG:.svg=_1200.png) $(INFOGRAPHICS_SVG:.svg=_1920.png) $(INFOGRAPHICS_SVG:.svg=_6000.png)
INFOGRAPHICS_GENERATED=$(INFOGRAPHICS_PDF) $(INFOGRAPHICS_PNG)
REPO_URL=https://github.com/mukrop/faktaoklimatu

all: web

local: web
	bundle exec jekyll serve --unpublished

web: _includes/version.html web-init $(INFOGRAPHICS_GENERATED)

web-init:
	mkdir -p $(INFOGRAPHICS_FOLDER)
	cp -u $(INFOGRAPHICS_SRC) $(INFOGRAPHICS_FOLDER)

clean:
	rm -rf $(INFOGRAPHICS_FOLDER)

_includes/version.html:
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

.PHONY: all web web-init local clean _includes/version.html
