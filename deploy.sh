#!/bin/sh
echo saving away your changes..
git stash

echo bundling..
./node_modules/.bin/webpack -p

echo committing..
git add build/*
git add index.html
git commit -m "dump dist"

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
git stash pop
