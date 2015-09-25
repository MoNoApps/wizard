# Wizard
Create and edit your models.

## Tree File Structure
````
.
├── README.md
├── api
├── assets
├── helpers
├── migrations
├── package.json
├── plugin.js
├── sio
├── test
│   ├── e2e
│   └── helpers
├── views
└── web
````

## Module Package Export
Tools are declared in plugin.js

## Add this package as github module
````sh
git submodule add git@github.com:MoNoApps/wizard.git plugins/wizard
````

## Run migrations
node plugins/wizard/migrations/seed.js
