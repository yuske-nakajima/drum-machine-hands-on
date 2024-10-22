function dmMousePressed() {
  // 再生
  dmMousePressedBlock(DM_POSITIONS.startButton, DM_PARTS_SIZES.controlButton, () => {
    dmIsPlaying = true
  })

  // 停止
  dmMousePressedBlock(DM_POSITIONS.stopButton, DM_PARTS_SIZES.controlButton, () => {
    dmIsStopping = true
  })

  // パターン
  for (let i = 0; i < DM_PATTERN_NUM; i++) {
    const pos = {
      x: DM_POSITIONS.patternButton.x + i * (DM_PARTS_SIZES.patternButton.width + DM_PATTERN_BUTTON_GAP),
      y: DM_POSITIONS.patternButton.y,
    }
    dmMousePressedBlock(pos, DM_PARTS_SIZES.patternButton, () => {
      dmCurrentPattern = i + 1
    })
  }

  // シーケンサー
  for (let i = 0; i < DM_MUSIC_LIST.length; i++) {
    for (let j = 0; j < DM_BEAT; j++) {
      const pos = {
        x: DM_POSITIONS.seqArea.x + j * DM_PARTS_SIZES.seqCell.width,
        y: DM_POSITIONS.seqArea.y + i * DM_PARTS_SIZES.seqCell.height,
      }
      dmMousePressedBlock(pos, DM_PARTS_SIZES.seqCell, () => {
        dmBeatData[dmCurrentPattern][i][j] = !dmBeatData[dmCurrentPattern][i][j]
      })
    }
  }
}

function dmMouseReleased() {}
