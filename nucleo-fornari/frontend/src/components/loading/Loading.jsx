import { CircularProgress } from "@mui/material";

const LoadingScreen = () => {
    return (
        <div
            className="flex items-center justify-center h-screen w-screen fixed top-0 left-0"
            style={{ zIndex: 1301, backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        >
            <CircularProgress
                sx={{
                    "--CircularProgress-trackThickness": "2px",
                    "--CircularProgress-progressThickness": "2px",
                }}
                size="75px"
            />
        </div>
    );
};

export default LoadingScreen;