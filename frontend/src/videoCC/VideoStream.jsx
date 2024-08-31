import React, { useEffect, useRef, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import './main.css'
const APP_ID = "429f5e4cbd2a4207bffa97ba5b492319";
const TOKEN = "007eJxTYLC9pt7v+Jbx5vaSP9nuX063xyprRkz7XrXVeUv6zhcpMx8qMJgYWaaZppokJ6UYJZoYGZgnpaUlWponJZommVgaGRtamppdTmsIZGSovLiXlZEBAkF8Vobk/JzEJAYGAA8eIho=";
const CHANNEL = "colab";

const VideoStream = () => {
  const [isJoined, setIsJoined] = useState(false);
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
    } else {
      await audioTrack.setMuted(true);
    }
  };

  const toggleCamera = async () => {
    const videoTrack = localTracksRef.current[1];
    if (videoTrack.muted) {
      await videoTrack.setMuted(false);
    } else {
      await videoTrack.setMuted(true);
    }
  };

  return (
    <div>
      <button id="join-btn" onClick={joinStream} disabled={isJoined}>
        Join Stream
      </button>
      <div id="stream-wrapper">
        <div id="video-streams"></div>
        {isJoined && (
          <div id="stream-controls" >
            <button id="leave-btn"  onClick={leaveStream}>Leave Stream</button>
            <button id="mic-btn" onClick={toggleMic}>Mic On</button>
            <button id="camera-btn" onClick={toggleCamera}>Camera On</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoStream;
