# Content Management System (for fullstack blog app)
[Live Page](https://blog-cms-brandhawa.netlify.app/)
#### test account: 
- Username: bawa
- password: password123
![image](https://user-images.githubusercontent.com/35308786/188833183-c119fe86-f84e-4330-972e-0224cf0e211f.png)
![image](https://user-images.githubusercontent.com/35308786/188833160-235e8ab1-5df6-41c8-8654-b9b048fe768b.png)



### Description
This is the content management system for my fullstack blog app. There are three parts to this CMS which include signing in/signing up, manageing your content(updateing/editing posts, managing comments under post), and finally creating new blog posts. With signing up there is a server request to check if the username exists and if the passwords match. If they do match the client is send jwt which is stored in the localstorage and the sent upon every request in the future. Once signed in you can see all of your posts, public or private, you can click on your posts and update them and manage their comments. If you want to create something new you go the last tab and that is where you can handle that. 

#### Technologies
The cms is built with reactjs. it uses react-router-dom and fetch api. local storage is used to store the jwt token 

### Goals
- [x] store and send JWT on request
- [x] have the design of the website make sense.

### Working Links
- [Link to API](https://blog-api-h9xk.onrender.com/)
- [Link to Client](https://blog-client-brandhawa.netlify.app/)
- [Link to CMS](https://blog-cms-brandhawa.netlify.app/)

### Repository Links 
- [API](https://github.com/brandhawa99/blog_api)
- [Client](https://github.com/brandhawa99/blog_client)
- [CMS](https://github.com/brandhawa99/blog_cms) 

## How to run locally 
1. Clone the project and save it in some directory
2. Run `npm install` to install all of the neccessary packages
3. Run `npm run start` and it should start working just fine

TODO: update url https://blog-api-h9xk.onrender.com/

