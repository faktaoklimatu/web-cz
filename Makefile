INFOGRAPHICS_FOLDER=assets/infographics
INFOGRAPHICS_SRC=$(wildcard _infografiky/*/*.pdf)
INFOGRAPHICS_DST=$(addprefix $(INFOGRAPHICS_FOLDER)/,$(notdir $(INFOGRAPHICS_SRC)))
STUDIES_FOLDER=assets/studies
STUDIES_SRC=$(wildcard _studie/*.jpg)
STUDIES_DST=$(addprefix $(STUDIES_FOLDER)/,$(notdir $(STUDIES_SRC)))
REPO_URL=https://github.com/mukrop/faktaoklimatu

all: web

reinstall:
	rm Gemfile.lock
	bundle install

local: web
	bundle exec jekyll serve

web: $(INFOGRAPHICS_DST) $(STUDIES_DST)

check: web
	bundle exec jekyll build
	bundle exec htmlproofer --assume-extension --check_favicon --check_html --check_img_http --url_ignore "/$(REPO_URL)/,/skepticalscience.com/,/scrippsco2.ucsd.edu/" ./_site

clean:
	rm -rf $(INFOGRAPHICS_FOLDER)

$(INFOGRAPHICS_FOLDER)/%.pdf: _infografiky/*/%.pdf
	utils/convert-infographic.sh $< $@

$(STUDIES_FOLDER)/%.jpg: _studie/%.jpg
	mkdir -p $(@D)
	cp -v $< $@

.PHONY: all web local clean
