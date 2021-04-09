## To deploy app to heroku:
push changes to master
run git push heroku master 

## To Run App Locally and recompiles as you develop:
run "npm run start" -> it will connect to heroku deployed api app


Design Choices:

1. <Route> components can only exist in routes.tsx files (and app.tsx)
2. Any component that passes props to makeStyles must have a <ComponentName>StylesProp. This makes props more organized and helps to avoid spreading style props by mistake
