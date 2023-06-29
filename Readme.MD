# RepublicOfGeeks
This is a social media inspire in severeal actual social WebApps  
This project is build using MERN technologies  

## Database

User

| Parameter | Type     | 
| :-------- | :------- | 
|   `_id`   | `string` | 
|   `firstname`   | `string` | 
|   `lastname`   | `string` | 
|   `email`   | `string` | 
|   `password`   | `string` | 
|   `friends`   | `Array<Objet>` | 
|   `picturePath`   | `string` | 
|   `location`   | `string` | 

Friend(sub)

| Parameter | Type     | 
| :-------- | :------- | 
|   `_id`   | `string` | 
|   `firstname`   | `string` | 
|   `lastname`   | `string` | 
|   `picturePath`   | `string` | 
|   `occupation`   | `string` | 
|   `location`   | `string` | 

Post

| Parameter | Type     | 
| :-------- | :------- | 
|   `_id`   | `string` | 
 |   `userId`   | `string` |  
|   `firstname`   | `string` | 
|   `lastname`   | `string` | 
|   `location`   | `string` | 
|   `description`   | `string` | 
|   `userPicturePath`   | `string` | 
|   `picturePath`   | `string` | 
|   `likes`   | `Objet<String>` | 
|   `comments`   | `Array<string>` | 

Images

| Parameter | 
| :-------- |
|   `path`  | 



## Features

- Light/dark mode toggle
- Fullscreen mode
- Post

