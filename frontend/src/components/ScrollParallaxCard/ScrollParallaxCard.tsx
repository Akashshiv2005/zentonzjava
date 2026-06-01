import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Star } from "lucide-react";
import "./ScrollParallax.css";

interface ParallaxItemProps {
  title: string;
  description: string;
  image: string;
  price: string;
  index: number;
  backgroundPosition?: string;
  benefits?: string[];
  color?: string;
  onImageClick?: () => void;
}

export const ScrollParallaxCard: React.FC<ParallaxItemProps> = ({
  title,
  description,
  image,
  price,
  index,
  backgroundPosition,
  benefits,
  color,
  onImageClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [randomParams] = React.useState(() => ({
    rz: parseFloat((Math.random() - 0.5).toFixed(2)),
    rotationAmount: Math.floor(Math.random() * (25 - 15 + 1) + 15),
  }));

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 25,
    restDelta: 0.001,
  });

  const imageTranslateY = useTransform(smoothProgress, [0, 1], [-20, 20]);
  const cardRotation = useTransform(
    smoothProgress,
    [0, 1],
    [randomParams.rotationAmount, -randomParams.rotationAmount],
  );

  const benefitsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", transformStyle: "preserve-3d" }}
      className={`relative parallax-content__item parallax-content__item--expand ${
        index % 2 === 1 ? "even" : "odd"
      }`}
    >
      <motion.div
        className="parallax-content__item-imgwrap group cursor-zoom-in"
        style={{
          rotateX: 0,
          rotateY: cardRotation,
          rotateZ: randomParams.rz,
          transformStyle: "preserve-3d",
        }}
        onClick={onImageClick}
      >
        <motion.div
          className="parallax-content__item-img"
          style={{
            backgroundImage: `url(${image})`,
            y: imageTranslateY,
            backgroundPosition: backgroundPosition || "center",
          }}
        />
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md border border-white/15 px-3 py-2 rounded-full flex items-center gap-2 shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">
            <div className="bg-primary/20 p-1.5 rounded-full border border-primary/30">
              <Star className="text-primary fill-primary" size={12} />
            </div>
            <span className="text-white text-[9px] font-black uppercase tracking-[0.15em] pr-1">Click to View</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="parallax-content__item-description"
        style={
          {
            translateZ: "100px",
            "--item-color": color || "#D97706",
          } as React.CSSProperties
        }
      >
        <motion.h2
          className="parallax-content__item-title"
          initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {title}
        </motion.h2>
        <p className="description-text">{description}</p>
        {benefits && benefits.length > 0 && (
          <motion.ul
            className="benefits-list mt-4 space-y-2 mb-4"
            variants={benefitsVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {benefits.map((benefit, i) => (
              <motion.li
                key={i}
                variants={itemVariants}
                className="benefit-item flex items-center gap-2 group"
              >
                <div className="benefit-star-wrapper flex items-center justify-center transition-transform group-hover:scale-125">
                  <Star className="benefit-star-svg" size={12} />
                </div>
                <span className="benefit-text text-[10px] tb:text-xs font-bold uppercase tracking-widest transition-colors">
                  {benefit}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        )}

        <div className="parallax-price">Starting from {price}</div>
      </motion.div>
    </div>
  );
};
