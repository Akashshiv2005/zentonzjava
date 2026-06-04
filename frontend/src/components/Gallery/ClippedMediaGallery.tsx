import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import InteractiveBentoGallery from '../ui/interactive-bento-gallery';
import type { MediaItemType } from '../ui/interactive-bento-gallery';

// Import fallback assets
import bridal1 from "../../assets/bridalwebpimages/bridal1.webp";
import facial1 from "../../assets/facialwebpimages/facial1.webp";
import facial2 from "../../assets/facialwebpimages/facial2.webp";
import hairspa1 from "../../assets/hairspawebpimages/hairspa1.webp";
import hairspa2 from "../../assets/hairspawebpimages/hairspa2.webp";
import manicure1 from "../../assets/pedicurewebpimages/manicure1.webp";
import nail1 from "../../assets/nailwebpimages/nail.jpeg";
import nail2 from "../../assets/nailwebpimages/nail2.webp";
import butterfly from "../../assets/hairwebp images/butterfly cut.webp";

const fallbackMediaItems: MediaItemType[] = [
  { id: 1, type: "image", title: "Eternal Bridal", desc: "A timeless masterpiece", url: bridal1, span: "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2", objectPosition: "center 15%" },
  { id: 2, type: "image", title: "Skin Alchemy", desc: "Transformative rituals", url: facial1, span: "md:col-span-1 md:row-span-1 sm:col-span-1 sm:row-span-1", objectPosition: "center 20%" },
  { id: 3, type: "image", title: "Facial Rituals", desc: "Rejuvenating therapies", url: facial2, span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2", objectPosition: "center 25%" },
  { id: 4, type: "image", title: "Luxe Hair Care", desc: "Premium treatments", url: hairspa1, span: "md:col-span-1 md:row-span-1 sm:col-span-1 sm:row-span-1", objectPosition: "center 20%" },
  { id: 5, type: "image", title: "Scalp Therapy", desc: "Holistic care", url: hairspa2, span: "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-1", objectPosition: "center 25%" },
  { id: 6, type: "image", title: "Artistic Hands", desc: "Bespoke nail artistry", url: manicure1, span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2", objectPosition: "center" },
  { id: 7, type: "image", title: "Couture Nails", desc: "Precision and detail", url: nail1, span: "md:col-span-2 md:row-span-1 sm:col-span-2 sm:row-span-1", objectPosition: "center" },
  { id: 8, type: "image", title: "Precision Detail", desc: "Fine art of beauty", url: nail2, span: "md:col-span-1 md:row-span-1 sm:col-span-1 sm:row-span-1", objectPosition: "center" },
  { id: 9, type: "image", title: "Signature Cut", desc: "Avant-garde design", url: butterfly, span: "md:col-span-1 md:row-span-1 sm:col-span-1 sm:row-span-1", objectPosition: "center 35%" },
];

const predefinedSpans = fallbackMediaItems.map(m => m.span);

const ClippedMediaGallery: React.FC = () => {
  const [items, setItems] = useState<MediaItemType[]>(fallbackMediaItems);

  useEffect(() => {
    fetch('http://localhost:8081/api/gallery')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const dynamicItems: MediaItemType[] = data.map((img: any, index: number) => ({
            id: 100 + img.id,
            type: "image",
            title: img.category.toUpperCase(),
            desc: "Uploaded via Admin",
            url: `http://localhost:8081/api/gallery/images/${img.fileName}`,
            span: predefinedSpans[index % predefinedSpans.length],
            objectPosition: "center"
          }));
          
          // Prepend dynamic items, keep some fallbacks if we need more to fill the grid nicely
          setItems([...dynamicItems, ...fallbackMediaItems].slice(0, 9)); 
        }
      })
      .catch(err => console.error("Error fetching gallery", err));
  }, []);

  return (
    <section
      id="gallery-section"
      className="py-10 sm:py-16 bg-surface-dim overflow-hidden relative z-10"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <InteractiveBentoGallery
          mediaItems={items}
          title="Curated Masterpieces"
          description="Drag and explore our visual symphony of finest transformations, capturing the essence of artisanal beauty."
        />
      </div>

      {/* Subtle Background Parallax Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 0.05, x: 0 }}
          className="absolute top-20 -left-20 w-96 h-96 bg-[#B87333]/15 blur-[96px] rounded-full"
        />
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 0.05, x: 0 }}
          className="absolute bottom-20 -right-20 w-96 h-96 bg-[#B87333]/15 blur-[96px] rounded-full"
        />
      </div>
    </section>
  );
};

export default ClippedMediaGallery;

