// ------------------------------------------------------------
// --- 変数
// ------------------------------------------------------------
// --- UI
// 1 ~ DM_PATTERN_NUM
let dmCurrentPattern = 1

// --- MUSIC
let dmLastBeatTime = 0
let dmBpm = 120
let dmBeatCount = 0
let dmOnBeat = 0
let dmIsPlaying = false
let dmIsStopping = false
let dmVolume = 0.5
let audioContext = new (window.AudioContext || window.webkitAudioContext)()

// 添字0は使わない。1 ~ DM_PATTERN_NUM
// dmBeatData[n]: DM_MUSIC_LIST * DM_BEAT の数だけ要素を持つ 0 or 1 の 2次元配列。
let dmBeatData = [[], [], [], [], []]
for (let i = 1; i <= DM_PATTERN_NUM; i++) {
  for (let j = 0; j < DM_MUSIC_LIST.length; j++) {
    dmBeatData[i][j] = new Array(DM_BEAT).fill(false)
  }
}