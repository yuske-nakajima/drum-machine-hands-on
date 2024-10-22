function dmUiDraw() {
  //ノブの描画
  // Volumeノブ
  dmDrawBlock(() => {
    ellipseMode(CENTER)

    fill(DM_COLORS.buttonNormal)
    stroke(DM_COLORS.buttonLine)
    strokeWeight(DM_LINE_WEIGHT)
    ellipse(DM_POSITIONS.volumeKnob.x, DM_POSITIONS.volumeKnob.y, DM_PARTS_SIZES.knob.width, DM_PARTS_SIZES.knob.height)

    fill(DM_COLORS.buttonLine)
    noStroke()
    const angle = map(dmVolume, DM_MIN_VOLUME, DM_MAX_VOLUME, 0, TWO_PI) + HALF_PI
    const knobRadius = DM_PARTS_SIZES.knob.width / 3.5
    const x = DM_POSITIONS.volumeKnob.x + knobRadius * cos(angle)
    const y = DM_POSITIONS.volumeKnob.y + knobRadius * sin(angle)
    ellipse(x, y, DM_PARTS_SIZES.knob.width / 4, DM_PARTS_SIZES.knob.height / 4)
  })

  // Tempoノブ
  dmDrawBlock(() => {
    ellipseMode(CENTER)

    fill(DM_COLORS.buttonNormal)
    stroke(DM_COLORS.buttonLine)
    strokeWeight(DM_LINE_WEIGHT)
    ellipse(DM_POSITIONS.tempoKnob.x, DM_POSITIONS.tempoKnob.y, DM_PARTS_SIZES.knob.width, DM_PARTS_SIZES.knob.height)

    fill(DM_COLORS.buttonLine)
    noStroke()
    const angle = map(dmBpm, DM_MIN_BPM, DM_MAX_BPM, 0, TWO_PI) + HALF_PI
    const knobRadius = DM_PARTS_SIZES.knob.width / 3.5
    const x = DM_POSITIONS.tempoKnob.x + knobRadius * cos(angle)
    const y = DM_POSITIONS.tempoKnob.y + knobRadius * sin(angle)
    ellipse(x, y, DM_PARTS_SIZES.knob.width / 4, DM_PARTS_SIZES.knob.height / 4)
  })

  // ディスプレイの描画
  dmDrawBlock(() => {
    fill(DM_COLORS.displayMain)
    stroke(DM_COLORS.machineLine)
    strokeWeight(DM_LINE_WEIGHT)
    rectMode(CENTER)
    rect(
      DM_POSITIONS.tempoDisplay.x,
      DM_POSITIONS.tempoDisplay.y,
      DM_PARTS_SIZES.tempoDisplay.width,
      DM_PARTS_SIZES.tempoDisplay.height,
    )

    fill(DM_COLORS.displayText)
    noStroke()
    textAlign(CENTER, CENTER)
    textStyle(BOLD)
    textSize(DM_PARTS_SIZES.tempoDisplay.height / 2)
    text(dmBpm, DM_POSITIONS.tempoDisplay.x, DM_POSITIONS.tempoDisplay.y)
  })

  // 再生ボタン
  dmDrawBlock(() => {
    stroke(DM_COLORS.buttonLine)
    strokeWeight(DM_LINE_WEIGHT)

    const buttonColor = dmIsPlaying ? DM_COLORS.buttonActive : DM_COLORS.buttonNormal
    fill(buttonColor)
    rect(
      DM_POSITIONS.startButton.x,
      DM_POSITIONS.startButton.y,
      DM_PARTS_SIZES.controlButton.width,
      DM_PARTS_SIZES.controlButton.height,
    )

    const gap = DM_PARTS_SIZES.controlButton.width / 5
    fill(DM_COLORS.buttonLine)
    noStroke()
    triangle(
      DM_POSITIONS.startButton.x + gap,
      DM_POSITIONS.startButton.y + gap,
      DM_POSITIONS.startButton.x + gap,
      DM_POSITIONS.startButton.y + DM_PARTS_SIZES.controlButton.height - gap,
      DM_POSITIONS.startButton.x + DM_PARTS_SIZES.controlButton.width - gap,
      DM_POSITIONS.startButton.y + DM_PARTS_SIZES.controlButton.height / 2,
    )
  })

  // 停止ボタン
  dmDrawBlock(() => {
    stroke(DM_COLORS.buttonLine)
    strokeWeight(DM_LINE_WEIGHT)

    let buttonColor = dmIsPlaying ? DM_COLORS.buttonNormal : DM_COLORS.buttonActive
    buttonColor = dmIsStopping ? DM_COLORS.buttonStopping : buttonColor
    fill(buttonColor)
    rect(
      DM_POSITIONS.stopButton.x,
      DM_POSITIONS.stopButton.y,
      DM_PARTS_SIZES.controlButton.width,
      DM_PARTS_SIZES.controlButton.height,
    )

    // 停止ボタンマーク
    const gap = DM_PARTS_SIZES.controlButton.width / 5
    fill(DM_COLORS.buttonLine)
    noStroke()
    rect(
      DM_POSITIONS.stopButton.x + gap,
      DM_POSITIONS.stopButton.y + gap,
      DM_PARTS_SIZES.controlButton.width - gap * 2,
      DM_PARTS_SIZES.controlButton.height - gap * 2,
    )
  })

  // パターンボタン
  dmDrawBlock(() => {
    stroke(DM_COLORS.buttonLine)
    strokeWeight(DM_LINE_WEIGHT)

    const patternButtonTextStartX = DM_POSITIONS.patternButton.x + DM_PARTS_SIZES.patternButton.width / 2
    for (let i = 0; i < DM_PATTERN_NUM; i++) {
      // ボタン
      const buttonColor = dmCurrentPattern === i + 1 ? DM_COLORS.buttonActive : DM_COLORS.buttonNormal
      fill(buttonColor)
      rect(
        DM_POSITIONS.patternButton.x + i * (DM_PARTS_SIZES.patternButton.width + DM_PATTERN_BUTTON_GAP),
        DM_POSITIONS.patternButton.y,
        DM_PARTS_SIZES.patternButton.width,
        DM_PARTS_SIZES.patternButton.height,
      )
      // 番号
      dmDrawBlock(() => {
        fill(DM_COLORS.buttonText)
        noStroke()
        textAlign(CENTER, CENTER)
        textStyle(BOLD)
        textSize(DM_PARTS_SIZES.patternButton.height / 2)
        text(
          i + 1,
          patternButtonTextStartX + (i * DM_PARTS_SIZES.patternButton.width + i * DM_PATTERN_BUTTON_GAP),
          DM_POSITIONS.patternButton.y + DM_PARTS_SIZES.patternButton.height / 2,
        )
      })
    }
  })

  // シーケンサー
  dmDrawBlock(() => {
    for (let y = 0; y < DM_MUSIC_LIST.length; y++) {
      for (let x = 0; x < DM_BEAT; x++) {
        stroke(DM_COLORS.machineLight)
        strokeWeight(DM_LINE_WEIGHT)

        const isAccent = x % 4 === 0
        let fillColor = isAccent ? DM_COLORS.seqAccent : DM_COLORS.seqMain
        fillColor = dmIsPlaying && dmOnBeat === x ? DM_COLORS.buttonNormal : fillColor
        fill(fillColor)

        rect(
          DM_POSITIONS.seqArea.x + x * DM_PARTS_SIZES.seqCell.width,
          DM_POSITIONS.seqArea.y + y * DM_PARTS_SIZES.seqCell.height,
          DM_PARTS_SIZES.seqCell.width,
          DM_PARTS_SIZES.seqCell.height,
        )

        fillColor = dmBeatData[dmCurrentPattern][y][x] ? DM_COLORS.displayMain : fillColor
        fill(fillColor)
        noStroke()
        rect(
          DM_POSITIONS.seqArea.x + x * DM_PARTS_SIZES.seqCell.width + DM_PARTS_SIZES.seqCell.width / 4,
          DM_POSITIONS.seqArea.y + y * DM_PARTS_SIZES.seqCell.height + DM_PARTS_SIZES.seqCell.width / 4,
          DM_PARTS_SIZES.seqCell.width / 2,
          DM_PARTS_SIZES.seqCell.height / 2,
        )
      }
    }

    // ライト
    noStroke()
    ellipseMode(CENTER)
    for (let i = 0; i < DM_BEAT; i++) {
      const fillColor = dmIsPlaying && dmOnBeat === i ? DM_COLORS.buttonActive : DM_COLORS.seqMain
      fill(fillColor)

      ellipse(
        DM_POSITIONS.seqLight.x + i * DM_PARTS_SIZES.seqCell.width,
        DM_POSITIONS.seqLight.y,
        DM_PARTS_SIZES.seqCell.width / 3,
        DM_PARTS_SIZES.seqCell.height / 3,
      )
    }
  })
}
