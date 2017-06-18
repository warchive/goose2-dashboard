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

## Steps to run

### For Linux / OSX

```bash
# Change config.js if necessary
# Install yarn if necessary:
# sudo npm i -g yarn
# Make sure you're in the root directory of the project

yarn
npm run build:prod
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
