# BlogApplication

This repository contains the Blog API.

Functionalities:

    Authentication , authorization and validation : Jsonwebtoken for authentication and authorization and express-validator for validation

    Create blog : User can create blog (if authorized)

    Delete blog : User can delete some blogs (if authorized)

    Block user : A user can block another user (if authorized)

    Like : User can like the blog of some other user as well (if authorized)

    Get all blogs of a user : A user can see all the blogs of a user (no need of authorization as this is a get request)

    Visit the profile of an author (blogger) : A user can see the profile of a user which contains username , email , total likes on all blogs , all blogs of the user. 
                                               This action does not need any authorization as this is again a get request and data corruption is not possible.
