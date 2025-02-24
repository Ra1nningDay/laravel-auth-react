import "./App.css";
import { Navbar } from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
    return (
        <>
            <Navbar />
            <Main />
            <Footer />
        </>
    );
}

export default App;
