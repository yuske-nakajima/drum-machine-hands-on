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

  for (let i = 0; i < DM_MUSIC_LIST.length; i++) {
    for (let j = 0; j < DM_BEAT; j++) {
      if (dmOnBeat === j && dmBeatData[dmCurrentPattern][i][j]) {
        const { func, gain } = DM_MUSIC_LIST[i]
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
