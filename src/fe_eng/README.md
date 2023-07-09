## Introduction
This project is built with [Vue.js2](https://vuejs.org/) 

## Getting Started
```bash
# install dependency
npm install

# develop
npm run dev
```

## Build
```bash
# build for test environment
npm run build:sit

# build for production environment
DEPLOY_PATH=https://yourappurl.com npm run build:prod
```

## Advanced
```bash
# --report to build with bundle size analytics
npm run build:prod --report

# --preview to start a server in local to preview
npm run build:prod --preview

# lint code
npm run lint

# auto fix
npm run lint -- --fix
```

## Project Structure
 
    ├── build                      // webpack config files
    ├── config                     // main project config
    ├── src                        // main source code
    │   ├── api                    // api services
    │   ├── assets                 // module assets like fonts,images (processed by webpack)
    │   ├── components             // global components
    │   ├── directive              // global directive
    │   ├── filters                // global filter
    │   ├── lang                   // i18nlanguage
    │   ├── router                 // default routers
    │   ├── store                  // store (handle async routers and permissions here)
    │   ├── styles                 // global css
    │   ├── utils                  // global utils
    │   ├── vendor                 // vendor
    │   ├── views                  // views (pages and their components)
    │   ├── App.vue                // main app component
    │   ├── main.js                // app entry file
    │   └── permission.js          // permission authentication
    ├── static                     // pure static assets (directly copied)
    │   └── Tinymce                // rich text editor
    ├── .babelrc                   // babel config
    ├── eslintrc.js                // eslint config
    ├── .gitignore                 // sensible defaults for gitignore
    ├── favicon.ico                // favicon ico
    ├── index.html                 // index.html template
    └── package.json               // package.json

