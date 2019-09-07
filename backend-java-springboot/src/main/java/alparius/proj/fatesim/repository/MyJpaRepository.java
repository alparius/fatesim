package alparius.proj.fatesim.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import javax.transaction.Transactional;
import java.io.Serializable;

@NoRepositoryBean
@Transactional
public interface MyJpaRepository<T, ID extends Serializable> extends JpaRepository<T,ID> {
}
