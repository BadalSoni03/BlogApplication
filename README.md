# BlogApplication

This is the REST API of blog application. It has all the features which a blog application possess excluding the media posting (images and videos) and files. It is ready to use with any front-end after configuring some dependencies. All the end points are tested. Used stateless JWT authentication. 

## Authentication

        end - point : /auth
        
        1. Register (sign-up) , POST   : /auth/register
        2. Login (sign-in)    , POST   : /auth/login
        3. Logout (sign-out)  , POST   : /auth/logout
        

## Blog CRUD

        end - point : /blog
        
        1. Create blog         POST   : /blog/create
        2. Like blog (toggle)  POST   : /blog/like/:blogID
        3. Bookmark blog       POST   : /blog/bookmark/:blogID
        4. All the blogs of
           a user              GET    : /blog/fetch/:username
        5. Specific blog of
           a user              GET    : /blog/fetch/:username/:blogID
        6. Delete a blog       DELETE : /blog/delete/:blogID
        7. Update a blog       PUT    : /blog/update/:blogID

## User CRUD

        end - point : /user
        
        1. Fetch all the  
           users               GET    : /user/all-users
        2. View the profile 
           of a user           GET    : /users/profile
        3. Delete a user       DELETE : /users/delete-user

## Major Dependencies and Tools

        1. Mongoose - ORM for MongoDB
        2. ExpressJs - The core of API
        3. bcrypt - Used to hash the passwords for storing them in the database
        4. jsonwebtoken - Used jwt for user authentication
        5. Postman - Used postman for API testing
        
        See package.json for full list of dependencies
    
