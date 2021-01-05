INFOGRAPHICS_FOLDER=assets/generated
INFOGRAPHICS_SRC=$(wildcard _infografiky/*/*.pdf _studie/*.pdf)
INFOGRAPHICS_DST=$(addprefix $(INFOGRAPHICS_FOLDER)/,$(notdir $(INFOGRAPHICS_SRC)))
DATASETS_FOLDER=assets/datasets
DATASETS_SRC=$(wildcard _datasety/*.md)
DATASETS_DST=$(addprefix $(DATASETS_FOLDER)/,$(notdir $(DATASETS_SRC:.md=.png)))
STUDIES_FOLDER=assets/studies
STUDIES_SRC=$(wildcard _studie/*.jpg _studie/*.png)
STUDIES_DST=$(addprefix $(STUDIES_FOLDER)/,$(notdir $(STUDIES_SRC)))

PODMAN=podman
CONTAINER_IMAGE=faktaoklimatu/web
CONTAINER_NAME=faktaoklimatu

all: web

# Phony targets for container management.
container:
	if $(PODMAN) inspect $(CONTAINER_NAME) >/dev/null 2>&1 ; \
		then $(PODMAN) start -a $(CONTAINER_NAME) ||: ; \
		else make build-container; fi

build-container:
	$(PODMAN) build --file Dockerfile --tag $(CONTAINER_IMAGE) .
	$(PODMAN) run --interactive --tty --name $(CONTAINER_NAME) \
		--volume $$PWD:/srv/jekyll --publish 4000:4000 $(CONTAINER_IMAGE) ||:

delete-container:
	$(PODMAN) rm --force $(CONTAINER_NAME)

# Targets for generating files and managing the Jekyll site.
reinstall:
	-rm -rf vendor/bundle
	bundle install

local: web
	bundle install
	bundle exec jekyll serve --trace

web: $(INFOGRAPHICS_DST) $(STUDIES_DST) # $(DATASETS_DST)

check: web
	@echo "Building the website using Jekyll ..."
	bundle exec jekyll build
	@echo "Running tests on the generated site using html-proofer ..."
	-bundle exec ruby utils/test.rb

deploy: web
	@echo "Building production version using Jekyll ..."
	JEKYLL_ENV=production bundle exec jekyll build

clean:
	rm -rf $(INFOGRAPHICS_FOLDER)
	rm -rf $(STUDIES_FOLDER)

$(INFOGRAPHICS_FOLDER)/%.pdf: _infografiky/*/%.pdf
	@utils/convert-infographic.sh $< $@

$(INFOGRAPHICS_FOLDER)/%.pdf: _studie/%.pdf
	@utils/convert-infographic.sh $< $@

$(STUDIES_FOLDER)/%: _studie/%
	mkdir -p $(@D)
	cp $< $@

dataset-images: $(DATASETS_DST)

$(DATASETS_FOLDER)/%.png: _datasety/%.md
	@bash utils/download-dataset-preview.sh $< $@

.PHONY: all web local clean
.PHONY: container build-container delete-container
