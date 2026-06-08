"use client"
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react';


// MediaItemType defines the structure of a media item
export type MediaItemType = {
    id: number;
    type: string;
    title: string;
    desc: string;
    url: string;
    span: string;
    objectPosition?: string;
    objectFit?: "cover" | "contain";
}
// MediaItem component renders either a video or image based on item.type
const MediaItem = ({ item, className, onClick }: { item: MediaItemType, className?: string, onClick?: () => void }) => {
    const videoRef = useRef<HTMLVideoElement>(null); // Reference for video element
    const [isInView, setIsInView] = useState(false); // To track if video is in the viewport
    const [isBuffering, setIsBuffering] = useState(true);  // To track if video is buffering

    // Intersection Observer to detect if video is in view and play/pause accordingly
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                setIsInView(entry.isIntersecting); // Set isInView to true if the video is in view
            });
        }, options);

        const currentVideoRef = videoRef.current;
        if (currentVideoRef) {
            observer.observe(currentVideoRef); // Start observing the video element
        }

        return () => {
            if (currentVideoRef) {
                observer.unobserve(currentVideoRef); // Clean up observer when component unmounts
            }
        };
    }, []);
    // Handle video play/pause based on whether the video is in view or not
    useEffect(() => {
        let mounted = true;

        const handleVideoPlay = async () => {
            if (!videoRef.current || !isInView || !mounted) return; // Don't play if video is not in view or component is unmounted

            try {
                if (videoRef.current.readyState >= 3) {
                    setIsBuffering(false);
                    await videoRef.current.play(); // Play the video if it's ready
                } else {
                    setIsBuffering(true);
                    await new Promise((resolve) => {
                        if (videoRef.current) {
                            videoRef.current.oncanplay = resolve; // Wait until the video can start playing
                        }
                    });
                    if (mounted) {
                        setIsBuffering(false);
                        await videoRef.current.play();
                    }
                }
            } catch (error) {
                console.warn("Video playback failed:", error);
            }
        };

        const currentVideoRef = videoRef.current;
        if (isInView) {
            handleVideoPlay();
        } else if (currentVideoRef) {
            currentVideoRef.pause();
        }

        return () => {
            mounted = false;
            if (currentVideoRef) {
                currentVideoRef.pause();
                currentVideoRef.removeAttribute('src');
                currentVideoRef.load();
            }
        };
    }, [isInView]);

    // Render either a video or image based on item.type

    if (item.type === 'video') {
        return (
            <div className={`${className} relative overflow-hidden`}>
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    onClick={onClick}
                    playsInline
                    muted
                    loop
                    preload="auto"
                    style={{
                        opacity: isBuffering ? 0.8 : 1,
                        transition: 'opacity 0.2s',
                        transform: 'translateZ(0)',
                        willChange: 'transform',
                    }}
                >
                    <source src={item.url} type="video/mp4" />
                </video>
                {isBuffering && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                )}
            </div>
        );
    }

    return (
        <img
            src={item.url} // Image source URL
            alt={item.title} // Alt text for the image
            className={`${className} cursor-pointer`} // Style the image
            style={{ 
                objectPosition: item.objectPosition || 'center top',
                objectFit: item.objectFit || 'cover' 
            }}
            onClick={onClick} // Trigger onClick when the image is clicked
            loading="lazy" // Lazy load the image for performance
            decoding="async" // Decode the image asynchronously
        />
    );
};



