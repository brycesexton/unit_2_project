<h1>Playlist API</h1>

<h4>Description</h4>
<p>This application is a music playlist API that utilizes a node.js, mongoDB, express, and npm stack. There are users, playlists, and songs. The the playlists are owned by the users and the songs are selected by users to go into the user's preferred playlist.
</p>
<h4><a href= "https://app.mural.co/t/tipsplitter4044/m/tipsplitter4044/1705449330418/184ff22033ee55a0b020ddac0c74291ce76b1495?sender=u9b5c6057df9541d75a930487">Entity Relationship Diagram</a></h4>

<h4>Installation</h4>
<ul>
  <li>Make a main directory in your command line</li>
  <li>Git init (once inside said directory)</li>
  <li>Create server.js, .env, .gitignore files</li>
  <li>Npm init -y</li>
  <li>Npm i express dotenv crypt jsonwebtoken mongoose</li>
  <li>Npm i -D nodemon jest supertest</li>
  <li>Type code . to open your coding software</li>
  <li>Go into the package.json file —> add “dev”: “nodemon” & "test": "jest" to the scripts section</li>
  <li>****JEST SHIT***</li>
 <li>Within your .env file add your unique MongoDB connection string. It will look like this: MONGO_URI=mongodb+srv://**your username**:**password**.mongodb.net/**projectname**?retryWrites=true&w=majority
 </li>
 <li>Create a hash by visiting <a href="https://emn178.github.io/online-tools/sha256.html">SHA256</a>. Then put JWT.SECRET= **yourhash** into your .env</li>
  <li>Make routes, controllers & models folders</li>
  <li>Create JavaScript files in each of the aforementioned folders for the user, playlist, & songs</li>
  <li>Create app.js and server.js files</li>
  <li>Open up your browser & head to <a href="www.github.com">GitHub</a></li>
  <li>Create a git repository for the API</li>
  <li>Head back to your terminal</li>
  <li>Git add -A</li>
  <li>Git commit -m “first commit”</li>
  <li>Git remote add origin (your github repo link)</li>
  <li>Git branch -M main </li>
  <li>Git push -u origin main</li>
</ul>

<h6>Terminal Commands</h6>

```
-npm i
-npm run dev
-npm test
```
<h4>Available Routes //no need to add request& response for get and delete</h4>

<h6>USER</h6>
  <ul> 
    <li>Create User</li>
    <ul> 
        <li>Endpoint: POST /</li>
        <li>Controller: userController.createUser</li>
    </ul>
    <li>Login User</li>
        <ul>
            <li>Endpoint: POST /login</li>
            <li>Controller: userController.loginUser</li>
        </ul>
    <li>User Profile</li>
    <ul>
            <li>GET /profile</li>
            <li>Middleware: userController.auth</li>
            <li>userController.showUser</li>
        </ul>
    <li>Create Playlist</li>
    <ul>
            <li>POST /playlist</li>
            <li>Middleware: userController.auth</li>
            <li>playlistController.create</li>
        </ul>
    <li>Update User</li>
    <ul>
            <li>PUT /:id</li>
            <li>userController.updateUser</li>
        </ul>
    <li>Delete User</li>
    <ul>
            <li>DELETE /:id</li>
            <li>Middleware: userController.auth</li>
            <li>userController.deleteUser</li>
        </ul>
  </ul>
<h6>PLAYLIST</h6>
  <ul>
    <li>Create Playlist</li>
    <ul>
            <li>POST /</li>
            <li>Middleware: userController.auth</li> 
            <li>playlistController.create</li>
        </ul>
    </ul>
    <li>List Playlists</li>
    <ul>
            <li>GET /</li>
            <li>playlistController.index</li>
        </ul>
    </ul>
    <li>Update Playlist</li>
    <ul>
            <li>PUT /:id</li>
            <li>Middleware: userController.auth,</li>
            <li>playlistController.update</li>
        </ul>
    </ul>
    <li>Add Song to Playlist</li>
    <ul>
            <li>POST /:playlistId/songs/:songId</li>
            <li>playlistController.addSong</li>
        </ul>
    </ul>
    <li>Show Playlist</li>
    <ul>
            <li>GET /:id</li>
            <li>playlistController.show</li>
        </ul>
    </ul>
  </ul>
<h6>SONGS</h6>
  <ul>
    <li>Create Song</li>
    <ul>
            <li>POST /</li>
            <li>Middleware: userController.auth</li>
            <li>songsController.create</li>
        </ul>
    </ul>
    <li>List Songs</li>
    <ul>
            <li>GET /</li>
            <li>songsController.index</li>
        </ul>
    </ul>
    <li>Update Song</li>
    <ul>
            <li>PUT /:id</li>
            <li>Middleware: userController.auth</li>
            <li>songsController.update</li>
        </ul>
    </ul>
    <li>Show Song</li>
    <ul>
            <li>GET /:id</li>
            <li>songsController.show</li>
        </ul>
    </ul>
  </ul>
