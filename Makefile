.PHONY: build

build:
	mkdir -p build/
	mkdir -p _site/
	npm run build
	mv build/ _site/losing-my-data
	cp _redirects build/
