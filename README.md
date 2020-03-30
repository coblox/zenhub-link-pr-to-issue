# zenhub-link-pr-to-issue

## What

Create ZenHub link between pull request and issue based on the branch prefix

## Why

Automate all the things :robot:

## How

After adding this GitHub Action to a repository:

1. Pick up issue number `XXX`.
2. Create branch with name `XXX-<description>`.
3. Work on issue and open pull request.
4. Witness successful automation... or [open an issue](https://github.com/coblox/zenhub-link-pr-to-issue/issues/new) :face_with_head_bandage:

## Caveat

It only works if the PR and the issue belong to the same repository. Adding the feature to link to issues in other repositories is tracked [here](https://github.com/coblox/zenhub-link-pr-to-issue/issues/1).
