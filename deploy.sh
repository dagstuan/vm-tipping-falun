#!/bin/sh
./node_modules/.bin/webpack -p

git checkout gh-pages

git checkout master -- build/main.entry.js
git checkout master -- index.html

git add build/main.entry.js
git add index.html

git commit -m "deploy"
git push origin gh-pages

git checkout master
