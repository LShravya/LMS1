import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/login';
import Register from './Components/register';
import Course from './Components/course';
import Courses from './Components/Courses';
import Profile from './Components/profile';
import Learnings from './Components/learnings';
import Home from './Components/Home';
import AddCourse from './Components/AddCourse';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Components/DashBoard/Dashboard';
import 'boxicons/css/boxicons.min.css';
import EditCourse from './Components/EditCourses';
import DUsers from './Components/DashBoard/DUsers';
import DCourses from './Components/DashBoard/DCourses';
import Assessment from './Components/Assessment';
import ErrorPage from './Components/ErrorPage';
import AddQuestions from './Components/AddQuestions';
import Performance from './Components/DashBoard/Performance';
import DTutors from './Components/DashBoard/DTutors';
import Certificate from './Components/certificate';
import AboutUs from './Components/AboutUs';

import VoiceAssistant from './Components/VoiceAssistant';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <VoiceAssistant />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<Course />} />
          <Route path="/certificate/:id" element={<Certificate />} />
          <Route path="/assessment/:id" element={<Assessment />} />
          <Route path="/addcourse" element={<AddCourse />} />
          <Route path="/editCourse/:id" element={<EditCourse />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/learnings" element={<Learnings />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Dcourses" element={<DCourses />} />
          <Route path="/Dusers" element={<DUsers />} />
          <Route path="/Dtutors" element={<DTutors />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/addquestions/:id" element={<AddQuestions />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
