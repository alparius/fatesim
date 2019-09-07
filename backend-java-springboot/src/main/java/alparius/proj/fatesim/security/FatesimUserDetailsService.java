package alparius.proj.fatesim.security;

import alparius.proj.fatesim.model.Player;
import alparius.proj.fatesim.repository.PlayerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Component
public class FatesimUserDetailsService implements UserDetailsService, ApplicationListener<AuthenticationSuccessEvent> {
    private static final Logger log = LoggerFactory.getLogger(FatesimUserDetailsService.class);

    private final PlayerRepository playerRepo;

    public FatesimUserDetailsService(PlayerRepository playerRepo) {
        this.playerRepo = playerRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.warn("1. loadUserByUsername:: username = {}", username);

        Player player = playerRepo.findByName(username);
        if (player == null) {
            log.warn("usernamenotfound");
            throw new UsernameNotFoundException("User not found");
        }

        List<GrantedAuthority> authorities = Collections.emptyList();

        log.warn("3. loadUserByUsername:: username = {}", username);

        return new org.springframework.security.core.userdetails.User(
                player.getName(),
                player.getPassword(),
                true, true, true, true, authorities);
    }

    @Override
    public void onApplicationEvent(AuthenticationSuccessEvent event) {
    }
}
