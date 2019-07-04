# Mashup example using capability APIs

This is an example mashup showing how to use the webIntegrationId when using the capability APIs.

## Prerequisites

* A Qlik Sense Enterprise on Kubernetes or QCS tenant configured
* Tenant administrator privileges to create a web integration

## Get started

Start the mashup:

1. Install Node.js if you haven't already (https://nodejs.org)
1. Download and unpack, or git clone this repository
1. Edit the source code with your preferred text/code editor and replace all the occurrences of `elastic.example` with your deployment URL.
1. Open up a terminal window (Git Bash or similar preferred on Windows) and `cd` into the source code folder
1. Run `npm install` to install the project dependencies
1. Run `npm start` which should start a development server, open the link you see in your terminal (likely http://127.0.0.1:8080)

Then, configure your Qlik Sense Enterprise on Kubernetes or QCS tenant (requires tenant admin):

1. Go into your management console, e.g. https://elastic.example/console
1. To your left, select _Integrations -> Web_ and create a new web integration, make sure you add http://127.0.0.1:8080 (or whatever URL is shown in your terminal above) to your whitelist
1. Copy the web integration id and paste it into your web app's [config.js](./config.js) file, make sure you also update the tenant URL in that same file
1. Open up your web app in your browser

