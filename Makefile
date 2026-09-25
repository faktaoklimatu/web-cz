WEB_CORE_FOLDER=web-core

all build check local clean clean-build bundle-install container build-container delete-container lighthouse deploy-preview deploy-production: web-core
	$(MAKE) -C $(WEB_CORE_FOLDER) $@

web-core:
	git submodule update --init --recursive;

update-podcast: web-2050podcast

web-2050podcast:
	git submodule update --init --recursive;

.PHONY: all build check local clean clean-build bundle-install container build-container delete-container lighthouse deploy-preview deploy-production
.PHONY: web-core
