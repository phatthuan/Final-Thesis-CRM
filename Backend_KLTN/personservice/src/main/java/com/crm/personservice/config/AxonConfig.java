package com.crm.personservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.thoughtworks.xstream.XStream;

@Configuration
public class AxonConfig {
 
   @Bean
   public XStream xStream() {
       XStream xStream = new XStream();

       xStream.allowTypesByWildcard(new String[] {
               "com.crm.**"
       });
       return xStream;
   }
}
