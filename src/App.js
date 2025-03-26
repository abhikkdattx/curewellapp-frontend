import './App.css';
import AddDoctorPage from './Pages/AddDoctorPage';
import LoginPage from './Pages/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import RegisterPage from './Pages/RegistrationPage';
import ViewDoctorPage from './Pages/ViewDoctorPage';
import UpdateViewDocPage from './Pages/UpdateViewDocPage';
import AddSpecializationPage from './Pages/AddSpecializationPage';
import ViewDocSpecializationPage from './Pages/ViewDocSpecializationPage';
import ViewSurgeryPage from './Pages/ViewSurgeryPage';
import ViewSpecializationPage from './Pages/ViewSpecializationPage';
import AddSurgeryPage from './Pages/AddSurgeryPage';
import EditSurgeryPage from './Pages/EditSurgeryPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<ViewDoctorPage />} />
          <Route
            path="/add"
            element={<ProtectedRoute Component={AddDoctorPage} />}
          />
          <Route
            path="/update/:doctorId"
            element={<ProtectedRoute Component={UpdateViewDocPage} />}
          />
          <Route
            path="/specialization"
            element={<ProtectedRoute Component={ViewSpecializationPage} />}
          />
          <Route
            path="/add-specialization"
            element={<ProtectedRoute Component={AddSpecializationPage} />}
          />
          <Route
            path="/view-specialization/:specializationCode"
            element={<ProtectedRoute Component={ViewDocSpecializationPage} />}
          />
          <Route
            path="/view-surgery"
            element={<ProtectedRoute Component={ViewSurgeryPage} />}
          />
          <Route
            path="/add-surgery"
            element={<ProtectedRoute Component={AddSurgeryPage} />}
          />
          <Route
            path="/edit-surgery/:surgeryId"
            element={<ProtectedRoute Component={EditSurgeryPage} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
