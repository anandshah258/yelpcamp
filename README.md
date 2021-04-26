# YelpCamp

#### It's a Web Application where you can explore campgrounds (a place used for camping) created by others, review them as well as create and share your own. The goal of this application is to provide a platform for the users to create shared campgrounds and review them like Yelp. 

## Main Features and Working

The application consists of a simple homepage with different links to view all campgrounds, login and register. 

**Cluter Map**: On the campgrounds index page, a cluster map containing all the campgrounds is featured using the **Mapbox API**. Instead of displaying all the campgrounds on the map simultaneouly, they are grouped into clusters. Upon zooming in, the clusters get divided into smaller clusters and eventually into single points that represent individual campgrounds. These points can be clicked upon to reveal inormation and contain a link to navigate to the details page. The Index page also has links to create a new campground and to navigate back to the home page.

The details page will show information about the campground as well as the option to edit and delete it. It will also display a map with a pin on it representing the campground's location. A user will have the option to leave a review and delete it on this page as well.

**Mongo Cloud Atlas DB**: It has been used to store all information about the users, campgrounds and reviews. Every campground and review get associated with a user upon creation as defined by the Schema.
Initially the database has been seeded with sample campgrounds data.

**Mongoose ODM**: It has been used to connect this **Express** app with Mongo DB. The Schemas for User, Campground and Review models have been designed with it. The application also uses it to model and validate the data as well as query the database using Javascript.

**Session Management**: The **Express Session** has been configured so that user session data associated with a browser can be stored using the session data store and Authentication can be implemented. The application has been configured to store the session information in the **Mongo DB** instead of using the default memory store used by the express session.

**Authentication**: The **Passport** middleware have been configured to implement authentication for this application. If a user tries to make a new campground without logging in, the application redirects them to the login page. After logging in they can create a new campground by filling in some details about the campground and also upload images for it.

**Authorization**: A user can only edit/delete a campground or a review if they are the owner of that campground/review. Editing the campground would involve changing it's information as well as adding or removing new images associated with it.

**Image Upload**: A user can upload multiple image files associated with a campground. The **Cloudinary API** is used to store these files. The API sends back the *urls* of the images which have been uploaded on its servers. The *urls* returned get stored in the Mongo database and correspond to the image files that have been uploaded to the Cloudinary API.

**Geocoding**: A user will provide the location while creating a campground. This location will be geocoded to figure out the coordinates (latitude, longitude) using the **MapBox Geocoding API**. The API will take the location and return the coordinates which will then be stored in the database for creating a pin on the map.

**Security**: Basic Security Features to prevent exploits like Mongo Injection and Cross Site Scripting by sanitizing HTML. The **Helmet** middleware has been configured with the app to secure it by setting various HTTP headers. It also sets the Content Security Policy header which adds an extra layer of security by specifying the domains that the browser should consider to be valid sources of executable scripts. This allows the Web Browser to only execute scripts loaded in source files received from the allowed domains, ignoring all other scripts including inline scripts and event-handling HTML attributes.

**Deployment**: The app has been deployed on the **Heroku** platform with the help of Heroku CLI and it can be managed directly from the terminal. 

**Architecture**: The application has been structured using the **Model-View-Controller (MVC)** architectural pattern seaparating the application logic from routes. Data modelling is cotained in the models directory. Views directory contains the content to be displayed and layouts. Controllers contain the main logic and functionality like rendering views, working with models and making requests to APIs.
