# BlogApplication

This is the REST API of blog application. It has all the features which a blog application possess excluding the media posting (images and files). It is ready to use with any front-end with some dependencies configurations.

## Authentication

        url : http://localhost:5000/auth
        
        1. Register (sign-up)
        2. Login (sign-in)
        3. Logout (sign-out)
        4. Stateless jwt authentication (sessions are not used)

## Blog CRUD

        url : http://localhost:5000/blog
        
        1. Create blog
        2. Like blog (toggle feature)
        3. Bookmark blog
        4. See all the blogs of a user
        5. Delete a blog
        6. Update a blog

## User CRUD

        url : http://localhost:5000/user
        
        1. Fetch all the users in the database
        2. View the profile of a user
        3. Delete a user

## Major Dependencies

        1. Mongoose - ORM for MongoDB
        2. ExpressJs - The core of API
        3. bcrypt - Used to hash the passwords for storing them in the database
        4. jsonwebtoken - Used jwt for user authentication

        See package.json for full list of dependencies
    
