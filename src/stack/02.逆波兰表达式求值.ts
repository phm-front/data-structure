// leetcode 150
function evalRPN(tokens: string[]): number {
  const stack: number[] = [];
  let len = tokens.length;
  for (let i = 0; i < len; i++) {
    let preNumber: number, nextNumber: number;
    switch (tokens[i]) {
      case '+':
        nextNumber = stack.pop()!;
        preNumber = stack.pop()!;
        stack.push(preNumber + nextNumber);
        break;
      case '-':
        nextNumber = stack.pop()!;
        preNumber = stack.pop()!;
        stack.push(preNumber - nextNumber);
        break;
      case '*':
        nextNumber = stack.pop()!;
        preNumber = stack.pop()!;
        stack.push(preNumber * nextNumber);
        break;
      case '/':
        nextNumber = stack.pop()!;
        preNumber = stack.pop()!;
        stack.push(Math.trunc(preNumber / nextNumber));
        break;
      default:
        stack.push(+tokens[i]);
        break;
    }
  }
  return stack.pop()!;
}
const tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]

console.log(evalRPN(tokens))
