# ISP Uptime Dashboard

You'll need 2 consoles- one to run the logger, one to start the React server (if you wanna look at various charts of your uptime stats)

1. run `npm init` to install all dependencies
3. in a separate console window run `node logger -s`
2. run `npm start` to start the React Dashboard server at `localhost:3000`


## Other things

This uses my homespun scss framework, which I haven't gotten around to putting online, so uh comment that part out of index.scss if you _really_ want to play with this /shrug it shouldn't have much of an effect, the dashboard design is so simple

The logger can generate sample log data if you wanna mess around with this. Run `npm run logger -s` to generate a randomized log (the bounds are based on my own ISP's behaviour) Then in App.js for the React app, toggle `debugging` to `true`;