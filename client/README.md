## To Run App Locally and recompiles as you develop:
run "npm run start"


Design Choices:

1. <Route> components can only exist in routes.tsx files (and app.tsx)

2. Any component that passes props to makeStyles must have a <ComponentName>StylesProp Interface. This makes props more organized and helps to avoid spreading style props by mistake

3. You should never have a <Grid item> without a <Grid container>. Don't split the item and its container into separate components, maintenance becomes a nightmare

4. Calls to the api are only allowed in endpoint-hooks.ts files. This encourages single responsibility. All api that mutate data that affect state management should make dispatch calls to redux so frontend data is update without refreshing the page.
