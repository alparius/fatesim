CREATE DATABASE fatesim;

DROP FUNCTION get_game_result(text);
-- get player stats, including current leaderboard position
CREATE FUNCTION get_game_result(in text, out name text, out score int, out games_played int, out rank int)
    AS $$
        SELECT r.name, r.score, r.games_played, r.rank
        FROM(
            SELECT name, score, games_played, CAST(ROW_NUMBER() OVER (ORDER BY score DESC) AS int) AS rank
            FROM player
        ) AS r
        WHERE r.name = $1
    $$ LANGUAGE SQL;

DROP FUNCTION get_leaderboard();
-- get the top and bottom players of the leaderboard
-- // TODO  parametrise this and usage for result size
CREATE FUNCTION get_leaderboard()
    RETURNS TABLE (
        name VARCHAR,
        score INT,
        games_played INT,
        rank INT
    )
    AS $$
        SELECT r.name, r.score, r.games_played, CAST(r.toporder AS INT) AS rank
        FROM (
            SELECT name, score, games_played,
                DENSE_RANK() OVER (ORDER BY score ASC) AS bottomorder,
                DENSE_RANK() OVER (ORDER BY score DESC) AS toporder
            FROM player
        ) AS r
        WHERE bottomorder <= 2 OR toporder <= 2
        ORDER BY r.score DESC
    $$ LANGUAGE SQL;
