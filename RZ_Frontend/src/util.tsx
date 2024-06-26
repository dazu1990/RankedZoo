export const roundToTwo = (num: number) => {
  return Math.round((num + Number.EPSILON) * 100) / 100
}

export const percentile = (arr: any[], val: any) => {
    let count = 0;
    arr.forEach(v => {
      if (v < val) {
        count++;
      } else if (v == val) {
        count += 0.5;
      }
    });
    return 100 * count / arr.length;
  }