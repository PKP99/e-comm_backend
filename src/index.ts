import app from "./Server.ts";

import bodyParser from "body-parser";

// Start the server
const port = 8080;

// Parse the requests of content-type 'application/json'
app.use(bodyParser.json());

app.listen(port, () => {
  console.log("Express server started on port: " + port);
});
