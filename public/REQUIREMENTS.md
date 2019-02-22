# Project Requirements

## Description of Service Flow

(Steps that happen during use of the product)

## Domain Model

![alt text](https://github.com/nyu-software-engineering/mta-google-home/blob/master/public/images/mta4gh_domain_model.jpg "domain model")

## Use Cases

![alt text](https://github.com/nyu-software-engineering/mta-google-home/blob/master/public/images/mta4gh_use_cases.png "use case diagram")

### User Asks about train times

User asks Google for the next train time(s) at a certain station going in a certain direction. System validates and analyzes the question. System requests the relevant station and train line data from the MTA database. If there are service disruptions on the specified train line, the system will also report these. System puts the data into a user friendly sentence and replies to the user.

### User Asks about train service

User asks Google for the service status of a certain train lines or set of train lines. System validates and analyzes the question. System requests the relevant service disruption data from the MTA database. System puts the data into a user friendly sentence and replies to the user.

### User Asks invalid question

User asks Google a question about train times but does not include all relevant information. System analyzes question and prompts user for missing information such as station, train line, or direction of train. System analyzes users reply and either provides information or lets user know that the question was invalid.

## Interviews & Observations

### End-User Observations

<p>
Lauren Lennox lives and works in New York City.She either moved to New York in her early twenties or has lived there her entire life. She is comfortable with technology, meaning that upon arrival at her parent's house, she is asked to help out with the wifi or other menial domestic IT issues.
 Last Christmas, Her parents saw a commercial for the google home and thought it would a nice gift for their helpful daughter. 
Lauren, like other modern twenty-year-olds, understands the moral dilemmna of having an always-listening block of device in her apartment. However, she finds it useful for spotify streaming and for answering "googleable" questions. 
Recently, she has been running late due to the L/4/5/6/any train having strange arrival times and often, she'll either arrive at the station having just missed the train or will be resigned to an 8-10 minute wait for the next one.
  Suggested by her friend to combat this, MTA for GH enables Lauren to ask her google home for the train's exact arrival times. Now, she's been more on time for things like work or meeting with friends, all of whom have noticed her improved promptness.
 When asked about what triggered this sea change , She'll smile, look at the camera and say, " You can thank MTA for Google Home!" With her new found sense of organization and timing, Lauren integrates MTA for Google Home into her daily routine and currently reports a higher quality of life.
</p>
