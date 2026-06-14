const LETTER_MAP = {
  a: 1, i: 1, j: 1, q: 1, y: 1,
  b: 2, k: 2, r: 2,
  c: 3, g: 3, l: 3, s: 3,
  d: 4, m: 4, t: 4,
  e: 5, h: 5, n: 5, x: 5,
  u: 6, v: 6, w: 6,
  o: 7, z: 7,
  f: 8, p: 8
};

function normalizeString(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[ñ]/g, 'n')
    .replace(/[ç]/g, 'c')
    .replace(/[^a-z]/g, '');
}

function reduceNumber(num, preserveMaster = false) {
  let current = num;
  while (current > 9) {
    if (preserveMaster && (current === 11 || current === 22)) return current;
    const digits = current.toString().split('').map(Number);
    current = digits.reduce((acc, d) => acc + d, 0);
  }
  return current || 1;
}

function calculateExpression(name) {
  const normalized = normalizeString(name);
  let sum = 0;
  for (const char of normalized) {
    if (LETTER_MAP[char] !== undefined) sum += LETTER_MAP[char];
  }
  return reduceNumber(sum, true);
}

function calculateSoulNumber(name) {
  const normalized = normalizeString(name);
  const vogals = ['a', 'e', 'i', 'o', 'u'];
  let sum = 0;
  for (const char of normalized) {
    if (vogals.includes(char) && LETTER_MAP[char] !== undefined) sum += LETTER_MAP[char];
  }
  return reduceNumber(sum, true);
}

function calculateDestiny(dateStr) {
  const numbersOnly = dateStr.replace(/\D/g, '');
  const sum = numbersOnly.split('').map(Number).reduce((acc, d) => acc + d, 0);
  return reduceNumber(sum, true);
}

function calculateCompatibility(p1Name, p1Date, p2Name, p2Date) {
  const soul1 = calculateSoulNumber(p1Name);
  const exp1 = calculateExpression(p1Name);
  const dest1 = calculateDestiny(p1Date);
  const soul2 = calculateSoulNumber(p2Name);
  const exp2 = calculateExpression(p2Name);
  const dest2 = calculateDestiny(p2Date);

  const reducedSoul1 = soul1 > 9 ? reduceNumber(soul1, false) : soul1;
  const reducedExp1 = exp1 > 9 ? reduceNumber(exp1, false) : exp1;
  const reducedSoul2 = soul2 > 9 ? reduceNumber(soul2, false) : soul2;
  const reducedExp2 = exp2 > 9 ? reduceNumber(exp2, false) : exp2;
  const reducedDest1 = dest1 > 9 ? reduceNumber(dest1, false) : dest1;
  const reducedDest2 = dest2 > 9 ? reduceNumber(dest2, false) : dest2;

  const totalSum = reducedSoul1 + reducedExp1 + reducedDest1 + reducedSoul2 + reducedExp2 + reducedDest2;
  const finalNumber = reduceNumber(totalSum, false);

  const raw = ((reducedSoul1 * 13) + (reducedExp1 * 7) + (reducedDest1 * 11) + (reducedSoul2 * 17) + (reducedExp2 * 5) + (reducedDest2 * 3)) % 36;
  const percentage = Math.max(55, Math.min(97, 55 + raw));

  return {
    soulNumberP1: soul1,
    expressionP1: exp1,
    destinyP1: dest1,
    soulNumberP2: soul2,
    expressionP2: exp2,
    destinyP2: dest2,
    finalNumber,
    percentage
  };
}

export {
  calculateCompatibility,
  calculateDestiny,
  calculateSoulNumber,
  calculateExpression,
  reduceNumber
};
