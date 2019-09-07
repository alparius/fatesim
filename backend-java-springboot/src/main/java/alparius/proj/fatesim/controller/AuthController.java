package alparius.proj.fatesim.controller;

import alparius.proj.fatesim.dto.RegisterDto;
import alparius.proj.fatesim.service.GameService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    private final GameService service;

    public AuthController(GameService service) {
        this.service = service;
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    void Register(@RequestBody RegisterDto newPlayer) {
        log.trace("new registration: {}", newPlayer.getName());
        // TODO no duplicate username register
        service.saveNewPlayer(newPlayer);
    }
}
