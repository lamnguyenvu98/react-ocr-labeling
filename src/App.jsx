import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'

import Table from "./components/Table"
import Login from './components/Login'
import { RequireToken } from './components/Token'

function App() {

  return (
    <>
      <h1>OCR Labeling Tool</h1>
      <div className="card"></div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' 
            element={
              <RequireToken>
                <Table />
              </RequireToken>
            } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
