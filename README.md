# Data validator
QA Tool for http requests

## Global dependencies

```
node.js
npm
mongoDB account
```
#### Project setup
```
add env variables in .env file in root folder:
MONGO_USER=MongoDBUserName
MONGO_PW=MongoDBPassword
MONGO_DB=MongoDatabaseName
JWT_KEY=yourSecretStringKey
```

```
npm install
```

#### Project run
```
npm run start
```


#### Routes

Request headers for routes : 

Content-Type : application/json

Authorization : Bearer tokenValue

*unprotected routes are :  /register and /login


##### User related routes
```
Register user :
POST  baseURL/register 
req.body :{
    email : String
    password : String,
    confirmPassword :String
} 
```

```
Login user :
POST  baseURL/login 
req.body :{
    email : String,
    password : String
} 
```

```
Get all users :
GET baseURL/users 
```

```
Get user by id :
GET baseURL/users/:userId 
```

```
Update user id :
PATCH baseURL/users/:userId
req.body: {
[{"propName" : "name of key to update", "value" : "value to be updated},{"propName" : "name of other key to update", "value" : "value to be updated}]
}
```

```
Delete user :
DELETE baseURL/users/:userId
```

##### Request related routes

```
Add new request :
POST baseURL/requests
req.body :{
  //required fields : 
  url : String
  method: String,

  //optional fields :
  headers : Object  ,example: 
  headers : {
    Content-Type : application/json,
    Authorization : Bearer tokenValue
    },
  title : String,
  description : String,
  tag : Array,
  label : String, default: "Unsorted"    
}
```

```
Send saved request and get a response :
POST baseURL/sendrequest
req.body: {
  requestId : "requestId"
}
```

```
Update request :
PATCH baseURL/requests/:requestId
req.body:{
[{"propName" : "name of key to update", "value" : "value to be updated},{"propName" : "name of other key to update", "value" : "value to be updated}]
}
*Keys which can be updated : 
verified : Boolean,
comment : String,
tag : Array,
description : String,
label : String,
title : String,
url : String,
headers: Object
Note:if you want to change req.query.params,add them in url 


```

```
Get all requests :
GET baseURL/requests/
```

```
Get single request :
GET baseURL/requests/:requestId
```

```
Get all responses for single request :
GET baseURL/requests/:requestId/responses
```
```
Delete request and all his responses :
DELETE baseURL/requests/:requestId
```

##### Response related routes

```
Get all responses :
GET baseURL/responses
```

```
Get single response :
GET baseURL/responses/:responseId
```

```
Update response :
PATCH baseURL/responses/:responseId
req.body : {
[{"propName" : "name of key to update", "value" : "value to be updated},{"propName" : "name of other key to update", "value" : "value to be updated}]
}
*Keys which can be updated : 
verified : Boolean,
comment : String,
responseText : String,
responseStatus : Number
```

```
Delete response :
DELETE baseURL/responses/:responseId
```