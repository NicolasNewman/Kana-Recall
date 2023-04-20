#!/bin/bash

case $1 in 
  major|minor|patch) 
        if npm version $1 ; then
          git push origin develop
          git fetch origin master:master
          git merge master
          git push origin develop:master
        fi
  ;;

  *)
         echo "Invalid option: $1"
  ;;
esac 