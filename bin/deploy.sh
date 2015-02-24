#! /bin/bash

doSubmodules () {
  git submodule foreach git fetch --all --tags
  git submodule update --init
}

doComposer () {
  composer install
}

doNode () {
  npm install
}

while getopts "p:b:h:s n c" flag
  do
    case $flag in
      b )
        branch=$OPTARG
        ;;
      c )
        composer=true
        ;;
      h )
        hash=$OPTARG
        ;;
      n )
        node=true
        ;;
      p )
        path=$OPTARG
        ;;
      s )
        submodules=true
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

if [[ -z "$submodules" ]]; then
  doSubmodules
fi

if [[ -z "$node" ]]; then
  doNode
fi

if [[ -z "$composer" ]]; then
  doComposer
fi
