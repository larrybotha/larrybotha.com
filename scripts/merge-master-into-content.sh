#! /usr/bin/env /bin/bash

set -eou pipefail

latest_commit_hash=$(git log --pretty=oneline -1 HEAD | awk  '{print $1}')
latest_master_commit_hash=$(git log --pretty=oneline -1 HEAD | awk  '{print $1}')
current_branch=$(git rev-parse --abbrev-ref HEAD)

# if last commit was on master
if [ "$latest_master_commit_hash" == "$latest_master_commit_hash" ];
then
  echo "merging master into content"
  git checkout content
  git merge --no-ff master
  git push
  echo "changes merged and pushed"
  git checkout ${current_branch}
fi
