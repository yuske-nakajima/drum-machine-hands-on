function dmUiSetup() {
  // ドラム・マシンの背景
  dmDrawBlock(() => {
    fill(DM_COLORS.machineDark)

    // 画面の高さ・幅で四角形を描画する際に線の太さの半分が画面外に出るため
    // 考慮して線の太さを2倍にしている
    strokeWeight(DM_LINE_WEIGHT * 2)
    stroke(DM_COLORS.machineLine)

    // TODO: STATIC-1. ドラムマシンの背景を描こう！
    // POSITION: キャンバスの左上（0, 0）
    // SIZE    : width, height（p5.js）
  })

  // ドラム・マシンの操作部分の背景
  dmDrawBlock(() => {
    fill(DM_COLORS.machineLight)
    strokeWeight(DM_LINE_WEIGHT)
    stroke(DM_COLORS.machineLine)

    // volume・tempoエリア controlエリア patternエリアの描画
    for (let xi = 0; xi < 3; xi++) {
      // TODO: STATIC-2. 各操作エリアの背景を描こう！
      // POSITION: DM_POSITIONS.controlArea
      // SIZE    : DM_PARTS_SIZES.controlArea
      // GAP     : DM_AREA_GAP
    }

    // メインエリアの描画
    // TODO: STATIC-3. メインエリアの背景を描こう！
    // POSITION: DM_POSITIONS.mainArea
    // SIZE    : DM_PARTS_SIZES.mainArea
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

      // TODO: STATIC-4. シーケンスライトの背景を描こう！
      // POSITION: DM_POSITIONS.seqLight
      // SIZE    : DM_PARTS_SIZES.seqCell の半分
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
    // TODO: STATIC-5. Volumeのテキストを描こう！
    // POSITION: DM_POSITIONS.volumeText

    // Tempo
    // TODO: STATIC-6. Tempoのテキストを描こう！
    // POSITION: DM_POSITIONS.tempoText

    // Pattern
    // TODO: STATIC-7. Patternのテキストを描こう！
    // POSITION: DM_POSITIONS.patternText

    // 音色
    for (let yi = 0; yi < DM_MUSIC_LIST.length; yi++) {
      // TODO: STATIC-8. 音色タイトルのテキストを描こう！
      // POSITION: DM_POSITIONS.seqText
      // ※幅は DM_PARTS_SIZES.seqCell.width 2つ分
    }
  })
}
