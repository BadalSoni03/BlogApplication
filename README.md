# BlogApplication

This is the RESTful API of blog application. It has all the features which a blog application possess excluding the media posting (images and videos) and files. It is ready to use with any front-end after configuring some dependencies. All the end points are tested.

## Authentication

        root end - point : /auth
        
        1. Register (sign-up)  POST   : /register
        2. Login (sign-in)     POST   : /login
        3. Logout (sign-out)   POST   : /logout
        

## Blog CRUD

        root end - point : /blog
        
        1. Create blog         POST   : /create
        2. Like blog (toggle)  POST   : /like/:blogID
        3. Bookmark blog       POST   : /bookmark/:blogID
        4. All the blogs of
           a user              GET    : /fetch/:username
        5. Specific blog of
           a user              GET    : /fetch/:username/:blogID
        6. Delete a blog       DELETE : /delete/:blogID
        7. Update a blog       PUT    : /update/:blogID

## User CRUD

        root end - point : /user

        1. Sends forgot -      POST   : /account/forgot-password
           password request
        2. Resets password     GET    : /account/reset-password
        3. Fetch all the  
           users               GET    : /all-users
        4. View the profile 
           of a user           GET    : /profile 
        5. Delete a user       DELETE : /delete-user

## Major Dependencies and Tools

        1. Mongoose - ORM for MongoDB
        2. ExpressJs - The core of API
        3. Bcrypt - Used to hash the passwords for storing them in the database
        4. Jsonwebtoken - Used jwt for user authentication
        5. Nodemailer - Used for sending mails
        6. Postman - Used postman for API testing
        
        See package.json for full list of dependencies
    
