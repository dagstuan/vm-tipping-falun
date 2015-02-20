#!/bin/sh
echo bundling..
./node_modules/.bin/webpack -p

echo committing..
git add build/main.entry.js
git add index.html
git commit -m "dump dist"

echo moving to gh-pages
git checkout gh-pages

git checkout master -- build/main.entry.js
git checkout master -- index.html

git add build/main.entry.js
git add index.html

echo committing..
git commit -m "deploy"

echo deploying..
git push origin gh-pages

echo moving back
git checkout master
