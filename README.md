DMS:

Its the DMS API, it is buit using NodeJs, Express and MongoDb.
Unit testing is implemented using Jest.
Docker container is added for CI/CD/

The main features are:

1. Authentication: Login, LogOut, SignUp and Password Reset
2. File upload: Upload file with name, description and expiry date.
3. Folder: Can create folder iniside myfiles and inside a department and will be able to navigate to the folders.
4. Department: Role based departments where users with permission can access the department and the files iniside it.
5. File Category : Files can be grouped to categories and it can be viewd under categories section.
6. File Metadata: Metadata can be assigned to files along with name and category.
7. Checkout: Checkout and checkin of files to prevent over-writing of files.
8. Revision history: File revision history with updated time and updated user.
9. File expiration: File expiration date can be set while uploading a file. The file won't be visible to in the system after expiry.
10. Logging is done using winston.

There are total of 19 APIs divided into 4 Categories:
1. Authentication - 2
2. Files - 7
3. Depatment - 5
4. Category - 5

List of endpoints are:

Authentication APIs:
1. /user/authenticate       : POST  : To login a user.
2. /user                    : GET   : To list all the available users

File APIs:
3. /files                   : POST  : Upload a file to server
4. /Files                   : GET   : List files based on filer
5. /files/:id               : GET   : Get file details from file id
6. /files/:delete           : delete: Delete file using id
7. /files                   : PUT   : Update a file
8. /files/checkout/:id/:user: GET   : Checkout a file
9. /files/checkin           : POST  : Checkin a checked-out file

Depatment APIs:
10. /department             : POST  : To create a department
11. /department             : GET   : List departments based on filter condition
12. /department/:id         : GET   : To get details of a department from id
13. /department/:id         : DELETE: To delete a department using id
14. /department             : PUT   : Edit a department

Categories APIa:
15. /category               : POST  : Create a category
16. /category               : GET   : Get all categories
17. /category/:id           : GET   : Get details of a category from id
18. /category/:id           : DELETE: Delete a category from id.
19. /category               : PUT   : Edit a category
