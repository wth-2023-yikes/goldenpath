import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import AccessibleIcon from "@mui/icons-material/Accessible";
import { Box, Divider, Typography } from "@mui/material";
import Head from "next/head";
import Carousell from "../../components/Carousell";
import { useEffect, useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import axios from "axios";
import { useRouter } from "next/router";
import WalkingManProgressBar from "../../components/ProgressBar";

export default function Home() {
  const [items, setItems] = useState([]);
  const [accessibilityItems, setAccessibilityItems] = useState([]);
  const [selected, setSelected] = useState(false);
  const [imageNum, setImageNum] = useState(0);
  // get the query id
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      console.log(id);
      axios
        .get(`https://dashboard-tau-ivory.vercel.app/api/checkpoints/${id}`)
        .then((res) => {
          console.log(res.data);
        });
      axios
        .get(
          `https://dashboard-tau-ivory.vercel.app/api/checkpoints/${id}/path`
        )
        .then((res) => {
          console.log(res.data);
          // loop data and add to items
          const newItems = [];
          const accessibilityItemsData = [];

          for (let i = 0; i < res.data[0].images.length; i++) {
            if (res.data[0].tags.includes("Wheelchair")) {
              accessibilityItemsData.push({
                src: res.data[0].images[i].src,
              });
            } else {
              console.log(res.data[0].images[i].src);
              newItems.push({
                src: res.data[0].images[i].src,
              });
            }
          }

          for (let i = 0; i < res.data[1].images.length; i++) {
            if (res.data[1].tags.includes("Wheelchair")) {
              accessibilityItemsData.push({
                src: res.data[1].images[i].src,
              });
            } else {
              newItems.push({
                src: res.data[1].images[i].src,
              });
            }
          }
          setItems(newItems);
          setAccessibilityItems(accessibilityItemsData);
          // loop data and add to accessibilityItems
        });
    }
  }, [id]);

  return (
    // create a head
    <>
      <Head>
        <title>Golden Path</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ToggleButton
        sx={{
          position: "absolute",
          top: "-5px",
          right: "-5px",
        }}
        value="check"
        selected={selected}
        onChange={() => {
          setSelected(!selected);
        }}
      >
        {selected ? (
          <DirectionsWalkIcon
            sx={{
              color: "#1c1a1a",
              transform: "scale(1.5)",
              backgroundColor: "#ffebaa",
              borderBottomLeftRadius: "3px",
              borderTopLeftRadius: "3px",
              borderBottomRightRadius: "3px",
            }}
          />
        ) : (
          <AccessibleIcon
            sx={{
              color: "#1c1a1a",
              transform: "scale(1.5)",
              backgroundColor: "#ffebaa",
              borderBottomLeftRadius: "3px",
              borderTopLeftRadius: "3px",
              borderBottomRightRadius: "3px",
            }}
          />
        )}
      </ToggleButton>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          mx: 5,
          height: "100vh",
        }}
      >
        <Typography
          fontWeight={300}
          variant="h4"
          sx={{ textAlign: "left", fontWeight: 700, py: 4 }}
        >
          Golden Path
        </Typography>
        {/* slideshow section */}
        <Box sx={{ height: "55%", mb: 5 }}>
          <Carousell
            setImageNum={setImageNum}
            images={selected ? items : accessibilityItems}
          />
        </Box>
        <WalkingManProgressBar
          currentSlide={imageNum}
          totalSlides={
            selected ? items.length - 1 : accessibilityItems.length - 1
          }
        />
        {/* guiding text at the bottom */}
        {/* <Divider sx={{ width: "100%", backgroundColor: "#ffebaa", my: 5 }} />
        <Box>
          <Typography>
            Explore the content by using the arrow buttons to navigate forwards
            and backwards, guiding you to your desired destination.
          </Typography>
          <br></br>
          <Typography>
            Use the toggle button to switch between the standard and accessible
            versions!
          </Typography>
        </Box> */}
      </Box>
    </>
  );
}
