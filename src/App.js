import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AddEmpolyee from './components/addEmployee';
import Employees from './components/employees';
import EditEmployee from './components/editEmployee';
function App() {
  return (
    <BrowserRouter>
    <> 

      <Routes>
           <Route 
              path="/add-employee" 
              element={<AddEmpolyee/>} 
            />
            <Route 
              path="/" 
              element={<Employees/>} 
            />
             <Route 
              path="/editEmployee/:id"
              element={<EditEmployee/>} 
            />
            
      </Routes>
    </>
    </BrowserRouter>
  );
}

export default App;
