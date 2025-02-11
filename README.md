Spotify Browser in Angular
====================

Spotify browser implementation in Angular.

Installing dependencies
-------
`cd` into both client and webserver folders and run `npm install` 

Running the webserver
-------
1. Login to [Spotify Developers](https://developer.spotify.com/dashboard/) and create an application.
2. Set the redirect URI to [http://localhost:8888/callback](http://localhost:8888/callback).
3. `cd` into the webserver folder
4. Create a file called `client_secret.json` and set the client key and client secret in the following format:
```sh
{
 "client_id": "Your Client Key",
 "client_secret": "Your Client Secret"
}
```
5. Create a file called `tokens.json` which contains:
```sh
{
 "access_token": null,
 "refresh_token": null
} 
```
6. Run `npm start`

Running the client
-------
`cd` into the client folder and run `ng serve`. This will start the client at `localhost:4200`
