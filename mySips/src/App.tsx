import AuthProvider from "./components/contexts/authContext";
import DefaultView from "./views/DefaultView";

function App() {
    return <AuthProvider children={<DefaultView />} />;
}

export default App;
