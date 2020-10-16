# ISP Uptime Dashboard

You'll need 2 consoles- one to run the logger, one to start the React server

1. run `npm init` to install all dependencies
2. run `npm start` to start the React Dashboard server at `localhost:3000`
3. in a separate console window run `npm run logger`

## Other things

The logger can generate sample log data if you wanna mess around with this. run `npm run logger -s` to generate a randomized log (the bounds are based on my own ISP's behaviour) Then in App.js for the React app, toggle `debugging` to `true`;