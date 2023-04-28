import React, { useState } from 'react';
import { fetchLikedFormSubmissions } from './service/mockServer';

export default function useSubmissions() {
    // Submission state 
    const [submissions, setSubmissions] = useState([])

    // Get submissions from server
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

    // Export both state and custom hook functions
    return { submissions, getSubmissions }

}