#! /bin/bash

while getopts "p:b:h:" flag
  do
    case $flag in
      p )
        path=$OPTARG
        ;;
      b )
        branch=$OPTARG
        ;;
      h )
        hash=$OPTARG
        ;;
  esac
done

if [[ ! -z "$hash" ]]; then

  # Hard rest on force push
  git -C $path fetch --all --tags
  git -C $path reset --hard $hash

else

  # Manual pull via fetch/merge
  # Allows working copy to not be the same branch as GitHub
  # Also makes sure we have an up-to-date local copy if things break
  git -C $path fetch --all --tags
  git -C $path merge origin/$branch

fi
