import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CloseIcon from '@mui/icons-material/Close';
import { saveLikedFormSubmission, fetchLikedFormSubmissions } from './service/mockServer';
import Chance from "chance";


export default function Header() {
  const chance = Chance();
  const [currentSubmission, setCurrentSubmission] = useState(null);
  const [toastStatus, setToastStatus] = useState(false);

  // Set the current submission in state and open toast with the submission data
  const handleSubmit = async () => {
    let submission = {
      id: chance.guid(),
      data: {
        email: chance.email(),
        firstName: chance.first(),
        lastName: chance.last(),
        liked: false,
      },
    };
    setCurrentSubmission(submission);
    setToastStatus(true)
  };

  // Handle save submission
  const handleSaveSubmission = async () => {
    try {
      if (currentSubmission != null) {
        // Create new local submission var to update data.liked status
        let submission = { ...currentSubmission, data: { ...currentSubmission.data, liked: true } }

        // Save the submission to local storage with server API
        let res = await saveLikedFormSubmission(submission);

        // Test response. If status not 202, throw error with error message
        if (res.status === 202) {
          console.log("Successfully submitted!");
          console.log(submission);
          handleClose();
          // dispatch(action.updateSubmissions())
        } else {
          throw new Error(res.message)
        }

      };
    } catch (err) {
      throw err
    }
  };

  // Handle toast close and clear current submission
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    };
    setToastStatus(false);
    setCurrentSubmission(null);

  }

  const action = (
    <React.Fragment>
      <IconButton onClick={handleSaveSubmission}><ThumbUpIcon fontSize="small" sx={{ color: "#fff" }} /></IconButton>
      <IconButton onClick={handleClose}>
        <CloseIcon fontSize="small" sx={{ color: "#fff" }} />
      </IconButton>
    </React.Fragment>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Snackbar
        open={toastStatus}
        autoHideDuration={10000}
        onClose={handleClose}
        message={currentSubmission != null && (
          <Box>
            <Typography vairant="body2">{currentSubmission.data.firstName} {currentSubmission.data.lastName}</Typography>
            <Typography vairant="body2">{currentSubmission.data.email}</Typography>
          </Box>
        )}
        action={action}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Toast Exercise
          </Typography>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => handleSubmit()}
          >
            New Submission
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
