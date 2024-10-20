// --------------------------------------------------
// kick start
// --------------------------------------------------
function playKick(variation, masterGainValue) {
  // オーディオコンテキストが一時停止状態かどうかを確認
  if (audioContext.state === 'suspended') {
    // 一時停止状態の場合、オーディオコンテキストを再開してからキック音を再生
    audioContext.resume().then(() => {
      playKickSound(variation, masterGainValue)
    })
  } else {
    // 一時停止状態でない場合、直接キック音を再生
    playKickSound(variation, masterGainValue)
  }
}

function playKickSound(variation, masterGainValue) {
  const osc = audioContext.createOscillator()
  const oscEnvelope = audioContext.createGain()
  const masterGain = audioContext.createGain()

  osc.connect(oscEnvelope)
  oscEnvelope.connect(masterGain)
  masterGain.connect(audioContext.destination)

  // Kick variations with adjusted parameters
  const kickParams = [
    { freq: 55, decay: 0.4, wave: 'sine' }, // Deep kick
    { freq: 75, decay: 0.2, wave: 'triangle' }, // Punchy kick
    { freq: 95, decay: 0.25, wave: 'square' }, // Sharp kick
    { freq: 65, decay: 0.5, wave: 'sine' }, // Long kick
    { freq: 85, decay: 0.1, wave: 'sawtooth' }, // Short, snappy kick
    { freq: 45, decay: 0.45, wave: 'triangle' }, // Low, resonant kick
    { freq: 110, decay: 0.15, wave: 'square' }, // High, tight kick
    { freq: 70, decay: 0.3, wave: 'sine' }, // Medium, balanced kick
  ]

  const params = kickParams[variation]

  // Oscillator settings
  osc.type = params.wave
  osc.frequency.setValueAtTime(params.freq * 2, audioContext.currentTime)
  osc.frequency.exponentialRampToValueAtTime(params.freq, audioContext.currentTime + 0.05)

  // Envelope settings
  oscEnvelope.gain.setValueAtTime(1, audioContext.currentTime)
  oscEnvelope.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + params.decay)

  // Master gain settings
  masterGain.gain.setValueAtTime(masterGainValue, audioContext.currentTime)

  osc.start(audioContext.currentTime)
  osc.stop(audioContext.currentTime + params.decay + 0.1) // Add a small tail to the sound
}
// --------------------------------------------------
// kick end
// --------------------------------------------------

// --------------------------------------------------
// snare start
// --------------------------------------------------
function playSnare(variation, masterGainValue) {
  if (audioContext.state === 'suspended') {
    audioContext.resume().then(() => {
      playSneaSound(variation, masterGainValue)
    })
  } else {
    playSneaSound(variation, masterGainValue)
  }
}

