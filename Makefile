WEB_CORE_FOLDER=web-core

all build check local clean clean-build bundle-install container build-container delete-container: web-core
	$(MAKE) -C $(WEB_CORE_FOLDER) $@

web-core:
	git submodule update --init --recursive

.PHONY: all build check local clean clean-build bundle-install container build-container delete-container
.PHONY: web-core
