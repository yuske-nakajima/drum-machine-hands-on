// ------------------------------------------------------------
// --- 定数
// ------------------------------------------------------------
// --- UI
const DM_WIDTH = 800
const DM_HEIGHT = 530
const DM_LINE_WEIGHT = 2
const DM_PATTERN_NUM = 4
const DM_AREA_GAP = 20
const DM_PATTERN_BUTTON_GAP = 10

const DM_COLORS = {}

const DM_POSITIONS = {
  // エリア
  controlArea: { x: 20, y: 20 },
  mainArea: { x: 20, y: 110 },
  seqArea: { x: 120, y: 130 },
  seqLight: { x: 140, y: 470 },
  // テキスト
  seqText: { x: 80, y: 150 },
  volumeText: { x: 80, y: 75 },
  tempoText: { x: 200, y: 75 },
  patternText: { x: 660, y: 75 },
  // パーツ
  volumeKnob: { x: 80, y: 45 },
  tempoKnob: { x: 230, y: 45 },
  tempoDisplay: { x: 170, y: 45 },
  startButton: { x: 405, y: 30 },
  stopButton: { x: 345, y: 30 },
  patternButton: { x: 565, y: 30 },
}

const DM_PARTS_SIZES = {
  // エリア
  controlArea: { width: 240, height: 70 },
  mainArea: { width: 760, height: 400 },
  // パーツ
  knob: { width: 40, height: 40 },
  tempoDisplay: { width: 60, height: 30 },
  controlButton: { width: 50, height: 50 },
  patternButton: { width: 40, height: 35 },
  seqCell: { width: 40, height: 40 },
}

// NOTE: gain → 音量にばらつきがあるため、音量を調整している
const DM_MUSIC_LIST = [
  { name: 'KICK', func: sounds.kick[6], gain: 0.8 },
  { name: 'SNARE', func: sounds.snare[0], gain: 0.8 },
  { name: 'CLOSED HH', func: sounds.hihat_c[7], gain: 0.8 },
  { name: 'OPEN HH', func: sounds.hihat_o[7], gain: 0.3 },
  { name: 'TOM', func: sounds.tom[4], gain: 1 },
  { name: 'CRASH', func: sounds.crash[7], gain: 0.6 },
  { name: 'COWBELL', func: sounds.cowbell[5], gain: 0.28 },
  { name: 'CLAP', func: sounds.clap[7], gain: 3 },
]

// --- MUSIC
const DM_BEAT = 16

const DM_MIN_BPM = 0
const DM_MAX_BPM = 240

const DM_MIN_VOLUME = 0
const DM_MAX_VOLUME = 2

// ------------------------------------------------------------
// --- 変数
// ------------------------------------------------------------
// --- UI
// 1 ~ DM_PATTERN_NUM
let dmCurrentPattern = dmGetOrInitializeValue('dmCurrentPattern', 1)
let isDraggingVolume = false
let isDraggingTempo = false
let lastMouse = { x: 0, y: 0 }

// --- MUSIC
let dmLastBeatTime = 0
let dmBpm = dmGetOrInitializeValue('dmBpm', 120)
let dmBeatCount = 0
let dmOnBeat = 0
let dmIsPlaying = false
let dmIsStopping = false
let dmVolume = dmGetOrInitializeValue('dmVolume', 0.5)
let audioContext = new (window.AudioContext || window.webkitAudioContext)()

// 添字0は使わない。1 ~ DM_PATTERN_NUM
// dmBeatData[n]: DM_MUSIC_LIST * DM_BEAT の数だけ要素を持つ 0 or 1 の 2次元配列。
const initDmBeatData = [[], [], [], [], []]
for (let i = 1; i <= DM_PATTERN_NUM; i++) {
  for (let j = 0; j < DM_MUSIC_LIST.length; j++) {
    initDmBeatData[i][j] = new Array(DM_BEAT).fill(false)
  }
}
let dmBeatData = dmGetOrInitializeValue('dmBeatData', initDmBeatData)
