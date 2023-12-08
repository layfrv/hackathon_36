const createResultString = (n) => {
  const checkOneNumber = n % 10;

  if (n === 1 || checkOneNumber === 1 && n !== 11) {
    return `${n} ход`;
  }
  if (n >= 2 && n <= 4) {
    return `${n} хода`;
  } 
  return `${n} ходов`;
};  

export default createResultString;