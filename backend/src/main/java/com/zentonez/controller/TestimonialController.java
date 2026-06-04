package com.zentonez.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zentonez.model.TestimonialEntity;
import com.zentonez.repository.TestimonialRepository;
import com.zentonez.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/testimonials")
@CrossOrigin(origins = "*")
public class TestimonialController {

    @Autowired
    private TestimonialRepository testimonialRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping
    public List<TestimonialEntity> getAllTestimonials() {
        return testimonialRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<TestimonialEntity> addTestimonial(
            @RequestParam("testimonial") String testimonialJson,
            @RequestParam(value = "file", required = false) MultipartFile file) {
        
        try {
            TestimonialEntity testimonial = objectMapper.readValue(testimonialJson, TestimonialEntity.class);
            
            if (file != null && !file.isEmpty()) {
                String filename = fileStorageService.storeFile(file);
                testimonial.setImageName(filename);
            }
            
            TestimonialEntity savedTestimonial = testimonialRepository.save(testimonial);
            return new ResponseEntity<>(savedTestimonial, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<TestimonialEntity> updateTestimonial(
            @PathVariable Long id,
            @RequestParam("testimonial") String testimonialJson,
            @RequestParam(value = "file", required = false) MultipartFile file) {
        
        try {
            TestimonialEntity testimonialDetails = objectMapper.readValue(testimonialJson, TestimonialEntity.class);
            TestimonialEntity existingTestimonial = testimonialRepository.findById(id).orElse(null);
            
            if (existingTestimonial == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            
            existingTestimonial.setName(testimonialDetails.getName());
            existingTestimonial.setService(testimonialDetails.getService());
            existingTestimonial.setQuote(testimonialDetails.getQuote());
            existingTestimonial.setRating(testimonialDetails.getRating());
            
            if (file != null && !file.isEmpty()) {
                String filename = fileStorageService.storeFile(file);
                existingTestimonial.setImageName(filename);
            }
            
            TestimonialEntity updatedTestimonial = testimonialRepository.save(existingTestimonial);
            return new ResponseEntity<>(updatedTestimonial, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteTestimonial(@PathVariable Long id) {
        try {
            testimonialRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
