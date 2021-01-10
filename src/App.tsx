import {Button, CircularProgress, Fade, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import React, {useRef, useState } from 'react';
import { post_request } from './serverCalls';
import Background from "./images/background2.jpg";
import { useSnackbar } from "notistack"

const useStyles = makeStyles({
  root: {
    backgroundImage: `url(${Background})`,
    backgroundSize: "cover",
    height: "100vh"
  },
  button: {
    backgroundColor: "white",
    marginBottom: "25px",
    "&:hover": {
      backgroundColor: "#152230",
      color: "white",
      transition: "0.2s"
    },
  },
  selectedButton: {
    color: "white",
    backgroundColor: "#41AAE0",
    marginBottom: "25px",
  },
  textInput: {
    width: "50vw",
    backgroundColor: "white"
  },
  card: {
    backgroundColor: "white",
    borderRadius: "25px",
    padding: "25px",
    minHeight: "50vh",
    boxShadow: " 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12)"
  },
  downloadButton: {
    width: "100%",
    padding: "10px"
  }
});

const App = () =>{
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar()

  const linkRef = useRef<string>("")
  const [format, setFormat] = useState<number>(1) // 1=Video+Audio 2=Video 3=Audio 
  const [quality, setQuality] = useState<number>(1080) // 720 or 1080 
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const download = async () => {
    if (linkRef.current && format && quality){
      setIsLoading(true)
      await post_request("/youtube", {"link": linkRef.current, "format": format, quality: quality})
      setIsLoading(false)
      enqueueSnackbar("Download Complete", { variant: "success" })
    } else {
      enqueueSnackbar("Link is Missing", { variant: "error" })
    }
  }

  const onBlur = async (e: any) => {
    const newLink: string = e.target.value
    console.log(newLink)
    linkRef.current = newLink
  }

  const changeType = (newType: number) => {
    setFormat(newType)
  }

  const changeQuality = (newquality: number) => {
    setQuality(newquality)
  }


  return (
      <Grid container direction="column" justify="center" alignItems="center" className={classes.root}>
        <Grid>
          <Fade in={true} timeout={1500}>
            <Typography variant="h3" style={{paddingBottom: "25px", color: "white"}}>
              YouTube Downloader
            </Typography>
          </Fade>
        </Grid>
        <Grid item >
          <Grid container direction="column" justify="space-evenly" alignItems="center" className={classes.card}>
            <Grid item style={{padding: "25px"}}>
              <TextField label="Paste your YouTube link" color="primary" variant="outlined" onBlur={onBlur} className={classes.textInput}/>
            </Grid>
            <Grid item style={{width: "100%", paddingBottom: "25px"}}>
              <Grid container justify="center">
                <Grid item style={{paddingRight: "20px"}}>
                  <FormControl variant="outlined">
                    <InputLabel id="Format">Format</InputLabel>
                    <Select
                      id="Format"
                      value={format}
                      onChange={(e,_) => changeType(e.target.value as number)}
                      label="Format"
                    >
                      <MenuItem value={1}>Video + Audio</MenuItem>
                      <MenuItem value={2}>Video Only</MenuItem>
                      <MenuItem value={3}>Audio Only</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item style={{paddingLeft: "20px"}}>
                  {format === 1 || format === 2 ? 
                  
                    <FormControl variant="outlined">
                      <InputLabel id="quality">Quality</InputLabel>
                      <Select
                        id="quality"
                        value={quality}
                        onChange={(e,_) => changeQuality(e.target.value as number)}
                        label="Quality"
                      >
                        <MenuItem value={720}>720p</MenuItem>
                        <MenuItem value={1080}>1080p</MenuItem>
                      </Select>
                    </FormControl>
                    :
                    <></>
                  }
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{ width: "50%"}}>
              <Button className={classes.downloadButton} size="large" variant="outlined" color="primary" onClick={download}>DOWNLOAD</Button>
            </Grid>
          </Grid>
        </Grid>
        { isLoading ? 
          <Fade in={isLoading} timeout={1500}>
            <Grid item style={{ paddingTop: "25px", height: "5vh"}}>
              <Grid container direction="column" justify="center" alignItems="center">
                <Grid item>
                  <CircularProgress style={{ color: "white"}}/>
                </Grid>
                <Grid item >
                  <Typography variant="h6" style={{ color: "white"}}>
                    Downloading
                  </Typography>
                </Grid>
              </Grid> 
            </Grid>
          </Fade>
          :
          <Grid item style={{ paddingTop: "25px", height: "5vh"}}></Grid>
        }
      </Grid>
  );
}

export default App;
