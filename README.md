# Web Integration Examples

Web Integrations is an implementation around the browser CORS mechanism used in Qlik Cloud. Web Integrations allows a tenant admin to control which third-party domains are allowed to interact with their tenant backend APIs. In essence, if you create a web app or mashup that is hosted on another domain than the tenant, you would need to create a web integration in the management console. In each web integration, you maintain a list of allowed (whitelisted) origins/domains.

This repository contains various stand-alone web apps and mashups that is meant to showcase how you may use the Qlik APIs to e.g. authenticate users, communicate using REST and websockets, embed  visualizations, and more _inside a browser environment_.

## Disclaimer

The examples in this repository have been compiled to provide users with information about ways to use Qlik APIs to produce web applications and API changes in Qlik Cloud. These examples are provided solely for informational purposes, and are not part of the Qlik Cloud product or Documentation, nor are these examples eligible for any Qlik Support.

For licensing, see [LICENSE](./LICENSE) file.

## Web apps

When we use the terminology "web apps" in the context of Qlik Cloud, we mean web-based applications in which you want to use the various Qlik backend APIs. Generally this means:

* not having to fetch any front-end files (CSS, JavaScript, etc.) from a Qlik Cloud tenant
* where you as the implementor may use any technology of your choice to build your solution
* wants to build custom visualizations, analytical interfaces, or perhaps administration UIs

## Mashups

In the Qlik world, "mashups" usually means to use the Qlik capability APIs and other various front-end files that is fetched from your tenant URL, by using those files you will also get things like require.js, angular.js, and other dependencies which may not be optimal for your use case. However, using the mashup approach will allow you to embed existing Qlik Sense visualizations (or create new ones on the fly).

## Examples

See below for a high-level explanation of the various web apps and mashups.

| Title                                                                   | Type    | Description | Deployment |
| ----------------------------------------------------------------------- | ------- | ----------- | -----------|
| [App Reloader](./app-reloader)                                          | Web app | This example shows you how to deal with authentication of users, and how to configure and use the necessary web integration and CSRF header when interacting with the Qlik backend APIs. | <https://qlik-oss.github.io/web-integration-examples/app-reloader/?tenant=https://your-tenant-url-here&wiid=web-integration-id> |
| [Embed Qlik Sense Visualizations](./embed-sense-visualizations)         | Mashup  | An example on how you can embed Qlik Sense visualizations in a webpage using the capability APIs. | <https://qlik-oss.github.io/web-integration-examples/embed/?tenant=https://your-tenant-url&wiid=web-integration-id&app=app-id> |
