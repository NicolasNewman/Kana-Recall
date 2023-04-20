case $1 in 
  major|minor|patch) 
        npm version $1
        git push origin develop
        git fetch origin master:master
        git merge master
        git push origin develop:master
  ;;

  *)
         echo "Invalid option: $1"
  ;;
esac 