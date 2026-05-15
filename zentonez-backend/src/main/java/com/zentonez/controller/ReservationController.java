package com.zentonez.controller;

import com.zentonez.model.Reservation;
import com.zentonez.repository.ReservationRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.zentonez.service.WhatsappNotificationService;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "*")
public class ReservationController {

    private final ReservationRepository reservationRepository;
    private final WhatsappNotificationService whatsappNotificationService;

    public ReservationController(
            ReservationRepository reservationRepository,
            WhatsappNotificationService whatsappNotificationService
    ) {
        this.reservationRepository = reservationRepository;
        this.whatsappNotificationService = whatsappNotificationService;
    }

    @PostMapping
    public ResponseEntity<Reservation> createReservation(@Valid @RequestBody Reservation reservation) {
        Reservation saved = reservationRepository.save(reservation);
        whatsappNotificationService.sendReservationNotification(saved);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<Reservation>> getAllReservations() {
        return ResponseEntity.ok(reservationRepository.findAll());
    }

    @GetMapping("/booked-slots")
    public ResponseEntity<List<String>> getBookedSlots(
            @RequestParam String service,
            @RequestParam String date) {
        List<String> bookedSlots = reservationRepository.findBookedSlots(service, date);
        return ResponseEntity.ok(bookedSlots);
    }
}
