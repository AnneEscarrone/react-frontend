
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Container} from "@mui/material";
import InitialView from './context/InitialView'
import InstitutionFormView from './context/institution/view/InstitutionFormView'

function App() {
    return (
      <Container>
        <Router>
          <Routes>
            <Route path="/" element={<InitialView />} />
            <Route path="/edit-institution/:id" element={<InstitutionFormView />} />
            <Route path="/new-institution/" element={<InstitutionFormView />} />
          </Routes>
        </Router>
      </Container>
    );
}

export default App;
