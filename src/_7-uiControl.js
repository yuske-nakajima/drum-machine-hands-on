function dmMousePressed() {
  // 再生
  dmMousePressedBlock(
    DM_POSITIONS.startButton,
    DM_PARTS_SIZES.controlButton,
    () => {
      // TODO: 12-3. 再生ボタンを押した時の処理を書こう！
    },
  )

  // 停止
  dmMousePressedBlock(
    DM_POSITIONS.stopButton,
    DM_PARTS_SIZES.controlButton,
    () => {
      // TODO: 13-3. 停止ボタンを押した時の処理を書こう！
    },
  )

  // パターン
  for (let i = 0; i < DM_PATTERN_NUM; i++) {
    const pos = {
      x:
        DM_POSITIONS.patternButton.x +
        i * (DM_PARTS_SIZES.patternButton.width + DM_PATTERN_BUTTON_GAP),
      y: DM_POSITIONS.patternButton.y,
    }
    dmMousePressedBlock(pos, DM_PARTS_SIZES.patternButton, () => {
      // TODO: 14-3. パターンボタンを押した時の処理を書こう！
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
        // TODO: 15-3. シーケンサーセルを押した時の処理を書こう！

        // パターンのビートデータを更新
        dmSaveToLocalStorage('dmBeatData', dmBeatData)
      })
    }
  }

  // Volumeノブ
  const volumeKnobPos = {
    x: DM_POSITIONS.volumeKnob.x - DM_PARTS_SIZES.knob.width / 2,
    y: DM_POSITIONS.volumeKnob.y - DM_PARTS_SIZES.knob.height / 2,
  }
  dmMousePressedBlock(volumeKnobPos, DM_PARTS_SIZES.knob, () => {
    dmIsDraggingVolume = true
    dmLastMouse = { x: mouseX, y: mouseY }
  })

  // Tempoノブ
  const tempoKnobPos = {
    x: DM_POSITIONS.tempoKnob.x - DM_PARTS_SIZES.knob.width / 2,
    y: DM_POSITIONS.tempoKnob.y - DM_PARTS_SIZES.knob.height / 2,
  }
  dmMousePressedBlock(tempoKnobPos, DM_PARTS_SIZES.knob, () => {
    // TODO: 11-3. Tempoノブの挙動を書こう！
  })
}

function dmMouseDragged() {
  if (dmIsDraggingVolume) {
    const diff = mouseX + mouseY - (dmLastMouse.x + dmLastMouse.y)
    dmVolume = dmSaveToLocalStorage(
      'dmVolume',
      constrain(dmVolume + diff * 0.001, DM_MIN_VOLUME, DM_MAX_VOLUME),
    )
  }
  if (dmIsDraggingTempo) {
    const diff = mouseX + mouseY - (dmLastMouse.x + dmLastMouse.y)
    dmBpm = dmSaveToLocalStorage(
      'dmBpm',
      ceil(constrain(dmBpm + diff * 0.05, DM_MIN_BPM, DM_MAX_BPM)),
    )
  }
}

function dmMouseReleased() {
  dmIsDraggingVolume = false
  dmIsDraggingTempo = false
}