function playSneaSound(variation, masterGainValue) {
  const noise = audioContext.createBufferSource()
  const noiseFilter = audioContext.createBiquadFilter()
  const noiseEnvelope = audioContext.createGain()
  const osc = audioContext.createOscillator()
  const oscEnvelope = audioContext.createGain()
  const masterGain = audioContext.createGain()

  // ノイズ生成
  const bufferSize = audioContext.sampleRate * 0.5
  const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1
  }

  noise.buffer = buffer
  noiseFilter.type = 'highpass'
  noise.connect(noiseFilter)
  noiseFilter.connect(noiseEnvelope)
  noiseEnvelope.connect(masterGain)

  osc.connect(oscEnvelope)
  oscEnvelope.connect(masterGain)
  masterGain.connect(audioContext.destination)

  const snareParams = [
    {
      noiseFreq: 3000,
      oscFreq: 180,
      noiseDuration: 0.2,
      oscDuration: 0.1,
      noiseMix: 0.7,
      oscMix: 0.3,
    }, // Standard snare
    {
      noiseFreq: 4000,
      oscFreq: 150,
      noiseDuration: 0.1,
      oscDuration: 0.05,
      noiseMix: 0.8,
      oscMix: 0.2,
    }, // Tight snare
    {
      noiseFreq: 2000,
      oscFreq: 100,
      noiseDuration: 0.3,
      oscDuration: 0.15,
      noiseMix: 0.6,
      oscMix: 0.4,
    }, // Fat snare
    {
      noiseFreq: 5000,
      oscFreq: 200,
      noiseDuration: 0.15,
      oscDuration: 0.08,
      noiseMix: 0.75,
      oscMix: 0.25,
    }, // Crisp snare
    {
      noiseFreq: 6000,
      oscFreq: 220,
      noiseDuration: 0.08,
      oscDuration: 0.04,
      noiseMix: 0.9,
      oscMix: 0.1,
    }, // High snare
    {
      noiseFreq: 1500,
      oscFreq: 80,
      noiseDuration: 0.4,
      oscDuration: 0.2,
      noiseMix: 0.5,
      oscMix: 0.5,
    }, // Low snare
    {
      noiseFreq: 3500,
      oscFreq: 160,
      noiseDuration: 0.25,
      oscDuration: 0.12,
      noiseMix: 0.65,
      oscMix: 0.35,
    }, // Balanced snare
    {
      noiseFreq: 4500,
      oscFreq: 140,
      noiseDuration: 0.18,
      oscDuration: 0.09,
      noiseMix: 0.85,
      oscMix: 0.15,
    }, // Punchy snare
  ]

  const params = snareParams[variation]

  // ノイズ設定
  noiseFilter.frequency.setValueAtTime(params.noiseFreq, audioContext.currentTime)
  noiseEnvelope.gain.setValueAtTime(0, audioContext.currentTime)
  noiseEnvelope.gain.linearRampToValueAtTime(params.noiseMix, audioContext.currentTime + 0.001)
  noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + params.noiseDuration)

  // オシレーター設定
  osc.type = 'triangle'
  osc.frequency.setValueAtTime(params.oscFreq, audioContext.currentTime)
  oscEnvelope.gain.setValueAtTime(0, audioContext.currentTime)
  oscEnvelope.gain.linearRampToValueAtTime(params.oscMix, audioContext.currentTime + 0.001)
  oscEnvelope.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + params.oscDuration)

  // マスターゲイン設定
  masterGain.gain.setValueAtTime(masterGainValue, audioContext.currentTime) // 全体の音量を上げる

  noise.start(audioContext.currentTime)
  osc.start(audioContext.currentTime)
  noise.stop(audioContext.currentTime + params.noiseDuration)
  osc.stop(audioContext.currentTime + params.oscDuration)
}
// --------------------------------------------------
// snare end
// --------------------------------------------------

// --------------------------------------------------
// closed hihat start
// --------------------------------------------------
function playClosedHihat(variation, masterGainValue) {
  if (audioContext.state === 'suspended') {
    audioContext.resume().then(() => {
      playClosedHiHatSound(variation, masterGainValue)
    })
  } else {
    playClosedHiHatSound(variation, masterGainValue)
  }
}

function playClosedHiHatSound(variation, masterGainValue) {
  const ratios = [2, 3, 4.16, 5.43, 6.79, 8.21]

  const bandpass = audioContext.createBiquadFilter()
  const highpass = audioContext.createBiquadFilter()
  const masterGain = audioContext.createGain()

  bandpass.type = 'bandpass'
  highpass.type = 'highpass'
  bandpass.connect(highpass)
  highpass.connect(masterGain)
  masterGain.connect(audioContext.destination)

  const hihatParams = [
    { fundamental: 40, bandwidth: 8000, highpass: 7000, duration: 0.05 }, // Tight
    { fundamental: 60, bandwidth: 10000, highpass: 8000, duration: 0.08 }, // Bright
    { fundamental: 35, bandwidth: 6000, highpass: 6000, duration: 0.06 }, // Dark
    { fundamental: 50, bandwidth: 9000, highpass: 7500, duration: 0.04 }, // Crisp
    { fundamental: 45, bandwidth: 7000, highpass: 6500, duration: 0.07 }, // Smooth
    { fundamental: 55, bandwidth: 11000, highpass: 8500, duration: 0.03 }, // Sharp
    { fundamental: 30, bandwidth: 5000, highpass: 5500, duration: 0.09 }, // Low
    { fundamental: 65, bandwidth: 12000, highpass: 9000, duration: 0.02 }, // High
  ]

  const params = hihatParams[variation]

  bandpass.frequency.setValueAtTime(params.bandwidth, audioContext.currentTime)
  bandpass.Q.setValueAtTime(0.5, audioContext.currentTime)
  highpass.frequency.setValueAtTime(params.highpass, audioContext.currentTime)

  masterGain.gain.setValueAtTime(masterGainValue, audioContext.currentTime)
  masterGain.gain.linearRampToValueAtTime(masterGainValue, audioContext.currentTime + 0.001)
  masterGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + params.duration)

  ratios.forEach((ratio) => {
    const osc = audioContext.createOscillator()
    osc.type = 'square'
    osc.frequency.setValueAtTime(params.fundamental * ratio, audioContext.currentTime)
    osc.connect(bandpass)
    osc.start(audioContext.currentTime)
    osc.stop(audioContext.currentTime + params.duration)
  })

  // Add some noise for more realistic sound
  const bufferSize = audioContext.sampleRate * params.duration
  const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate)
  const noiseData = noiseBuffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    noiseData[i] = Math.random() * 2 - 1
  }

  const noise = audioContext.createBufferSource()
  noise.buffer = noiseBuffer
  noise.connect(bandpass)
  noise.start(audioContext.currentTime)
}
// --------------------------------------------------
// closed hihat end
// --------------------------------------------------

