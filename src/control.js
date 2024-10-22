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
    dmMousePressedBlock(
      {
        x: DM_POSITIONS.patternButton.x + i * (DM_PARTS_SIZES.patternButton.width + DM_PATTERN_BUTTON_GAP),
        y: DM_POSITIONS.patternButton.y,
      },
      DM_PARTS_SIZES.patternButton,
      () => {
        dmCurrentPattern = i + 1
      },
    )
  }
}

function dmMouseReleased() {}
