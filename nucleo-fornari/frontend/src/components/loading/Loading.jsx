import { CircularProgress } from "@mui/material";

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <CircularProgress
        sx={{
          "--CircularProgress-trackThickness": "2px",
          "--CircularProgress-progressThickness": "2px",
          zIndex: 10,
        }}
        size="75px"
        
      />
    </div>
  );
};
export default LoadingScreen;
