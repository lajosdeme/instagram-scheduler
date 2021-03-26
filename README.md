# instagram-scheduler
Schedule your photos to be posted automatically to Instagram at the specified time.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Usage

1. Click on the deploy to Heroku button above.

2. On the deployment page you need to configure a few environment variables for the project to work properly.
- ```IG_USERNAME```: The Instagram username you want to schedule your posts to.
- ```IG_PASSWORD```: The password for the Instagram account.
- ```IG_PROXY```: (Optional). Pass your proxy here if you have one. It's recommended to use one, otherwise you will make Instagram angry very fast by logging in from dynamic IP addresses. 
Format should be: 'http://username:pass@ip:port'.  
**Important**: It must be 'http' and not 'https' or you will receive an error. For more info [read this](https://stackoverflow.com/a/55226647/10706839).
- ```MONGODB_URI```: The URL for your MongoDB database. If you don't have one, follow the instructions [here](https://developer.mongodb.com/how-to/use-atlas-on-heroku/).
- ```SECRET```: Express session secret. A session secret is used for encrypting cookies. Generate a strong secret and add it. You can easily generate one in your shell. If you have openssl then simply ```openssl rand -hex 12```, or in Pyhton ```import secrets``` and then ```secrets.token_hex(16)```
- ```TZ```: By default your server uses UTC time. If you want to use some other time zone to schedule your posts you must specify it here.  
Your input must adhere to the [tz database timezone format](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
- ```NODE_ENV```: Node JS environment. Can be 'development' or 'production'.

3. Once you set these up and deployed your project you can log in with your Instagram username and password and start scheduling your posts.

4. Another important thing is that unless you change it, your server will use the Heroku free tier. This is sufficient for the purpose, but free Heroku apps will be put to sleep after 30 minutes of inactivity.  
You can however keep your app alive by scheduling a cron job to ping it every x minutes. Follow [this tutorial](https://betterprogramming.pub/keeping-my-heroku-app-alive-b19f3a8c3a82) to set this up.
You can use the ```/ping``` endpoint for this.

## Features
- Schedule a photo to be posted in a future date
- Add a caption
- Add first comment
- See your scheduled posts
- Unschedule a post

## Stack
- JavaScript
- Node.JS
- MongoDB/Mongoose
- Heroku
- Bootstrap
- Express
- Passport

## Screenshots
Nothing fancy here, just a dead simple and clean UI to manage your scheduled post. 

![scheduler1](https://user-images.githubusercontent.com/44027725/112515388-83284f80-8d96-11eb-82e6-ffa6eed2ae5f.png)

![scheduler2](https://user-images.githubusercontent.com/44027725/112515400-86234000-8d96-11eb-869b-baa78ab9d181.png)


## ⚠️ Warning
This project is not affiliated, endorsed or certified by Instagram. Sadly, Instagram does not offer a public API to schedule photos currently. This is an independent project relying on the unofficial private Instagram API. For the best results consider using a dedicated Instagram proxy. Absolutely not for spam. Use at your own risk.

## Roadmap
- [ ] Support tagging other users on the photo
- [ ] Support tagging location
- [ ] Support multiple Instagram accounts
- [ ] Support accounts with 2FA enabled
- [ ] Support scheduling stories
