#!/bin/bash

# give permission to the files inside /secure_docs directory

sudo su ec2-user
sudo chmod -R 777 /home/ec2-user/gbg_app

# navigate into current working directory

cd /home/ec2-user/gbg_app

sudo /usr/bin/npm install
sudo /usr/bin/npm run build

# set environment variables
sudo yum update -y
sudo yum install -y jq

rm -f -- .env
> .env

echo 'ACCESS_CONTROL_ALLOW_ORIGIN=$(aws secretsmanager get-secret-value --region us-west-2 --secret-id ACCESS_CONTROL_ALLOW_ORIGIN --query SecretString --output text | jq -r .ACCESS_CONTROL_ALLOW_ORIGIN)' >> .env
echo 'APIBASEURL=$(aws secretsmanager get-secret-value --region us-west-2 --secret-id APIBASEURL --query SecretString --output text | jq -r .APIBASEURL)' >> .env
echo 'BASEURL=$(aws secretsmanager get-secret-value --region us-west-2 --secret-id BASEURL --query SecretString --output text | jq -r .BASEURL)' >> .env
echo 'APP_SECRET=$(aws secretsmanager get-secret-value --region us-west-2 --secret-id APP_SECRET --query SecretString --output text | jq -r .APP_SECRET)' >> .env
echo 'DATABASE_URL=$(aws secretsmanager get-secret-value --region us-west-2 --secret-id DATABASE_URL --query SecretString --output text | jq -r .DATABASE_URL)' >> .env
echo 'SENDGRID_API_KEY=$(aws secretsmanager get-secret-value --region us-west-2 --secret-id SENDGRID_API_KEY --query SecretString --output text | jq -r .SENDGRID_API_KEY)' >> .env

# start our node app in the background using pm2
pm2 describe app > /dev/null
RUNNING=$?

if [ "${RUNNING}" -ne 0 ]; then
  sudo /usr/bin/pm2 start dist/app.js -i max
else
  sudo /usr/bin/pm2 restart app
fi;