import React, { useEffect, useRef, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import './main.css';

// Importing Material UI Icons
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import CallEndIcon from '@mui/icons-material/CallEnd';
import VideoCallIcon from '@mui/icons-material/VideoCall';

const APP_ID = "429f5e4cbd2a4207bffa97ba5b492319";
const TOKEN = "007eJxTYLC9pt7v+Jbx5vaSP9nuX063xyprRkz7XrXVeUv6zhcpMx8qMJgYWaaZppokJ6UYJZoYGZgnpaUlWponJZommVgaGRtamppdTmsIZGSovLiXlZEBAkF8Vobk/JzEJAYGAA8eIho=";
const CHANNEL = "colab";

const VideoStream = () => {
  const [isJoined, setIsJoined] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);

  const clientRef = useRef(null);
  const localTracksRef = useRef([]);
  const remoteUsersRef = useRef({});

  useEffect(() => {
    clientRef.current = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

    clientRef.current.on('user-published', handleUserJoined);
    clientRef.current.on('user-left', handleUserLeft);

    return () => {
      clientRef.current.leave();
    };
  }, []);

  const joinStream = async () => {
    try {
      const UID = await clientRef.current.join(APP_ID, CHANNEL, TOKEN, null);
      localTracksRef.current = await AgoraRTC.createMicrophoneAndCameraTracks();

      const [audioTrack, videoTrack] = localTracksRef.current;
      const player = `<div class="video-container" id="user-container-${UID}">
                        <div class="video-player" id="user-${UID}"></div>
                      </div>`;
      document.getElementById('video-streams').insertAdjacentHTML('beforeend', player);

      videoTrack.play(`user-${UID}`);
      await clientRef.current.publish(localTracksRef.current);

      setIsJoined(true);
    } catch (error) {
      console.error('Error joining stream:', error);
    }
  };

  const handleUserJoined = async (user, mediaType) => {
    remoteUsersRef.current[user.uid] = user;
    await clientRef.current.subscribe(user, mediaType);

    if (mediaType === 'video') {
      let player = document.getElementById(`user-container-${user.uid}`);
      if (player != null) {
        player.remove();
      }

      player = `<div class="video-container" id="user-container-${user.uid}">
                  <div class="video-player" id="user-${user.uid}"></div>
                </div>`;
      document.getElementById('video-streams').insertAdjacentHTML('beforeend', player);

      user.videoTrack.play(`user-${user.uid}`);
    }

    if (mediaType === 'audio') {
      user.audioTrack.play();
    }
  };

  const handleUserLeft = (user) => {
    delete remoteUsersRef.current[user.uid];
    document.getElementById(`user-container-${user.uid}`).remove();
  };

  const leaveStream = async () => {
    for (let track of localTracksRef.current) {
      track.stop();
      track.close();
    }
    await clientRef.current.leave();
    setIsJoined(false);
    document.getElementById('video-streams').innerHTML = '';
  };

  const toggleMic = async () => {
    const audioTrack = localTracksRef.current[0];
    if (audioTrack.muted) {
      await audioTrack.setMuted(false);
      setIsMicOn(true);
    } else {
      await audioTrack.setMuted(true);
      setIsMicOn(false);
    }
  };

  const toggleCamera = async () => {
    const videoTrack = localTracksRef.current[1];
    if (videoTrack.muted) {
      await videoTrack.setMuted(false);
      setIsCameraOn(true);
    } else {
      await videoTrack.setMuted(true);
      setIsCameraOn(false);
    }
  };

  return (
    <div>
      <button id="join-btn" onClick={joinStream} disabled={isJoined} className="px-3 py-2 bg-purple-500 rounded-md hover:bg-purple-700 text-white mx-5">
        <VideoCallIcon  fontSize="large" />
        <p className='text-sm mt-2 font-medium'>Join Stream</p>
      </button>
      <div id="stream-wrapper">
        <div id="video-streams"></div>
        {isJoined && (
          <div id="stream-controls" className="flex justify-center">
            <div className='flex justify-center'>
              <button
                id="leave-btn"
                className="px-3 py-2 bg-red-500 rounded-md hover:bg-red-600 text-white mx-5"
                onClick={leaveStream}
              >
                <CallEndIcon />
              </button>
              <button
                id="mic-btn"
                className={`px-3 py-2 rounded-md mx-5 ${isMicOn ? 'bg-gray-900 text-white' : 'bg-red-400'} hover:bg-red-600 hover:text-black`}
                onClick={toggleMic}
              >
                {isMicOn ? <MicIcon /> : <MicOffIcon />}
              </button>
              <button
                id="camera-btn"
                className={`px-3 py-2 rounded-md mx-5 ${isCameraOn ? 'bg-gray-900 text-white': 'bg-red-400'} hover:bg-red-600 hover:text-black`}
                onClick={toggleCamera}
              >
                {isCameraOn ? <VideocamIcon /> : <VideocamOffIcon />}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoStream;
