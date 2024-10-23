let audioContext
const beatCount = 8
let cells = {}

let colors
const pushedCell = {}

let lineWeight
let blockWidth

let patternCount = 8

const hue = []
for (let i = 0; i < patternCount; i++) {
  hue[i] = (360 / (patternCount + 1)) * i
}

const masterGainObj = {
  kick: 0.8,
  snare: 0.8,
  hihat_c: 0.8,
  hihat_o: 0.3,
  tom: 1,
  crash: 0.6,
  cowbell: 0.3,
  clap: 3,
}

function setup() {
  // フォントの設定
  textFont('M PLUS Rounded 1c')
  // フォントの読み込みを確認
  document.fonts.ready.then(() => {
    fontLoaded = true
  })

  blockWidth = min(windowWidth, windowHeight) / (patternCount + 3)
  lineWeight = blockWidth / 10

  createCanvas(blockWidth * 9 + lineWeight * 2, blockWidth * Object.keys(sounds).length + lineWeight * 2) // キャンバスの幅を増やす
  colorMode(HSB)
  colors = {
    white: color(0, 0, 100),
    offWhite: color(0, 0, 98),
    black: color(0, 0, 0),
    gray: color(0, 0, 40),
    default: color(0, 0, 97),
    pushed: color(0, 20, 100),
  }

  for (let key in sounds) {
    pushedCell[key] = []
    for (let i = 0; i < beatCount; i++) {
      pushedCell[key][i] = colors.default
    }
  }

  audioContext = new (window.AudioContext || window.webkitAudioContext)()
  initializeCells()
}

function initializeCells() {
  for (let key in sounds) {
    cells[key] = new Array(beatCount).fill(false)
  }
}

function draw() {
  drawGrid()

  drawBlock(() => {
    drawingContext.shadowBlur = 7 //シャドウのサイズの大きさ
    drawingContext.shadowOffsetX = 2 //X軸正方向へのズレ
    drawingContext.shadowOffsetY = 2 //Y軸正方向へのズレ
    drawingContext.shadowColor = color(10) //シャドウの色

    noFill()
    stroke(colors.black)
    strokeWeight(lineWeight * 2)
    rect(0, 0, width, height)
  })
}

function drawGrid() {
  Object.keys(sounds).forEach((instrument, index) => {
    const yOffset = index * blockWidth

    // Draw instrument name
    fill(hue[index], 50, 100)
    stroke(colors.black)
    strokeWeight(2)
    rect(0 + lineWeight, yOffset + lineWeight, blockWidth, blockWidth)
    fill(colors.black)

    textAlign(CENTER, CENTER)
    textSize(blockWidth / 5)

    stroke(colors.white)
    strokeWeight(5)
    noStroke()
    text(instrument, blockWidth / 2 + lineWeight, yOffset + blockWidth / 2 + lineWeight)

    // Draw beat selectors
    for (let i = 0; i < beatCount; i++) {
      fill(colors.offWhite)
      stroke(colors.black)
      strokeWeight(2)
      rect(blockWidth + i * blockWidth + lineWeight, yOffset + lineWeight, blockWidth, blockWidth)

      drawBlock(() => {
        rectMode(CENTER)
        noStroke()

        drawingContext.shadowBlur = 7 //シャドウのサイズの大きさ
        drawingContext.shadowOffsetX = 2 //X軸正方向へのズレ
        drawingContext.shadowOffsetY = 4 //Y軸正方向へのズレ
        drawingContext.shadowColor = color(70) //シャドウの色

        fill(pushedCell[instrument][i])
        circle(
          blockWidth + i * blockWidth + blockWidth / 2 + lineWeight,
          yOffset + blockWidth / 2 + lineWeight,
          blockWidth - blockWidth / 4,
        )
      })

      noStroke()
      fill(colors.gray)
      textAlign(CENTER, CENTER)
      textSize(blockWidth / 2)
      text(`${i}`, blockWidth + i * blockWidth + blockWidth / 2 + lineWeight, yOffset + blockWidth / 2 + lineWeight)
    }
  })
}

function mousePressed() {
  Object.keys(sounds).forEach((instrument, index) => {
    const yOffset = index * blockWidth
    if (mouseY >= yOffset && mouseY < yOffset + blockWidth && mouseX > blockWidth) {
      const newBeat = floor((mouseX - blockWidth) / blockWidth)
      if (newBeat >= 0 && newBeat < beatCount) {
        sounds[instrument][newBeat](masterGainObj[instrument])
        pushedCell[instrument][newBeat] = color(hue[index], 20 + newBeat * 5, 90)
      }
    }
  })
}

function mouseClicked() {
  Object.keys(sounds).forEach((instrument) => {
    for (let i = 0; i < beatCount; i++) {
      pushedCell[instrument][i] = colors.default
    }
  })
}

function drawBlock(func) {
  push()
  func()
  pop()
}
