# Compta

## Install and start

### MongoDB
  Just install a mongo database, following this link :

  [mongo documentation](https://docs.mongodb.com/manual/mongo/)

### Start Server
  ```bash
    cd server
    npm i
    nodemon index.js
  ```

### Start App
  ```bash
    cd app
    npm i
    npm run dev
  ```

## Contribution
  * Api documentation is on :

        your_absolute_project_path + /apidoc/index.html
    Example :

        file:///C:/wamp64/www/Compta/apidoc/index.html
  * Test your code and **lint**
      ```bash
        npm run lint
      ```
  * If you have modified the api think to regenere doc

        apidoc -i server/ -f "server.js" -o apidoc/
  * If necessary change version
      ```bash
        git tag -a [version]
      ```
  * Push
      ```bash
        Push origin dev --tags
      ```

## TO-DO
 - [x] add resource
 - [ ] list resource
 - [ ] edition resource
 - [ ] delete resource
 - [ ] hash password
