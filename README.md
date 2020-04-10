# Calcalendarder
## Project description  
This project was created mostly for me to learn from and implements a lot of basic knowledge I wanted to practice.  
## Used applications  
Its obviously a react app and also uses the react context api for storing all user tasks so the app can use it whenever it needs to.
The context orders the tasks by date and time so it's possible to get tasks more efficiently. The app uses the js native date system (like Date(), getTime, ext) and doesn't use external date managing packages. It was good practice in creating forms in react and also uses draggables for moving tasks around. The side panel with the dates uses a package called reactCalander (only for its very basic functionality - when a user clicks a date on the side panel the app gets a new date object to set current focus date). Most of the "smart" functionality is concentrated in the "day" component.
