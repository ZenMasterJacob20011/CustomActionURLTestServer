# Custom Action URL Test Server
This is a test server to test the **Custom Action Url** for Forms

![tempsnip.png](img%2Ftempsnip.png)

## How to run the server with Docker
1. Download the [docker desktop app](https://www.docker.com/products/docker-desktop/)
2. Open the docker desktop app
3. Download and unzip this project onto your computer
4. Open your command prompt and navigate to the directory were you unzipped the project
5. Type `docker-compose up`
6. Open your browser and type `http://localhost:<RESTPORT in .env file>`
7. You can now send and view the submission JSON in your browser 
## How to run the server with Node.js
1. Download and install [Node.js](https://nodejs.org/en)
2. Download and unzip this project onto your computer
3. Open your command prompt and navigate to the directory were you unzipped the project
4. type `npm install`
5. type `tsc`
6. type `npm start`
7. Open your browser and type `http://localhost:<RESTPORT in .env file>`
8. You can now send and view the submission JSON in your browser

##### Note
If you are getting errors that a port is already in use then change the ports in the .env file