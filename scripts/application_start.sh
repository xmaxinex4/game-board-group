#!/bin/bash

# give permission to the files inside /secure_docs directory

sudo su ec2-user
sudo chmod -R 777 /home/ec2-user/gbg_app

# navigate into current working directory

cd /home/ec2-user/gbg_app

sudo /usr/bin/npm install
sudo /usr/bin/npm run build 
cd client 
sudo /usr/bin/npm install
cd ..

# start our node app in the background using pm2
sudo /usr/bin/pm2 start dist/app.js -i max