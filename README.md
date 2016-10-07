# Bug Tracker App

This project is a basic application to create/read/update/delete a list of bugs.  It is unstyled and has gaps in functionality marked with TODOs.  Fill out the missing code to make this app great again!

### Prerequisites

First you must have node.js and its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/)

Bower also needs to be installed, found at https://bower.io/

For our REST API, we will use json-server (https://github.com/typicode/json-server). 

If its not already installed, run the following line
```
npm install -g json-server
```

## Getting Started

To get you started you can simply fork the "interview" repository 

### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

Install the dependencies:


``` npm install ```

``` bower install ```


* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

### Run the server

In the terminal, open the project directory and run the following command.  This will run the server and give us a RESTFUL API to work with. 

```
json-server --watch bugs.json
```

### Run the Application

We have preconfigured the project with a simple development web server.  The simplest way to start this server is:

```
npm start
```

Now browse to the app at `http://localhost:8080/webpack-dev-server/`.



## Directory Layout

```
app/                    --> all of the source files for the application
  modules/              --> all app specific modules
    bucktracker/                 --> bucktracker module - this is the where we'll be working
      bucktracker.directive.js   --> custom directive that houses the bucktracker functionality
      bucktracker.factory.js     --> services (API) related to the "bugs" endpoint
      bucktracker.module.js      --> module definition for the bucktracker
      bucktracker.partial.html   --> html partial for the bucktracker directive
  app.css               --> default stylesheet
  app.js                --> main application module
  index.html            --> app layout file (the main html template file of the app)
```

