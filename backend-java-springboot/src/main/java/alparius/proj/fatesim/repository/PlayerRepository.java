package alparius.proj.fatesim.repository;

import alparius.proj.fatesim.model.Player;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends MyJpaRepository<Player, Long>, PlayerRepositoryCustom {
    Player findByName(String name);
}
