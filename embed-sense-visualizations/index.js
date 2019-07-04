

require(['config', 'comm'], function (config, { getUser, getTenant, getAppList, baseUrl }) {

  const loginBtn = document.querySelector('#login');

  // build a single-sign on URL and return back here once completed:
  const loginUrl = new URL(`${baseUrl}/login`);
  loginUrl.searchParams.append('returnto', location.href);
  loginUrl.searchParams.append('qlik-web-integration-id', config.webIntegrationId);

  loginBtn.addEventListener('click', () => {
    location.href = loginUrl;
  });

  const logoutBtn = document.querySelector('#logout');
  logoutBtn.addEventListener('click', () => {
    location.href = new URL(`${baseUrl}/logout`);
  });

  require.config({
    baseUrl: baseUrl + '/resources',
    webIntegrationId: config.webIntegrationId,
  });


  Promise.all([getUser(), getTenant()]).then(([user, tenant]) => {
    if ((user || tenant)) {
      loginBtn.disabled = true;
      logoutBtn.disabled = false;
      document.querySelector('.logged_in').style.opacity = 0;
      document.querySelector('.logged_out').style.opacity = 1;
      document.querySelector('#user').innerHTML = user.name;
      document.querySelector('#tenant').innerHTML = tenant.name;
      initMashup();
    } else {
      loginBtn.disabled = false;
      logoutBtn.disabled = true;
      document.querySelector('.logged_in').style.opacity = 1;
      document.querySelector('.logged_out').style.opacity = 0;
    }
  });



  function initMashup() {
    getAppList().then(list => {

      const ulElement = document.createElement('ul');
      list.data.forEach(appItem => {
        const liElement = document.createElement('li');
        liElement.innerHTML = `<b>${appItem.name}</b> - ${appItem.resourceId}`;
        ulElement.appendChild(liElement);
      });
      document.querySelector('#app_list').appendChild(ulElement);

      const appIds = list.data.filter(appItem => {
        return appItem.name.indexOf('Helpdesk') !== -1;
      }).map((appItem) => {
        return appItem.resourceId;
      });

      require(['js/qlik'], (qlik) => {
        const app = qlik.openApp(appIds.length ? appIds[0] : config.appId, config);

        app.on("error", (error) => {
          console.log(error.message);
        });

        app.getObject('CurrentSelections', 'CurrentSelections');

        //Create visualizations
        app.visualization.create(
          'linechart',
          ["Case Owner",
            {
              "qLibraryId": "eqZjE",
              "qType": "measure"
            },
            {
              "qLibraryId": "MPcQeZ",
              "qType": "measure"
            }
          ],
          {
            "title": "Linechart",
            "navigation": false,
            "dataPoint": { "bubbleSizes": 8 },
            "labels": { "mode": 1 },
            "color": {
              "auto": false,
              "mode": "primary",
              "useBaseColors": "off",
              "paletteColor": {
                "index": -1,
                "color": "#E5A000"
              }
            }
          }
        ).then((vis) => {
          vis.show("QV01");
        });

        app.visualization.create(
          'barchart',
          ["Case Owner Group", "=Avg([Case Duration Time])"],
          {
            "title": "Barchart",
            "orientation": "horizontal",
            "dataPoint": { "showLabels": true },
            "gridLine": { "auto": false, "spacing": 3 },
            "color": {
              "auto": false,
              "mode": "primary",
              "useBaseColors": "off",
              "paletteColor": {
                "index": -1,
                "color": "#E5A000"
              }
            }
          }
        ).then((vis) => {
          vis.show("QV02");
        });

      });
    });
  }
});
