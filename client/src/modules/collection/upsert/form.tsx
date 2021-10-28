/* eslint-disable react/jsx-props-no-spreading */

import React, {
  SyntheticEvent,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";

import PersonIcon from "@mui/icons-material/Person";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlankTwoTone";
import CheckBoxIcon from "@mui/icons-material/CheckBoxTwoTone";
import CircleIcon from "@mui/icons-material/Circle";

import {
  Autocomplete,
  Box,
  Checkbox,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { CollectionResponse, UserMembershipResponse, UserResponse } from "../../../../../src/types/types";
import { Meeple } from "../../../images/components/meeple";
import { GamesStateContext } from "../../../contexts/upsert-games-state-context";
import { updateActiveUserCollection } from "../../../redux/active-user-collections-slice";
import { activeUserGroupMemberships } from "../../../redux/active-user-group-memberships-slice";
import { MeeplePaletteColors } from "../../../theme/meeple-palettes";

import { FullWidthGridItemInput } from "../../common/input/full-width-grid-item-input";
import { GamesFormBody } from "../../game/games-form-body";
import { ActionButtons } from "../../common/button/action-buttons";

import { validateUpsertCollectionForm, UpsertCollectionValidationFormModel } from "./validator";
import { useUpsertCollection } from "./endpoint-hooks";

export interface UpsertCollectionFormProps {
  onSave: () => void;
  onCancel: () => void;
  initialData?: CollectionResponse;
}

export function UpsertCollectionForm(props: UpsertCollectionFormProps): React.ReactElement {
  const { onSave, onCancel, initialData } = props;
  const { upsertCollection } = useUpsertCollection();
  const { games } = useContext(GamesStateContext);
  const dispatch = useDispatch();

  const [owners, setOwners] = useState<UserResponse[]>(initialData?.owners || []);
  const [name, setName] = useState(initialData?.name || "");
  const [addGamesFormIsActive, setAddGamesFormIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<UpsertCollectionValidationFormModel>({ name: "" });

  const userGroupMemberships = useSelector(activeUserGroupMemberships);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const ownerOptions = useMemo(() => {
    const groupMembers: UserMembershipResponse[] = [];
    userGroupMemberships.groupMemberships.forEach(
      (membership) => membership.group.members.forEach(
        (member) => groupMembers.push(member),
      ),
    );

    const uniqueOwners: UserResponse[] = [];

    groupMembers.forEach((member) => {
      const isMemberAlreadyInList = uniqueOwners.some((user) => user.id === member.user.id);
      if (!isMemberAlreadyInList) {
        uniqueOwners.push(member.user);
      }
    });

    return uniqueOwners;
  }, [userGroupMemberships]);

  const clearErrorField = (e: React.ChangeEvent) => {
    setErrors({ ...errors, [e.currentTarget.id]: "" });
  };

  const onCollectionUpserted = useCallback((collection: CollectionResponse) => {
    dispatch(updateActiveUserCollection({ collection }));
    onSave();
  }, [onSave]);

  const onOwnerSelected = useCallback((event: SyntheticEvent<Element, Event>, selectedOwners: UserResponse[]) => {
    setOwners(selectedOwners);
  }, [setOwners]);

  const handleSubmit = () => {
    const formValid = validateUpsertCollectionForm({ name }, setErrors);

    if (formValid) {
      upsertCollection({
        collectionId: initialData?.id,
        collectionName: name,
        collectionGames: games,
        collectionOwners: owners,
        onCollectionUpserted,
        setIsLoading,
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  console.log("owner options: ", ownerOptions);

  return (
    <form noValidate onSubmit={handleFormSubmit}>
      <Grid container direction="column" justifyContent="center" alignItems="stretch" spacing={4}>
        <Grid item xs={12}>
          <Typography align="center" variant="h5" component="h2">
            Create Collection
          </Typography>
        </Grid>

        <Grid item>
          <FullWidthGridItemInput
            formControlProps={{ required: true, disabled: isLoading, fullWidth: true }}
            outerEndAdornmentIcon={PersonIcon}
            input={name}
            inputProps={{ maxLength: 50 }}
            outlinedInputProps={{ id: "name" }}
            inputLabel="Name"
            setInputState={setName}
            error={errors.name}
            onInputChange={clearErrorField}
          />
        </Grid>

        <Grid item>
          <Box sx={{
            border: addGamesFormIsActive ? 2 : 1,
            borderRadius: "4px",
            borderColor: addGamesFormIsActive ? "primary.main" : "grey.400",
            padding: "24px",
            minHeight: "250px",
          }}
          >
            <GamesFormBody isActive={addGamesFormIsActive} setIsActive={setAddGamesFormIsActive} />
          </Box>
        </Grid>

        <Grid item>
          <Autocomplete
            multiple
            id="collection-owners-multi-select"
            options={ownerOptions}
            disableCloseOnSelect
            onChange={onOwnerSelected}
            getOptionLabel={(option) => option.username}
            renderOption={(renderProps, option, { selected }) => (
              <li key={`owner-option-user-${option.id}`} {...renderProps}>
                <Grid container alignItems="center">
                  <Grid item>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                  </Grid>
                  <Grid item>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item sx={{ display: { xs: "none", md: "block" } }}>
                        <Meeple fill={MeeplePaletteColors[option.color].main} size="icon" />
                      </Grid>
                      <Grid item sx={{ display: { xs: "block", md: "none" } }}>
                        <CircleIcon sx={{ color: MeeplePaletteColors[option.color].main, fontSize: 24 }} />
                      </Grid>
                      <Grid item>{option.username}</Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </li>
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
              <TextField {...params} label="Owners" placeholder="Collection Owners" />
            )}
          />
        </Grid>

        <Grid item>
          <ActionButtons
            formButtons
            onSave={handleSubmit}
            saveText="Create Collection"
            onCancel={onCancel}
            disabled={isLoading}
          />
        </Grid>
      </Grid>
    </form>
  );
}
