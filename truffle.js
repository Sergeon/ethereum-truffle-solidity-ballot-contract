module.exports = {
  build: {
    "index.html": "index.html",
    "app.js": [
        "../node_modules/jquery/dist/jquery.min.js",
        "../node_modules/materialize-css/dist/js/materialize.min.js",
        "../node_modules/underscore/underscore-min.js",
        "javascripts/functions.js",
        "javascripts/ballotGlobals.js",
        "javascripts/util.js",
        "javascripts/ballotReader.js",
        "javascripts/ballot.js",
        "javascripts/html.js",
        "javascripts/app.js"
    ],
    "app.css": [
        "../node_modules/materialize-css/dist/css/materialize.min.css",
        "stylesheets/app.scss"
    ],
    "images/": "images/",
    "fonts/" : "../node_modules/materialize-css/dist/font/"
  },
  deploy: [
    "Ballot",
    "MetaCoin",
    "ConvertLib"

  ],
  rpc: {
    host: "localhost",
    port: 8545
  }
};
