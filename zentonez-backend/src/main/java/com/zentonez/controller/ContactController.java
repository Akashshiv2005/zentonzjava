package com.zentonez.controller;

import com.zentonez.model.Contact;
import com.zentonez.repository.ContactRepository;
import com.zentonez.service.WhatsappNotificationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    private final ContactRepository contactRepository;
    private final WhatsappNotificationService whatsappNotificationService;

    public ContactController(
            ContactRepository contactRepository,
            WhatsappNotificationService whatsappNotificationService
    ) {
        this.contactRepository = contactRepository;
        this.whatsappNotificationService = whatsappNotificationService;
    }

    @PostMapping
    public ResponseEntity<Contact> submitContact(@Valid @RequestBody Contact contact) {
        Contact saved = contactRepository.save(contact);
        whatsappNotificationService.sendContactNotification(saved);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<java.util.List<Contact>> getAllContacts() {
        return ResponseEntity.ok(contactRepository.findAll());
    }
}
