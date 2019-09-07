package alparius.proj.fatesim.service;

import alparius.proj.fatesim.dto.GameResultDto;
import alparius.proj.fatesim.dto.PlayerDto;
import alparius.proj.fatesim.dto.RegisterDto;
import alparius.proj.fatesim.model.Player;
import alparius.proj.fatesim.repository.PlayerRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class GameServiceImpl implements GameService {

    private final PlayerRepository repo;
    private PasswordEncoder passwordEncoder;

    public GameServiceImpl(PlayerRepository repo) {
        this.repo = repo;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Override
    public void saveNewPlayer(RegisterDto newPlayer) {
        Player player = Player.builder()
                .name(newPlayer.getName())
                .password(passwordEncoder.encode(newPlayer.getPassword()))
                .score(0)
                .gamesPlayed(0)
                .build();
        repo.save(player);
    }

    @Override
    public PlayerDto getPlayerStats(String name) {
        return repo.getPlayerDto(name);
    }

    @Override
    public GameResultDto playGame(String playerName) {
        Player player = repo.findByName(playerName);

        final boolean isWin = ThreadLocalRandom.current().nextBoolean();

        player.changeScore( isWin ? 1 : -1 );
        player.incrementGamesPlayed();
        repo.save(player);

        PlayerDto playerDto = repo.getPlayerDto(playerName);
        return GameResultDto.builder()
                .name(playerDto.getName())
                .score(playerDto.getScore())
                .gamesPlayed(playerDto.getGamesPlayed())
                .isWin(isWin)
                .build();
    }

    @Override
    public List<PlayerDto> getLeaderboard() {
        return repo.getLeaderboard();
    }
}
