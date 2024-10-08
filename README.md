


# Getting Started for LOCAL  setup

This project was bootstrapped with Create React App


## PreRequisite

Node.js v22.9.0 should be installed

The backend and mogodb(local/cloud hoisted) should be running.

Refer https://github.com/saurabhbiswas/EasyBackend README for the same.

## ENV FILE 

In .env.development file,point to correct Backend nestjs url

REACT_APP_BASE_URL=http://localhost:3001


## Install dependencies

In the project directory, you can run:

### `npm install`


## Run the App

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.




### `npm test`

Launches the test runner and excutes test cases.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!


## APP Highlights


### CI/CD pipeline 

It is created.[.githhub/workflows/main.yml].

On each push to main,App is deployed in S3 bucket.

### Passwords and Secrets

Githhub Repository secret is used for deployment.

AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY,REACT_APP_BASE_URL,

### Error handling 

Server side [succes/error] is shown as Notification.

Client side error is shown as inline error.

### ARIA for accessibility

Aria tags are added at AuthForm.tsx,Notification.tsx.

### Proctected Routes

path: '/dashboard' is protected so that user without login/signup cannot access it.

### Responsive UI

tailwind.css classes are sued to make responsive UI.

### useReducer Hook 

it is used to streamline state management.


