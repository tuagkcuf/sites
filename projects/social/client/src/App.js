import React, { useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import { useDispatch } from "react-redux";

import { getPosts } from "./actions/posts";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import memories from "./images/memories.jpg";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <div>
            <Container maxwidth="lg">
                <AppBar style={{borderRadius: 15,
                margin: '30px 0',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',}} position="static" color="inherit">
                    <Typography style={{color: 'rgba(0,183,255, 1)'}} variant="h2" align="center">Memories</Typography>
                    <img style={{marginLeft: '15px'}} src={memories} alt="memories" height="60" />
                </AppBar>
                <Grow in>
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                            <Grid item xs={12} sm={7}>
                                <Posts />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <Form />
                            </Grid>
                    </Grid>
                </Grow>
            </Container>
        </div>
    )
}

export default App;