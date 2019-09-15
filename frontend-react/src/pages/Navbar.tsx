import React from "react";
import { NavLink } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";
import PlayerData from "../models/PlayerData";

interface NavbarProps {
    handleLogout: () => void;
    user: PlayerData | undefined;
}

const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {
    const { handleLogout, user } = props;

    return (
        <Menu color="grey" fixed="top" fluid borderless inverted compact>
            <Menu.Item as={NavLink} header exact to="/">
                <Icon name="play" color="black" />
            </Menu.Item>

            {user && (
                <Menu.Item as={NavLink} to="/leaderboard">
                    <Icon name="list" color="black" />
                </Menu.Item>
            )}

            {!user ? (
                <>
                    <Menu.Item as={NavLink} to="/login" position="right">
                        <Icon name="sign in" color="black" />
                    </Menu.Item>

                    <Menu.Item as={NavLink} to="/register">
                        <Icon name="signup" color="black" />
                    </Menu.Item>
                </>
            ) : (
                <Menu.Item onClick={handleLogout} position="right">
                    <Icon name="log out" color="black" />
                </Menu.Item>
            )}
        </Menu>
    );
};

export default Navbar;
