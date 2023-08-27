import React, { useRef, useEffect } from "react";
import { Box, LinearProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import WalkingManIcon from "@mui/icons-material/DirectionsWalk";

const WalkingManProgressBar = ({ currentSlide, totalSlides }) => {
  const progressPercentage = (currentSlide / totalSlides) * 100;
  const walkerRef = useRef(null);

  useEffect(() => {
    if (walkerRef.current) {
      walkerRef.current.style.left = `${progressPercentage}%`;
    }
  }, [progressPercentage]);

  return (
    <Box
      sx={{ position: "relative", marginBottom: 3 }}
    >
      <LinearProgress
        sx={{
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#ffebaa",
          },
        }}
        variant="determinate"
        value={progressPercentage}
      />
      <Box
        ref={walkerRef}
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          transition: "left 0.34s linear",
        }}
      >
        <WalkingManIcon />
      </Box>
    </Box>
  );
};

export default WalkingManProgressBar;
