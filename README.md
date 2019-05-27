# Web app using Qlik backend APIs

**Note: Work on progress. You cannot get redirected back to your web app yet. You need to manually sign in and return to your web app again.**

This is a simple web application that uses the new Qlik SaaS APIs to showcase how you can:

* Build modern web applications and integrate with Qlik APIs
* Sign in users on a Qlik Sense Enterprise on Kubernetes deployment or QCS tenant
* Configure REST calls to work against said deployments

## Prerequisites

* Some modern web development knowledge (Node.js / browsers)
* A Qlik Sense Enterprise on Kubernetes or QCS tenant configured
* Tenant administrator privileges to create a web integration

## Get started

Start the web app:

1. Install Node.js if you haven't already, make sure you are on _at least_ version 8.x: https://nodejs.org
1. Download and unpack, or git clone this repository
1. Open up a terminal window (Git Bash or similar preferred on Windows) and `cd` into the source code folder
1. Run `npm install` to install the project dependencies
1. Run `npm start` which should start a development server, open the link you see in your terminal (likely http://127.0.0.1:1234)

Then, configure your Qlik Sense Enterprise on Kubernetes or QCS tenant (requires tenant admin):

1. Go into your management console, e.g. https://mytenant.qcs.com/console
1. To your left, select _Integrations -> Web_ and create a new web integration, make sure you add http://127.0.0.1:1234 (or whatever URL is shown in your terminal above) to your whitelist
1. Copy the web integration id and paste it into your web app's [src/index.jsx](./src/index.jsx) file, make sure you also update the tenant URL in that same file
1. Open up your web app in your browser
