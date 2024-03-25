import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React from 'react'

/* components */
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Message from './components/layout/Message'
import Container from './components/layout/Container'

/* pages */
import Home from './components/pages/Home'
import Login from './components/pages/auth/Login'
import Register from './components/pages/auth/Register'
import Profile from './components/pages/User/Profile'
import AddService from './components/pages/Service/addServ'
import MyService from './components/pages/Service/MyServices'
import EditServ from './components/pages/Service/EditService'
import ServDetails from './components/pages/Service/ServDetails'
import MeusProfissionais from './components/pages/Service/MyContratantes'

/* contexts */
import { UserProvider } from './context/UserContext'
function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/serv/add" element={ <AddService />} />
            <Route path="/serv/meusprofissionais" element={ <MeusProfissionais /> } />
            <Route path="/serv/edit/:id" element={<EditServ />} />
            <Route path="/serv/myService" element={<MyService />} />
            <Route path="/serv/:id" element={<ServDetails />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  )
}

export default App