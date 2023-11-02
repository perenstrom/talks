const array = [1,2,3,4,5];

const square = (number) => {
  const number1 = number;
  const number2 = number;

  return number1 * number2;
}

for (let index = 0; index < array.length; index++) {
  const element = array[index];

  debugger;
  const squaredIndex = square(index);

  console.log(squaredIndex);
}