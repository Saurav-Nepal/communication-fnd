#!/bin/bash

# Define colors for formatting
RESET="\033[0m"
BOLD="\033[1m"
YELLOW="\e[1;33m"
GREEN="\e[0;32m"
RED="\e[1;31m"
BLUE='\e[0;34m'

current_branch=$(git symbolic-ref --short HEAD);

# Update the local repository
git pull origin $current_branch;

# Prompt user for whether to create the build
printf "Do you want to create the build ${BOLD}${RED}WEB${RESET}? [y/n]:"
read BUILD_WEB
if [ "$BUILD_WEB" == 'y' ] || [ "$BUILD_WEB" == 'Y' ]; then
    # Run linting and build tasks
    yarn build:web
else
    printf "${BLUE}Skipping WEB Build${RESET}\n"
fi

# Prompt user for whether to create the build
printf "Do you want to create the build ${BOLD}${RED}PWA${RESET}? [y/n]:"
read BUILD_PWA
if [ "$BUILD_PWA" == 'y' ] || [ "$BUILD_PWA" == 'Y' ]; then
    # Run linting and build tasks
    yarn build:pwa
else
    printf "${BLUE}Skipping PWA Build${RESET}\n"
fi

if [ "$BUILD_WEB" != 'y' ] && [ "$BUILD_WEB" != 'Y' ] && [ "$BUILD_PWA" != 'y' ] && [ "$BUILD_PWA" != 'Y' ]; then
    # Run linting and build tasks
    yarn lint
fi

# Add all modified files to the staging area
git add .

# Extract JIRA issue ID from the branch name
JIRA=$(git rev-parse --abbrev-ref HEAD | grep -e '[A-Z]\+-[0-9]\+' -o)

# Prompt user for commit message
printf "${YELLOW}Commit for JIRA ID ${BLUE}[%s]${RESET}: " $JIRA
read MESSAGE

# Commit changes
if [ ! -z $JIRA ]; then
    git commit -m "$JIRA #comment $MESSAGE"
else
    git commit -m "$MESSAGE"
fi

# Push changes to the remote repository
git push origin $current_branch