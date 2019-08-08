#!/bin/bash

if [ $# -eq 0 ]
then
    echo "usage: "$0" <repo URL>"
    exit -1
fi

if [ ! $# -eq 1 ]
then
    echo "Error: Incorrect number of parameters (exactly 1 parameter required)."
    exit -1
fi

REPO_URL=$1

echo -n 'Poslední změna: <a target="_blank" '
echo -n 'href="'$REPO_URL'/commit/'`git rev-parse HEAD`'" '
echo -n 'title="commit '`git rev-parse --short HEAD`'">'
echo -n `git log -1 --date=short --format=%cd`
echo '</a>'