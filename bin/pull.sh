#! /bin/bash

while getopts "p:b:" flag
  do
    case $flag in
      p )
        path=$OPTARG
        ;;
      b )
        branch=$OPTARG
        ;;
  esac
done

git -C $path fetch --all --tags
git -C $path merge origin/$branch