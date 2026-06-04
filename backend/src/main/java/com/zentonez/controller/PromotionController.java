package com.zentonez.controller;

import com.zentonez.model.PromotionEntity;
import com.zentonez.repository.PromotionRepository;
import com.zentonez.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/promotions")
@CrossOrigin(origins = "http://localhost:5173")
public class PromotionController {

    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @GetMapping
    public List<PromotionEntity> getAllPromotions() {
        return promotionRepository.findAll();
    }

    @GetMapping("/active")
    public ResponseEntity<PromotionEntity> getActivePromotion() {
        List<PromotionEntity> activePromotions = promotionRepository.findByIsActiveTrue();
        if (activePromotions.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        // If there are multiple active, just return the first one
        return ResponseEntity.ok(activePromotions.get(0));
    }

    @PostMapping
    public PromotionEntity createPromotion(@RequestBody PromotionEntity promotion) {
        // If the new promotion is active, optionally deactivate others? 
        // We leave it to the frontend to manage or just allow one.
        if (promotion.getIsActive() != null && promotion.getIsActive()) {
            deactivateAllOtherPromotions();
        }
        return promotionRepository.save(promotion);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PromotionEntity> updatePromotion(@PathVariable Long id, @RequestBody PromotionEntity promotionDetails) {
        Optional<PromotionEntity> promotion = promotionRepository.findById(id);
        if (promotion.isPresent()) {
            PromotionEntity updatedPromotion = promotion.get();
            updatedPromotion.setTagText(promotionDetails.getTagText());
            updatedPromotion.setTitlePart1(promotionDetails.getTitlePart1());
            updatedPromotion.setTitlePart2(promotionDetails.getTitlePart2());
            updatedPromotion.setDescription(promotionDetails.getDescription());
            updatedPromotion.setOfferTag(promotionDetails.getOfferTag());
            updatedPromotion.setOfferTitle(promotionDetails.getOfferTitle());
            updatedPromotion.setDiscountValue(promotionDetails.getDiscountValue());
            updatedPromotion.setDiscountSuffix(promotionDetails.getDiscountSuffix());
            updatedPromotion.setFeatures(promotionDetails.getFeatures());
            updatedPromotion.setImageName(promotionDetails.getImageName());
            
            if (promotionDetails.getIsActive() != null && promotionDetails.getIsActive()) {
                deactivateAllOtherPromotions();
            }
            updatedPromotion.setIsActive(promotionDetails.getIsActive());

            return ResponseEntity.ok(promotionRepository.save(updatedPromotion));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePromotion(@PathVariable Long id) {
        Optional<PromotionEntity> promotion = promotionRepository.findById(id);
        if (promotion.isPresent()) {
            promotionRepository.delete(promotion.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String fileName = fileStorageService.storeFile(file);
            return ResponseEntity.ok(fileName);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Could not upload the file: " + e.getMessage());
        }
    }

    private void deactivateAllOtherPromotions() {
        List<PromotionEntity> activePromotions = promotionRepository.findByIsActiveTrue();
        for (PromotionEntity p : activePromotions) {
            p.setIsActive(false);
            promotionRepository.save(p);
        }
    }
}
