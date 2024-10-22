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

  // Volumeノブ
  const volumeKnobPos = {
    x: DM_POSITIONS.volumeKnob.x - DM_PARTS_SIZES.knob.width / 2,
    y: DM_POSITIONS.volumeKnob.y - DM_PARTS_SIZES.knob.height / 2,
  }
  dmMousePressedBlock(volumeKnobPos, DM_PARTS_SIZES.knob, () => {
    isDraggingVolume = true
    lastMouseY = mouseY
  })

  // Tempoノブ
  const tempoKnobPos = {
    x: DM_POSITIONS.tempoKnob.x - DM_PARTS_SIZES.knob.width / 2,
    y: DM_POSITIONS.tempoKnob.y - DM_PARTS_SIZES.knob.height / 2,
  }
  dmMousePressedBlock(tempoKnobPos, DM_PARTS_SIZES.knob, () => {
    isDraggingTempo = true
    lastMouseY = mouseY
  })
}

function mouseDragged() {
  if (isDraggingVolume) {
    const diffY = mouseY - lastMouseY
    dmVolume = constrain(dmVolume + diffY * 0.001, DM_MIN_VOLUME, DM_MAX_VOLUME)
  }
  if (isDraggingTempo) {
    const diffY = mouseY - lastMouseY
    dmBpm = ceil(constrain(dmBpm + diffY * 0.05, DM_MIN_BPM, DM_MAX_BPM))
  }
}

function dmMouseReleased() {
  isDraggingVolume = false
  isDraggingTempo = false
}
