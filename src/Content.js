import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SubmissionCard from "./SubmissionCard";
import { fetchLikedFormSubmissions } from './service/mockServer';


export default function Content() {
  const [submissions, setSubmissions] = useState([]);

  // Get submissions from local storage
  const getSubmissions = async () => {
    try {
      // If res successful, update submissions in state
      let res = await fetchLikedFormSubmissions()
      if (res.status === 200) {
        setSubmissions(res.formSubmissions)
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      throw err;
    }
  }

  // Fetch submissions for the server on load
  useEffect(() => {
    getSubmissions();
  }, []);

  return (
    <Box sx={{ marginTop: 3 }}>
      <Typography variant="h4">Liked Form Submissions</Typography>
      <Stack
        spacing={1.5}
      >
        {submissions.length > 0 ? (
          submissions.map(sub => (
            <SubmissionCard key={sub.id} sub={sub} />
          ))
        ) : (
          <Typography>No Submissions</Typography>
        )}
      </Stack>
    </Box >
  );
}
