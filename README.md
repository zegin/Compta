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
    cd ..
    npm i
    npm run dev
  ```

## Contribution
  * Test your code and **lint**
      ```bash
        npm run lint
      ```
  * If necessary change version
      ```bash
        git tag -a [version]
      ```
  * Push
      ```bash
        Push origin dev --tags
      ```

## TO-DO
 - [x] configuration form
 - [ ] configuration validaton
 - [ ] configuration data persistence
