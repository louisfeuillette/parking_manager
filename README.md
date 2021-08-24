How to start the project :
1 - Download the all project 'parking-manager' from https://github.com/louisfeuillette/parking_manager

2 - Ask to creator the .env file to authorize connection, access Atlas and MongoDB

3 - npm start 

4 - test all the routes in the order of the workflow with postman


/!\ Before reading the workflow, please have a look to the DB_structure.png /!\ 


The workflow is the following one :

1 - User sign-up. To improve security, I used bcrypt to hash the password and uid2 to create a token. Throw error and result false to the front if the username 

2 - User able to sign-in 

3 - User or admin can access in a single route to all the parking place

4 - User click on a floor number to see the parking spots

5 - User take a place. He receive a ticket with the date and time he arrived, the place that he choose and setting the availability to active true on the place in question. The user receives error if he's already parked, the parking spot don't exist or the place is already taken. Admin can also access to this route manually in case of problem.

6 - User can find his place with his ticket id.

7 - User leave the parking, switching the ticket (availability from active true to false) and printing the end date on it. Admin can also access to this route manually in case of problem.

8 - Get user info, useful for an admin for exemple 

9 - Update the user's password, not his username or he's role.

10 - Delete user, the user is no longer on the database 


Possible improvement :
1 - A special sign-up for admin or straight from the terminal to improve even more the security 

2 - Separate routes files into user and parking

3 - Improve the seeds scripts with Math random from a specific range of numbers to multiplicate the number of places in the database 

4 - Add active true / false into the user model so when the user delete his account we switch from active false and we keep his data 

