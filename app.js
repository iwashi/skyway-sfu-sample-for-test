async function sleep(sleep = 7000) {
  return new Promise((resolve)  => {
    setTimeout(() => {
      resolve();
    }, sleep);
  });
}

(async () => {
  // Peerの準備
  const peer = new Peer({
    key:   'e5eaf3a1-59bf-4606-ad5f-b1c4c8f51984',
    debug: 3,
  });

  // To wait server process
  await sleep(3000);

  // Video
  const localStream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
  const vidElem = document.getElementById('my-video');
  vidElem.srcObject = localStream;

  await sleep(Math.random() * 5000 + 2000);
  const room = peer.joinRoom('sfu_sample_' + location.hash, {mode: 'sfu', stream: localStream});

  // For DeBuGGing
  const videoContainer = document.getElementById('flex-container');

  room.on('stream', stream => {
    const video = document.createElement('video');
    video.srcObject = stream;
    video.setAttribute('autoplay', '');
    videoContainer.appendChild(video);
  });

})();


