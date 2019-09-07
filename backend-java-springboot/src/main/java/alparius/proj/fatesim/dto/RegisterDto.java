package alparius.proj.fatesim.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class RegisterDto {
    private String name;
    private String password;
}
