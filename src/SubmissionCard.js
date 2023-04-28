import React from 'react';
import { Stack, Typography } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

export default function SubmissionCard({ sub }) {
    return (
        <>
            {sub.data && (
                <Stack
                    sx={{
                        px: 2,
                        py: 1,
                        borderBottom: "1px solid lightgrey"
                    }}
                >
                    <Stack
                        direction="row"
                        spacing={1}
                    >
                        <Typography>{sub.data.firstName}</Typography>
                        <Typography>{sub.data.lastName}</Typography>
                    </Stack>
                    <Typography>{sub.data.email}</Typography>
                    {sub.data.liked && (
                        <ThumbUpIcon color="primary" />
                    )}
                </Stack>
            )}
        </>
    )
}