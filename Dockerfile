FROM ubuntu:19.10

LABEL name="Fakta o klimatu" \
      summary="Jekyll deployment with Inkscape and pdf2svg for the faktaoklimatu.cz website" \
      usage="docker run --name faktaweb -p 4000:4000 -v $PWD:/srv/jekyll -it faktaoklimatu"

RUN apt-get update && \
    apt-get install --assume-yes \
        build-essential git-core inkscape pdf2svg ruby-bundler ruby-dev zlib1g-dev

EXPOSE  4000
VOLUME  /srv/jekyll
WORKDIR /srv/jekyll

CMD ["make", "local"]
