<h1>Playlist API</h1>

<h3>Brief Description</h3>
<p>This application is a music playlist API that utilizes a node.js, mongoDB, express, and npm stack. There are users, playlists, and songs. The the playlists are owned by the users and the songs are selected by users to go into the user's preferred playlist.
</p>

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

<h4>Organization of Directories</h4>

```
Playlist API
    |-- models
    |   |-- user.js
    |   |-- playlist.js
    |   |-- songs.js
    |-- routes
    |   |-- userRouter.js
    |   |-- playlistRouter.js
    |   |-- songsRouter.js
    |-- controllers
    |   |-- userController.js
    |   |-- playlistController.js
    |   |-- songsController.js
    |-- tests
    |   |-- user.test.js
    |   |-- playlist.test.js
    |   |-- songs.test.js
    |-- .gitignore
    |-- app.js
    |-- server.js
    |-- package-lock.json
    |-- package.json
    |-- README.md
```

<h2><a href= "https://app.mural.co/t/tipsplitter4044/m/tipsplitter4044/1705449330418/184ff22033ee55a0b020ddac0c74291ce76b1495?sender=u9b5c6057df9541d75a930487">Entity Relationship Diagram</a></h2>

<h4>Available Routes</h4>
<h5>USER</h5>
  <ul>
    <li>router.post('/', userController.createUser)</li>
    <li>router.post('/login', userController.loginUser)</li>
    <li>router.get ('/profile', userController.auth, userController.showUser)</li>
    <li>router.post('/playlist', userController.auth, playlistController.create)</li>
    <li>router.put('/:id', userController.updateUser)</li>
    <li>router.delete('/:id', userController.auth, userController.deleteUser)</li>
  </ul>
<h5>PLAYLIST</h5>
  <ul>
    <li>router.post('/', userController.auth, playlistController.create)</li>
    <li>router.get('/', playlistController.index)</li>
    <li>router.put('/:id', userController.auth, playlistController.update)</li>
    <li>router.post('/:playlistId/songs/:songId', playlistController.addSong)</li>
    <li>router.get('/:id', playlistController.show)</li>
  </ul>
<h5>SONGS</h5>
  <ul>
    <li>router.post('/', userController.auth, songsController.create)</li>
    <li>router.get('/', songsController.index)</li>
    <li>router.put('/:id', userController.auth, songsController.update)</li>
    <li>router.get('/:id', songsController.show)</li>
  </ul>


