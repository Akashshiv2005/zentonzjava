package com.zentonez.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

    @GetMapping("/")
    public String index() {
        return "Zentonez Backend is running! Please use the frontend at http://localhost:5173";
    }
}
