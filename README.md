# Wizard
Wizard is the extension to create forms using resource definitions in config files of the core and plugins Deck App.

## Tree File Structure
````
.
├── README.md
├── api          #RESTfull API
├── assets       #Jade, JS, CSS
├── helpers      #
├── migrations   #Your own definitions
├── package.json #NPM definition
├── plank.js
├── sio
├── test
│   ├── e2e
│   └── helpers
├── views
└── web
````

## Module Package Export
Tools are declared in plank.js

## Add this package as github module
````sh
git submodule add git@github.com:MoNoApps/wizard.git planks/wizard
````

## Run migrations
node planks/wizard/migrations/seed.js
