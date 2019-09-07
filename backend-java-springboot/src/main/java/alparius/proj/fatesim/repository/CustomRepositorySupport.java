package alparius.proj.fatesim.repository;

import lombok.Getter;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Getter
abstract class CustomRepositorySupport {
    @PersistenceContext
    private EntityManager entityManager;
}
