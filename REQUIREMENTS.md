# Project Requirements

## Description of Service Flow

(Steps that happen during use of the product)

## Domain Model

## Use Cases

### User Asks about train times

User asks Google for the next train time(s) at a certain station going in a certain direction. System validates and analyzes the question. System requests the relevant station and train line data from the MTA database. If there are service disruptions on the specified train line, the system will also report these. System puts the data into a user friendly sentence and replies to the user. 

### User Asks about train service

User asks Google for the service status of a certain train lines or set of train lines. System validates and analyzes the question. System requests the relevant service disruption data from the MTA database. System puts the data into a user friendly sentence and replies to the user.

### User Asks invalid question

User asks Google a question about train times but does not include all relevant information. System analyzes question and prompts user for missing information such as station, train line, or direction of train. System analyzes users reply and either provides information or lets user know that the question was invalid.

## Interviews & Observations
