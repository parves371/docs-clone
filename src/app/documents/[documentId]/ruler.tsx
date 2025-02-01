const markers = Array.from({ length: 83 }, (_, i) => i);
import { useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
export const Ruler = () => {
  const [leftMargine, setLeftMargine] = useState(56);
  const [rightMargine, setRightMargine] = useState(56);

  const [isdragingLeft, setIsdragingLeft] = useState(false);
  const [isdragingRight, setIsdragingRight] = useState(false);
  const rulerRef = useRef<HTMLDivElement>(null);

  const handleLeftMouseDown = () => {
    setIsdragingLeft(true);
  };
  const handleRightMouseDown = () => {
    setIsdragingRight(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const PAGE_WIDTH = 816;
    const MININUM_SPACE = 100;

    if ((isdragingLeft || isdragingRight) && rulerRef.current) {
      const container = rulerRef.current.querySelector("#rular_container");
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const relativeX = e.clientX - containerRect.left;
        const rawPosition = Math.max(0, Math.min(PAGE_WIDTH, relativeX));

        if (isdragingLeft) {
          const maxLeftPosition = PAGE_WIDTH - rightMargine - MININUM_SPACE;
          const newLeftPosition = Math.min(rawPosition, maxLeftPosition);
          setLeftMargine(newLeftPosition);
        } else if (isdragingRight) {
          const maxRightPosition = PAGE_WIDTH - leftMargine - MININUM_SPACE; // Corrected calculation
          const newRightPosition = PAGE_WIDTH - rawPosition;
          const constrainedRightPosition = Math.min(
            Math.max(newRightPosition, 0), // Ensure it's not negative
            maxRightPosition
          );
          setRightMargine(constrainedRightPosition);
        }
      }
    }
  };

  const handleMouseUp = () => {
    setIsdragingLeft(false);
    setIsdragingRight(false);
  };

  const handleLeftDubbleClick = () => {
    setLeftMargine(56);
  };
  const handleRightDubbleClick = () => {
    setRightMargine(56);
  };

  return (
    <div
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="w-[816px] mx-auto h-6 border-b border-gray-300 flex items-end relative select-none print:hidden"
    >
      <div id="rular_container" className="w-full h-full relative">
        <Marker
          position={leftMargine}
          isleft={true}
          isDragging={isdragingLeft}
          onMouseDown={handleLeftMouseDown}
          onDubbleClick={handleLeftDubbleClick}
        />
        <Marker
          position={rightMargine}
          isleft={false}
          isDragging={isdragingRight}
          onMouseDown={handleRightMouseDown}
          onDubbleClick={handleRightDubbleClick}
        />
        <div className="absolute inset-x-0 bottom-0 h-full">
          <div className="relative h-full w-[816px]">
            {markers.map((marker, i) => {
              const position = (marker * 816) / 82;

              return (
                <div
                  id={marker.toString()}
                  className="absolute bottom-0"
                  style={{ left: `${position}px` }}
                  key={i}
                >
                  {marker % 10 === 0 && (
                    <>
                      <div className="absolute bottom-0 w-[1px] h-2 bg-neutral-500" />
                      <span className="absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2">
                        {marker / 10 + 1}
                      </span>
                    </>
                  )}

                  {marker % 5 === 0 && marker % 10 !== 0 && (
                    <div className="absolute bottom-0 w-[1px] h-1.5 bg-neutral-500" />
                  )}
                  {marker % 5 !== 0 && (
                    <div className="absolute bottom-0 w-[1px] h-1 bg-neutral-300" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

interface MarkerProps {
  position: number;
  isleft: boolean;
  isDragging: boolean;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  onDubbleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Marker = ({
  position,
  isleft,
  isDragging,
  onMouseDown,
  onDubbleClick,
}: MarkerProps) => {
  return (
    <div
      className="absolute top-0 w-4 h-full cursor-ew-resize z-[5] group -ml-2"
      style={{ [isleft ? "left" : "right"]: `${position}px` }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDubbleClick}
    >
      <FaCaretDown className="absolute left-1/2 top-0 h-full fill-blue-500 transform -translate-x-1/2" />
      <div
        className="absolute left-1/2 top-4 transform -translate-x-1/2 "
        style={{
          height: "100vh",
          width: "1px",
          transform: "scaleX(0.5)",
          backgroundColor: "#3b72f6",
          display: isDragging ? "block" : "none",
        }}
      />
    </div>
  );
};
