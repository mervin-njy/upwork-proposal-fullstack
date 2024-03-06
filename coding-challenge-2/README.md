# HTTP server in Node.js

This is a basic HTTP server that handles web requests on a specified port (3000 by default), which can be accessed when you run the server locally. It includes routing for the root ('/') and about ('/about') paths, as well as error handling for non-existing routes. I have also included a 2048 ('/2048') path, where you can play a rendition of the popular 2048 game that I've built with vanilla JavaScript.

## To setup

1. **Clone the Repository** (skip this if you have already done so):

   ```bash
   git clone https://github.com/mervin-njy/upwork-proposal-fullstack.git
   ```

2. **Navigate to Project Directory:**

   ```bash
   cd upwork-proposal-fullstack/coding-challenge-2
   ```

## To run server

1. **Start the Server:**

   ```bash
   node server.js
   ```

2. **Access the Server:**
   Open your web browser and visit the following URLs:
   - http://localhost:3000/ for the root route
   - http://localhost:3000/about for the about route
   - http://localhost:3000/2048 for the 2048 game route

## Notes

1. There are no external dependencies involved, apart from Node.js. The core modules involved in Node.js are as follows:
   - _http_: to provide web-related functionalities like creating HTTP servers and making HTTP requests.
   - _url_: to parse and format URLs into components.
   - _path_: to support tasks like joining file and directory paths.
   - _fs_ (file system): to enable interaction with the file system, like reading and writing operations.
2. It is important that you are in the project's root directory before running the server.
3. The port used by default is 3000. You may change the port in the server.js file if it is being utilized.
