package alparius.proj.fatesim.config;

import alparius.proj.fatesim.security.FatesimUserDetailsService;
import alparius.proj.fatesim.security.LogoutSuccess;
import alparius.proj.fatesim.security.MySavedRequestAwareAuthenticationSuccessHandler;
import alparius.proj.fatesim.security.RestAuthenticationEntryPoint;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

@Configuration
@EnableWebSecurity
@ComponentScan("alparius.proj.fatesim.security")
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final RestAuthenticationEntryPoint restAuthenticationEntryPoint;
    private final MySavedRequestAwareAuthenticationSuccessHandler mySavedRequestAwareAuthenticationSuccessHandler;
    private final FatesimUserDetailsService fatesimUserDetailsService;
    private final LogoutSuccess logoutSuccess;

    public SecurityConfig(RestAuthenticationEntryPoint restAuthenticationEntryPoint, MySavedRequestAwareAuthenticationSuccessHandler mySavedRequestAwareAuthenticationSuccessHandler, FatesimUserDetailsService fatesimUserDetailsService, LogoutSuccess logoutSuccess) {
        this.restAuthenticationEntryPoint = restAuthenticationEntryPoint;
        this.mySavedRequestAwareAuthenticationSuccessHandler = mySavedRequestAwareAuthenticationSuccessHandler;
        this.fatesimUserDetailsService = fatesimUserDetailsService;
        this.logoutSuccess = logoutSuccess;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(authProvider());
    }

    @Override
    protected UserDetailsService userDetailsService() {
        return fatesimUserDetailsService;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()
                    .and()
                .csrf().disable()
                .exceptionHandling()
                .authenticationEntryPoint(restAuthenticationEntryPoint)
                    .and()
                .authorizeRequests()
                    .antMatchers("/api/auth/login").permitAll()
                    .antMatchers("/api/auth/register").permitAll()
                    .anyRequest().authenticated()
                    .and()
                .formLogin()
                    .loginProcessingUrl("/api/auth/login")
                    .successHandler(mySavedRequestAwareAuthenticationSuccessHandler)
                    .failureHandler(new SimpleUrlAuthenticationFailureHandler())
                    .and()
                .logout()
                    .logoutUrl("/api/auth/logout")
                    .logoutSuccessHandler(logoutSuccess)
                    .deleteCookies("JSESSIONID")
                    .invalidateHttpSession(false)
                    .permitAll();
    }

    @Bean
    public MySavedRequestAwareAuthenticationSuccessHandler mySuccessHandler() {
        return mySavedRequestAwareAuthenticationSuccessHandler;
    }

    @Bean
    public SimpleUrlAuthenticationFailureHandler myFailureHandler() {
        return new SimpleUrlAuthenticationFailureHandler();
    }
}
