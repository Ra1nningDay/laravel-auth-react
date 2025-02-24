import "./App.css";
import { Navbar } from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
    return (
        <>
            <AuthProvider>
                <Navbar />
                <Main />
                <Footer />
            </AuthProvider>
        </>
    );
}

export default App;
