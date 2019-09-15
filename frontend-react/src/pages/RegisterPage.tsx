import React, { useState } from "react";
import { Message } from "semantic-ui-react";
import usePost from "../api/usePost";
import RegisterForm from "../components/RegisterForm";
import UserData, { NewRegisterUserData } from "../models/UserData";

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState(NewRegisterUserData);

    const { showError, asyncPost } = usePost<UserData>("/auth/register", { ...formData, password2: undefined });

    if (showError) {
        return (
            <Message negative color="grey">
                Uh oh, error :S
            </Message>
        );
    } else {
        return <RegisterForm formData={formData} setFormData={setFormData} asyncPost={asyncPost} />;
    }
};

export default RegisterPage;
