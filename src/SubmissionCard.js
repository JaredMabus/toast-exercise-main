import React from 'react';
import { Stack, Typography } from "@mui/material";

export default function SubmissionCard({ sub }) {
    return (
        <>
            {sub.data && (
                <Stack
                    sx={{
                        borderBottom: "1px solid lightgrey"
                    }}
                >
                    <Typography>{sub.data.firstName}</Typography>
                    <Typography>{sub.data.lastName}</Typography>
                    <Typography>{sub.data.email}</Typography>
                </Stack>
            )}
        </>
    )
}