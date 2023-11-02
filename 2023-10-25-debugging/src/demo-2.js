const array = [1,2,3,4,5];

const square = (number) => {
  return number * number;
}

for (let index = 0; index < array.length; index++) {
  const element = array[index];

  debugger;
  const squaredIndex = square(index);

  console.log(squaredIndex);
}