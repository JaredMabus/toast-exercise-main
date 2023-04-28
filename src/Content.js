import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SubmissionCard from "./SubmissionCard";

export default function Content({ submissions, getSubmissions }) {

  // Use custom hook to fetch submissions from the server on load
  useEffect(() => {
    try {
      getSubmissions();
    } catch (err) {
      console.log(err)
    }
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
