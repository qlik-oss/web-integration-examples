# Web Integration Examples

Web Integrations is an implementation around the browser CORS mechanism used in QSEoK and QCS. Web Integrations allows a tenant admin to control which third-party domains are allowed to interact with their tenant backend APIs. In essence, if you create a web app or mashup that is hosted on another domain than the QSE deployment, you would need to create a web integration in the management console. In each web integration, you maintain a list of allowed (whitelisted) origins/domains.

This repository contains various stand-alone web apps and mashups that is meant to showcase how you may use the Qlik APIs to e.g. authenticate users, communicate using REST and websockets, embed Qlik Sense visualizations, and more _inside a browser environment_.

## Web apps

When we use the terminology "web apps" in the context of Qlik Sense, we mean web-based applications in which you want to use the various Qlik backend APIs. Generally this means:

* not having to fetch any front-end files (CSS, JavaScript, etc.) from a Qlik deployment
* where you as the implementor may use any technology of your choice to build your solution
* wants to build custom visualizations, analytical interfaces, or perhaps administration UIs

## Mashups

In the Qlik world, "mashups" usually means to use the Qlik Sense capability APIs and other various front-end files that is hosted by a Qlik deployment, by using those files you will also get things like require.js, angular.js, and other dependencies which may not be optimal for your use case. However, using the mashup approach will allow you to embed existing Qlik Sense visualizations (or create new ones on the fly).

## Examples

See below for a high-level explanation of the various web apps and mashups.

| Title                                                                   | Type    | Description | Deployment |
| ----------------------------------------------------------------------- | ------- | ----------- | -----------|
| [App Reloader](./app-reloader)                                          | Web app | This example shows you how to deal with authentication of users, and how to configure and use the necessary web integration and CSRF header when interacting with the Qlik backend APIs. | https://web-integration-examples.netlify.com/app-reloader/?tenant=https://elastic.example&wiid=web-integration-id |
| [Embed Qlik Sense Visualizations](./embed-sense-visualizations)         | Mashup  | An example on how you can embed Qlik Sense visualizations in a webpage using the capability APIs. | https://web-integration-examples.netlify.com/embed/?tenant=https://elastic.example&wiid=web-integration-id&app=app-id |
