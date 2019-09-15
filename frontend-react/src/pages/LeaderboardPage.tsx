import React from "react";
import { Grid, Message, Placeholder, Segment } from "semantic-ui-react";
import useFetch from "../api/useFetch";
import PlayerData from "../models/PlayerData";

const LeaderboardPage: React.FC = () => {
    const { response: players, loading, showError } = useFetch<PlayerData[]>("/game/leaderboard");

    if (showError || !players || players.length === 0) {
        return (
            <Message negative color="grey">
                Uh oh, error :S
            </Message>
        );
    } else if (loading) {
        return (
            <Placeholder inverted>
                <Placeholder.Image inverted />
            </Placeholder>
        );
    } else {
        return (
            <>
                {players.map((player: PlayerData) => (
                    <Segment key={player.name} padded color="grey" inverted>
                        <Grid stackable>
                            <Grid.Row columns={3}>
                                <Grid.Column>#{player.rank}</Grid.Column>
                                <Grid.Column>{player.name}</Grid.Column>
                                <Grid.Column>{player.score} pts</Grid.Column>
                                <Grid.Column>{player.gamesPlayed} games</Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                ))}
            </>
        );
    }
};

export default LeaderboardPage;
