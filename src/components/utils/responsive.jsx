import { useMediaQuery } from "@mui/material";

const useResponsiveStyles = () => {
  // Media queries for different screen sizes
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(min-width:600px) and (max-width:900px)");
  const isLargeScreen = useMediaQuery("(min-width:900px)");

  // Conditional styles based on screen size
  if (isSmallScreen) {
    return {
      backgroundColor: "lightblue",
      fontSize: "1rem",
      width: "100%",
      padding: "10px",
    };
  } else if (isMediumScreen) {
    return {
      backgroundColor: "lightgreen",
      fontSize: "1.5rem",
      width: "80%",
      padding: "15px",
    };
  } else if (isLargeScreen) {
    return {
      backgroundColor: "orange",
      fontSize: "2rem",
      width: "60%",
      padding: "20px",
    };
  }

  return {}; // Default return for unsupported screen sizes
};

export default useResponsiveStyles;
