import React from 'react';
import Container from '@mui/material/Container';
import Header from './Header';
import Content from './Content';
import useSubmissions from "./useSubmissions";

function App() {
  // Use custom hook to store submission state and other functionality
  const { submissions, getSubmissions } = useSubmissions();

  return (
    <>
      <Header getSubmissions={getSubmissions} />
      <Container>
        <Content submissions={submissions} getSubmissions={getSubmissions} />
      </Container>
    </>
  );
}

export default App;
