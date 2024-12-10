"use client";

import YouTube, { YouTubeProps } from "react-youtube";

interface IVidioPlayer {
  youtubeId: string;
  heightVideo: number;
}

const VideoPlayer = ({ youtubeId, heightVideo }: IVidioPlayer) => {
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    width: "100%",
    height: `${heightVideo}`,
  };
  return (
    <>
      <YouTube videoId={youtubeId} opts={opts} onReady={onPlayerReady} />
    </>
  );
};

export default VideoPlayer;
