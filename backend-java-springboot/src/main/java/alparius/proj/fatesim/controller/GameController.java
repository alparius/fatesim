package alparius.proj.fatesim.controller;

import alparius.proj.fatesim.dto.GameResultDto;
import alparius.proj.fatesim.dto.PlayerDto;
import alparius.proj.fatesim.service.GameService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/game")
public class GameController {
    private static final Logger log = LoggerFactory.getLogger(GameController.class);

    private final GameService service;

    public GameController(GameService service) {
        this.service = service;
    }

    // TODO have some proper logging going on
    // TODO error handling, status messages, etc
    @RequestMapping(value = "/mystats", method = RequestMethod.GET)
    PlayerDto MyStats() {
        return service.getPlayerStats(SecurityContextHolder.getContext().getAuthentication().getName());
    }

    @RequestMapping(value = "/play", method = RequestMethod.GET)
    GameResultDto Play() {
        return service.playGame(SecurityContextHolder.getContext().getAuthentication().getName());
    }

    @RequestMapping(value = "/leaderboard", method = RequestMethod.GET)
    List<PlayerDto> Leaderboard() {
        return service.getLeaderboard();
    }
}
