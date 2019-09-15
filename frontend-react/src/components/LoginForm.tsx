import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Form, Grid, Message } from "semantic-ui-react";
import UserData from "../models/UserData";

import { easeQuadInOut as ease } from "d3-ease";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import AnimatedProgressProvider from "../tools/AnimatedProgressProvider";

interface LoginFormProps {
    formData: UserData;
    setFormData(newData: UserData): void;
    postLogin(): Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = (props: LoginFormProps) => {
    const { formData, setFormData, postLogin } = props;

    const handleChange = (_: any, { name, value }: any) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleLoginButton = () => {
        postLogin();
    };

    return (
        <Grid textAlign="center">
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Form size="large" inverted>
                        <Form.Input
                            inverted
                            type="text"
                            name="name"
                            placeholder="name"
                            value={formData.name}
                            onChange={handleChange}
                            fluid
                            icon="user"
                            iconPosition="left"
                        />
                        <Form.Input
                            inverted
                            type="password"
                            name="password"
                            placeholder="password"
                            value={formData.password}
                            onChange={handleChange}
                            fluid
                            icon="lock"
                            iconPosition="left"
                        />
                        <Button inverted color="grey" fluid size="large" style={{ marginTop: "3em" }} onClick={handleLoginButton}>
                            Log in!
                        </Button>
                    </Form>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row style={{ marginTop: "10vh" }}>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Message color="grey">
                        Not a player yet? <NavLink to="/register">Register!</NavLink>
                    </Message>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row style={{ marginTop: "10vh" }}>
                <Grid.Column style={{ maxWidth: 300 }}>
                    <CircularProgressbar
                        value={66}
                        strokeWidth={15}
                        styles={buildStyles({
                            strokeLinecap: "butt",
                            textColor: "grey",
                            pathColor: "black",
                            trailColor: "grey",
                            rotation: 0.5 + (1 - 66 / 100) / 2
                        })}
                    />
                    <CircularProgressbar
                        value={66}
                        strokeWidth={50}
                        styles={buildStyles({
                            strokeLinecap: "butt"
                        })}
                    />
                    <CircularProgressbar
                        value={66}
                        circleRatio={0.75}
                        styles={buildStyles({
                            rotation: 1 / 2 + 1 / 8,
                            strokeLinecap: "butt",
                            trailColor: "#eee"
                        })}
                    />
                    <AnimatedProgressProvider duration={1.4} easingFunction={ease}>
                        {(value: number) => {
                            return <CircularProgressbar value={value} styles={buildStyles({ pathTransition: "none" })} />;
                        }}
                    </AnimatedProgressProvider>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default LoginForm;
