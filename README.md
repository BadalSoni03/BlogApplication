# BlogApplication

This is the REST API of blog application. It has all the features which a blog application possess excluding the media posting (images and videos) and files. It is ready to use with any front-end after configuring some dependencies. All the end points are tested.

## Authentication

        url : http://localhost:5000/auth
        
        1. Register (sign-up) : http://localhost:5000/auth/register
        2. Login (sign-in)    : http://localhost:5000/auth/login
        3. Logout (sign-out)  : http://localhost:5000/auth/logout
        4. Stateless jwt authentication (sessions are not used)

## Blog CRUD

        url : http://localhost:5000/blog
        
        1. Create blog        : http://localhost:5000/blog/create
        2. Like blog (toggle) : http://localhost:5000/blog/like/:blogID
        3. Bookmark blog      : http://localhost:5000/blog/bookmark/:blogID
        4. All the blogs of
           a user             : http://localhost:5000/blog/fetch/:username
        5. Delete a blog      : http://localhost:5000/blog/delete/:blogID
        6. Update a blog      : http://localhost:5000/blog/update/:blogID

## User CRUD

        url : http://localhost:5000/user
        
        1. Fetch all the  
           users              : http://localhost:5000/user/all-users
        2. View the profile 
           of a user          : http://localhost:5000/users/profile
        3. Delete a user      : http://localhost:5000/users/delete-user

## Major Dependencies and Tools

        1. Mongoose - ORM for MongoDB
        2. ExpressJs - The core of API
        3. bcrypt - Used to hash the passwords for storing them in the database
        4. jsonwebtoken - Used jwt for user authentication
        5. Postman - Used postman for API testing
        
        See package.json for full list of dependencies
    
