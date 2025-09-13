import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { eq } from "drizzle-orm";
import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { Button } from "@/components/ui/button";
import { db } from "@/config/db";
import { VideoData } from "@/config/schema";

const PlayerDialog = ({ playVideo, videoId }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoData, setVideoData] = useState();
  const [durationInFrames, setDurationInFrames] = useState(240);

  useEffect(() => {
    setOpenDialog(playVideo);
    videoId && getVideoData(videoId);
  }, [playVideo, videoId]);

  const getVideoData = async (id) => {
    const result = await db
      .select()
      .from(VideoData)
      .where(eq(VideoData.id, id));

    if (result.length > 0) {
      console.log("Video Data:", result[0]);
      setVideoData(result[0]);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="bg-white flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold my-5 text-center">
            Your video is ready
          </DialogTitle>
          <DialogDescription asChild>
            <div>
              {videoData ? (
                <Player
                  component={RemotionVideo}
                  durationInFrames={Number(durationInFrames.toFixed(0))}
                  compositionWidth={400}
                  compositionHeight={550}
                  fps={60}
                  controls
                  inputProps={{
                    ...videoData,
                    setDurationInFrames: (value) => setDurationInFrames(value),
                  }}
                />
              ) : (
                <p className="text-gray-500">Loading video...</p>
              )}
              <div className="mt-6 flex items-center gap-10 justify-center w-full px-4">
                <Button
                  className="cursor-pointer"
                  variant="ghost"
                  onClick={() => setOpenDialog(false)}
                >
                  Cancel
                </Button>
                <Button className="cursor-pointer">Export</Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerDialog;
