package com.zentonez.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "promotions")
public class PromotionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Boolean isActive = false;
    private String tagText;
    private String titlePart1;
    private String titlePart2;
    
    @Column(length = 1000)
    private String description;
    
    private String offerTag;
    private String offerTitle;
    private String discountValue;
    private String discountSuffix;
    
    @Column(length = 1000)
    private String features; // Comma-separated list of features
    
    private String imageName;

    public PromotionEntity() {
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean active) { isActive = active; }

    public String getTagText() { return tagText; }
    public void setTagText(String tagText) { this.tagText = tagText; }

    public String getTitlePart1() { return titlePart1; }
    public void setTitlePart1(String titlePart1) { this.titlePart1 = titlePart1; }

    public String getTitlePart2() { return titlePart2; }
    public void setTitlePart2(String titlePart2) { this.titlePart2 = titlePart2; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getOfferTag() { return offerTag; }
    public void setOfferTag(String offerTag) { this.offerTag = offerTag; }

    public String getOfferTitle() { return offerTitle; }
    public void setOfferTitle(String offerTitle) { this.offerTitle = offerTitle; }

    public String getDiscountValue() { return discountValue; }
    public void setDiscountValue(String discountValue) { this.discountValue = discountValue; }

    public String getDiscountSuffix() { return discountSuffix; }
    public void setDiscountSuffix(String discountSuffix) { this.discountSuffix = discountSuffix; }

    public String getFeatures() { return features; }
    public void setFeatures(String features) { this.features = features; }

    public String getImageName() { return imageName; }
    public void setImageName(String imageName) { this.imageName = imageName; }
}
