package alparius.proj.fatesim.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class GameResultDto {
    private String name;
    private int score;
    private int gamesPlayed;
    private int rank;
    private boolean isWin;
}