// --------------------------------------------------
// open hihat start
// --------------------------------------------------
function playOpenHihat(variation, masterGainValue) {
  if (audioContext.state === 'suspended') {
    audioContext.resume().then(() => {
      playOpenHiHatSound(variation, masterGainValue)
    })
  } else {
    playOpenHiHatSound(variation, masterGainValue)
  }
}

function playOpenHiHatSound(variation, masterGainValue) {
  const ratios = [2, 3, 4.16, 5.43, 6.79, 8.21, 10.18, 12.43]

  const bandpass = audioContext.createBiquadFilter()
  const highpass = audioContext.createBiquadFilter()
  const envelopeGain = audioContext.createGain()
  const masterGain = audioContext.createGain()

  bandpass.type = 'bandpass'
  highpass.type = 'highpass'
  bandpass.connect(highpass)
  highpass.connect(envelopeGain)
  envelopeGain.connect(masterGain)
  masterGain.connect(audioContext.destination)

  const hihatParams = [
    { fundamental: 35, bandwidth: 8000, highpass: 6000, duration: 0.8, gain: 0.7 }, // Standard
    { fundamental: 50, bandwidth: 10000, highpass: 7000, duration: 1.0, gain: 0.6 }, // Bright
    { fundamental: 30, bandwidth: 6000, highpass: 5000, duration: 1.2, gain: 0.8 }, // Dark
    { fundamental: 45, bandwidth: 9000, highpass: 6500, duration: 0.9, gain: 0.75 }, // Crisp
    { fundamental: 40, bandwidth: 7000, highpass: 5500, duration: 1.1, gain: 0.65 }, // Smooth
    { fundamental: 55, bandwidth: 11000, highpass: 7500, duration: 0.7, gain: 0.85 }, // Sharp
    { fundamental: 25, bandwidth: 5000, highpass: 4500, duration: 1.4, gain: 0.6 }, // Low
    { fundamental: 60, bandwidth: 12000, highpass: 8000, duration: 0.6, gain: 0.9 }, // High
  ]

  const params = hihatParams[variation]

  bandpass.frequency.setValueAtTime(params.bandwidth, audioContext.currentTime)
  bandpass.Q.setValueAtTime(0.5, audioContext.currentTime)
  highpass.frequency.setValueAtTime(params.highpass, audioContext.currentTime)

  // エンベロープゲインの設定
  envelopeGain.gain.setValueAtTime(params.gain, audioContext.currentTime)
  envelopeGain.gain.linearRampToValueAtTime(params.gain, audioContext.currentTime + 0.005)
  envelopeGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + params.duration)

  // マスターゲインの設定
  masterGain.gain.setValueAtTime(masterGainValue, audioContext.currentTime)

  ratios.forEach((ratio) => {
    const osc = audioContext.createOscillator()
    osc.type = 'square'
    osc.frequency.setValueAtTime(params.fundamental * ratio, audioContext.currentTime)
    osc.connect(bandpass)
    osc.start(audioContext.currentTime)
    osc.stop(audioContext.currentTime + params.duration)
  })

  // Add some noise for more realistic sound
  const bufferSize = audioContext.sampleRate * params.duration
  const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate)
  const noiseData = noiseBuffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    noiseData[i] = Math.random() * 2 - 1
  }

  const noise = audioContext.createBufferSource()
  noise.buffer = noiseBuffer
  noise.connect(bandpass)
  noise.start(audioContext.currentTime)

  // Add a subtle pitch bend for more natural sound
  ratios.forEach((ratio) => {
    const osc = audioContext.createOscillator()
    osc.type = 'square'
    osc.frequency.setValueAtTime(params.fundamental * ratio, audioContext.currentTime)
    osc.frequency.exponentialRampToValueAtTime(
      params.fundamental * ratio * 0.97,
      audioContext.currentTime + params.duration,
    )
    osc.connect(bandpass)
    osc.start(audioContext.currentTime)
    osc.stop(audioContext.currentTime + params.duration)
  })
}
// --------------------------------------------------
// open hihat end
// --------------------------------------------------

