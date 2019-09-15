import React from "react";
import { Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import GamePage from "./pages/GamePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./pages/Navbar";
import RegisterPage from "./pages/RegisterPage";
import GuardedRoute from "./tools/GuardedRoute";
import useSession from "./tools/useSession";

const App: React.FC = () => {
    const { user, setUser, handleLogout } = useSession();

    return (
        <>
            <Navbar handleLogout={handleLogout} user={user} />

            <Container style={{ marginTop: "10vh" }}>
                <GuardedRoute exact path="/" user={user} render={() => <GamePage player={user} />} />
                <Route path="/login" render={() => <LoginPage user={user} setUser={setUser} />} />
                <Route path="/register" component={RegisterPage} />
                <GuardedRoute path="/leaderboard" user={user} component={LeaderboardPage} />
            </Container>
        </>
    );
};

export default App;
