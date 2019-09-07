package alparius.proj.fatesim.repository;

import alparius.proj.fatesim.dto.PlayerDto;

import java.util.List;

public interface PlayerRepositoryCustom {
    PlayerDto getPlayerDto(String name);
    List<PlayerDto> getLeaderboard();
}
