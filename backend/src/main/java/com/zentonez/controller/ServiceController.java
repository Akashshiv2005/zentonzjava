package com.zentonez.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zentonez.model.ServiceEntity;
import com.zentonez.repository.ServiceRepository;
import com.zentonez.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.HttpHeaders;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:5173")
public class ServiceController {

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @GetMapping
    public List<ServiceEntity> getAllServices() {
        return serviceRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<ServiceEntity> createService(
            @RequestParam("service") String serviceJson,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        
        try {
            ObjectMapper mapper = new ObjectMapper();
            ServiceEntity service = mapper.readValue(serviceJson, ServiceEntity.class);

            if (image != null && !image.isEmpty()) {
                String fileName = fileStorageService.storeFile(image);
                service.setImageName(fileName);
            }

            ServiceEntity savedService = serviceRepository.save(service);
            return ResponseEntity.ok(savedService);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceEntity> updateService(
            @PathVariable Long id,
            @RequestParam("service") String serviceJson,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        
        try {
            ServiceEntity existingService = serviceRepository.findById(id).orElse(null);
            if (existingService == null) {
                return ResponseEntity.notFound().build();
            }

            ObjectMapper mapper = new ObjectMapper();
            ServiceEntity updatedData = mapper.readValue(serviceJson, ServiceEntity.class);

            existingService.setTitle(updatedData.getTitle());
            existingService.setCategory(updatedData.getCategory());
            existingService.setDescription(updatedData.getDescription());
            existingService.setPrice(updatedData.getPrice());
            existingService.setDuration(updatedData.getDuration());
            existingService.setHighlights(updatedData.getHighlights());

            if (image != null && !image.isEmpty()) {
                String fileName = fileStorageService.storeFile(image);
                existingService.setImageName(fileName);
            }

            ServiceEntity savedService = serviceRepository.save(existingService);
            return ResponseEntity.ok(savedService);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        serviceRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
