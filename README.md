![tsmean logo](https://s3.eu-central-1.amazonaws.com/bersling/images/tsmean-logo.png)

This is a **starter kit** for webapps **completely written in typescript**.

The starter kit is using the following technologies:

- **M**ongoDB or alternatively **M**ySQL
- **E**xpressJS
- **A**ngular4
- **N**odeJs

... and that's why it's called tsmean! All of those are modern
technologies (as of mid 2017) and well suited for development
with typescript. You get to use typescript now
on the client **and** the server! This leads to efficiency
through consistency. Read more about that here: www.tsmean.com.


# Installation


You need `yarn` installed on your machine for this to work.
It will also only work on mac or linux based systems, windows is
not supported. If those prerequisists are met, run:


```
git clone https://github.com/tsmean/tsmean your-project-name
cd your-project-name
npm run install
```

## Backend

First `cd backend`, then:

- to spin up a REST-API server `npm start`. Check it out at http://localhost:4242
- To run the tests `npm test`

## Frontend
First `cd frontend`, then:

- to start the app `cd main` and run `ng serve`. Check it out on http://localhost:4200
- you can develop all modules independently. For example, `cd hero` and run `ng serve`.
This launches a minimal app only displaying the hero module (i.e. without login etc).
You can test all modules using `ng test`.

# Development

The starter kit is highly modular. Every module has its own git repository
and its own npm package. You can develop all modules independently,
for example you could just download the router repository and work on the that one.

This repository here combines all repositories through git submodules.
This has the benefit of an "all in one place experience" and you get a
good overview over the code involved in this project. Note that all submodules are checked out on a **detached head**, so if you change something, commit, and switch branch to master it will be lost!
In case you use an IDE, I recommend opening just one feature module per editor-window
(as opposed to just opening the entire tsmean project).
IDEs typically can handle this much better,
for example IntelliJ can resolve Typescript imports much faster and is less laggy
in general when only part of the project is opened.

I actually like this workflow a lot. Open a feature module, implement changes on feature
and tests, publish to npm, pull in other parts of the projects.

# Live Demo
http://demo.tsmean.com

[![screenshot](https://s3.eu-central-1.amazonaws.com/bersling/images/tsmean-logo.png)](http://demo.tsmean.com)



# Homepage
http://www.tsmean.com
