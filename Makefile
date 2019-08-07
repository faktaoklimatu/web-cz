INFOGRAPHICS_FOLDER=assets/infographics
INFOGRAPHICS_SRC=$(wildcard _infografiky/*/*.pdf)
INFOGRAPHICS_DST=$(addprefix $(INFOGRAPHICS_FOLDER)/,$(notdir $(INFOGRAPHICS_SRC)))
REPO_URL=https://github.com/mukrop/faktaoklimatu

test:
	@echo INFOGRAPHICS_DST: $(INFOGRAPHICS_DST)

all: web

local: web
	bundle exec jekyll serve --unpublished

web: _includes/version.html $(INFOGRAPHICS_DST)

clean:
	rm -rf $(INFOGRAPHICS_FOLDER)

_includes/version.html:
	utils/web-version.sh $(REPO_URL) >$@

$(INFOGRAPHICS_FOLDER)/%.pdf: _infografiky/*/%.pdf
	utils/convert-infographic.sh $< $@

.PHONY: all web local clean _includes/version.html