// --------------------------------------------------
// tom start
// --------------------------------------------------
function playTom(variation, masterGainValue) {
  // オーディオコンテキストが一時停止状態かどうかを確認
  if (audioContext.state === 'suspended') {
    // 一時停止状態の場合、オーディオコンテキストを再開してからキック音を再生
    audioContext.resume().then(() => {
      playTomSound(variation, masterGainValue)
    })
  } else {
    // 一時停止状態でない場合、直接キック音を再生
    playTomSound(variation, masterGainValue)
  }
}

function playTomSound(variation, masterGainValue) {
  const osc = audioContext.createOscillator()
  const oscEnvelope = audioContext.createGain()
  const noiseFilter = audioContext.createBiquadFilter()
  const noise = audioContext.createBufferSource()
  const noiseEnvelope = audioContext.createGain()
  const masterGain = audioContext.createGain()

  // ノイズ生成
  const bufferSize = audioContext.sampleRate * 2
  const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1
  }

  noise.buffer = buffer
  noiseFilter.type = 'lowpass'
  noise.connect(noiseFilter)
  noiseFilter.connect(noiseEnvelope)
  noiseEnvelope.connect(masterGain)

  osc.connect(oscEnvelope)
  oscEnvelope.connect(masterGain)
  masterGain.connect(audioContext.destination)

  const tomParams = [
    { frequency: 80, decay: 0.7, noiseCutoff: 600, noiseGain: 0.4, oscGain: 0.8 }, // Very Low Tom (改善)
    { frequency: 90, decay: 0.6, noiseCutoff: 700, noiseGain: 0.35, oscGain: 0.75 }, // Low Tom
    { frequency: 100, decay: 0.55, noiseCutoff: 800, noiseGain: 0.3, oscGain: 0.7 }, // Mid-Low Tom
    { frequency: 110, decay: 0.5, noiseCutoff: 900, noiseGain: 0.25, oscGain: 0.75 }, // Low-Mid Tom
    { frequency: 120, decay: 0.45, noiseCutoff: 1000, noiseGain: 0.2, oscGain: 0.8 }, // Mid Tom
    { frequency: 95, decay: 0.65, noiseCutoff: 750, noiseGain: 0.45, oscGain: 0.7 }, // Resonant Low Tom
    { frequency: 105, decay: 0.4, noiseCutoff: 950, noiseGain: 0.15, oscGain: 0.85 }, // Tight Low Tom
    { frequency: 85, decay: 0.75, noiseCutoff: 650, noiseGain: 0.5, oscGain: 0.9 }, // Floor Tom (改善)
  ]

  const params = tomParams[variation]

  osc.frequency.setValueAtTime(params.frequency, audioContext.currentTime)
  osc.frequency.exponentialRampToValueAtTime(params.frequency * 0.5, audioContext.currentTime + params.decay)

  noiseFilter.frequency.setValueAtTime(params.noiseCutoff, audioContext.currentTime)

  oscEnvelope.gain.setValueAtTime(params.oscGain, audioContext.currentTime)
  oscEnvelope.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + params.decay)

  noiseEnvelope.gain.setValueAtTime(params.noiseGain, audioContext.currentTime)
  noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + params.decay * 0.5)

  masterGain.gain.setValueAtTime(masterGainValue, audioContext.currentTime)

  osc.start(audioContext.currentTime)
  noise.start(audioContext.currentTime)
  osc.stop(audioContext.currentTime + params.decay)
  noise.stop(audioContext.currentTime + params.decay)
}
// --------------------------------------------------
// low tom end
// --------------------------------------------------

