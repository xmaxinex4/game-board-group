import * as React from 'react'

import { ActiveUserContext, ActiveGroupContext } from "../Contexts";
import { Grid, Typography, Button } from "@material-ui/core";
import { useQuery, useMutation } from 'react-apollo';
import { CollectionDetails } from '../modules/collection/Types';
import { MY_COLLECTIONS } from '../modules/collection/Queries';
import { UPSERT_COLLECTION } from '../modules/collection/Mutations';
import { CollectionCardList } from '../modules/collection/card-list';
import { ApolloError } from 'apollo-boost';

export const MyCollections: React.FunctionComponent = () => {
  const activeUserContext = React.useContext(ActiveUserContext);
  const activeGroupContext = React.useContext(ActiveGroupContext);

  const { loading, error, data, refetch } = useQuery<{ myCollections: CollectionDetails[] }>(MY_COLLECTIONS);
  console.log("data: ", data);

  const onUpsertCollectionError = (error: ApolloError) => {
    // TODO: show errors in ui
    console.log("upsert collection error: ", error);
  };
  const [upsertCollection, upsertCollectionResults] = useMutation<{ upsertCollection: CollectionDetails }>(UPSERT_COLLECTION, {
    onError: onUpsertCollectionError,
    onCompleted: refetch
  });

  const onAddCollection = () => upsertCollection({ variables: { name: `${activeUserContext.activeUser.username}'s Collection` } });

  return (
    <>
      {/* <Grid container direction="column">
       <Grid item xs={12}> */}
      <Typography>My Collections</Typography>
      {/* </Grid>
      <Grid item>
        {loading &&
          <Typography>Loading...</Typography>
        }
      </Grid>
  <Grid item>
        {error &&
          <Typography>Error: {error}</Typography>
        }
      </Grid>
   <Grid item xs={12}> */}
      {!loading &&
        (data && data.myCollections.length > 0
          ? (
            <CollectionCardList collections={data.myCollections} />
          ) : (
            <Typography>
              Looks like you need to add a collection to get started
              <Button onClick={onAddCollection}>+ Add Collection</Button>
            </Typography>
          )
        )
      }
    </>
    //   </Grid>
    // </Grid>
  )
}