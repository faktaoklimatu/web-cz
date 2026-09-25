WEB_CORE_FOLDER=web-core

all build check local clean clean-build bundle-install container build-container delete-container lighthouse deploy-production: web-core
	$(MAKE) -C $(WEB_CORE_FOLDER) $@

# TEMPORARY: overrides web-core's own deploy-preview instead of delegating to
# it, so the shared submodule — and with it web-en and web-sk — stays untouched.
# Runs the same command web-core does, plus --debug and a dump of the CLI's log,
# because on its own the Firebase CLI reports nothing but "An unexpected error
# has occurred." Delete this target once the deploy failure is understood, and
# put deploy-preview back in the delegating rule above.
# Same definition web-core/Makefile uses; TRAVIS_BRANCH wins on CI.
BRANCH := $(or $(TRAVIS_BRANCH),$(shell git branch --show-current))

deploy-preview: web-core
	cd $(WEB_CORE_FOLDER) && { \
	  ./firebase hosting:channel:deploy $(BRANCH) --only preview --debug; \
	  status=$$?; \
	  [ -f firebase-debug.log ] && cat firebase-debug.log; \
	  exit $$status; \
	}

web-core:
	git submodule update --init --recursive;

update-podcast: web-2050podcast

web-2050podcast:
	git submodule update --init --recursive;

.PHONY: all build check local clean clean-build bundle-install container build-container delete-container lighthouse deploy-preview deploy-production
.PHONY: web-core
