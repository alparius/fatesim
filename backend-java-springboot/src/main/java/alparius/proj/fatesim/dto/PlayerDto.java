package alparius.proj.fatesim.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class PlayerDto {
    private String name;
    private int score;
    private int gamesPlayed;
    private int rank;
}

