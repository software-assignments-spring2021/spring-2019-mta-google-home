# MTA For Google Home
[![Build Status](https://travis-ci.com/nyu-software-engineering/mta-google-home.svg?branch=master)](https://travis-ci.com/nyu-software-engineering/mta-google-home)
A Google Home action that allows for real-time information about current MTA service.

## About

New York City's subways are often running on irregular schedules and routes. Many people find themselves running late because they had to wait 20 minutes for the next train or because the express trains were running on the local tracks. This application will allow users to ask their Google Home device questions about the subway system and receive information from the MTA's real time data feed.

## Instructions for Use
1. Assuming a Unix environment,
After doing what's in the readme, install ngrok (just added as a dependancy and ran the command)
In any case, https://gist.github.com/wosephjeber/aa174fb851dfe87e644e
Those are the instructions for installing it locally

1.1 Windows
Install Ngrok...https://ngrok.com/download and assign new path variables in environment variables.



2. Open a terminal in the project directory, run 
ngrok http 3000

3.Take the https exposed url, copy and paste it into dialogflow fulfilment as 
(Url)/fulfillment . https://######.ngrok.io/fulfillment

(This is an issue since the Prof and grader don't have access to our dialogflow, so maybe having a running instance for them is better)

3. Run another terminal to the project directory and run yarn start

4. Open a third terminal to mta-google-home-web and run node app.js

5. ask the questions!

### Building

If yarn and node.js are not yet installed, you will need to install them. We recommend installing with Homebrew by running the command `brew install yarn` 

Once yarn and node are installed, clone this repository using `git clone git@github.com:nyu-software-engineering/mta-google-home.git`

In your local repository, run `yarn install` to add all of the necessary dependencies.

Run `yarn start` to ensure that you have setup your environment correctly.

### Testing

To run unit tests, run `yarn test`. To run unit tests with coverage, run `yarn test-with-coverage`.

### Running

## Project Requirements

To view this project's requirements: [REQUIREMENTS.md](https://github.com/nyu-software-engineering/mta-google-home/blob/master/public/REQUIREMENTS.md)

## Contributing

For information about how to contribute to this project: [CONTRIBUTING.md](https://github.com/nyu-software-engineering/mta-google-home/blob/master/public/CONTRIBUTING.md)


## Authors

- Luis Olivar - [Luistics](https://github.com/Luistics)
- Vivian Fang - [vivfang](https://github.com/vivfang)
- Daniel Yoo - [DanielY-Yoo](https://github.com/DanielY-Yoo)
- Eisen Huang - [EisenHuang](https://github.com/EisenHuang)
- Kevin Nguyen - [bestnewkevin](https://github.com/bestnewkevin)
