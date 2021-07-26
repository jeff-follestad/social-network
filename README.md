**OVERVIEW**

The goal of this project was to build an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. This API uses `Express.js` for routing, a `MongoDB` database and `Mongoose ODM` to handle large amounts of unstructured data, and `Moment.js` date library.

**FUNCTIONALITY**

* When the application is launched, a server is started and the `Mongoose` models are synced to the `MongoDB` database.

* If a user opens API `GET` routes in `Insomnia Core` for `users` and `thoughts`, the data for each of these routes is displayed in a formatted `JSON`.

* When users test API `POST`, `PUT`, and `DELETE` routes in `Insomnia Core`, they are able to successfully create, update, and delete users and thoughts in the database.

* When users test API `POST` and `DELETE` routes in `Insomnia Core`, they can create and delete reactions to thoughts and add and remove friends to a user’s friend list.

**USE THIS API**

First, be sure you have MongoDB installed https://www.mongodb.com/

Next, make a copy of this repository, and run `npm-i` to install the following packages: 
* express.js https://www.npmjs.com/package/express
* mongoose https://www.npmjs.com/package/mongoose
* moment https://www.npmjs.com/package/moment

**VIDEO DEMO OF API**
* text<link to the video>






