# NodeJs-Final-Project - Anime Spotify
This is a simple music web app where you can search anime music and be able to save the music to your library. This app also includes being able to create accounts.

# Features
- Sign Up
- Log In
- Search Anime
- View Seasonal Anime
- Play Music
- Add music to library (Favorites)

# Technologies
The stack/ technologies I used to build this app are the following:
> MongoDB (Database)
> ExpressJS (Back-end) 
> ReactJS (Front-end)
> NodeJS (Back-end)
> Tailwind CSS (CSS)
> Animethemes (API)

# How to run this app
After cloning the project, you'll need to first setup your own MongoDB account which includes setting up a database access, database, and collection.
In my case, I named my database 'Final-Project' and a collection called 'users'.
Create a .env file with the following contents:
> MONGO_URL= <br />
> MONGO_DB_NAME=Final-Project <br />
> PORT=8000

Note: MONGO_URL can be obtained in the database dashboard, where you can find the connect button, choose first option, and then a connection string will be shown.

> npm i <br />
> npm run dev
