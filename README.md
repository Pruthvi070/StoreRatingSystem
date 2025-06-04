Store Rating System

Overview

The Store Rating System is a web application that allows users to rate and review stores. It includes an admin panel for managing stores, users, and ratings.

Screenshots


<img src="screenshots/pic-1.png" width="800"/>
<img src="screenshots/pic-2.png" width="800"/>
<img src="screenshots/pic-3.png" width="800"/>
<img src="screenshots/pic-4.png" width="800"/>
<img src="screenshots/pic-5.png" width="800"/>
<img src="screenshots/pic-6.png" width="800"/>
<img src="screenshots/pic-7.png" width="800"/>
<img src="screenshots/pic-8.png" width="800"/>






User authentication (Login/Signup)

add /modify rating of stores

Admin panel for managing users, stores, and ratings

Store owners can view their store's ratings

Responsive UI built with React

Installation and Setup

1. Clone the Repository

git clone https://github.com/Pruthvi070/StoreRatingSystem.git
cd StoreRatingSystem

2. Backend Setup (Node.js + Express + MySQL)

cd backend
npm install


Configure Environment Variables

Create a .env file inside the backend folder and add:

PORT=.....
DB_HOST=localhost
DB_USER=root
DB_PASS=.......*
DB_NAME=storeratingdb
DB_PORT=.....
JWT_SECRET=.......
admin login credintials = admin@admin.com
                          pass-admin123


Start the Backend Server

npm run pruthviraj --> Run to create tables initally and stop the server then run below command
node setupAdmin --> to insert the admin credentials initally
then run again to run the backend
npm run pavan 

3. Frontend Setup (React)

cd ../frontend
npm install

Start the Frontend Server

npm start

4. Access the Application

Backend API runs on: http://localhost:5000

Frontend runs on: http://localhost:3000

Technologies Used

Frontend: React, Redux, CSS

Backend: Node.js, Express, MySQL

Authentication: JWT
