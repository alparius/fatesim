import React, { useEffect, useState } from "react";
import { Button, Header, Message } from "semantic-ui-react";
import useGet from "../api/useGet";
import PlayerData from "../models/PlayerData";

interface GamePageProps {
    player: PlayerData | undefined;
}

const GamePage: React.FC<GamePageProps> = (props: GamePageProps) => {
    const { player } = props;

    const [playerData, setPlayerData] = useState(player);
    const { response, showError, asyncGet } = useGet<PlayerData>("/game/play");

    const handlePlayButton = () => {
        asyncGet();
    };

    useEffect(() => {
        if (response) {
            setPlayerData(response);
        }
    }, [response]);

    if (playerData) {
        if (showError) {
            return (
                <Message negative color="grey">
                    Uh oh, error :S
                </Message>
            );
        } else {
            return (
                <>
                    <Header as="h1">{playerData.score}</Header>
                    <Header as="h3">you are the {playerData.rank}th best player of this game</Header>
                    <Header as="h4">you played {playerData.gamesPlayed} games so far</Header>
                    {playerData.win === true ? (
                        <Header as="h1">AND YOU JUST WON</Header>
                    ) : (
                        <Header as="h2">and you lose again</Header>
                    )}

                    <Button inverted color="grey" fluid size="large" style={{ marginTop: "3em" }} onClick={handlePlayButton}>
                        but PLAY again!
                    </Button>
                </>
            );
        }
    } else {
        return (
            <Message negative color="grey">
                This stuff is virtually unreachable, if you see this, write me at csekealpar12@gmail.com.
            </Message>
        );
    }
};

export default GamePage;
