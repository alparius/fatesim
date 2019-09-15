import React from "react";
import { StaticContext } from "react-router";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";
import PlayerData from "../models/PlayerData";

interface IGuardedRouteProps {
    user: PlayerData | undefined;
    path: string;
    component?: React.FunctionComponent<{}>;
    exact?: boolean;
    render?: ({ match }: RouteComponentProps<any, StaticContext, any>) => JSX.Element;
}

const GuardedRoute: React.FC<IGuardedRouteProps> = (props: IGuardedRouteProps) => {
    const { user, ...rest } = props;

    if (!user) {
        return <Route path={rest.path} render={() => <Redirect to="/login" />} />;
    } else {
        return <Route {...rest} />;
    }
};

export default GuardedRoute;
