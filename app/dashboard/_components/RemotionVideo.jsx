import React, { useEffect } from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
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

    // convert frame to ms using fps
    const currentTime = (frame / fps) * 1000;

    const currentCaption = captions.find((caption) => {
      const start = caption.start; // already in ms
      const end = caption.end; // already in ms
      return currentTime >= start && currentTime <= end;
    });

    return currentCaption ? currentCaption.text : ""; // safe return
  };

  // Calculate duration safely after render
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
      {imageURLs.map((url, index) => (
        <Sequence
          key={index}
          from={(index * getDurationFrames()) / imageURLs?.length}
          durationInFrames={getDurationFrames()}
        >
          <Img
            src={url}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* Caption */}
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
              fontSize: "20px",
              maxWidth: "80%",
              textAlign: "center",
              whiteSpace: "pre-wrap",
            }}
          >
            {getCurrentCaption()}
          </div>
        </Sequence>
      ))}
      <Audio src={audioURL} />
    </AbsoluteFill>
  );
};

export default RemotionVideo;
