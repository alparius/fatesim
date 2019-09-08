import React from "react";

import { Button, Form, Grid, Header } from "semantic-ui-react";

const LoginForm: React.FC = () => {
    return (
        <Grid textAlign="center">
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Form size="large">
                        <Form.Input type="text" name="email" fluid icon="user" iconPosition="left" />
                        <Form.Input type="password" name="password" fluid icon="lock" iconPosition="left" />
                        <Button color="violet" fluid size="large" style={{ marginTop: "3em" }} />
                    </Form>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row style={{ marginTop: "10vh" }}>
                <Grid.Column style={{ maxWidth: 800 }}>
                    <Header as="h3" />

                    <Header as="h4" />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default LoginForm;