// --------------------------------------------------
// crash start
// --------------------------------------------------
function playCrash(variation, masterGainValue) {
  // オーディオコンテキストが一時停止状態かどうかを確認
  if (audioContext.state === 'suspended') {
    // 一時停止状態の場合、オーディオコンテキストを再開してからキック音を再生
    audioContext.resume().then(() => {
      playCrashSound(variation, masterGainValue)
    })
  } else {
    // 一時停止状態でない場合、直接キック音を再生
    playCrashSound(variation, masterGainValue)
  }
}

function playCrashSound(variation, masterGainValue) {
  const fundamental = audioContext.createOscillator()
  const fundamentalEnvelope = audioContext.createGain()
  const noiseFilter = audioContext.createBiquadFilter()
  const noise = audioContext.createBufferSource()
  const noiseEnvelope = audioContext.createGain()
  const highpassFilter = audioContext.createBiquadFilter()
  const masterGain = audioContext.createGain()

  // ノイズ生成
  const bufferSize = audioContext.sampleRate * 2
  const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1
  }

  noise.buffer = buffer
  noiseFilter.type = 'bandpass'
  noise.connect(noiseFilter)
  noiseFilter.connect(noiseEnvelope)
  noiseEnvelope.connect(highpassFilter)
  highpassFilter.connect(masterGain)

  fundamental.connect(fundamentalEnvelope)
  fundamentalEnvelope.connect(highpassFilter)
  masterGain.connect(audioContext.destination)

  const crashParams = [
    {
      frequency: 300,
      decay: 2.0,
      noiseCutoff: 8000,
      noiseQ: 1,
      highpassFreq: 2000,
      noiseGain: 0.8,
      fundamentalGain: 0.6,
    }, // Standard Crash
    {
      frequency: 400,
      decay: 1.5,
      noiseCutoff: 10000,
      noiseQ: 2,
      highpassFreq: 3000,
      noiseGain: 0.9,
      fundamentalGain: 0.5,
    }, // Bright Crash
    {
      frequency: 250,
      decay: 2.5,
      noiseCutoff: 6000,
      noiseQ: 0.5,
      highpassFreq: 1500,
      noiseGain: 0.7,
      fundamentalGain: 0.7,
    }, // Dark Crash
    {
      frequency: 350,
      decay: 1.0,
      noiseCutoff: 9000,
      noiseQ: 1.5,
      highpassFreq: 2500,
      noiseGain: 0.85,
      fundamentalGain: 0.55,
    }, // Quick Crash
    {
      frequency: 280,
      decay: 3.0,
      noiseCutoff: 7000,
      noiseQ: 0.7,
      highpassFreq: 1800,
      noiseGain: 0.75,
      fundamentalGain: 0.65,
    }, // Sustain Crash
    {
      frequency: 320,
      decay: 2.2,
      noiseCutoff: 8500,
      noiseQ: 1.2,
      highpassFreq: 2200,
      noiseGain: 0.82,
      fundamentalGain: 0.58,
    }, // Balanced Crash
    {
      frequency: 450,
      decay: 1.8,
      noiseCutoff: 11000,
      noiseQ: 2.5,
      highpassFreq: 3500,
      noiseGain: 0.95,
      fundamentalGain: 0.45,
    }, // Metallic Crash
    {
      frequency: 200,
      decay: 2.8,
      noiseCutoff: 5000,
      noiseQ: 0.3,
      highpassFreq: 1200,
      noiseGain: 0.6,
      fundamentalGain: 0.8,
    }, // Gong-like Crash
  ]

  const params = crashParams[variation]

  fundamental.frequency.setValueAtTime(params.frequency, audioContext.currentTime)
  fundamental.type = 'triangle'

  noiseFilter.frequency.setValueAtTime(params.noiseCutoff, audioContext.currentTime)
  noiseFilter.Q.setValueAtTime(params.noiseQ, audioContext.currentTime)

  highpassFilter.type = 'highpass'
  highpassFilter.frequency.setValueAtTime(params.highpassFreq, audioContext.currentTime)

  fundamentalEnvelope.gain.setValueAtTime(params.fundamentalGain, audioContext.currentTime)
  fundamentalEnvelope.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + params.decay)

  noiseEnvelope.gain.setValueAtTime(params.noiseGain, audioContext.currentTime)
  noiseEnvelope.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + params.decay)

  masterGain.gain.setValueAtTime(masterGainValue, audioContext.currentTime)

  fundamental.start(audioContext.currentTime)
  noise.start(audioContext.currentTime)
  fundamental.stop(audioContext.currentTime + params.decay)
  noise.stop(audioContext.currentTime + params.decay)
}
// --------------------------------------------------
// crash end
// --------------------------------------------------

