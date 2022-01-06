#!/bin/bash

# stop existing node servers

sudo su ec2-user
echo “Stopping any existing node servers.”

pkill node