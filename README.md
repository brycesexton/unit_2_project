<h1>Playlist API</h1>

<h4>Description</h4>
<p>This application is a music playlist API that utilizes a node.js, mongoDB, express, and npm stack. There are users, playlists, and songs. The the playlists are owned by the users and the songs are selected by users to go into the user's preferred playlist.
</p>
<h4><a href= "https://app.mural.co/t/tipsplitter4044/m/tipsplitter4044/1705449330418/184ff22033ee55a0b020ddac0c74291ce76b1495?sender=u9b5c6057df9541d75a930487">Entity Relationship Diagram</a></h4>

<h4>Installation (in order)</h4>
<ul>
  <li>Make a main directory in your command line</li>
  <li>cd into your new directory</li>
  <li>Create .env file</li>
  <li>Npm i (to install all packages)</li>
  <li>Type code . to open your coding software</li>
  
 <li>Within your .env file add your unique MongoDB connection string
 </li>
 <li>Create a hash by visiting <a href="https://emn178.github.io/online-tools/sha256.html">SHA256</a>. Then put JWT.SECRET= **yourhash** into your .env</li>
 <li>npm run dev</li>
 <li>npm run test</li>
</ul>

<h6>Terminal Commands</h6>

```
-npm i
-npm run dev
-npm test
```
<h4>Endpoints, etc</h4>

<h6>USER</h6>
  <ul> 
    <li>Create User</li>
    <ul> 
        <li>POST /</li>
        <li>Controller: userController.createUser</li>
    </ul>
    <li>Login User</li>
        <ul>
            <li>POST /login</li>
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
    <li>List Playlists</li>
    <ul>
            <li>GET /</li>
            <li>playlistController.index</li>
    </ul>
    <li>Update Playlist</li>
    <ul>
            <li>PUT /:id</li>
            <li>Middleware: userController.auth,</li>
            <li>playlistController.update</li>
    </ul>
    <li>Add Song to Playlist</li>
    <ul>
            <li>POST /:playlistId/songs/:songId</li>
            <li>playlistController.addSong</li>
    </ul>
    <li>Show Playlist</li>
    <ul>
            <li>GET /:id</li>
            <li>playlistController.show</li>
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
    <li>List Songs</li>
    <ul>
            <li>GET /</li>
            <li>songsController.index</li>
    </ul>
    <li>Update Song</li>
    <ul>
            <li>PUT /:id</li>
            <li>Middleware: userController.auth</li>
            <li>songsController.update</li>
    </ul>
    <li>Show Song</li>
    <ul>
            <li>GET /:id</li>
            <li>songsController.show</li>
    </ul>
  </ul>

<h2>submit pull requests to contribute to the project!</h2>