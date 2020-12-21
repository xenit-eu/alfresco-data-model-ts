# Typescript project boilerplate

Quick setup for a new typescript library

1. Open up `package.json` and replace `<project-name>` with your project name.
2. Start putting your code in `src/index.ts`
3. On github, configure the `npm_token` secret with an npm publish token.

## Continuous integration

Tests and releases are performed with Github Actions.

To create a new release, simply tag a commit with a version and push.
Tags must start with `v`, followed by a version number.

* Release versions are published to npm with the `latest` dist-tag.
* Pre-release versions are published to npm with the `next` dist-tag.

