"use client"

import { Pause, Play, RedoDot, UndoDot, Loader, LoaderCircle, AudioLines } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

type AudioPlayerProps = {
  src: string;
  metadata: {
    title: string;
    artist: string;
  };
};

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, metadata }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      console.log(audio.duration);
      console.log('audio true')
      const updateCurrentTime = () => setCurrentTime(audio.currentTime);
      audio.addEventListener('timeupdate', updateCurrentTime);
      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration);
        setIsLoading(false);

        const setupMediaSession = () => {
          if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
              title: metadata.title,
              artist: metadata.artist,
              artwork: [
                { src: "https://casey-mershon-blog.nyc3.cdn.digitaloceanspaces.com/images/96x96.png", sizes: '96x96', type: 'image/jpeg' },
                { src: "https://casey-mershon-blog.nyc3.cdn.digitaloceanspaces.com/images/128x128.png", sizes: '128x128', type: 'image/jpeg' },
                { src: "https://casey-mershon-blog.nyc3.cdn.digitaloceanspaces.com/images/192x192.png", sizes: '192x192', type: 'image/jpeg' },
                { src: "https://casey-mershon-blog.nyc3.cdn.digitaloceanspaces.com/images/256x256.png", sizes: '256x256', type: 'image/jpeg' },
                { src: "https://casey-mershon-blog.nyc3.cdn.digitaloceanspaces.com/images/384x384.png", sizes: '384x384', type: 'image/jpeg' },
                { src: "https://casey-mershon-blog.nyc3.cdn.digitaloceanspaces.com/images/512x512.png", sizes: '512x512', type: 'image/jpeg' },
              ]
            });
      
            navigator.mediaSession.setActionHandler('play', () => {
              audioRef.current?.play();
              setIsPlaying(true);
            });
            navigator.mediaSession.setActionHandler('pause', () => {
              audioRef.current?.pause();
              setIsPlaying(false);
            });
            navigator.mediaSession.setActionHandler('seekbackward', () => skipBackward());
            navigator.mediaSession.setActionHandler('seekforward', () => skipForward());
          }
        };

        setupMediaSession();
      });
      return () => {
        audio.removeEventListener('timeupdate', updateCurrentTime);
      };
    }
  }, [metadata]);


  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);

      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = isPlaying ? 'paused' : 'playing';
      }
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
    }
  };

  const handleProgressBarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(event.target.value);
      setCurrentTime(Number(event.target.value));
    }
  };

  const handlePlaybackRateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPlaybackRate = Number(event.target.value);
    setPlaybackRate(newPlaybackRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = newPlaybackRate;
    }
  };

  return (
    <div className="p-4 mb-8 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] rounded-lg shadow-md">
      <div className="flex items-center space-x-2">
        <div className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium sm:w-12">
          <AudioLines /> 
        </div>
        <p>Listen to this article:</p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={skipBackward}
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground rounded-full size-12"
        >
          <UndoDot />
        </button>
        <button
          onClick={togglePlayPause}
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground rounded-full size-12"
        >
          {isLoading ? (
            <LoaderCircle className="animate-spin" />
          ) : isPlaying ? (
            <Pause />
          ) : (
            <Play />
          )}
        </button>
        <button
          onClick={skipForward}
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground rounded-full size-12"
        >
          <RedoDot />
        </button>
        <span className="text-sm text-gray-900 dark:text-gray-100 hidden md:block">{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleProgressBarChange}
          className="flex-grow accent-gray-900 dark:accent-gray-100"
        />
        <span className="text-sm text-gray-900 dark:text-gray-100 hidden md:block">{formatTime(duration)}</span>
        <select
          value={playbackRate}
          onChange={handlePlaybackRateChange}
          className="p-1 bg-gray-200 dark:bg-accent text-gray-900 dark:text-gray-100 rounded"
        >
          <option value="0.5">0.5x</option>
          <option value="1">1x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </select>
      </div>

      <audio ref={audioRef} src={src} />
    </div>
  );
};

export default AudioPlayer;
