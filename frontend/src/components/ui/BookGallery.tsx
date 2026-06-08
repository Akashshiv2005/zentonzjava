import React from "react";


import logoImg from "../../assets/zentonez-logo.png";

interface BookGalleryProps {
  onLoaded?: () => void;
}

const BookGallery: React.FC<BookGalleryProps> = ({ onLoaded }) => {
  const [pages, setPages] = React.useState<{front: string, back: string}[]>([
    { front: logoImg, back: logoImg },
  ]);

  React.useEffect(() => {
    fetch('http://localhost:8081/api/gallery')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const magazineData = data.filter((img: any) => img.is_magazine);
          const apiImages = magazineData.map((img: any) => `http://localhost:8081/api/gallery/images/${img.file_name}`);
          
          // Always wrap the magazine pages with the logo as the front cover and back cover
          const fullImages = [logoImg, ...apiImages];
          // Ensure we have an even number of pages so the back cover is actually on the back of the last page
          if (fullImages.length % 2 !== 0) {
            fullImages.push(logoImg);
          } else {
            // If it's already even, we add a blank/logo spread to cap it off
            fullImages.push(logoImg, logoImg);
          }
          
          const dynamicPages = [];
          for (let i = 0; i < fullImages.length; i += 2) {
            dynamicPages.push({
              front: fullImages[i],
              back: fullImages[i + 1] || logoImg
            });
          }
          
          if (dynamicPages.length > 0) {
            setPages(dynamicPages);
          }
        }
      })
      .catch(err => console.error("Error fetching gallery", err))
      .finally(() => {
        // Wait a tick for React to render the new pages before notifying parent
        setTimeout(() => {
          if (onLoaded) onLoaded();
        }, 100);
      });
  }, [onLoaded]);

  return (
    <div className="book-gallery-container w-full h-full relative flex items-center justify-center overflow-hidden">
      <style>{`
        .scene {
          width: 100%;
          height: 100%;
          perspective: 1200px;
          transform-style: preserve-3d;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }


        .galeria-book-3d {
          position: relative;
          width: 200px;
          height: 300px;
          perspective: 1200px;
          transform-style: preserve-3d;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10;
          /* Removed spine-shift variable, GSAP will use x */
        }

        .book-page {
          position: absolute;
          width: 200px;
          height: 300px;
          perspective: 1200px;
          transform-style: preserve-3d;
          display: flex;
          justify-content: center;
          align-items: center;
          transform-origin: left center;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
          /* No transition here, let GSAP control it */
        }

        .book-page img {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background: #fdfcfb;
          backface-visibility: hidden;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .book-page img:nth-child(2) {
          transform: rotateY(180deg) translateZ(1px);
          z-index: 1;
        }

        .book-page img.is-logo {
          object-fit: contain !important;
          padding: 15% !important;
          background: #fff;
        }


        /* Responsive Breakpoints */
        @media (max-width: 640px) {
          .galeria-book-3d, .book-page {
            width: 140px !important;
            height: 210px !important;
          }
        }

        @media (min-width: 641px) and (max-width: 1023px) {
          .galeria-book-3d, .book-page {
            width: 280px !important;
            height: 420px !important;
          }
        }

        @media (min-width: 1024px) {
          .galeria-book-3d, .book-page {
            width: 340px !important;
            height: 480px !important;
          }
        }
      `}</style>

      <div className="scene w-full h-full flex items-center justify-center">
        <div className="galeria-book-3d">
          {pages.map((page, index) => (
            <div
              key={index}
              className="book-page"
              data-index={index}
              style={
                {
                  "--i": index,
                  zIndex: 10 - index,
                } as React.CSSProperties
              }
            >
              <img 
                src={page.front} 
                alt={`Front ${index + 1}`} 
                className={page.front === logoImg ? "is-logo" : "object-cover"} 
              />
              <img 
                src={page.back} 
                alt={`Back ${index + 1}`} 
                className={page.back === logoImg ? "is-logo" : "object-cover"} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookGallery;
