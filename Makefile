.PHONY: build

build:
	mkdir -p build/
	npm run build
	cp _redirects build/
