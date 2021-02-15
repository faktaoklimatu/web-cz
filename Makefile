WEB_CORE_FOLDER=web-core

all web check local deploy clean bundle-install reinstall container build-container delete-container: web-core
	$(MAKE) -C $(WEB_CORE_FOLDER) $@

web-core:
	git submodule update --init --recursive

.PHONY: all web check local deploy clean bundle-install reinstall container build-container delete-container
.PHONY: web-core
