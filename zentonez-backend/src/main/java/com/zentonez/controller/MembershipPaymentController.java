package com.zentonez.controller;

import com.zentonez.dto.CreateMembershipOrderRequest;
import com.zentonez.dto.VerifyMembershipPaymentRequest;
import com.zentonez.model.MembershipPurchase;
import com.zentonez.service.MembershipPaymentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/membership")
@CrossOrigin(origins = "*")
public class MembershipPaymentController {

    private final MembershipPaymentService membershipPaymentService;

    public MembershipPaymentController(MembershipPaymentService membershipPaymentService) {
        this.membershipPaymentService = membershipPaymentService;
    }

    @PostMapping("/create-order")
    public ResponseEntity<Map<String, Object>> createOrder(@Valid @RequestBody CreateMembershipOrderRequest request) {
        return ResponseEntity.ok(membershipPaymentService.createOrder(request));
    }

    @PostMapping("/verify-payment")
    public ResponseEntity<MembershipPurchase> verifyPayment(@Valid @RequestBody VerifyMembershipPaymentRequest request) {
        return ResponseEntity.ok(membershipPaymentService.verifyAndSavePayment(request));
    }
}
