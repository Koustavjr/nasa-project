# NASA Mission Control Project
The Front End of this application is taken from another repository and backend was made for educational purposes only. The API is created using Node.js and Express.js The planets data populated to the Front End is taken from the official NASA Website. This data is filtered out based on habitable planets criteria which are Stellar Flux between 0.36 and 1.11, Planetary Radius less than 1.6 times that of Earth.

# 📑Project Architecture
![Architecture](https://i.ibb.co/chmRMS6/architecture.png)

# 💻Backend Built With
1. <image src="https://th.bing.com/th/id/OIP.1CZy1NGFc50mJX7VxlPHQAHaIj?w=158&h=184&c=7&r=0&o=5&pid=1.7" height="50px" width="50px"> Node JS
2. <image src="https://ajeetchaulagain.com/static/7cb4af597964b0911fe71cb2f8148d64/87351/express-js.png" height="50px" width="50px"> Express JS
3. <image src="https://ded9.com/wp-content/uploads/2021/04/mongodb-2020-logo-600x375-1.png" height="50px" width="80px"> MongoDB
4.  <image src="https://codigoonclick.com/wp-content/uploads/2019/05/npm-nodejs.jpeg" height="50px" width="80px"> Morgan.js
5.  <image src="https://th.bing.com/th/id/OIP.4H3bTS-UBdjzsnKvUW-sIQAAAA?rs=1&pid=ImgDetMain" height="50px" width="80px"> Jest
6.  <img src="https://th.bing.com/th/id/OIP.710tCvb0eHNtcf8DbFOTdwHaHa?pid=ImgDet&rs=1" height=40px width=40px>API used - <br>
      NASA SPACE-X API
# 🏃‍♂️How to Run
  **_Front-end Installation_**
1. Navigate to Client folder
  ```
cd client
```
2. Install necessary Libraries 
```
npm i
```
3. To run fronted on local server

```
npm run start
```

**_Backend Installation_**
1. Ensure you have Node.js installed.
2. Create a free [Mongo Atlas](https://www.mongodb.com/atlas/database) database online or start a local MongoDB database.
3. Create a `server/.env` file with a `MONGO_URL` property set to your MongoDB connection string.
4. In the terminal, run:
```
`npm install`
```
## Running the server
1. Navigate to server folder
   ```
   cd server
   ```
2. Install required libraries
```
npm i
```
3. To run backend on local server
   ```
   npm start
   ```
**_Install Necessary files in root folder_**
In Root project folder (Nasa project) install required libraries and dependencies:
```
npm i
```

## <image src="https://th.bing.com/th/id/OIP.dEgEQ0JBlwn323Q_i0spsgAAAA?rs=1&pid=ImgDetMain0" height="50px" width="80px">  Docker Installation

1. Ensure you have the latest version of Docker installed
2. Run `docker build -t nasa-project .`
3. Run `docker run -it -p 8000:8000 nasa-project`

  ## Running the Tests

To run any automated tests, run `npm test`. This will: 
* Run all the client-side tests: `npm test --prefix client`
  
