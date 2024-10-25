function dmMousePressed() {
  // パターン
  for (let xi = 0; xi < DM_PATTERN_NUM; xi++) {
    const pos = {
      x:
        DM_POSITIONS.patternButton.x +
        xi * (DM_PARTS_SIZES.patternButton.width + DM_PATTERN_BUTTON_GAP),
      y: DM_POSITIONS.patternButton.y,
    }
    dmMousePressedBlock(pos, DM_PARTS_SIZES.patternButton, () => {
      // TODO: ACTION-1. パターンボタンを押した時の処理を書こう！
      dmCurrentPattern = xi + 1

      // パターンプリセットを更新
      dmSaveToLocalStorage('dmCurrentPattern', dmCurrentPattern)
    })
  }

  // Volumeノブ
  const volumeKnobPos = {
    x: DM_POSITIONS.volumeKnob.x - DM_PARTS_SIZES.knob.width / 2,
    y: DM_POSITIONS.volumeKnob.y - DM_PARTS_SIZES.knob.height / 2,
  }
  dmMousePressedBlock(volumeKnobPos, DM_PARTS_SIZES.knob, () => {
    // TODO: ACTION-2. Volumeノブの挙動を確認しよう！
    dmIsDraggingVolume = true
    dmLastMouse = { x: mouseX, y: mouseY }
  })

  // Tempoノブ
  const tempoKnobPos = {
    x: DM_POSITIONS.tempoKnob.x - DM_PARTS_SIZES.knob.width / 2,
    y: DM_POSITIONS.tempoKnob.y - DM_PARTS_SIZES.knob.height / 2,
  }
  dmMousePressedBlock(tempoKnobPos, DM_PARTS_SIZES.knob, () => {
    // TODO: ACTION-3. Tempoノブの挙動を書こう！
    dmIsDraggingTempo = true
    dmLastMouse = { x: mouseX, y: mouseY }
  })

  // シーケンサー
  for (let yi = 0; yi < DM_MUSIC_LIST.length; yi++) {
    for (let xi = 0; xi < DM_BEAT; xi++) {
      const pos = {
        x: DM_POSITIONS.seqArea.x + xi * DM_PARTS_SIZES.seqCell.width,
        y: DM_POSITIONS.seqArea.y + yi * DM_PARTS_SIZES.seqCell.height,
      }
      dmMousePressedBlock(pos, DM_PARTS_SIZES.seqCell, () => {
        // TODO: ACTION-4. シーケンサーセルを押した時の処理を書こう！
        dmBeatData[dmCurrentPattern][yi][xi] = false

        // パターンのビートデータを更新
        dmSaveToLocalStorage('dmBeatData', dmBeatData)
      })
    }
  }

  // 再生
  dmMousePressedBlock(
    DM_POSITIONS.startButton,
    DM_PARTS_SIZES.controlButton,
    () => {
      // TODO: ACTION-5. 再生ボタンを押した時の処理を確認しよう！
      dmIsPlaying = true
    },
  )

  // 停止
  dmMousePressedBlock(
    DM_POSITIONS.stopButton,
    DM_PARTS_SIZES.controlButton,
    () => {
      // TODO: ACTION-6. 停止ボタンを押した時の処理を書こう！
      dmIsStopping = false // ここを修正
    },
  )
}

function dmMouseDragged() {
  // Volumeノブ（ドラッグ量を反映）
  if (dmIsDraggingVolume) {
    const diff = mouseX + mouseY - (dmLastMouse.x + dmLastMouse.y)
    dmVolume = constrain(dmVolume + diff * 0.001, DM_MIN_VOLUME, DM_MAX_VOLUME)

    // Volumeをローカルストレージに保存
    dmSaveToLocalStorage('dmVolume', dmVolume)
  }

  // Tempoノブ（ドラッグ量を反映）
  if (dmIsDraggingTempo) {
    const diff = mouseX + mouseY - (dmLastMouse.x + dmLastMouse.y)
    dmBpm = ceil(constrain(dmBpm + diff * 0.05, DM_MIN_BPM, DM_MAX_BPM))

    // テンポををローカルストレージに保存
    dmSaveToLocalStorage('dmBpm', dmBpm)
  }
}

function dmMouseReleased() {
  // Volumeノブ
  dmIsDraggingVolume = false

  // Tempoノブ
  dmIsDraggingTempo = false
}
