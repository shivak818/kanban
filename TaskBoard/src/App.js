import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import TaskBoard from "./components/TaskBoard";
import { useAuth } from "./utils/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import RootRedirect from "./utils/RootRedirect";
function App() {
    const { isAuthenticated } = useAuth();
    return (
        <DndProvider backend={HTML5Backend}>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<RootRedirect />} />
                        <Route
                            path="/taskboard"
                            element={<PrivateRoute element={<TaskBoard />} />}
                        />
                        <Route
                            path="/login"
                            element={<PublicRoute element={<Login />} />}
                        />
                        <Route
                            path="/register"
                            element={<PublicRoute element={<Register />} />}
                        />
                    </Routes>
                </div>
            </Router>
        </DndProvider>
    );
}

export default App;
