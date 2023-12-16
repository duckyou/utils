export function bpmToMs(bpm: number, rate: number, rhythm: string): string {
  const msPerOne = 60000 / bpm;
  if (rhythm === 'common') {
    return (msPerOne * (4 * rate)).toFixed(2);
  } else if (rhythm === 'dotted') {
    return (msPerOne * (6 * rate)).toFixed(2);
  } else if (rhythm === 'triplet') {
    return (msPerOne * (2.664 * rate)).toFixed(2);
  }

  throw new TypeError(`Unsupported Rhythm: ${rhythm}`);
}


export function bpmToHz(bpm: number, rate: number, rhythm: string): string {
  const hzPerOne = bpm / 60
  if (rhythm === 'common') {
    return (hzPerOne / (4 * rate)).toFixed(2);
  } else if (rhythm === 'dotted') {
    return (hzPerOne / (6 * rate)).toFixed(2);
  } else if (rhythm === 'triplet') {
    return (hzPerOne / (2.664 * rate)).toFixed(2);
  }

  throw new TypeError(`Unsupported Rhythm: ${rhythm}`);
}