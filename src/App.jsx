import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import Navbar from "./components/Navbar";
// Pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error from "./pages/Error";
import Logout from "./pages/Logout";
import Security from "./pages/Security";
import Upload from "./pages/Upload";
import File from "./pages/Files";
import About from "./pages/About";
import Profile from "./pages/Profile";
import { AdminLayout } from "./components/Layouts/Admin-Layout";
import { AdminUsers } from "./components/Layouts/Pages/Admin-Users";
import { AdminContacts } from "./components/Layouts/Pages/Admin-Contacts";
import { AdminUpdate } from "./components/Layouts/Pages/Admin-Update";
import { AdminServices } from "./components/Layouts/Pages/Admin-Services";
import { AdminContactView } from "./components/Layouts/Pages/Admin-ContactView";
import { AdminServicesUpdate } from "./components/Layouts/Pages/Admin-ServiceUpdate";
import AdminAddService from "./components/Layouts/Pages/Admin-AddService";
import AdminAddUsers from "./components/Layouts/Pages/Admin-AddUsers";
import AdminQuery from "./components/Layouts/Pages/Admin-Queries";
import SingleService from "./pages/SingleService";
import QueryApprove from "./components/Layouts/components/QueryApprove";
import QueryPending from "./components/Layouts/components/QueryPending";

function App() {
  return (
    <>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/service/:id" element={<SingleService />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/files" element={<File />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/security" element={<Security />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="users" element={<AdminUsers />} />
            <Route path="users/add" element={<AdminAddUsers />} />
            <Route path="users/update/:id/edit" element={<AdminUpdate />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="contacts/:id/view" element={<AdminContactView />} />
            <Route path="services/add" element={<AdminAddService />} />
            <Route path="services/update/:id/edit" element={<AdminServicesUpdate />}/>
            <Route path="services" element={<AdminServices />} />
            <Route path="form" element={<AdminQuery />} />
            <Route path="form/approved" element={<QueryApprove />} />
            <Route path="form/pending" element={<QueryPending />} />

          </Route>

          <Route path="/*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
