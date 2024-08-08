import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import DragonInfo from "./components/DragonInfo/DragonInfo";
import About from "./components/About";
import QA from "./components/QA";
import ContactForm from "./components/ContactForm";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<DragonInfo />} />
        <Route path="/about" element={<About />} />
        <Route path="/qa" element={<QA />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
