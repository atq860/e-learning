import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import QuestionPostScreen from "./screens/QuestionPostScreen";
import MathsScreen from "./screens/categories/MathsScreen";
import MathsQuestionScreen from "./screens/categories/MathsQuestionScreen";
import MathsAnswerScreen from "./screens/categories/MathsAnswerScreen";
import QuestionScreen from "./screens/QuestionScreen";
import AnswerEditScreen from "./screens/AnswerEditScreen";

function App() {
  return (
    <Router>
      <Header />
      <main /* style={{ background: "#F5F5F5" }} */>
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />

            <Route path="/post-a-question" element={<QuestionPostScreen />} />
            <Route path="/questions/maths" element={<MathsScreen />} />

            {/* <Route path="/questions/maths/:id" element={<MathsQuestionScreen />} />
            <Route path="/questions/maths/:id/answers/:answerId" element={<MathsAnswerScreen />} /> */}

            <Route path="/question/:id" element={<QuestionScreen />} />
            <Route path="/question/:id/answer/:answerId" element={<AnswerEditScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}
export default App;
