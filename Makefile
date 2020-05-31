INFOGRAPHICS_FOLDER=assets/infographics
INFOGRAPHICS_SRC=$(wildcard _infografiky/*/*.pdf)
INFOGRAPHICS_DST=$(addprefix $(INFOGRAPHICS_FOLDER)/,$(notdir $(INFOGRAPHICS_SRC)))
DATASETS_FOLDER=assets/datasets
DATASETS_SRC=$(wildcard _datasety/*.md)
DATASETS_DST=$(addprefix $(DATASETS_FOLDER)/,$(notdir $(DATASETS_SRC:.md=.png)))
STUDIES_FOLDER=assets/studies
STUDIES_SRC=$(wildcard _studie/*.jpg _studie/*.png)
STUDIES_DST=$(addprefix $(STUDIES_FOLDER)/,$(notdir $(STUDIES_SRC)))
REPO_URL=https://github.com/mukrop/faktaoklimatu

all: web

reinstall:
	rm Gemfile.lock
	bundle install

local: web
	bundle exec jekyll serve

web: $(INFOGRAPHICS_DST) $(STUDIES_DST) # $(DATASETS_DST)

check: web
	@echo "Building the website using Jekyll ..."
	bundle exec jekyll build
	@echo "Running tests on the generated sites using html-proofer ..."
	-bundle exec ruby utils/test.rb

clean:
	rm -rf $(INFOGRAPHICS_FOLDER)

$(INFOGRAPHICS_FOLDER)/%.pdf: _infografiky/*/%.pdf
	utils/convert-infographic.sh $< $@

$(STUDIES_FOLDER)/%: _studie/%
	mkdir -p $(@D)
	cp -v $< $@

dataset-images: $(DATASETS_DST)

$(DATASETS_FOLDER)/%.png: _datasety/%.md
	@bash utils/download-dataset-preview.sh $< $@

.PHONY: all web local clean
