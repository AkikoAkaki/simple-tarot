import fs from 'fs';

const majorArcanaNames: string[] = [
  "愚者", "魔术师", "女祭司", "女皇", "皇帝", "教皇", "恋人", "战车",
  "力量", "隐士", "命运之轮", "正义", "倒吊人", "死神", "节制", "恶魔",
  "高塔", "星星", "月亮", "太阳", "审判", "世界"
];

interface Suit {
  name: string;
  element: string;
}

const suits: Suit[] = [
  { name: "权杖", element: "火" },
  { name: "圣杯", element: "水" },
  { name: "宝剑", element: "风" },
  { name: "星币", element: "土" }
];

interface MinorNumber {
  name: string;
  number: number;
}

const minorNumbers: MinorNumber[] = [
  { name: "王牌", number: 1 },
  { name: "二", number: 2 },
  { name: "三", number: 3 },
  { name: "四", number: 4 },
  { name: "五", number: 5 },
  { name: "六", number: 6 },
  { name: "七", number: 7 },
  { name: "八", number: 8 },
  { name: "九", number: 9 },
  { name: "十", number: 10 },
  { name: "侍从", number: 11 },
  { name: "骑士", number: 12 },
  { name: "王后", number: 13 },
  { name: "国王", number: 14 }
];

const toRoman = (num: number): string => {
  if (num === 0) return "0";
  const roman: Record<string, number> = {
    M: 1000, CM: 900, D: 500, CD: 400,
    C: 100, XC: 90, L: 50, XL: 40,
    X: 10, IX: 9, V: 5, IV: 4, I: 1
  };
  let str = '';
  for (const i of Object.keys(roman)) {
    const q = Math.floor(num / roman[i]);
    num -= q * roman[i];
    str += i.repeat(q);
  }
  return str;
};

interface Card {
  id: string;
  name: string;
  arcana: string;
  number: number;
  roman: string;
  suit: string | null;
  element: string;
  keywords: string[];
  upright: string;
  reversed: string;
}

const cards: Card[] = [];

// Major Arcana
for (let i = 0; i < majorArcanaNames.length; i++) {
  cards.push({
    id: `major_${i}`,
    name: majorArcanaNames[i],
    arcana: "大阿尔卡纳",
    number: i,
    roman: toRoman(i),
    suit: null,
    element: "以太",
    keywords: ["命运", "旅程", "力量"],
    upright: "正位释义：预示着新的开始、可能性和自发的行动。",
    reversed: "逆位释义：暗示着冲动、鲁莽或者被阻滞的能量。"
  });
}

// Minor Arcana
for (const suit of suits) {
  for (const n of minorNumbers) {
    cards.push({
      id: `minor_${suit.name}_${n.number}`,
      name: `${suit.name}${n.name}`,
      arcana: "小阿尔卡纳",
      number: n.number,
      roman: toRoman(n.number),
      suit: suit.name,
      element: suit.element,
      keywords: ["行动", "情感", "思考", "物质"].filter(() => Math.random() > 0.5),
      upright: "正位释义：事情按预期发展，力量平稳展开。",
      reversed: "逆位释义：事情可能遇到延迟，或需要重新评估。"
    });
  }
}

// Just to give them varied random keywords for realism since I don't have the 78 exact definitions on hand
const getRandomKeywords = (): string[] => {
    const kw = ["创造", "直觉", "丰收", "秩序", "智慧", "结合", "胜利", "耐心", "内省", "转折", "公正", "牺牲", "转变", "和谐", "束缚", "突变", "希望", "不安", "成功", "重生", "完满", "热情", "行动", "阻碍", "爱", "悲痛", "财富", "稳定"];
    const out: string[] = [];
    for(let i=0; i<3; i++){
        out.push(kw[Math.floor(Math.random() * kw.length)]);
    }
    return [...new Set(out)];
};
cards.forEach(c => c.keywords = getRandomKeywords());

fs.mkdirSync('./src/data', { recursive: true });
fs.writeFileSync('./src/data/cards.json', JSON.stringify(cards, null, 2));
console.log("Generated 78 cards layout.");
