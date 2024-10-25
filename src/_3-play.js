function dmPlay() {
  if (!dmIsPlaying) {
    return
  }

  const currentTime = millis()
  const beatInterval = 60000 / 4 / dmBpm

  dmLastBeatTime = dmLastBeatTime || currentTime

  if (currentTime - dmLastBeatTime < beatInterval) {
    return
  }

  dmOnBeat = dmBeatCount % DM_BEAT

  for (let yi = 0; yi < DM_MUSIC_LIST.length; yi++) {
    for (let xi = 0; xi < DM_BEAT; xi++) {
      if (dmOnBeat === xi && dmBeatData[dmCurrentPattern][yi][xi]) {
        // TODO: ACTION-LAST. 音を鳴らそう
        const { func, gain } = DM_MUSIC_LIST[yi]
        func(gain * dmVolume)
      }
    }
  }

  dmBeatCount += 1
  dmLastBeatTime = currentTime

  if (!dmIsStopping || dmBeatCount % DM_BEAT !== 0) {
    return
  }

  dmIsPlaying = false
  dmIsStopping = false
  dmOnBeat = 0
}
