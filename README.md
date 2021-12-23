# Portfolio Project 

Using OAuth 2.0 to authenticate a user to sign in with a google account in conjunction with 'Passport' middleware that aids in authenticating a user.

A cloud version of mongodb (https://www.mongodb.com/) is used as the database for storing the users once authenicated. Keys/secrets and login details for this database have not been uploaded to git for security.

The redirect URI only works on port localhost:3000

## Built with

* Passport http://www.passportjs.org/
* MongoDB https://www.mongodb.com/
* Mongoose
* Express
* JavaScript
* Node/NPM
* VS Code

## Steps of OAuth with Passport:

1. The front end browser homepage ("/") has a link called login (route: "/auth/login").

2. The node Express server listens for the google handler route ("auth/google/") which then redirects the user to sign
in using the google OAuth page handler assisted using "Passport.Authenticate".

3. The OAuth provider (google) grants permission and a redirect route is assisted by "Passport.Authenicate".

4. The Passport callback function will fire after step 3 and gives us access to the user's profile. A check is made to see if the user already exists on the database, if not they are added to the database. This check is made by comparing the googleid that is fetched to the key value pair in the mongodb (googleid: profileid).

5. User is now classed as logged into the site and can access pages that were restricted without a login.

6. A cookie is sent to the browser with the stored info with the users session on the site and the user has access to their 'dashboard'.

