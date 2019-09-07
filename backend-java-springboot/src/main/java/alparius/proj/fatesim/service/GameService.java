package alparius.proj.fatesim.service;

import alparius.proj.fatesim.dto.GameResultDto;
import alparius.proj.fatesim.dto.PlayerDto;
import alparius.proj.fatesim.dto.RegisterDto;

import java.util.List;

public interface GameService {
    void saveNewPlayer(RegisterDto newPlayer);

    PlayerDto getPlayerStats(String name);
    GameResultDto playGame(String name);

    List<PlayerDto> getLeaderboard();
}
