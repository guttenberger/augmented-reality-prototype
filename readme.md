# Augmented Reality Prototype

## Description

Mark specific positions on the map and see them in augmented reality.
Postions will be saved on client side and will not be shared with anyone.
This project was done for a university course.

## Live Demo

https://guttenberger.github.io/augmented-reality-prototype/www/index.html

## Installation

1. Install [Docker](https://docs.docker.com/desktop/)

2. Download this repo
    > git clone https://github.com/guttenberger/augmented-reality-prototype.git

3. Open the directory and build the docker image:
    > docker build -t ar-proto .

4. Run Docker Image:
    > docker run --rm -p 3000:80 ar-proto

5. Open 'https://localhost:3000'