// --------------------------------------------------
// cowbell start
// --------------------------------------------------
function playCowbell(variation, masterGainValue) {
  // オーディオコンテキストが一時停止状態かどうかを確認
  if (audioContext.state === 'suspended') {
    // 一時停止状態の場合、オーディオコンテキストを再開してからキック音を再生
    audioContext.resume().then(() => {
      playCowbellSound(variation, masterGainValue)
    })
  } else {
    // 一時停止状態でない場合、直接キック音を再生
    playCowbellSound(variation, masterGainValue)
  }
}

function playCowbell(variation, masterGainValue) {
  const osc1 = audioContext.createOscillator()
  const osc2 = audioContext.createOscillator()
  const gainOsc1 = audioContext.createGain()
  const gainOsc2 = audioContext.createGain()
  const masterGain = audioContext.createGain()

  osc1.connect(gainOsc1)
  osc2.connect(gainOsc2)
  gainOsc1.connect(masterGain)
  gainOsc2.connect(masterGain)
  masterGain.connect(audioContext.destination)

  const cowbellParams = [
    { freq1: 560, freq2: 845, decay: 0.7, balance: 0.7 }, // Standard Cowbell
    { freq1: 680, freq2: 1020, decay: 0.5, balance: 0.6 }, // High Cowbell
    { freq1: 480, freq2: 720, decay: 0.9, balance: 0.8 }, // Low Cowbell
    { freq1: 600, freq2: 900, decay: 0.6, balance: 0.5 }, // Balanced Cowbell
    { freq1: 520, freq2: 780, decay: 1.0, balance: 0.9 }, // Resonant Cowbell
    { freq1: 700, freq2: 1050, decay: 0.4, balance: 0.4 }, // Tight Cowbell
    { freq1: 540, freq2: 810, decay: 0.8, balance: 0.6 }, // Full Cowbell
    { freq1: 620, freq2: 930, decay: 0.5, balance: 0.7 }, // Bright Cowbell
  ]

  const params = cowbellParams[variation]

  osc1.frequency.value = params.freq1
  osc2.frequency.value = params.freq2

  gainOsc1.gain.setValueAtTime(params.balance, audioContext.currentTime)
  gainOsc2.gain.setValueAtTime(1 - params.balance, audioContext.currentTime)

  masterGain.gain.setValueAtTime(masterGainValue, audioContext.currentTime)
  masterGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + params.decay)

  osc1.type = 'square'
  osc2.type = 'square'

  osc1.start(audioContext.currentTime)
  osc2.start(audioContext.currentTime)
  osc1.stop(audioContext.currentTime + params.decay)
  osc2.stop(audioContext.currentTime + params.decay)
}
// --------------------------------------------------
// cowbell end
// --------------------------------------------------

// --------------------------------------------------
// clap start
// --------------------------------------------------
function playClap(variation, masterGainValue) {
  // オーディオコンテキストが一時停止状態かどうかを確認
  if (audioContext.state === 'suspended') {
    // 一時停止状態の場合、オーディオコンテキストを再開してからキック音を再生
    audioContext.resume().then(() => {
      playClapSound(variation, masterGainValue)
    })
  } else {
    // 一時停止状態でない場合、直接キック音を再生
    playClapSound(variation, masterGainValue)
  }
}

