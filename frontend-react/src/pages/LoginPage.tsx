import React, { useState } from "react";
import { Redirect } from "react-router";
import { Message } from "semantic-ui-react";
import useAuth from "../api/useAuth";
import LoginForm from "../components/LoginForm";
import PlayerData from "../models/PlayerData";
import { NewLoginUserData } from "../models/UserData";

interface LoginPageProps {
    user: PlayerData | undefined;
    setUser: (newUser: PlayerData) => void;
}

const LoginPage: React.FC<LoginPageProps> = (props: LoginPageProps) => {
    const { user, setUser } = props;

    const [formData, setFormData] = useState(NewLoginUserData);

    const { showError, postLogin } = useAuth(formData, setUser);

    if (user) {
        return <Redirect to="/" />;
    } else {
        if (showError) {
            return (
                <Message negative color="grey">
                    Uh oh, error :S
                </Message>
            );
        } else {
            return <LoginForm formData={formData} setFormData={setFormData} postLogin={postLogin} />;
        }
    }
};

export default LoginPage;
