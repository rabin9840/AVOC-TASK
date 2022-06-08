
const express = require("express");
const app = express();
const dotenv= require("dotenv");
dotenv.config({path: 'config.env'});
const port=process.env.PORT;

require("./startup/routes")(app);
require("./tables/table")();


app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});