// GalleryModal component displays the selected media item in a modal
interface GalleryModalProps {
    selectedItem: MediaItemType;
    isOpen: boolean;
    onClose: () => void;
    setSelectedItem: (item: MediaItemType | null) => void;
    mediaItems: MediaItemType[]; // List of media items to display in the modal
}
const GalleryModal = ({ selectedItem, isOpen, onClose, setSelectedItem, mediaItems }: GalleryModalProps) => {
    const [dockPosition, setDockPosition] = useState({ x: 0, y: 0 });  // Track the position of the dockable panel

    if (!isOpen) return null; // Return null if the modal is not open

    return (
        <>
            {/* Main Modal */}
            <motion.div
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.98, opacity: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30
                }}
                className="fixed inset-0 w-full h-full backdrop-blur-lg bg-black/60 z-999 overflow-hidden flex items-center justify-center cursor-zoom-out"
                onClick={onClose}
            >
                {/* Main Content */}
                <div className="h-full w-full flex flex-col items-center justify-center cursor-default" onClick={(e) => e.stopPropagation()}>
                    <div className="relative w-full aspect-video max-w-[95%] sm:max-w-[85%] md:max-w-4xl 
                                     h-auto max-h-[80vh] rounded-2xl overflow-hidden shadow-2xl bg-gray-900/40">
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={selectedItem.id}
                                className="w-full h-full cursor-grab active:cursor-grabbing"
                                initial={{ x: 300, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -300, opacity: 0 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30
                                }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragEnd={(_, info) => {
                                    const swipeThreshold = 50;
                                    const verticalThreshold = 100;
                                    const currentIndex = mediaItems.findIndex(item => item.id === selectedItem.id);

                                    // Handle horizontal swipe for navigation
                                    if (Math.abs(info.offset.x) > Math.abs(info.offset.y)) {
                                        if (info.offset.x < -swipeThreshold) {
                                            const nextIndex = (currentIndex + 1) % mediaItems.length;
                                            setSelectedItem(mediaItems[nextIndex]);
                                        } else if (info.offset.x > swipeThreshold) {
                                            const prevIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
                                            setSelectedItem(mediaItems[prevIndex]);
                                        }
                                    }
                                    // Handle vertical swipe for closing
                                    else if (info.offset.y > verticalThreshold) {
                                        onClose();
                                    }
                                }}
                            >
                                <MediaItem item={selectedItem} className="w-full h-full object-contain pointer-events-none" />
                                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 
                                               bg-linear-to-t from-black/80 via-black/40 to-transparent pointer-events-none">
                                    <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold font-serif">
                                        {selectedItem.title}
                                    </h3>
                                    <p className="text-white/80 text-sm sm:text-base mt-2 font-medium">
                                        {selectedItem.desc}
                                    </p>

                                    {/* Mobile Swipe Hint */}
                                    <div className="flex justify-center mt-4 opacity-40 tb:hidden">
                                        <div className="w-8 h-1 bg-white rounded-full animate-pulse" />
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Close Button */}
                <motion.button
                    className="fixed top-24 right-8 tb:top-32 tb:right-32 p-3 tb:p-4 rounded-full bg-black/40 text-white hover:bg-black/60 
                              backdrop-blur-xl transition-colors z-1001 shadow-2xl border border-white/10"
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <X className='w-6 h-6 tb:w-8 tb:h-8' />
                </motion.button>

            </motion.div>

            {/* Draggable Dock */}
            <motion.div
                drag
                dragMomentum={false}
                dragElastic={0.1}
                initial={{ y: 100, x: "-50%", opacity: 0 }}
                animate={{ x: `calc(-50% + ${dockPosition.x}px)`, y: dockPosition.y, opacity: 1 }}
                onDragEnd={(_, info) => {
                    setDockPosition(prev => ({
                        x: prev.x + info.offset.x,
                        y: prev.y + info.offset.y
                    }));
                }}
                className="fixed z-1000 left-1/2 bottom-8 touch-none"
            >
                <motion.div
                    className="relative rounded-2xl bg-white/10 backdrop-blur-2xl 
                             border border-white/20 shadow-2xl
                             cursor-grab active:cursor-grabbing p-2"
                >
                    <div className="flex items-center -space-x-3 px-2 py-1">
                        {mediaItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedItem(item);
                                }}
                                style={{
                                    zIndex: selectedItem.id === item.id ? 30 : mediaItems.length - index,
                                }}
                                className={`
                                    relative group
                                    w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 shrink-0 
                                    rounded-xl overflow-hidden 
                                    cursor-pointer hover:z-20
                                    ${selectedItem.id === item.id
                                        ? 'ring-4 ring-[#B87333] shadow-2xl scale-110'
                                        : 'hover:ring-2 hover:ring-white/50'}
                                `}
                                initial={{ rotate: index % 2 === 0 ? -10 : 10 }}
                                animate={{
                                    scale: selectedItem.id === item.id ? 1.2 : 1,
                                    rotate: selectedItem.id === item.id ? 0 : index % 2 === 0 ? -10 : 10,
                                    y: selectedItem.id === item.id ? -12 : 0,
                                }}
                                whileHover={{
                                    scale: 1.3,
                                    rotate: 0,
                                    y: -15,
                                    transition: { type: "spring", stiffness: 400, damping: 25 }
                                }}
                            >
                                <MediaItem item={item} className="w-full h-full" onClick={() => setSelectedItem(item)} />
                                <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/5 to-white/20" />
                                {selectedItem.id === item.id && (
                                    <motion.div
                                        layoutId="activeGlow"
                                        className="absolute -inset-4 bg-[#B87333]/30 blur-2xl"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
};



interface InteractiveBentoGalleryProps {
    mediaItems: MediaItemType[]
    title: string
    description: string

}

const InteractiveBentoGallery: React.FC<InteractiveBentoGalleryProps> = ({ mediaItems, title, description }) => {
    const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null);
    const [items, setItems] = useState(mediaItems);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        setItems(mediaItems);
    }, [mediaItems]);

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="mb-12 text-center">
                <motion.h1
                    className="text-4xl sm:text-5xl md:text-6xl font-black font-serif uppercase italic leading-none
                             bg-clip-text text-transparent 
                             bg-linear-to-r from-on-surface via-[#B87333] to-on-surface"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {title}
                </motion.h1>
                <motion.p
                    className="mt-6 text-base sm:text-lg text-on-surface/60 font-medium max-w-2xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {description}
                </motion.p>
                <div className="h-1 w-24 bg-[#B87333]/30 mx-auto mt-8 rounded-full" />
            </div>

            <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2 auto-rows-[120px] sm:auto-rows-[160px] md:auto-rows-[180px] grid-flow-dense"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.1 }
                    }
                }}
            >
                {items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        layoutId={`media-${item.id}`}
                        className={`relative overflow-hidden rounded-3xl cursor-pointer shadow-luxury group ${item.span}`}
                        onClick={() => !isDragging && setSelectedItem(item)}
                        variants={{
                            hidden: { y: 50, scale: 0.9, opacity: 0 },
                            visible: {
                                y: 0,
                                scale: 1,
                                opacity: 1,
                                transition: {
                                    type: "spring",
                                    stiffness: 350,
                                    damping: 25,
                                    delay: index * 0.05
                                }
                            }
                        }}
                        whileHover={{ scale: 1.02, y: -5 }}
                        drag
                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                        dragElastic={1}
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={(_e, info) => {
                            setIsDragging(false);
                            const moveDistance = info.offset.x + info.offset.y;
                            if (Math.abs(moveDistance) > 100) {
                                const newItems = [...items];
                                const draggedItem = newItems[index];
                                const targetIndex = moveDistance > 0 ?
                                    Math.min(index + 1, items.length - 1) :
                                    Math.max(index - 1, 0);
                                newItems.splice(index, 1);
                                newItems.splice(targetIndex, 0, draggedItem);
                                setItems(newItems);
                            }
                        }}
                    >
                        <MediaItem
                            item={item}
                            className="absolute inset-0 w-full h-full transition-transform duration-1000 group-hover:scale-110"
                            onClick={() => !isDragging && setSelectedItem(item)}
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                            <h3 className="text-white text-lg sm:text-xl font-serif font-bold italic leading-none mb-1">
                                {item.title}
                            </h3>
                            <p className="text-white/70 text-[10px] sm:text-xs font-black uppercase tracking-widest">
                                {item.desc}
                            </p>
                        </div>

                        {/* Interactive Drag Hint */}
                        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <AnimatePresence>
                {selectedItem && (
                    <GalleryModal
                        selectedItem={selectedItem}
                        isOpen={true}
                        onClose={() => setSelectedItem(null)}
                        setSelectedItem={setSelectedItem}
                        mediaItems={items}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};


export default InteractiveBentoGallery
