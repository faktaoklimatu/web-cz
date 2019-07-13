INFOGRAPHICS=$(wildcard assets/data/*/*.svg)
INFOGRAPHICS_PDF=$(INFOGRAPHICS:.svg=.pdf)
INFOGRAPHICS_PNG1200=$(INFOGRAPHICS:.svg=_1200.png)
INFOGRAPHICS_PNG1920=$(INFOGRAPHICS:.svg=_1920.png)
INFOGRAPHICS_PNG6000=$(INFOGRAPHICS:.svg=_6000.png)
INFOGRAPHICS_GENERATED=$(INFOGRAPHICS_PDF) $(INFOGRAPHICS_PNG1200) $(INFOGRAPHICS_PNG1920) $(INFOGRAPHICS_PNG6000)

all: web

local:
	jekyll serve

web: $(INFOGRAPHICS_GENERATED)

clean:
	rm -rf assets/data/*/*.pdf assets/data/*/*.png

%.pdf: %.svg
	inkscape --without-gui --export-area-page --export-background=white --export-pdf=$@ --file=$<

%_1200.png: %.svg
	inkscape --without-gui --export-area-page --export-background=white --export-width=1200 --export-height=800 --export-png=$@ --file=$<

%_1920.png: %.svg
	inkscape --without-gui --export-area-page --export-background=white --export-width=1920 --export-height=1080 --export-png=$@ --file=$<

%_6000.png: %.svg
	inkscape --without-gui --export-area-page --export-background=white --export-width=6000 --export-height=4000 --export-png=$@ --file=$<

.PHONY: all web local clean
