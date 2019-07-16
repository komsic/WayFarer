[![Build Status](https://travis-ci.org/komsic/WayFarer.svg?branch=develop)](https://travis-ci.org/komsic/WayFarer) [![Coverage Status](https://coveralls.io/repos/github/komsic/WayFarer/badge.svg?branch=develop)](https://coveralls.io/github/komsic/WayFarer?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/6a4fddb586da3a0c16a2/maintainability)](https://codeclimate.com/github/komsic/WayFarer/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/6a4fddb586da3a0c16a2/test_coverage)](https://codeclimate.com/github/komsic/WayFarer/test_coverage)

# WayFarer
WayFarer is a public bus transportation booking server.

### Technologies

#### Server
* Node.js
* Express.js
* Babel
* postgres-node
* Heroku
* Swagger doc

#### TDD

* Mocha
* Chai

#### CI
* Travis
* Coverall
* Code Climate

### Installation
* Clone the app
```
      git clone https://github.com/komsic/Wayfarer.git
```
* Checkout to **develop** branch
```
      git checkout develop
```
* Run npm install
* Run npm start
* Run npm test for testing

### API Endpoints

| S/N| Request type   |  API description                                                    | Endpoint                      	|
|:--:|:--------------:|:-------------------------------------------------------------------:|:-------------------------------:|
|  1 | POST	          | Create a user                                                       | /auth/signup                    |
|  2 | POST           | Login a user                                                        | /auth/signin                    |
|  3 | POST           | Create a trip                                                       |  /trips                         |
|  4 | GET            | Get all trips                                                       | /trips                          |
|  5 | POST	          | Book a seat on a trip                                               | /bookings                       |
|  6 | GET	          | View all bookings. User can only see bookings that belongs to then  | /bookings                       |
|  7 | PATCH	        | Cancel a trip	                                                      | trips/:tripId                   |
|  8 | DELETE 	      | Delete a booking                                                    | /bookings/:bookingId            |
|  9 | GET	          | Filter trip by origin or destination  	                            | /trips?origin=[]&destination=[] |
| 10 | PATCH          | Change user seat   	                                                | /bookings/:bookingId 		        |


### Important Links
* [Pivotaltracker](https://www.pivotaltracker.com/n/projects/2360351)
* [Heroku](https://komsic-wayfarer.herokuapp.com/api/v1)
