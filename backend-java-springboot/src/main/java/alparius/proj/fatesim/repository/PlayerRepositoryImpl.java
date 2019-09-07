package alparius.proj.fatesim.repository;

import alparius.proj.fatesim.dto.PlayerDto;

import javax.persistence.EntityManager;
import javax.persistence.StoredProcedureQuery;
import java.util.List;

public class PlayerRepositoryImpl extends CustomRepositorySupport implements PlayerRepositoryCustom {
    @Override
    public PlayerDto getPlayerDto(String name) {
        EntityManager em = getEntityManager();
        StoredProcedureQuery query = em.createNamedStoredProcedureQuery("getGameResult");
        query.setParameter(1, name);
        query.execute();
        return (PlayerDto) query.getSingleResult();
    }

    @Override
    public List<PlayerDto> getLeaderboard() {
        EntityManager em = getEntityManager();
        StoredProcedureQuery query = em.createNamedStoredProcedureQuery("getLeaderboard");
        query.execute();
        return (List<PlayerDto>) query.getResultList();
    }
}
