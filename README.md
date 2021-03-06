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
MONGO_CLUSTER=MongoClusterPath
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
[{"propName" : "name of key to update", "value" : "value to be updated},
{"propName" : "name of other key to update", "value" : "value to be updated}]
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
  body : Object,
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

  *optional field in case you want to change the value of Authorization header :
  Authorization : "Bearer tokenValue"
}
```

```
Update request :
PATCH baseURL/requests/:requestId
req.body:{
[{"propName" : "name of key to update", "value" : "value to be updated},
{"propName" : "name of other key to update", "value" : "value to be updated}]
}
*Keys which can be updated : 
verified : Boolean,
comment : String,
description : String,
label : String,
title : String,
url : String,
headers: Object,
tag : Array

Note:
-changing req.query.params is possible through url 
-using key 'tag' will remove former array and add a new one
-using key 'updateTag' will add a new string to existing array

```

```
Get all requests :
GET baseURL/requests/

query params for pagination and filters

page : Number,
limit : Number,
label : String,
verified : Boolean,
verifiedByUser : ObjectID,
baseUrl : String,
tag : String,
isChecked : Boolean,
sort : key name to be sorted with, example:
sort=description, ascending  
sort=-description, descending with "-" operator 

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
```
Get list of labels :
GET baseURL/labels
```
```
Get list of tags :
GET baseURL/tags
```

##### Response related routes

```
Get all responses :
GET baseURL/responses

query params for pagination and filters:
page : Number,
limit : Number,
isChecked : Boolean,
verified : Boolean,
verifiedByUser : ObjectID,
comment : String
sort : key name to be sorted with, example:
sort=description, ascending,
sort=-description, descending with "-" operator 
```

```
Get single response :
GET baseURL/responses/:responseId
```

```
Update response :
PATCH baseURL/responses/:responseId
req.body : {
[{"propName" : "name of key to update", "value" : "value to be updated},
{"propName" : "name of other key to update", "value" : "value to be updated}]
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

##### Response checker routes

```
Check if two responses are equal by data :
POST baseURL/checkresponse
req.body : {
  "id" : ["firstResponseIdTocheck","secondResponseId"],
  *optional field:
  "dataKey" : "String to represent path to responseData, in case there is metadata you want to avoid comparing. Default path for all responses is 'responseData' key in response
}
```