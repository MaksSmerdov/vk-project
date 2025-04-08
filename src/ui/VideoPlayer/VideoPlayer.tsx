import React, { useRef, useState } from 'react';
import { FiPause, FiX } from 'react-icons/fi';
import styles from './VideoPlayer.module.scss';

interface VideoModalProps {
  onClose: () => void;
  videoTitle: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ onClose, videoTitle }) => {
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => setIsPaused(false);
  const handlePause = () => setIsPaused(true);

  return (
    <div className={`${styles['video-modal__overlay']}`} onClick={onClose}>
      <div className={`${styles['video-modal']}`} onClick={(e) => e.stopPropagation()}>
        <button className={`${styles['video-modal__close']}`} onClick={onClose}>
          <FiX />
        </button>

        <div className={`${styles['video-modal__container']}`}>
          <video
            ref={videoRef}
            className={`${styles['video-modal__player']}`}
            src="/video/test.mp4"
            controls
            autoPlay
            onPlay={handlePlay}
            onPause={handlePause}
          />

          {isPaused && (
            <div className={`${styles['video-modal__pause-overlay']}`}>
              <FiPause size={64} />
            </div>
          )}

          {isPaused && (
            <div className={`${styles['video-modal__title-overlay']}`}>{videoTitle}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
