const express = require("express");
const app = express();
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const dbPath = path.join(__dirname, "goodreads.db");
let db = null;
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Hello server is going on right now ?");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();
app.get("/books/", async(request, response) => {
    const getBookQuery = SELECT * FROM book ORDER BY book_id;
    const bookArray = await db.all(getBookQuery);
    response.send(bookArray);

});