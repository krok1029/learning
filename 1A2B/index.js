let ans = [];
let turn = 0;
let display = '';
let guessArr = [];
const byId = (id) => {
  return document.getElementById(id);
};

const startBtn = byId('start');
const guessNum = byId('guess');
const submitBtn = byId('submit');
const tbody = byId('tbody');
const sign = byId('sign');

const eventListener = (element, action, func) => {
  element.addEventListener(action, func);
};

const x = () => {
  let a = 0;
  let b = 0;
  const value = guessNum.value;

  for (let i = 0; i < 4; i++) {
    if (value[i] == ans[i]) {
      a += 1;
    }
  }
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (i != j) {
        if (value[i] == ans[j]) {
          b += 1;
        }
      }
    }
  }

  guessNum.value = '';
  turn += 1;
  display += `<tr><td>${turn}</td><td>${value}</td><td>${a}A${b}B</td></tr>`;

  if (a == 4) {
    sign.innerHTML = 'YOU Genius!!!';
    display = '';
    turn = 0;
  }

  if (turn == 11 && a < 4) {
    sign.innerHTML = 'YOU SUCK!!!';
    display = '';
    turn = 0;
  }

  tbody.innerHTML = display;
  guessArr.length = 0;
};

//random 4 unrepeated num for ans
eventListener(startBtn, 'click', () => {
  ans.length = 0;
  for (let i = 0; i < 10; i++) {
    ans.push(i);
  }

  ans.sort(() => {
    //隨機打亂這個陣列
    return Math.random() - 0.5;
  });
  ans.length = 4;
  console.log(ans);
  sign.innerHTML = 'START!!!';
  tbody.innerHTML = '';
  display = '';
  turn = 0;
});

eventListener(guessNum, 'keyup', (event) => {
  /// is number
  if (event.keyCode > 47 && event.keyCode < 58) {
    let result = guessArr.findIndex((v) => {
      return v == event.key;
    });
    //has repeat num
    if (result < 0 && guessNum.value.length < 5) {
      // guessNum.value = '';
      guessArr.push(event.key);
    } else {
      console.log(`repeat=${event.key}`);
      console.log(`guessArr=${guessArr.join('')}`);
      guessNum.value = guessArr.join('');
      event.key = '';
    }
  } else if (event.key == 'Backspace' || event.key == 'Escape') {
    guessArr.length = 0;
    guessNum.value = guessArr.join('');
    event.key = '';
  }
});

//get user input num
// eventListener(guessNum, 'keyup', (event) => {
//   let i = 0;

//   for (let k = 0; k < lastNum.length; k++) {
//     if (event.key === lastNum[k]) {
//       //   console.log(`event.key===lastNum[k] = ${event.key}`);
//       //   console.log(`lastNum[k] = ${lastNum[k]}`);
//       i = 1;
//     }
//   }

//   if (i == 1) {
//     // console.log(`lastNUM.lwe = ${lastNum.length}`);
//     guessNum.value = lastNum;
//   } else {
//     switch (event.key) {
//       case '0':
//       case '1':
//       case '2':
//       case '3':
//       case '4':
//       case '5':
//       case '6':
//       case '7':
//       case '8':
//       case '9':
//         if (lastNum.length == 4) {
//           guessNum.value = lastNum;
//           break;
//         }
//         lastNum = guessNum.value;
//         // console.log(`lastNUM = ${lastNum}`);
//         break;
//       case 'Backspace':
//         lastNum = guessNum.value;
//         break;
//       case 'Escape':
//         lastNum = '';
//         guessNum.value = lastNum;
//         break;

//       default:
//         guessNum.value = lastNum;
//         break;
//     }
//   }
// });

eventListener(guessNum, 'keypress', (event) => {
  if (event.key === 'Enter') {
    x();
  }
});

eventListener(submitBtn, 'click', () => x());
