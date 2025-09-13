import React, { useEffect } from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const RemotionVideo = ({
  videoScript,
  audioURL,
  captions,
  imageURLs,
  setDurationInFrames,
}) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const getDurationFrames = () => {
    if (!captions?.length) return 240; // fallback default
    return (captions[captions.length - 1]?.end / 1000) * fps;
  };

  const getCurrentCaption = () => {
    if (!captions?.length) return ""; // fallback
    const currentTime = (frame / fps) * 1000; // convert to ms
    const currentCaption = captions.find(
      (caption) => currentTime >= caption.start && currentTime <= caption.end
    );
    return currentCaption ? currentCaption.text : "";
  };

  // Set video duration dynamically
  useEffect(() => {
    if (captions?.length > 0) {
      const lastEnd = captions[captions.length - 1]?.end;
      if (lastEnd) {
        const duration = (lastEnd / 1000) * fps;
        setDurationInFrames(duration);
      }
    }
  }, [captions, fps, setDurationInFrames]);

  return (
    <AbsoluteFill className="bg-black w-full h-full">
      {imageURLs.map((url, index) => {
        const totalDuration = getDurationFrames();
        const imgDuration = totalDuration / imageURLs.length;
        const startTime = index * imgDuration;

        // Animations
        const localFrame = frame - startTime;

        const scale = interpolate(
          localFrame,
          [0, imgDuration],
          [1, 1.2], // zoom-in
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const translateX = interpolate(
          localFrame,
          [0, imgDuration],
          [0, -30], // slight pan left
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const opacity = interpolate(
          localFrame,
          [0, 20, imgDuration - 20, imgDuration],
          [0, 1, 1, 0], // fade in + fade out
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        // Caption fade in/out
        const captionOpacity = interpolate(
          localFrame,
          [0, 15, imgDuration - 15, imgDuration],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <Sequence key={index} from={startTime} durationInFrames={imgDuration}>
            {/* Background image with Ken Burns + crossfade */}
            <Img
              src={url}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: `scale(${scale}) translate(${translateX}px, 0px)`,
                opacity,
              }}
            />

            {/* Cinematic gradient overlay */}
            <AbsoluteFill
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.7), transparent 60%)",
              }}
            />

            {/* Captions */}
            <div
              style={{
                position: "absolute",
                bottom: "50px",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                color: "white",
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "22px",
                maxWidth: "80%",
                textAlign: "center",
                whiteSpace: "pre-wrap",
                opacity: captionOpacity,
              }}
            >
              {getCurrentCaption()}
            </div>
          </Sequence>
        );
      })}

      {/* Audio track */}
      <Audio src={audioURL} />
    </AbsoluteFill>
  );
};

export default RemotionVideo;
