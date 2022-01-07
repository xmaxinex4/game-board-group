#!/bin/bash

# give permission to the files inside /secure_docs directory

sudo su ec2-user
sudo chmod -R 777 /home/ec2-user/gbg_app

# navigate into current working directory

cd /home/ec2-user/gbg_app

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
nvm install node

npm run build 
npm install
cd client 
npm install
cd ..

# start our node app in the background using pm2
npm install pm2
sudo pm2 start dist/app.js -i max