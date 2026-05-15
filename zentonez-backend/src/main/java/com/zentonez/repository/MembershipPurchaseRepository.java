package com.zentonez.repository;

import com.zentonez.model.MembershipPurchase;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MembershipPurchaseRepository extends JpaRepository<MembershipPurchase, Long> {
}
