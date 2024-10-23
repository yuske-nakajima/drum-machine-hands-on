function dmUiSetup() {
  // ドラム・マシンの背景
  dmDrawBlock(() => {
    fill(DM_COLORS.machineDark)

    // 画面の高さ・幅で四角形を描画する際に線の太さの半分が画面外に出るため
    // 考慮して線の太さを2倍にしている
    strokeWeight(DM_LINE_WEIGHT * 2)
    stroke(DM_COLORS.machineLine)

    // TODO: 1. ドラムマシンの背景を描こう！
    // position: キャンバスの左上（0, 0）
    // size:     width, height（p5.js）
    rect(0, 0, width, height)
  })

  // ドラム・マシンの操作部分の背景
  dmDrawBlock(() => {
    fill(DM_COLORS.machineLight)
    strokeWeight(DM_LINE_WEIGHT)
    stroke(DM_COLORS.machineLine)

    // volume・tempoエリア controlエリア patternエリアの描画
    for (let xi = 0; xi < 3; xi++) {
      // TODO: 2. 各操作エリアの背景を描こう！
      // position: DM_POSITIONS.controlArea
      // size:     DM_PARTS_SIZES.controlArea
      // gap:      DM_AREA_GAP
      rect(
        DM_POSITIONS.controlArea.x +
          xi * (DM_PARTS_SIZES.controlArea.width + DM_AREA_GAP),
        DM_POSITIONS.controlArea.y,
        DM_PARTS_SIZES.controlArea.width,
        DM_PARTS_SIZES.controlArea.height,
      )
    }

    // メインエリアの描画
    // TODO: 3. メインエリアの背景を描こう！
    // position: DM_POSITIONS.mainArea
    // size:     DM_PARTS_SIZES.mainArea
    rect(
      DM_POSITIONS.mainArea.x,
      DM_POSITIONS.mainArea.y,
      DM_PARTS_SIZES.mainArea.width,
      DM_PARTS_SIZES.mainArea.height,
    )
  })

  // シーケンスライトの背景
  dmDrawBlock(() => {
    fill(DM_COLORS.seqMain)
    stroke(DM_COLORS.machineLine)
    strokeWeight(DM_LINE_WEIGHT)

    for (let xi = 0; xi < DM_BEAT; xi++) {
      // 4拍ごとにアクセントをつける
      const isAccent = xi % 4 === 0
      strokeWeight(DM_LINE_WEIGHT * (isAccent ? 2 : 1))

      // TODO: 4. シーケンスライトの背景を描こう！
      // position: DM_POSITIONS.seqLight
      // size:     DM_PARTS_SIZES.seqCell の半分
      ellipse(
        DM_POSITIONS.seqLight.x +
          DM_PARTS_SIZES.seqCell.width / 2 +
          xi * DM_PARTS_SIZES.seqCell.width,
        DM_POSITIONS.seqLight.y + DM_PARTS_SIZES.seqCell.height / 2,
        DM_PARTS_SIZES.seqCell.width / 2,
        DM_PARTS_SIZES.seqCell.height / 2,
      )
    }
  })

  // テキスト
  dmDrawBlock(() => {
    fill(DM_COLORS.machineText)
    noStroke()
    textSize(DM_PARTS_SIZES.seqCell.height / 4)
    textStyle(BOLD)
    textAlign(CENTER, CENTER)

    // Volume
    // TODO: 5. Volumeのテキストを描こう！
    // position: DM_POSITIONS.volumeText
    text('VOLUME', DM_POSITIONS.volumeText.x, DM_POSITIONS.volumeText.y)

    // Tempo
    // TODO: 6. Tempoのテキストを描こう！
    // position: DM_POSITIONS.tempoText
    text('TEMPO', DM_POSITIONS.tempoText.x, DM_POSITIONS.tempoText.y)

    // Pattern
    // TODO: 7. Patternのテキストを描こう！
    // position: DM_POSITIONS.patternText
    text('PATTERN', DM_POSITIONS.patternText.x, DM_POSITIONS.patternText.y)

    // 音色
    for (let yi = 0; yi < DM_MUSIC_LIST.length; yi++) {
      // TODO: 8. 音色タイトルのテキストを描こう！
      // position: DM_POSITIONS.seqText
      // ※幅は DM_PARTS_SIZES.seqCell.width 2つ分
      text(
        DM_MUSIC_LIST[yi].name,
        DM_POSITIONS.seqText.x + DM_PARTS_SIZES.seqCell.width,
        DM_POSITIONS.seqText.y +
          DM_PARTS_SIZES.seqCell.height / 2 +
          yi * DM_PARTS_SIZES.seqCell.height,
      )
    }
  })
}
