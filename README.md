# react-boilerplate

A simple boilerplate for ReactJS, Webpack 5, TypeScript 4.3.

:heart: Async chunk loading
<br />
:heart: Typescript
<br />
:heart: React 17
<br/>
:heart: Webpack 5
<br/>
:heart: Code splitting
<br/>

---

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Custom Configuration](#custom-config)

---

## <a id="features">Features</a>

#### Build Process


[comment]: <> (- Implements async chunk loading via [@loadable/react]&#40;https://loadable-components.com/&#41;)
- [Typescript 4.3](https://www.typescriptlang.org/) support
- Bundled with [Webpack 5](https://webpack.js.org/configuration/)
- Supports ES6 via [Babel 7](https://babeljs.io/) transpiling

#### HTTP

- [Customizable](https://github.com/rushelex/react-boilerplate/blob/main/src/services/data/ajax-service.ts#L9), [Promise-based](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) HTTP support via [Axios](https://github.com/mzabriskie/axios)
- Utilizes a [generic data service](https://github.com/rushelex/react-boilerplate/blob/master/src/services/data/data-access-service.ts#L33) to easily fetch data
- Example of [implementing the data service](https://github.com/rushelex/react-boilerplate/blob/master/src/services/domain/domain-service.ts#L7)

#### Styling

- Supports [SCSS & SASS](http://sass-lang.com/) syntax
- Browser compatibility via [autoprefixing](https://github.com/postcss/autoprefixer)

#### Develop & Deploy

- ESLint and Prettier
- Husky and Lint-staged
- Commitlint with conventional-changelog config
- Environmental configurations for both webpack and redux
    - **Dev**: [webpack-dev-server](https://webpack.js.org/configuration/dev-server/) with [react-refresh-webpack-plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin)
    - **Prod**: [Express](http://expressjs.com/) server

---

## <a id="getting-started">Getting Started</a>

1. `$ git clone https://github.com/rushelex/react-boilerplate.git`
2. `$ npm install`
3. Launch environment:
    - **Production**: `$ npm start`
    - **Development**: `$ npm run dev`
    - Available at http://localhost:3000
      > Update port via [config.default.json](https://github.com/rushelex/react-boilerplate/blob/main/configs/config.default.json#L3), or override via [Custom Configuration](#custom-config)
4. Build assets for production:
    - `$ npm run build`

---

## <a id="custom-config">Custom Configuration</a>

Use [`cross-env`](https://github.com/kentcdodds/cross-env) or a comparable library/command to set the `ENV_CONFIG_PATH` to the path of your JSON configuration file:

`$ cross-env ENV_CONFIG_PATH=/path/to/config.json npm start`

> **Note**: This path is made available to Webpack **only**, however the contents of the file are stamped on a global variable during the build process (`process.env.APP_CONFIG`, see [webpack.config.babel.js](https://github.com/rushelex/react-boilerplate/blob/main/webpack.config.babel.js#L173)), which is then accessible via the [ConfigService](https://github.com/rushelex/react-boilerplate/blob/master/src/services/common/config-service.js#L5).

If your configuration is loaded successfully, you can expect to see the following indicator during startup:

```
** Using custom configuration located at "/path/to/config.json" **
```

#### Example

Using configuration file @ `C:\_workspaces\custom-config.json`

```bash
$ cross-env ENV_CONFIG_PATH="C:\_workspaces\custom-config.json" npm start

> react-boilerplate@5.0.0 start C:\_workspaces\react-boilerplate
> npm run build:prod && npm run start-prod-server


> react-boilerplate@5.0.0 build:prod C:\_workspaces\react-boilerplate
> npm run clean && cross-env NODE_ENV=production webpack --progress --colors


> react-boilerplate@5.0.0 clean C:\_workspaces\react-boilerplate
> rm -rf ./docs

** Using custom configuration located at "C:\_workspaces\custom-config.json" **
                    __      __        _ __             __     __
  _______ ___ _____/ /_____/ /  ___  (_) /__ _______  / /__ _/ /____
 / __/ -_) _ `/ __/ __/___/ _ \/ _ \/ / / -_) __/ _ \/ / _ `/ __/ -_)
/_/  \__/\_,_/\__/\__/   /_.__/\___/_/_/\__/_/ / .__/_/\_,_/\__/\__/
                                              /_/
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│              Rushelex | Version 1.0.0 | License MIT              │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```
