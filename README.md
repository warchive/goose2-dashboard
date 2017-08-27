# control-front

[![Build Status][build-badge]][build] [![Standard code style][standard-badge]][standard]

[build]: https://travis-ci.org/teamwaterloop/control-front

[build-badge]: https://travis-ci.org/teamwaterloop/control-front.svg?branch=master

[standard]: https://standardjs.com

[standard-badge]: https://img.shields.io/badge/code_style-standard-brightgreen.svg

Front end HTML page for controlling the pod

## See below link for documentation

* [Commands and Events for Websocket Communication](https://github.com/teamwaterloop/control-front/tree/master/events)
* [Testing client with test server](https://github.com/teamwaterloop/control-front/tree/master/test)
* [Speeding up the dashboard](https://github.com/teamwaterloop/control-front/tree/master/config.js)

## Steps to run

### For Linux / OSX

```bash
# Change config.js if necessary
# Install yarn if necessary:
# sudo npm i -g yarn
# Make sure you're in the root directory of the project

yarn
npm run dev
```

### For windows

```bash
# Change config.js if necessary
# Install yarn if necessary:
# npm i -g yarn
# Make sure you're in the root directory of the project
# Uninstall windows and install linux and see above
# Or,

yarn
set NODE_ENV=development
webpack

# But seriously stop using windows
```

Then open dist/index.html

## File Structure

```text
├── dist              - Built files
├── events            - Names of broadcasts (from the pod) and commands (to the pod)
├── layouts           - Configuration files for the layout of the control panel
├── src
│   ├── api           - Code for communcation to and from pod
│   ├── components    - React components
│   ├── scss          - Sass styles
│   ├── section       - Sections of the control panel
│   │   ├── controls
│   │   └── visuals
│   └── store         - Redux code (reducer, actions, defaults)
└── test              - Code for testing (test server)

```
