WEB_CORE_FOLDER=web-core

all web check local deploy clean reinstall container build-container delete-container: web-core
	cd $(WEB_CORE_FOLDER) && make $@

web-core:
	git submodule update --init --recursive

.PHONY: all web check local deploy clean reinstall container build-container delete-container
.PHONY: web-core
