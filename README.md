# mynest

An original project build by nest-cli

# serve-data

A complete backend application, contains the following functions:

- using Swagger for API documents
- using Common Config Module and manage config in `.env` style 
- a basic user/roles system based on JWT
- a ES module, and provide async register methods.
- pm2 config to guard process
- custom logger
- monitoring check function module
- custom guards for role management
- custom interceptors for logging, timeout and transform response format
- custom pipe for validate request params
- custom exceptions for return a specific format for front-end interaction
- custom decorator for role manage in controller layer as decorator style