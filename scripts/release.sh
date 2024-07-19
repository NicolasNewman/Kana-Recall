#!/bin/bash

case $1 in 
  major|minor|patch) 
        if pnpm -r version:$1 ; then
          git add .
          git commit -m "chore: bumped package versions"
          pnpm version $1
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