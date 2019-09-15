import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Form, Grid, Message } from "semantic-ui-react";
import UserData from "../models/UserData";

interface RegisterFormProps {
    formData: UserData;
    setFormData(newData: UserData): void;
    asyncPost(): Promise<void>;
}

const RegisterForm: React.FC<RegisterFormProps> = (props: RegisterFormProps) => {
    const { formData, setFormData, asyncPost } = props;

    const [fieldErrors, setFieldErrors] = useState(new Array<string>());
    const [errorMsgs, setErrorMsgs] = useState(new Array<string>());

    const handleChange = (_: any, { name, value }: any) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleRegisterButton = () => {
        const tobeFieldErrors = new Array<string>();
        const tobeErrorMsgs = new Array<string>();

        Object.entries(formData).forEach((field: [string, string]) => {
            if (field[1] === "") {
                tobeFieldErrors.push(field[0]);
            }
        });
        if (tobeFieldErrors.length !== 0) {
            tobeErrorMsgs.push("It's empty fields, man.");

            if (formData.password !== formData.password2) {
                tobeErrorMsgs.push("Passwordical inconsistency.");
                tobeFieldErrors.push("password2");
            }

            if (tobeFieldErrors.length === 0) {
                asyncPost();
                setErrorMsgs(new Array<string>());
                setFieldErrors(new Array<string>());
            } else {
                setFieldErrors(tobeFieldErrors);
                setErrorMsgs(tobeErrorMsgs);
            }
        }
    };

    return (
        <Grid textAlign="center">
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Form size="large">
                        {errorMsgs.length !== 0 && (
                            <Message negative color="grey">
                                {errorMsgs.map((message: string) => (
                                    <>
                                        {message}
                                        <br />
                                    </>
                                ))}
                            </Message>
                        )}
                        <Form.Input
                            inverted
                            error={fieldErrors.includes("name")}
                            name="name"
                            value={formData.name}
                            placeholder="name"
                            onChange={handleChange}
                            type="text"
                            fluid
                            icon="user outline"
                            iconPosition="left"
                        />

                        <Form.Input
                            inverted
                            error={fieldErrors.includes("password")}
                            name="password"
                            value={formData.password}
                            placeholder="password"
                            onChange={handleChange}
                            type="password"
                            fluid
                            icon="lock"
                            iconPosition="left"
                        />
                        <Form.Input
                            inverted
                            error={fieldErrors.includes("password2")}
                            name="password2"
                            value={formData.password2}
                            placeholder="password again"
                            onChange={handleChange}
                            type="password"
                            fluid
                            icon="lock"
                            iconPosition="left"
                        />

                        <Form.Button
                            inverted
                            color="grey"
                            fluid
                            size="large"
                            style={{ marginTop: "3em" }}
                            onClick={handleRegisterButton}
                        >
                            Register!
                        </Form.Button>
                    </Form>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row style={{ marginTop: "10vh" }}>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Message color="grey">
                        Already a player? <NavLink to="/login">Log in!</NavLink>
                    </Message>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default RegisterForm;
