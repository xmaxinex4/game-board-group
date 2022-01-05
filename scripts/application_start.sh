#!/bin/bash

# give permission to the files inside /secure_docs directory

sudo chmod -R 777 /home/ec2-user/gbg_app

# navigate into current working directory

cd /home/ec2-user/gbg_app

npm run build 
npm install
cd client 
npm install
cd ..

# start our node app in the background using pm2
sudo pm2 start dist/app.js -i max