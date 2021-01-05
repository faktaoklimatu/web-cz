#!/bin/bash

# Validate command line arguments
if [ ! $# -eq 2 ]
then
    echo "Error: Incorrect number of parameters (exactly 2 parameters required)."
    echo "Usage: "$0" <source/infographic.pdf> <destination/infographic.pdf>"
    exit 1
fi

# Inkscape install instructions
inkscape_install_instructions() {
    echo "On Ubuntu, add ppa for the latest Inkscape and install it using the commands below."
    echo "  sudo add-apt-repository ppa:inkscape.dev/stable"
    echo "  sudo apt update"
    echo "  sudo apt install inkscape"
}

# Check for Inkscape availability
if ! (which inkscape >/dev/null 2>&1)
then
    echo "Error: Inkscape not installed."
    inkscape_install_instructions
    exit 2
fi

# Check Inkscape version
if ! (inkscape --version 2>/dev/null | grep '^Inkscape 1\.' >/dev/null)
then
    echo "Error: You have an old version of Inkscape (below 1.0.0)."
    inkscape_install_instructions
    exit 3
fi

# Exit when any command fails
set -e

# Widths (in px) of infographics we want to generate in PNG
WIDTHS=(600 1200 1920 6000)

# Set up file names
SRC_FILE_PDF=$1
DST_FILE_PDF=$2
DST_FILE_SVG=${DST_FILE_PDF%.pdf}.svg

# Create destination folder if necessary
mkdir -p $(dirname $DST_FILE_PDF)

# Convert original PDF to SVG
echo -e `basename $SRC_FILE_PDF`": converting to SVG..."
inkscape \
        --export-type=svg \
        --pdf-poppler \
        --export-plain-svg \
        --export-filename="$DST_FILE_SVG" \
        "$SRC_FILE_PDF" \
        >/dev/null 2>&1

convert_svg_to_png() {
    input_svg=$1
    width=$2
    inkscape \
        --export-area-page \
        --export-background=white \
        --export-width=$width \
        --export-background-opacity=255 \
        --export-type=png \
        --export-filename="${input_svg%.svg}_$width.png" \
        "$input_svg" \
        >/dev/null 2>&1
}

# Convert SVG into PNGs of various sizes
for width in ${WIDTHS[@]}; do
    echo -e `basename $DST_FILE_SVG`": converting to PNG (${width}px)..."
    convert_svg_to_png "$DST_FILE_SVG" $width
done

# If all previous conversions pass, copy the file checked by Make
echo `basename $SRC_FILE_PDF`": copying to $DST_FILE_PDF..."
cp "$SRC_FILE_PDF" "$DST_FILE_PDF"

echo `basename $SRC_FILE_PDF`": All done."
