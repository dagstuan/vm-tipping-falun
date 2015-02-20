#!/bin/sh
echo bundling..
./node_modules/.bin/webpack -p

echo committing..
git add build/*
git add index.html
git add images
git commit -m "bump dist"

echo moving to gh-pages..
git checkout gh-pages

echo checking out files from master..
git checkout master -- build
git checkout master -- index.html
git checkout master -- images

git add build
git add index.html
git add images

echo committing..
git commit -m "deploy"

echo deploying..
git push -f origin gh-pages

echo moving back..
git checkout master
