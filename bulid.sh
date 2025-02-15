#!/bin/sh
cd ../
mkdir output
cp -R ./production-front/* ./output
cp -R ./output ./production-front/
