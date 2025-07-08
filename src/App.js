import { useEffect, useRef, useState } from "react";
import "./styles.css";

export default function App() {
  const FRAME_HEIGHT = 419;
  const TOTAL_FRAMES = 8;
  const FRAME_DURATION = 200;
  const TILE_WIDTH = 721;
  const TILE_HEIGHT = 417;

  const sections = [
    {
      key: "apps",
      title: "CONTENT APPS",
      color: "bg-lime-400",
      text: "Content applications that enable custom workflows at scale, from creation to distribution.",
      tile: "https://www.sanity.io/_next/static/media/tile-top.b374f539.svg",
      sprite:
        "https://www.sanity.io/_next/static/media/sprites-top.2409642d.svg",
    },
    {
      key: "compute",
      title: "COMPUTE + AI",
      color: "bg-blue-500",
      text: "Intelligent computation power to supercharge your content logic and automation.",
      tile: "https://www.sanity.io/_next/static/media/tile-middle.1db02c17.svg",
      sprite:
        "https://www.sanity.io/_next/static/media/sprites-middle.8936a11d.svg",
    },
    {
      key: "lake",
      title: "CONTENT LAKE",
      color: "bg-orange-500",
      text: "The database optimized for content queries, authoring and delivery.",
      tile: "https://www.sanity.io/_next/static/media/tile-bottom.354a76f6.svg",
      sprite:
        "https://www.sanity.io/_next/static/media/sprites-bottom.8438e8bc.svg",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [frame, setFrame] = useState(0);
  const tileOffsets = ["0px", "130px", "250px"];
  const animationRef = useRef(null);

  const playFrameAnimation = () => {
    let current = 0;
    clearTimeout(animationRef.current);

    const step = () => {
      if (current < TOTAL_FRAMES - 1) {
        current++;
        setFrame(current);
        animationRef.current = setTimeout(step, FRAME_DURATION);
      }
    };

    setFrame(0);
    animationRef.current = setTimeout(step, FRAME_DURATION);
  };

  useEffect(() => {
    const tabInterval = setInterval(() => {
      const next = (prev) => (prev + 1) % sections.length;
      setActiveIndex((prev) => {
        const nextIndex = next(prev);
        playFrameAnimation(); // restart frame on change
        return nextIndex;
      });
    }, 5000);

    playFrameAnimation(); // initial run

    return () => {
      clearInterval(tabInterval);
      clearTimeout(animationRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between px-8 py-20">
        {/* Left Section */}
        <div className="w-full md:w-1/2 text-left mb-12 md:mb-0">
          <div className="text-xs tracking-widest text-gray-400 mb-2 uppercase ml-4">
            THE CONTENT OPERATING SYSTEM
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-10 ml-4">
            Powering all your content applications
            <br />
            from a single platform
          </h1>

          {sections.map((section, index) => (
            <div
              key={section.key}
              className="mb-6 max-w-md ml-4 group"
              onMouseEnter={() => {
                setActiveIndex(index);
                playFrameAnimation();
              }}
            >
              <div className="relative overflow-hidden">
                <span className="block px-4 py-2 text-xs font-mono tracking-wider relative z-10 text-white">
                  {section.title}
                </span>
                <span
                  className={`absolute inset-0 origin-left transition-transform duration-500 z-0 transform ${
                    activeIndex === index
                      ? `${section.color} scale-x-100`
                      : "scale-x-0"
                  }`}
                />
              </div>
              <div className="flex items-center">
                {activeIndex === index && (
                  <div className="w-[5px] h-[60px] bg-white relative overflow-hidden rounded ml-3">
                    <div
                      className="absolute top-0 left-0 w-full bg-gray-300"
                      style={{
                        height: "100%",
                        animation: "progressDown 5s linear infinite",
                      }}
                    ></div>
                  </div>
                )}
                <p
                  className={`transition-colors duration-300 px-4 py-3 bg-black text-sm flex-1 ${
                    activeIndex === index ? "text-white" : "text-black"
                  }`}
                >
                  {section.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex justify-center relative h-[600px]">
          {sections.map((section, index) => (
            <div
              key={section.key}
              className="absolute transition-opacity duration-700"
              style={{
                transform: `translateY(${tileOffsets[index]})`,
                width: TILE_WIDTH,
                height: TILE_HEIGHT,
                opacity: activeIndex === index ? 1 : 0.3,
                zIndex: 10,
              }}
            >
              {/* Tile image */}
              <img
                src={section.tile}
                alt={section.key}
                width={TILE_WIDTH}
                height={TILE_HEIGHT}
                className="absolute top-0 left-0 pointer-events-none"
              />

              {/* Sprite animation */}
              {activeIndex === index && (
                <div
                  className="absolute top-0 left-0 pointer-events-none overflow-hidden"
                  style={{
                    width: TILE_WIDTH,
                    height: TILE_HEIGHT,
                    transform: "scale(0.9) translateY(10px)",
                    zIndex: 20,
                  }}
                >
                  <div
                    className="w-full"
                    style={{
                      backgroundImage: `url(${section.sprite})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: `0px -${frame * FRAME_HEIGHT}px`,
                      backgroundSize: `100% auto`,
                      width: TILE_WIDTH,
                      height: FRAME_HEIGHT * TOTAL_FRAMES,
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
