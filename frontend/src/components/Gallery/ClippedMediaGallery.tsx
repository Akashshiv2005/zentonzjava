import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import InteractiveBentoGallery from '../ui/interactive-bento-gallery';
import type { MediaItemType } from '../ui/interactive-bento-gallery';



const predefinedSpans = [
  "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2",
  "md:col-span-1 md:row-span-1 sm:col-span-1 sm:row-span-1",
  "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2",
  "md:col-span-1 md:row-span-1 sm:col-span-1 sm:row-span-1",
  "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-1",
  "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2",
  "md:col-span-2 md:row-span-1 sm:col-span-2 sm:row-span-1",
  "md:col-span-1 md:row-span-1 sm:col-span-1 sm:row-span-1",
  "md:col-span-1 md:row-span-1 sm:col-span-1 sm:row-span-1",
];



const ClippedMediaGallery: React.FC = () => {
  const [items, setItems] = useState<MediaItemType[]>([]);

  useEffect(() => {
    fetch('http://localhost:8081/api/gallery')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const galleryData = data.filter((img: any) => !img.is_magazine);
          const dynamicItems: MediaItemType[] = galleryData.map((img: any, index: number) => ({
            id: 100 + img.id,
            type: "image",
            title: img.title || "Gallery Image",
            desc: img.description || "Uploaded via Admin",
            url: `http://localhost:8081/api/gallery/images/${img.file_name}`,
            span: predefinedSpans[index % predefinedSpans.length],
            objectPosition: "center",
            objectFit: "contain"
          }));
          
          setItems(dynamicItems); 
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

