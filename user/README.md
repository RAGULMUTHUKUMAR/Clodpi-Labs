# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## `User Management System`

This is a full-stack User Management System application built using React for the frontend and Go for the backend. The application allows users to perform CRUD (Create, Read, Update, Delete) operations on user data.

## Features

1.Add new users with a name, email, and age.
2.Edit existing user details.
3.Delete users.
4.View a list of all users.

## `Installation`

1.Clone the repository:

git clone [https://github.com/your-username/user-management-system.git]
cd user-management-system

## Install `frontend dependencies:`

cd frontend
npm install

## Install `backend dependencies:`

cd ../backend
go mod tidy

### Running the Application

## `Start the backend server:`

cd backend
go run main.go

The backend server will start on [http://localhost:4000].

## `Start the frontend development server:`

Open a new terminal window and run:

cd frontend
npm start

The frontend server will start on [http://localhost:3000].

## `Usage`

Open the application in your browser:
Navigate to [http://localhost:3000].

Add a new user:
Enter the user's name, email, and age in the form and click "Add User".

Edit a user:
Click the "Edit" button next to a user's details, update the information in the form, and click "Update".

Delete a user:
Click the "Delete" button next to a user's details to remove the user from the list.

### `API Endpoints`

POST /users: Add a new user.
GET /users: Retrieve a list of all users.
GET /users/{id}: Retrieve details of a specific user.
PUT /users/{id}: Update a specific user's details.
DELETE /users/{id}: Delete a specific user.

## `Explanation`

## Frontend (React)

The React application is structured with a single main component, UserForm, which handles the user management interface. Here's a breakdown of the key parts:

State Management:

name, email, age: Track the input values for creating or updating a user.
data: Holds the list of users fetched from the backend.
isEditing: Boolean flag to toggle between adding a new user and updating an existing user.
currentId: Stores the ID of the user being edited.
Lifecycle Methods:

useEffect: Fetches the list of users from the backend when the component mounts.
Event Handlers:

handleSubmit: Sends a POST request to add a new user or a PUT request to update an existing user.
handleDelete: Sends a DELETE request to remove a user.
handleEdit: Populates the form with the selected user's details for editing.

## Backend (Go)

The Go application uses the Gorilla Mux package for routing and the RS CORS package to handle Cross-Origin Resource Sharing. Here's a breakdown of the key parts:

Data Structure:

User: Struct to model user data with ID, Name, Email, and Age fields.
Handlers:

addUser: Adds a new user to the list.
getUsers: Returns the list of all users.
getUser: Returns a specific user based on ID.
updateUser: Updates the details of a specific user.
deleteUser: Deletes a specific user.
Helper Functions:

getUserByID: Retrieves a user by ID.
updateUserByID: Updates user details by ID.
deleteUserByID: Deletes a user by ID.

