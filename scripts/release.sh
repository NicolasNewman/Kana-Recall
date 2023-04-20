case $1 in 
  major|minor|patch) 
         npm version $1
         git checkout master
         git pull
         git merge master
  ;;

  *)
         echo "Invalid option: $1"
  ;;
esac 