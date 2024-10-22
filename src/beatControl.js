function dmMusicPlay() {
  for (let i = 0; i < DM_MUSIC_LIST.length; i++) {
    for (let j = 0; j < DM_BEAT; j++) {
      if (dmOnBeat === j) {
        if (dmBeatData[dmCurrentPattern][i][j]) {
          DM_MUSIC_LIST[i].func(DM_MUSIC_GAIN_LIST[i] * dmVolume)
        }
      }
    }
  }
}

function dmPlay() {
  if (dmIsPlaying) {
    const currentTime = millis()
    const beatInterval = 60000 / 4 / dmBpm

    dmLastBeatTime = dmLastBeatTime || currentTime

    if (currentTime - dmLastBeatTime >= beatInterval) {
      dmOnBeat = dmBeatCount % DM_BEAT

      dmMusicPlay()

      dmBeatCount++
      dmLastBeatTime = currentTime

      if (dmIsStopping && dmBeatCount % DM_BEAT === 0) {
        dmIsPlaying = false
        dmIsStopping = false
        dmOnBeat = 0
      }
    }
  }
}
