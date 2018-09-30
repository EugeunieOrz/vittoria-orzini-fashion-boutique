Vittoria Orzini Fashion Boutique and Online Store
==================================================

Website is divided into backend written in Scala using Play framework and MongoDB persistence layer 
and frontend written in React.js using Redux for managing state.

#### Features 

* Sign In / Sign Up functionality
* After Sign Up you're redirected to My Account without confirming account activation.
* Password strength meter using zxcvbn
* Password masking (show / hide password functionality)
* My Account functionality includes editing personal data like changing password and email
* Cookie authentication
* Dependency Injection with Guice
* Publishing Events
* Avatar service
* Remember me functionality
* Password reset functionality with password survey afterwards
* Email sending and auth token cleanup
* MongoDB storage
* [Security headers](https://www.playframework.com/documentation/2.5.x/SecurityHeaders)
* [CSRF Protection](https://www.playframework.com/documentation/2.5.x/ScalaCsrf)


#### Installation 

Install all NPM dependencies for the UI:

```bash
cd app-ui

# With NPM
npm install


#### Run in dev mode 

Start the application with the following command.

```
sbt run
```

You can open `http://localhost:9000` which redirects you to `http://localhost:5000`. Or you open the UI directly with `http://localhost:5000`. (Note that mongo must be already started)
