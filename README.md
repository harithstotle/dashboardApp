This is my admin dashboard. It is mostly finished except for a few areas. Given a little time, the weaknesses can be improved upon. There are even some codes that are in place for improvement, only not ready to be fully implemented. Nevertheless, here is how to use the app.

-This app uses nestjs, typescript, and mongodb

1)run the app by npm run start 2) the app is running at localhost:3000
3)upon launch, one user is seeded with credentials admin@admin.com & “password” as password 4) Once you are at the swagger page, you can call almost all APIs except for creating and deleting entries 5) in order to get authorisation, you must first call the /login api using
{
"email": "admin@admin.com",
"password": "password"
} 6) A jwt token will be returned to you and that token can be used to authorise those selected API calls. 7) You can call any of the APIs , just pass the proper payload 8) For example : to create Employee use
{
“firstName”: “string”,
"lastName": "string",
“company”: “”,
“email”: “admin2@admin.com”,
“phone”: “string”,
“password”: “string”,

}

To create Company use:

{"name": "string",
"email": "email@email.com",
"logo": "string",
"websiteUrl": "string"}

Please note that emails have to be unique and have an @ character
