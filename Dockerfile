FROM ubuntu:focal

LABEL name="Fakta o klimatu" \
      summary="Jekyll deployment with Inkscape and pdf2svg for the faktaoklimatu.cz website" \
      usage="docker run --name faktaweb -p 4000:4000 -v $PWD:/srv/jekyll -it faktaoklimatu"

ARG DEBIAN_FRONTEND=noninteractive
RUN apt update && apt install --assume-yes software-properties-common
RUN add-apt-repository --yes ppa:inkscape.dev/stable && apt update
RUN apt install --assume-yes --no-install-suggests --no-install-recommends \
        build-essential git inkscape ruby-bundler ruby-dev zlib1g-dev libffi-dev

EXPOSE 4000
VOLUME /srv/jekyll
WORKDIR /srv/jekyll

CMD ["make", "-j4", "local"]
