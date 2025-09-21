import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/common/Header'
import Sidebar from './components/common/Siderbar'
import Footer from './components/common/Footer'
import DashboardPage from './pages/DashboardPage'
import ProjectsPage from './pages/ProjectsPage'
//import SprintsPage from './pages/SprintsPage'
//import BacklogPage from './pages/BacklogPage'
//import ReportsPage from './pages/ReportsPage'


const App: React.FC = () => {
return (
<div className="app-root">
<Header />
<div className="main-grid">
<Sidebar />
<main className="content">
<Routes>
<Route path="/" element={<Navigate to="/dashboard" replace />} />
<Route path="/dashboard" element={<DashboardPage />} />
<Route path="/projects" element={<ProjectsPage />} />
</Routes>
</main>
</div>
<Footer />
</div>
)
}


export default App