package com.zentonez.repository;

import com.zentonez.model.TestimonialEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestimonialRepository extends JpaRepository<TestimonialEntity, Long> {
}
