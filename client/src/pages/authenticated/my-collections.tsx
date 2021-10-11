import React, { useCallback, useState } from "react";

import { Button, Grid, Typography } from "@mui/material";
import { TabContentContainer } from "../../modules/common/layout/tab-content-container";
import { CreateCollectionForm } from "../../modules/collection/create/form";

export function MyCollections(): React.ReactElement {
  const [showAddCollectionForm, setshowAddCollectionForm] = useState(false);

  const showForm = useCallback(() => setshowAddCollectionForm(true), [setshowAddCollectionForm]);

  // const [isLoading, setIsLoading] = useState(false);
  // const [data, setData] = useState<Collection[]>([]);

  // const onUpsertCollectionError = () => {
  //   // TODO: show errors in ui
  //   console.log("upsert collection error: ", error);
  // };
  // const [upsertCollection, upsertCollectionResults] = useMutation<{ upsertCollection: CollectionDetails }>(UPSERT_COLLECTION, {
  //   onError: onUpsertCollectionError,
  //   onCompleted: refetch
  // });

  // const onAddCollection = () => {
  //   // upsertCollection({ variables: { name: `${activeUserContext.activeUser.username}"s Collection` } });
  //   console.log("onAddCollection");
  // };

  return (
    <TabContentContainer subTitle="My Game Collections">
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
        {showAddCollectionForm ? (
          <Grid item>
            <CreateCollectionForm />
          </Grid>
        ) : (
          <>
            <Grid item>
              <Typography>
                Add a New Game Collection to Get Started!
              </Typography>
            </Grid>
            <Grid item>
              <Button onClick={showForm} variant="outlined">+ Add Collection</Button>
            </Grid>
          </>
        )}
      </Grid>
    </TabContentContainer>
  );
}
