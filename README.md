## Setup

### 1. Install Node.js and Angular

- Node:
macOS:
```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash

\. "$HOME/.nvm/nvm.sh"

nvm install 22.0.0

node -v # Should print "v22.0.0".
nvm current # Should print "v22.0.0".
npm -v # Should print "10.5.1".
```
Windows:
```shell
winget install Schniz.fnm

fnm install 22.0.0

node -v # Should print "v22.0.0".
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

Create a `.env` file inside the `/backend` directory (`touch .env` in your terminal or manually create file using your IDE)

Add the following content into the `.env` file and replace with your own credentials:

```
JWT_SECRET=YOUR_JWT_SECRET
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
GOOGLE_MAPS_API=YOUR_GOOGLE_MAPS_API_KEY
SMTP_HOST=YOUR_SMTP_HOST
SMTP_PORT=YOUR_SMTP_PORT
SMTP_EMAIL=YOUR_SMTP_EMAIL
SMTP_PASSWORD=YOUR_SMTP_PASSWORD
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
