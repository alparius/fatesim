package alparius.proj.fatesim.model;

import alparius.proj.fatesim.dto.PlayerDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;

@SqlResultSetMapping(name = "PlayerDto",
        classes = {
                @ConstructorResult(targetClass = PlayerDto.class,
                        columns = {
                                @ColumnResult(name = "name", type = String.class),
                                @ColumnResult(name = "score", type = Integer.class),
                                @ColumnResult(name = "games_played", type = Integer.class),
                                @ColumnResult(name = "rank", type = Integer.class)
                        }
                )
        }
)
@NamedStoredProcedureQuery(
        name = "getGameResult",
        procedureName = "get_game_result",
        resultSetMappings = "PlayerDto",
        parameters = {
                @StoredProcedureParameter(mode = ParameterMode.IN, type = String.class)
        }
)
@NamedStoredProcedureQuery(
        name = "getLeaderboard",
        procedureName = "get_leaderboard",
        resultSetMappings = "PlayerDto"
)
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Player {

    @Id
    private String name;
    private String password;
    private int score;
    private int gamesPlayed;

    public void changeScore(int change) {
        this.score += change;
    }

    public void incrementGamesPlayed() {
        this.gamesPlayed += 1;
    }

    @Override
    public String toString() {
        return "name='" + name + '\'' +
                ", score='" + score + '\'' +
                ", gamesPlayed='" + gamesPlayed + '\'';
    }
}
