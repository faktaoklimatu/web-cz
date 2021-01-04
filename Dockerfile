FROM ubuntu:focal

LABEL name="Fakta o klimatu" \
      summary="Jekyll deployment with Inkscape and pdf2svg for the faktaoklimatu.cz website" \
      usage="docker run --name faktaweb -p 4000:4000 -v $PWD:/srv/jekyll -it faktaoklimatu"

ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update && \
    apt-get install --assume-yes --no-install-suggests --no-install-recommends \
        build-essential git inkscape pdf2svg ruby-bundler ruby-dev zlib1g-dev libffi-dev

# Install gems during build of the image so that we can leverage the cache.
COPY Gemfile* /tmp
WORKDIR /tmp
RUN bundle install

EXPOSE 4000
VOLUME /srv/jekyll
WORKDIR /srv/jekyll

CMD ["make", "-j4", "local"]