function playClap(variation, masterGainValue) {
  const noise = audioContext.createBufferSource()
  const noiseFilter = audioContext.createBiquadFilter()
  const noiseEnvelope = audioContext.createGain()
  const masterGain = audioContext.createGain()

  // ノイズ生成
  const bufferSize = audioContext.sampleRate * 0.5
  const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1
  }

  noise.buffer = buffer
  noiseFilter.type = 'bandpass'
  noise.connect(noiseFilter)
  noiseFilter.connect(noiseEnvelope)
  noiseEnvelope.connect(masterGain)
  masterGain.connect(audioContext.destination)

  const clapParams = [
    { filterFreq: 1500, Q: 5, decay: 0.2, echo: 0.05, echoGain: 0.7 }, // Standard Clap
    { filterFreq: 2000, Q: 7, decay: 0.15, echo: 0.03, echoGain: 0.6 }, // Tight Clap
    { filterFreq: 1200, Q: 4, decay: 0.25, echo: 0.07, echoGain: 0.8 }, // Full Clap
    { filterFreq: 1800, Q: 6, decay: 0.18, echo: 0.04, echoGain: 0.75 }, // Sharp Clap
    { filterFreq: 1000, Q: 3, decay: 0.3, echo: 0.08, echoGain: 0.85 }, // Fat Clap
    { filterFreq: 2200, Q: 8, decay: 0.12, echo: 0.02, echoGain: 0.5 }, // Crisp Clap
    { filterFreq: 1600, Q: 5.5, decay: 0.22, echo: 0.06, echoGain: 0.7 }, // Balanced Clap
    { filterFreq: 1400, Q: 4.5, decay: 0.28, echo: 0.09, echoGain: 0.8 }, // Resonant Clap
  ]

  const params = clapParams[variation]

  noiseFilter.frequency.value = params.filterFreq
  noiseFilter.Q.value = params.Q

  noiseEnvelope.gain.setValueAtTime(1, audioContext.currentTime)
  noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + params.decay)

  // メインのクラップ音
  noise.start(audioContext.currentTime)

  // エコー効果（複数の手が叩く音を模倣）
  for (let i = 1; i <= 3; i++) {
    const echo = audioContext.createBufferSource()
    const echoFilter = audioContext.createBiquadFilter()
    const echoEnvelope = audioContext.createGain()

    echo.buffer = buffer
    echoFilter.type = 'bandpass'
    echoFilter.frequency.value = params.filterFreq
    echoFilter.Q.value = params.Q

    echo.connect(echoFilter)
    echoFilter.connect(echoEnvelope)
    echoEnvelope.connect(masterGain)

    echoEnvelope.gain.setValueAtTime(0, audioContext.currentTime)
    echoEnvelope.gain.linearRampToValueAtTime(
      params.echoGain * (1 - i * 0.2),
      audioContext.currentTime + i * params.echo,
    )
    echoEnvelope.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + i * params.echo + params.decay * 0.5,
    )

    echo.start(audioContext.currentTime + i * params.echo)
  }

  masterGain.gain.setValueAtTime(masterGainValue, audioContext.currentTime)
}

// --------------------------------------------------
// clap end
// --------------------------------------------------

const sounds = {
  kick: [],
  snare: [],
  hihat_c: [],
  hihat_o: [],
  tom: [],
  crash: [],
  cowbell: [],
  clap: [],
}

for (let i = 0; i < 8; i++) {
  sounds.kick.push((gain) => playKick(i, gain))
  sounds.snare.push((gain) => playSnare(i, gain))
  sounds.hihat_c.push((gain) => playClosedHihat(i, gain))
  sounds.hihat_o.push((gain) => playOpenHihat(i, gain))
  sounds.tom.push((gain) => playTom(i, gain))
  sounds.crash.push((gain) => playCrash(i, gain))
  sounds.cowbell.push((gain) => playCowbell(i, gain))
  sounds.clap.push((gain) => playClap(i, gain))
}
