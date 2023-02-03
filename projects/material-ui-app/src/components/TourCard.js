import { Paper, Grid, Typography, Box, Rating } from "@mui/material";
import { AccessTime } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
    components: {
        MuiTypography: {
            variants: [
                {
                    props: {
                        variant: "body2",
                    },
                    style: {
                        fontSize: 11,
                    }
                },
                {
                    props: {
                        variant: "body3",
                    },
                    style: {
                        fontSize: 9,
                    }
                },
            ]
        }
    }
});

const TourCard = ({tour}) => {
    return (
        <Grid item xs={3}>
            <ThemeProvider theme={theme}>
            <Paper elevation={3}>
                <img className="img" src={tour.image} alt="should reload your internet" />
                <Box paddingX={1}>
                    <Typography variant="subtitle1" component="h2">
                        {tour.name}
                    </Typography>
                
                    <Box 
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                       <AccessTime sx={{ width: 12.5 }}/>
                       <Typography variant="body2" component="p" marginLeft={0.5}>
                           {tour.duration}
                       </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                        marginTop={3}
                    >
                        <Rating 
                            name="read-only" 
                            size="small" 
                            value={tour.rating} 
                            precision={0.5} 
                            readOnly 
                        />
                        <Typography variant="body2" component="p" marginLeft={0.5}>
                            {tour.rating} 
                        </Typography>
                        <Typography variant="body3" component="p" marginLeft={0.5}>
                            ({tour.numberOfReviews} reviews)
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h6" component="h3" marginTOp={0}>
                            From ${tour.price}
                        </Typography>
                    </Box>
                </Box>
            </Paper>
            </ThemeProvider>
        </Grid>
    )
};

export default TourCard;