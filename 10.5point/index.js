// card ={ flower, point, toString }

// 寫成類別
// class Card {
//   constructor(flower, point) {
//     this.flower = flower;
//     this.point = point;
//   }

//   toString() {
//     let display = '';

//     switch (this.point) {
//       case 1:
//         display = 'A';
//         break;
//       case 11:
//         display = 'J';
//         break;
//       case 12:
//         display = 'Q';
//         break;
//       case 13:
//         display = 'K';
//         break;
//       default:
//         display = this.point;
//         break;
//     }

//     return Poker.getCardImage(150, this.flower, display);
//   }
// }
// flower: h, d, s, c
// point:[A,......., JOKER ]
// 產生物件的工廠模式
const createCard = (flower, point) => {
  return {
    flower,
    point,
    toString: function () {
      let display = '';

      switch (this.point) {
        case 1:
          display = 'A';
          break;
        case 11:
          display = 'J';
          break;
        case 12:
          display = 'Q';
          break;
        case 13:
          display = 'K';
          break;
        default:
          display = this.point;
          break;
      }

      return Poker.getCardImage(150, this.flower, display);
    },
  };
};

// 產生52張牌用
const initCards = () => {
  const cards = [];
  const flowers = ['h', 'd', 's', 'c'];
  const points = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  for (let i = 0; i < flowers.length; i++) {
    for (let j = 0; j < points.length; j++) {
      cards.push(createCard(flowers[i], points[j]));
    }
  }

  return cards;
};

// 洗牌用
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 呈現卡牌用
const displayCard = (card) => {
  document.getElementById('cards').appendChild(card.toString());
};

// 全域的牌-陣列
let cards = shuffle(initCards()); //目前所有卡牌
let index = 0; //抽到第幾張(從0開始計算索引值)
let total = 0; //目前點數

document.getElementById('dispatch').addEventListener('click', () => {
  // 顯示卡片
  displayCard(cards[index]);

  let point = cards[index].point;
  // 如果點數是11, 12, 13 算是半點
  if (point > 10) point = 0.5;

  total += point;

  document.getElementById('point').innerHTML = `目前點數 ${total}`;

  if (total > 10.5) {
    document.getElementById('result').innerHTML = `爆掉了`;
    document.getElementById('dispatch').disabled = true;
  }

  // 索引值加1
  index++;
});

document.getElementById('reset').addEventListener('click', () => {
  // 顯示卡片
  cards = shuffle(initCards());
  index = 0;
  total = 0;

  // 清空所有的顯示文字
  document.getElementById('cards').innerHTML = '';
  document.getElementById('point').innerHTML = '';
  document.getElementById('result').innerHTML = '';
  document.getElementById('dispatch').disabled = false;
});

//banker's turn
document.getElementById('over').addEventListener('click', () => {
  let keep = true;
  // while (keep) {
  //   getDataFromServer();
  //   keep = getDataFromServer() ? true : false;
  //   console.log(`keep=${keep}`);
  //   setTimeout('', 2000);
  // }
  keep = getDataFromServer(cards) ? true : false;
  console.log(`keep=${keep}`);
  setTimeout('', 2000);
});

const getDataFromServer = async (cards) => {
  try {
    // ask server whether get another card
    //const newData = { cards };
    // 連接伺服器
    // = 'https://cors-anywhere.herokuapp.com/';
    const url = 'http://localhost/practice/bankGetCard.php';
    const response = await fetch(`${url}`, {
      // 使用的方法
      method: 'POST',
      // 指示此資料為json格式
      headers: new Headers({
        Accept: 'application/json',
        // 'Content-Type': 'application/json',
      }),
      // 傳送的主體資料(json格式)
      body: encodeURI(
        JSON.stringify({
          cards: cards,
        })
      ),
    });
    // 由response物件，剖析出json資料
    const data = await response.json();
    console.log(data);

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
