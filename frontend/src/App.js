import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import QuestionPostScreen from "./screens/QuestionPostScreen";
import MathsScreen from "./screens/categories/MathsScreen";
import QuestionScreen from "./screens/QuestionScreen";
import AnswerEditScreen from "./screens/AnswerEditScreen";
import PhysicsScreen from "./screens/categories/PhysicsScreen";
import SciencesScreen from "./screens/categories/SciencesScreen";
import ChemistryScreen from "./screens/categories/ChemistryScreen";
import EnglishScreen from "./screens/categories/EnglishScreen";
import ComputerScreen from "./screens/categories/ComputerScreen";
import BusinessScreen from "./screens/categories/BusinessScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import PendingExpertsScreen from "./screens/PendingExpertsScreens";
import ExpertApproveScreen from "./screens/ExpertApproveScreen";
import ProfileScreen from "./screens/ProfileScreen";
import QuestionEditScreen from "./screens/QuestionEditScreen";
import OtherScreen from "./screens/categories/OtherScreen";
import SupportScreen from "./screens/SupportScreen";
import SupportListScreen from "./screens/SupportListScreen";
import FAQScreen from "./screens/FAQScreen";

function App() {
  const [success, setSuccess] = useState(null);

  const successProfile = (value) => {
    setSuccess(value);
  };

  console.log("Success Value ", success);

  return (
    <Router>
      <Header />

      <main /* style={{ background: "#F5F5F5" }} */>
        <Container>
          <Routes>
            {/* <Route render={() => <Header success={success} />}/> */}

            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />

            <Route path="/post-a-question" element={<QuestionPostScreen />} />
            <Route path="/questions/maths" element={<MathsScreen />} />
            <Route path="/questions/physics" element={<PhysicsScreen />} />
            <Route path="/questions/sciences" element={<SciencesScreen />} />
            <Route path="/questions/chemistry" element={<ChemistryScreen />} />
            <Route path="/questions/english" element={<EnglishScreen />} />
            <Route path="/questions/computer" element={<ComputerScreen />} />
            <Route path="/questions/business" element={<BusinessScreen />} />
            <Route path="/questions/other" element={<OtherScreen />} />

            <Route path="/question/:id" element={<QuestionScreen />} />
            <Route path="/question/:id/edit" element={<QuestionEditScreen />} />
            <Route
              path="/question/:id/answer/:answerId"
              element={<AnswerEditScreen />}
            />

            <Route path="/admin/userlist" element={<UserListScreen />} />
            <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
            <Route
              path="/admin/pendingExperts"
              element={<PendingExpertsScreen />}
            />
            <Route
              path="/admin/pendingExperts/:id/approve"
              element={<ExpertApproveScreen />}
            />
            <Route
              path="/profile"
              element={<ProfileScreen successProfile={successProfile} />}
            />
            <Route path="/support" element={<SupportScreen />} />
            <Route path="/admin/problemlist" element={<SupportListScreen />} exact />
            <Route path="/faq" element={<FAQScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}
export default App;
