'use client';

import Hls from 'hls.js';
import { useEffect, useRef } from 'react';

interface VideoPlayerProps {
	src: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (Hls.isSupported() && videoRef.current) {
			const hls = new Hls();
			hls.loadSource(src);
			hls.attachMedia(videoRef.current);
		} else if (videoRef.current?.canPlayType('application/vnd.apple.mpegurl')) {
			// Для Safari
			videoRef.current.src = src;
		}
	}, [src]);

	return <video ref={videoRef} controls style={{ width: '20%' }} />;
};

export default VideoPlayer;
