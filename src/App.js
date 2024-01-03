import React, { useEffect, useState } from 'react'
import Main from './pages/main'
import { Routes, Route } from "react-router-dom";


function App() {


  return (
    <>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="*" element={<p>Puslapis neegzistuoja</p>}></Route>
      </Routes>
    </>
  )
}

export default App