function dmUiDraw() {
  //ノブの描画
  // Volumeノブ
  dmDrawBlock(() => {
    fill(DM_COLORS.buttonNormal)
    stroke(DM_COLORS.buttonLine)
    strokeWeight(DM_LINE_WEIGHT)
    // TODO: 9-1. Volumeノブ（背景）を描こう！
    ellipse(
      DM_POSITIONS.volumeKnob.x,
      DM_POSITIONS.volumeKnob.y,
      DM_PARTS_SIZES.knob.width,
      DM_PARTS_SIZES.knob.height,
    )

    fill(DM_COLORS.buttonLine)
    noStroke()
    const angle =
      map(dmVolume, DM_MIN_VOLUME, DM_MAX_VOLUME, 0, TWO_PI) + HALF_PI
    const knobRadius = DM_PARTS_SIZES.knob.width / 3.5
    // TODO: 9-2. Volumeノブ（可動部）を描こう！
    ellipse(
      DM_POSITIONS.volumeKnob.x + knobRadius * cos(angle),
      DM_POSITIONS.volumeKnob.y + knobRadius * sin(angle),
      DM_PARTS_SIZES.knob.width / 4,
      DM_PARTS_SIZES.knob.height / 4,
    )
  })

  // Tempoノブ
  dmDrawBlock(() => {
    fill(DM_COLORS.buttonNormal)
    stroke(DM_COLORS.buttonLine)
    strokeWeight(DM_LINE_WEIGHT)
    // TODO: 10-1. Tempoノブ（背景）を描こう！
    ellipse(
      DM_POSITIONS.tempoKnob.x,
      DM_POSITIONS.tempoKnob.y,
      DM_PARTS_SIZES.knob.width,
      DM_PARTS_SIZES.knob.height,
    )

    fill(DM_COLORS.buttonLine)
    noStroke()
    const angle = map(dmBpm, DM_MIN_BPM, DM_MAX_BPM, 0, TWO_PI) + HALF_PI
    const knobRadius = DM_PARTS_SIZES.knob.width / 3.5
    // TODO: 10-2. Tempoノブ（可動部）を描こう！
    ellipse(
      DM_POSITIONS.tempoKnob.x + knobRadius * cos(angle),
      DM_POSITIONS.tempoKnob.y + knobRadius * sin(angle),
      DM_PARTS_SIZES.knob.width / 4,
      DM_PARTS_SIZES.knob.height / 4,
    )
  })

  // ディスプレイの描画
  dmDrawBlock(() => {
    fill(DM_COLORS.displayMain)
    stroke(DM_COLORS.machineLine)
    strokeWeight(DM_LINE_WEIGHT)
    rectMode(CENTER)
    // TODO: 11-1. ディスプレイ（背景）を描こう！
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
    // TODO: 11-2. ディスプレイ（テキスト）を描こう！
    text(dmBpm, DM_POSITIONS.tempoDisplay.x, DM_POSITIONS.tempoDisplay.y)
  })

  // 再生ボタン
  dmDrawBlock(() => {
    stroke(DM_COLORS.buttonLine)
    strokeWeight(DM_LINE_WEIGHT)

    const buttonColor = dmIsPlaying
      ? DM_COLORS.buttonActive
      : DM_COLORS.buttonNormal
    fill(buttonColor)
    // TODO: 12-1. 再生ボタン（背景）を描こう！
    rect(
      DM_POSITIONS.startButton.x,
      DM_POSITIONS.startButton.y,
      DM_PARTS_SIZES.controlButton.width,
      DM_PARTS_SIZES.controlButton.height,
    )

    const gap = DM_PARTS_SIZES.controlButton.width / 5
    fill(DM_COLORS.buttonLine)
    noStroke()
    // TODO: 12-2. 再生ボタン（マーク）を描こう！
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

    let buttonColor = dmIsPlaying
      ? DM_COLORS.buttonNormal
      : DM_COLORS.buttonActive
    buttonColor = dmIsStopping ? DM_COLORS.buttonStopping : buttonColor
    fill(buttonColor)
    // TODO: 13-1. 停止ボタン（背景）を描こう！
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
    // TODO: 13-2. 停止ボタン（マーク）を描こう！
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

    const patternButtonTextStartX =
      DM_POSITIONS.patternButton.x + DM_PARTS_SIZES.patternButton.width / 2
    for (let i = 0; i < DM_PATTERN_NUM; i++) {
      // ボタン
      const buttonColor =
        dmCurrentPattern === i + 1
          ? DM_COLORS.buttonActive
          : DM_COLORS.buttonNormal
      fill(buttonColor)
      // TODO: 14-1. パターンボタン（背景）を描こう！
      rect(
        DM_POSITIONS.patternButton.x +
          i * (DM_PARTS_SIZES.patternButton.width + DM_PATTERN_BUTTON_GAP),
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
        // TODO: 14-2. パターンボタンのテキスト（番号）を描こう！
        text(
          i + 1,
          patternButtonTextStartX +
            (i * DM_PARTS_SIZES.patternButton.width +
              i * DM_PATTERN_BUTTON_GAP),
          DM_POSITIONS.patternButton.y +
            DM_PARTS_SIZES.patternButton.height / 2,
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
        fillColor =
          dmIsPlaying && dmOnBeat === x ? DM_COLORS.buttonNormal : fillColor
        fill(fillColor)
        // TODO: 15-1. シーケンサーのセルを描こう！
        rect(
          DM_POSITIONS.seqArea.x + x * DM_PARTS_SIZES.seqCell.width,
          DM_POSITIONS.seqArea.y + y * DM_PARTS_SIZES.seqCell.height,
          DM_PARTS_SIZES.seqCell.width,
          DM_PARTS_SIZES.seqCell.height,
        )

        fillColor = dmBeatData[dmCurrentPattern][y][x]
          ? DM_COLORS.displayMain
          : fillColor
        fill(fillColor)
        noStroke()
        // TODO: 15-2. シーケンサーセルのライトを描こう！
        rect(
          DM_POSITIONS.seqArea.x +
            x * DM_PARTS_SIZES.seqCell.width +
            DM_PARTS_SIZES.seqCell.width / 4,
          DM_POSITIONS.seqArea.y +
            y * DM_PARTS_SIZES.seqCell.height +
            DM_PARTS_SIZES.seqCell.width / 4,
          DM_PARTS_SIZES.seqCell.width / 2,
          DM_PARTS_SIZES.seqCell.height / 2,
        )
      }
    }

    // ライト
    noStroke()
    for (let i = 0; i < DM_BEAT; i++) {
      const fillColor =
        dmIsPlaying && dmOnBeat === i
          ? DM_COLORS.buttonActive
          : DM_COLORS.seqMain
      fill(fillColor)

      // TODO: 16. シーケンサーのライトを描こう！
      ellipse(
        DM_POSITIONS.seqLight.x +
          i * DM_PARTS_SIZES.seqCell.width +
          DM_PARTS_SIZES.seqCell.width / 2,
        DM_POSITIONS.seqLight.y + DM_PARTS_SIZES.seqCell.height / 2,
        DM_PARTS_SIZES.seqCell.width / 3,
        DM_PARTS_SIZES.seqCell.height / 3,
      )
    }
  })
}

function dmUiDesignGuideDraw() {
  const size = 6
  dmDrawBlock(() => {
    noStroke()
    fill(DM_COLORS.designGuide)

    ellipse(DM_POSITIONS.controlArea.x, DM_POSITIONS.controlArea.y, size)
    ellipse(DM_POSITIONS.mainArea.x, DM_POSITIONS.mainArea.y, size)
    ellipse(DM_POSITIONS.seqArea.x, DM_POSITIONS.seqArea.y, size)
    ellipse(DM_POSITIONS.seqLight.x, DM_POSITIONS.seqLight.y, size)
    ellipse(DM_POSITIONS.seqText.x, DM_POSITIONS.seqText.y, size)
    ellipse(DM_POSITIONS.volumeText.x, DM_POSITIONS.volumeText.y, size)
    ellipse(DM_POSITIONS.tempoText.x, DM_POSITIONS.tempoText.y, size)
    ellipse(DM_POSITIONS.patternText.x, DM_POSITIONS.patternText.y, size)
    ellipse(DM_POSITIONS.volumeKnob.x, DM_POSITIONS.volumeKnob.y, size)
    ellipse(DM_POSITIONS.tempoKnob.x, DM_POSITIONS.tempoKnob.y, size)
    ellipse(DM_POSITIONS.tempoDisplay.x, DM_POSITIONS.tempoDisplay.y, size)
    ellipse(DM_POSITIONS.startButton.x, DM_POSITIONS.startButton.y, size)
    ellipse(DM_POSITIONS.stopButton.x, DM_POSITIONS.stopButton.y, size)
    ellipse(DM_POSITIONS.patternButton.x, DM_POSITIONS.patternButton.y, size)
  })

  dmDrawBlock(() => {
    noFill()
    stroke(DM_COLORS.designGuide)
    strokeWeight(0.5)

    for (let xi = 0; xi < 3; xi++) {
      rect(
        DM_POSITIONS.controlArea.x +
          xi * (DM_PARTS_SIZES.controlArea.width + DM_AREA_GAP),
        DM_POSITIONS.controlArea.y,
        DM_PARTS_SIZES.controlArea.width,
        DM_PARTS_SIZES.controlArea.height,
      )
    }

    rect(
      DM_POSITIONS.mainArea.x,
      DM_POSITIONS.mainArea.y,
      DM_PARTS_SIZES.mainArea.width,
      DM_PARTS_SIZES.mainArea.height,
    )

    for (let yi = 0; yi < DM_MUSIC_LIST.length; yi++) {
      rect(
        DM_POSITIONS.seqText.x,
        DM_POSITIONS.seqText.y + yi * DM_PARTS_SIZES.seqCell.height,
        DM_PARTS_SIZES.seqCell.width * 2,
        DM_PARTS_SIZES.seqCell.height,
      )
    }

    for (let xi = 0; xi < DM_BEAT; xi++) {
      for (let yi = 0; yi < DM_MUSIC_LIST.length; yi++) {
        rect(
          DM_POSITIONS.seqArea.x + xi * DM_PARTS_SIZES.seqCell.width,
          DM_POSITIONS.seqArea.y + yi * DM_PARTS_SIZES.seqCell.height,
          DM_PARTS_SIZES.seqCell.width,
          DM_PARTS_SIZES.seqCell.height,
        )
      }
    }

    for (let xi = 0; xi < DM_BEAT; xi++) {
      rect(
        DM_POSITIONS.seqLight.x + xi * DM_PARTS_SIZES.seqCell.width,
        DM_POSITIONS.seqLight.y,
        DM_PARTS_SIZES.seqCell.width,
        DM_PARTS_SIZES.seqCell.height,
      )
    }

    rect(
      DM_POSITIONS.stopButton.x,
      DM_POSITIONS.stopButton.y,
      DM_PARTS_SIZES.controlButton.width,
      DM_PARTS_SIZES.controlButton.height,
    )

    rect(
      DM_POSITIONS.startButton.x,
      DM_POSITIONS.startButton.y,
      DM_PARTS_SIZES.controlButton.width,
      DM_PARTS_SIZES.controlButton.height,
    )

    for (let xi = 0; xi < DM_PATTERN_NUM; xi++) {
      rect(
        DM_POSITIONS.patternButton.x +
          xi * (DM_PARTS_SIZES.patternButton.width + DM_PATTERN_BUTTON_GAP),
        DM_POSITIONS.patternButton.y,
        DM_PARTS_SIZES.patternButton.width,
        DM_PARTS_SIZES.patternButton.height,
      )
    }

    rect(
      DM_POSITIONS.volumeKnob.x - DM_PARTS_SIZES.knob.width / 2,
      DM_POSITIONS.volumeKnob.y - DM_PARTS_SIZES.knob.height / 2,
      DM_PARTS_SIZES.knob.width,
      DM_PARTS_SIZES.knob.height,
    )

    rect(
      DM_POSITIONS.tempoKnob.x - DM_PARTS_SIZES.knob.width / 2,
      DM_POSITIONS.tempoKnob.y - DM_PARTS_SIZES.knob.height / 2,
      DM_PARTS_SIZES.knob.width,
      DM_PARTS_SIZES.knob.height,
    )

    rect(
      DM_POSITIONS.tempoDisplay.x - DM_PARTS_SIZES.tempoDisplay.width / 2,
      DM_POSITIONS.tempoDisplay.y - DM_PARTS_SIZES.tempoDisplay.height / 2,
      DM_PARTS_SIZES.tempoDisplay.width,
      DM_PARTS_SIZES.tempoDisplay.height,
    )
  })
}
