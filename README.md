## Setup

### 1. Install Node.js, Angular, and Redis

- Node:
```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash

\. "$HOME/.nvm/nvm.sh"

nvm install 22.0.0

node -v # Should print "v22.0.0".
nvm current # Should print "v22.0.0".
npm -v # Should print "10.5.1".
```
- Angular: `npm install -g @angular/cli `

### 2. Clone the repository

```shell
$ git clone https://github.com/markiianbabiak/cypress-app.git
```

### 3. Install required dependencies

Install Frontend dependencies:

```shell
$ cd frontend
$ npm install
```

Install Backend dependencies:

```shell
$ cd backend
$ npm install
```

### 4. Add environment variables

Create a `env.json` file inside the `/frontend` directory (`touch env.json` in your terminal or manually create file using your IDE)

Add the following content into the `env.json` file and replace with your own credentials:

```
{"googleMapsApiKey": "YOUR_GOOGLE_MAPS_API_KEY"}
```

### 5. Run Application

Start server first, then start client app once the server has successfully started:

```shell

$ cd backend     # Go into backend folder if not already
$ npm run dev    # Start server

# … Open a new terminal tab to run client app

$ cd frontend    # Go into frontend folder
$ ng serve --port 4201      # Run Angular app; Will start application on http://localhost:4201/
```
