#!/bin/bash

# Check CLI parameters
if [ $# -eq 0 ]
then
    echo "usage: "$0" <source/dataset.md> <destination/dataset.png>"
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

# Set names
SRC_FILE_MD=$1
DST_FILE_PNG=$2

SRC_URL=`cat $SRC_FILE_MD | grep "^dataset-url:" | sed 's/^dataset-url:[ \t]*//'`

echo -n "Downloading preview of $SRC_FILE_MD to $DST_FILE_PNG ..."
echo firefox --screenshot $DST_FILE_PNG --window-size=1200,800 $SRC_URL
firefox --screenshot $DST_FILE_PNG --window-size=1200,800 $SRC_URL
echo -e "\t\t [ OK ]"
