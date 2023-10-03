var express = require("express"),
  morgan = require("morgan"),
  compress = require("compression"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override");

module.exports = function () {
  var app = express();

  // check to log when in dev mode and gzip/compress responsie when in production mode
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  } else if (process.env.NODE_ENV === "production") {
    app.use(compress());
  }

  /*
    This line configures the Express application (app) to use the body-parser middleware.
    It allows the application to parse data submitted via URL-encoded forms.
    The extended: true option enables parsing of nested objects in the submitted form data.
  */
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  /*
    This line configures the application to use the body-parser middleware again, but this time to parse JSON data. 
    It enables the application to parse JSON data sent in the request body.
   */
  app.use(bodyParser.json());

  /*
    This line sets up the method-override middleware, which allows the application to use HTTP verbs such as 
    PUT or DELETE in places where the client doesn't support it natively (e.g., HTML forms only support GET and POST).
  */
  app.use(methodOverride());

  /*
    This line sets the "views" configuration option for the application to the path "./app/views". 
    It specifies the directory where the application's views (templates) are located.
  */
  app.set("views", "./app/views");

  /*
    This line sets the "view engine" configuration option for the application to "ejs". 
    It specifies the template engine that should be used for rendering views. In this case, 
    it's set to EJS (Embedded JavaScript) templating engine.
  */
  app.set("view engine", "ejs");

  /*
    This line mounts a router middleware at the root ("/") path. It requires the "../app/routes/index.js"
    module, which contains the routes for the application.
    It means that any request to the root path will be handled by the routes defined in the "index.js" file.
  */
  app.use("/", require("../app/routes/index.server.routes.js"));

  /*
  This line serves static files located in the "./public" directory. It sets up a middleware to handle 
  requests for static assets (e.g., CSS files, JavaScript files, images) from the specified directory.
  */
  app.use(express.static("./public"));

  /*
    This line serves static files located in the "./node_modules" directory. It sets up a 
    middleware to handle requests for static assets from the node_modules directory, which is 
    commonly used to install and store third-party libraries or modules.
  */
  app.use(express.static("./node_modules"));

  return app;
};
