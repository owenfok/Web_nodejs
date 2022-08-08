# MongoDB (Docker)
## Pull latest mongodb image
docker pull mongo:latest
## Run docker image
docker run -itd --name mongo -p 27017:27017 mongo
- -d : To start a container in detached mode
- -p : designated port ("Host port":"container")
- -t : Allocate a pseudo-tty
- -i : Keep STDIN open even if not attached
- --auth : need password to access container service
## Show running container information
docker ps
## Connect to container
docker exec -it mongo mongo

## Running
  * npm install
  * npm start
  * open browser at `http://localhost:8081`

## Docker
docker build . -t 'image name'/node-web-app