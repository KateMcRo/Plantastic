import React, { useState } from "react";
import useAuthService from "../utils/authHook";
import { Box, Grid, Popover, Stack, Typography } from "@mui/material";
import { ResponsiveImageContainer } from "../components/ResponsiveImageContainer";
import PlantSearchDetails from "./PlantSearchDetails";
import { useQuery } from "@apollo/client";
import { QUERY_PLANTS } from "../utils/queries";
import { NavLink } from "react-router-dom";

const fakePlants = Array(5)
  .fill(null)
  .map(() => ({
    name: "plant",
    _id: crypto.getRandomValues(new Uint32Array(1))[0],
    image: "https://via.placeholder.com/150/flower",
  }));

/**
 *
 * @param {*} props
 * @returns
 */
function MyGarden(props) {
  const auth = useAuthService();
  const { data, error, loading } = useQuery(QUERY_PLANTS);
  const [openDetails, setOpenDetails] = useState(false);
  const [detailIndex, setDetailIndex] = useState(undefined);

  const closeDetails = () => {
    setOpenDetails(false);
  };

  const openDetailsAtIndex = (index) => {
    setDetailIndex(index);
    setOpenDetails(true);
  };

  if (loading) {
    return <Typography variant="h1">Loading...</Typography>;
  }

  const [firstPlant, ...restOfPlants] = data?.plants;

  return (
    <Stack className="MyGarden" sx={{ direction: "row", placeItems: "center" }}>
      <Stack sx={{ p: 5, width: "clamp(300px,60%,700px)" }}>
        <Box className="myGardenHeader">
          <p>Hello</p>
          <Typography variant="h1">{auth.user.username}</Typography>
        </Box>

        {/* plants list in a 2/2 grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "200px",
            gap: 2,
          }}
        >
          {/* first plant takes 2 columns and 2 rows*/}
          <Box sx={{ gridColumn: "1 / 3", gridRow: "1 / 3", maxHeight: "400px" }}>
            <NavLink to={`/plants/${firstPlant._id}`}>
              <ResponsiveImageContainer image={firstPlant.img} />
            </NavLink>
          </Box>

          {/* rest of the plants take 1 column and 1 row */}
          {restOfPlants.map((plant) => (
            <NavLink to={`/plants/${plant._id}`} key={plant._id}>
              <ResponsiveImageContainer key={plant._id} image={plant.img} />
            </NavLink>
          ))}
        </Box>

        {/* <Popover open={openDetails} onClose={closeDetails}>
          <Stack direction="row" sx={{ placeItems: "center" }}>
            <Box width={"clamp(300,60%,800px)"}>{firstPlant ? <PlantSearchDetails plant={firstPlant} /> : <></>}</Box>
          </Stack>
        </Popover> */}
      </Stack>
    </Stack>
  );
}

export default MyGarden;
