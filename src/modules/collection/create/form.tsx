// import * as React from "react"
// import { useMutation } from "react-apollo";
// import { ApolloError } from "apollo-boost";

// import { Button, Grid, InputLabel, Typography, Card, CardHeader } from "@material-ui/core"

// import { FullWidthGridItemInput, FullWidthGridItemPasswordInput, MeepleColorPicker } from "../../../Common/Form";

// import { UPSERT_COLLECTION } from "../Mutations";
// import { CollectionDetails } from "../Types";
// import { UpsertCollectionErrorFormModel, validateUpsertCollectionForm } from "../Validators";

// export interface UpsertCollectionFormProps {
//   collectionInfo?: CollectionDetails;
// }

// export interface CreateCollectionFormModel {
//   collectionId: string;
//   name: string;
//   gameIds: string[];
//   ownerIds: string[];
// }

// export const UpsertCollectionForm: React.FunctionComponent<UpsertCollectionFormProps> = ({ collectionInfo }) => {
//   const [name, setName] = React.useState(collectionInfo && collectionInfo.name || "");
//   const [gameIds, setGameIds] = React.useState(collectionInfo && collectionInfo.games || []);
//   const [handlingSubmit, setHandlingSubmit] = React.useState(false);

//   const [errors, setErrors] = React.useState<UpsertCollectionErrorFormModel>({ name: "" });

//   const clearErrorField = (e: React.ChangeEvent) => {
//     setErrors({ ...errors, [e.currentTarget.id]: "" });
//   };

//   const onUpsertCollectionError = (error: ApolloError) => {
//     // TODO: show errors in ui
//     console.log("create account error: ", error);
//   };

//   const [upsertCollection, upsertCollectionResults] = useMutation<CollectionDetails>(UPSERT_COLLECTION, { onError: onUpsertCollectionError });

//   const handleSubmit = (e: React.FormEvent) => {
//     setHandlingSubmit(true);
//     e.preventDefault();

//     const formValid = validateUpsertCollectionForm({ name }, setErrors);

//     if (formValid) {
//       createCollection({ variables: { name } });
//     }

//     setHandlingSubmit(false);
//   }

//   return (
//     <Card>
//       <CardHeader>

//       </CardHeader>
//     </Card>
//     <Grid container direction="column" spacing={4}>
//       <Grid item>
//         <Typography variant="h5" component="h2">
//           Create Collection
//           </Typography>
//       </Grid>

//       <FullWidthGridItemInput
//         formControlProps={{ required: true, disabled: createCollectionResults.loading }}
//         outerEndAdornmentIcon={PersonIcon}
//         input={Collectionname}
//         inputProps={{ id: "Collectionname" }}
//         inputLabel="Collectionname"
//         setInputState={setCollectionname}
//         error={errors.Collectionname}
//         onInputChange={clearErrorField} />

//       <FullWidthGridItemInput
//         formControlProps={{ required: true, disabled: createCollectionResults.loading }}
//         outerEndAdornmentIcon={EmailIcon}
//         input={email}
//         inputProps={{ id: "email" }}
//         inputLabel="Email"
//         setInputState={setEmail}
//         error={errors.email}
//         onInputChange={clearErrorField} />

//       <FullWidthGridItemPasswordInput
//         formControlProps={{ required: true, disabled: createCollectionResults.loading }}
//         input={password}
//         setInputState={setPassword}
//         error={errors.password}
//         onInputChange={clearErrorField} />

//       <FullWidthGridItemPasswordInput
//         formControlProps={{ required: true, disabled: createCollectionResults.loading }}
//         input={confirmPassword}
//         FullWidthGridItemInputId="confirmPassword"
//         inputLabel="Confirm Password"
//         setInputState={setConfirmPassword}
//         error={errors.confirmPassword}
//         onInputChange={clearErrorField} />

//       <Grid container item direction="column" spacing={4}>
//         <Grid item>
//           <InputLabel required>Pick Your Color</InputLabel>
//         </Grid>
//         <Grid item>
//           <MeepleColorPicker color={color} setColor={setColor} />
//         </Grid>
//       </Grid>

//       <Grid container item alignItems="stretch">
//         <Button fullWidth variant="contained" color="primary" disabled={handlingSubmit} type="submit">Create Collection</Button>
//       </Grid>

//       <Grid container item justify="center">
//         <Typography>
//           Already have an account? <SiteLink to="/login" text="Login" />
//         </Typography>
//       </Grid>
//     </Grid>

//   )
// }