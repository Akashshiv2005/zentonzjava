package com.zentonez.controller;

import com.zentonez.model.GalleryImage;
import com.zentonez.repository.GalleryImageRepository;
import com.zentonez.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import jakarta.servlet.http.HttpServletRequest;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/gallery")
@CrossOrigin(origins = "http://localhost:5173")
public class GalleryImageController {

    @Autowired
    private GalleryImageRepository galleryImageRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/upload")
    public GalleryImage uploadImage(@RequestParam("file") MultipartFile file, @RequestParam("category") String category) {
        String fileName = fileStorageService.storeFile(file);
        GalleryImage img = new GalleryImage(fileName, category);
        return galleryImageRepository.save(img);
    }

    @GetMapping
    public List<GalleryImage> getAllImages() {
        return galleryImageRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteImage(@PathVariable Long id) {
        return galleryImageRepository.findById(id).map(image -> {
            galleryImageRepository.delete(image);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/images/{fileName:.+}")
    public ResponseEntity<Resource> serveImage(@PathVariable String fileName, HttpServletRequest request) {
        Resource resource = fileStorageService.loadFileAsResource(fileName);

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            // Fallback
        }
        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}
