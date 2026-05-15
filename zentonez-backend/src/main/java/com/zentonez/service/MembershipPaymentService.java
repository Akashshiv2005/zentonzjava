package com.zentonez.service;

import com.zentonez.dto.CreateMembershipOrderRequest;
import com.zentonez.dto.VerifyMembershipPaymentRequest;
import com.zentonez.model.MembershipPurchase;
import com.zentonez.repository.MembershipPurchaseRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.HexFormat;
import java.util.Map;
import java.util.Objects;

@Service
public class MembershipPaymentService {

    private final RestTemplate restTemplate;
    private final MembershipPurchaseRepository membershipPurchaseRepository;

    @Value("${payment.razorpay.key-id:}")
    private String razorpayKeyId;

    @Value("${payment.razorpay.key-secret:}")
    private String razorpayKeySecret;

    @Value("${payment.membership.amount-in-paise:19900}")
    private Integer membershipAmountInPaise;

    @Value("${payment.membership.plan-name:Zen Tonez Membership}")
    private String membershipPlanName;

    public MembershipPaymentService(
            RestTemplateBuilder restTemplateBuilder,
            MembershipPurchaseRepository membershipPurchaseRepository
    ) {
        this.restTemplate = restTemplateBuilder.build();
        this.membershipPurchaseRepository = membershipPurchaseRepository;
    }

    public Map<String, Object> createOrder(CreateMembershipOrderRequest request) {
        validateConfiguration();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBasicAuth(razorpayKeyId, razorpayKeySecret);

        Map<String, Object> payload = new HashMap<>();
        payload.put("amount", membershipAmountInPaise);
        payload.put("currency", "INR");
        payload.put("receipt", "membership_" + System.currentTimeMillis());
        payload.put("notes", Map.of(
                "customerName", request.getCustomerName(),
                "phone", request.getPhone(),
                "email", Objects.requireNonNullElse(request.getEmail(), ""),
                "plan", membershipPlanName
        ));

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);
        ResponseEntity<Map> response = restTemplate.exchange(
                "https://api.razorpay.com/v1/orders",
                HttpMethod.POST,
                entity,
                Map.class
        );

        Map<String, Object> body = response.getBody();
        if (body == null || body.get("id") == null) {
            throw new IllegalStateException("Unable to create Razorpay order.");
        }

        return Map.of(
                "orderId", body.get("id"),
                "amount", membershipAmountInPaise,
                "currency", "INR",
                "keyId", razorpayKeyId,
                "planName", membershipPlanName
        );
    }

    public MembershipPurchase verifyAndSavePayment(VerifyMembershipPaymentRequest request) {
        validateConfiguration();

        String payload = request.getRazorpayOrderId() + "|" + request.getRazorpayPaymentId();
        String expectedSignature = hmacSha256(payload, razorpayKeySecret);

        if (!expectedSignature.equals(request.getRazorpaySignature())) {
            throw new IllegalArgumentException("Invalid payment signature.");
        }

        MembershipPurchase purchase = new MembershipPurchase();
        purchase.setCustomerName(request.getCustomerName());
        purchase.setPhone(request.getPhone());
        purchase.setEmail(request.getEmail());
        purchase.setRazorpayOrderId(request.getRazorpayOrderId());
        purchase.setRazorpayPaymentId(request.getRazorpayPaymentId());
        purchase.setMembershipPlan(membershipPlanName);
        purchase.setAmountInPaise(membershipAmountInPaise);
        purchase.setStatus("PAID");

        return membershipPurchaseRepository.save(purchase);
    }

    private void validateConfiguration() {
        if (razorpayKeyId == null || razorpayKeyId.isBlank() || razorpayKeySecret == null || razorpayKeySecret.isBlank()) {
            throw new IllegalStateException("Razorpay keys are not configured.");
        }
    }

    private String hmacSha256(String data, String secret) {
        try {
            Mac sha256Hmac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            sha256Hmac.init(secretKey);
            byte[] hash = sha256Hmac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hash);
        } catch (Exception ex) {
            throw new IllegalStateException("Unable to verify payment signature.", ex);
        }
    }
}
