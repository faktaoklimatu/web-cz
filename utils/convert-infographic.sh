#!/bin/bash

# Check CLI parameters
if [ $# -eq 0 ]
then
    echo "usage: "$0" <source/infographic.pdf> <destination/infographic.pdf>"
    exit -1
fi
if [ ! $# -eq 2 ]
then
    echo "Error: Incorrect number of parameters (exactly 2 parameters required)."
    exit -1
fi

# exit when any command fails
set -e
# keep track of the last executed command
trap 'last_command=$current_command; current_command=$BASH_COMMAND' DEBUG
# echo an error message before exiting
trap 'echo "\"${last_command}\" command filed with exit code $?."' EXIT

# Set names
SRC_FILE_PDF=$1
DST_FILE_PDF=$2
DST_FILE_SVG=`echo $DST_FILE_PDF | sed 's/\.pdf$/\.svg/'`
DST_FILE_PNG_600=`echo $DST_FILE_PDF | sed 's/\.pdf$/\_600.png/'`
DST_FILE_PNG_1200=`echo $DST_FILE_PDF | sed 's/\.pdf$/\_1200.png/'`
DST_FILE_PNG_1920=`echo $DST_FILE_PDF | sed 's/\.pdf$/\_1920.png/'`
DST_FILE_PNG_6000=`echo $DST_FILE_PDF | sed 's/\.pdf$/\_6000.png/'`

# Creat destination folder if necessary
mkdir -p `dirname $DST_FILE_PDF`

# Do SVG and PNG conversion
echo -n "Converting $SRC_FILE_PDF to $DST_FILE_SVG ..."
pdf2svg $SRC_FILE_PDF $DST_FILE_SVG
echo -e "\t\t [ OK ]"

echo -n "Converting $DST_FILE_SVG to $DST_FILE_PNG_600 ..."
inkscape --without-gui --export-area-page --export-background=white --export-width=600 \
         --export-png=$DST_FILE_PNG_600 --file=$DST_FILE_SVG 1>/dev/null 2>&1
echo -e "\t\t [ OK ]"

echo -n "Converting $DST_FILE_SVG to $DST_FILE_PNG_1200 ..."
inkscape --without-gui --export-area-page --export-background=white --export-width=1200 \
         --export-png=$DST_FILE_PNG_1200 --file=$DST_FILE_SVG 1>/dev/null 2>&1
echo -e "\t\t [ OK ]"

echo -n "Converting $DST_FILE_SVG to $DST_FILE_PNG_1920 ..."
inkscape --without-gui --export-area-page --export-background=white --export-width=1920 \
         --export-png=$DST_FILE_PNG_1920 --file=$DST_FILE_SVG 1>/dev/null 2>&1
echo -e "\t\t [ OK ]"

echo -n "Converting $DST_FILE_SVG to $DST_FILE_PNG_6000 ..."
inkscape --without-gui --export-area-page --export-background=white --export-width=6000 \
         --export-png=$DST_FILE_PNG_6000 --file=$DST_FILE_SVG 1>/dev/null 2>&1
echo -e "\t\t [ OK ]"

# If all previous conversions pass, copy the file checked by Make
echo "Copying $SRC_FILE_PDF as $DST_FILE_PDF"
cp $SRC_FILE_PDF $DST_FILE_PDF
