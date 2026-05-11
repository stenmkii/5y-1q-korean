// 単語データ
const wordList = [
    {word: "몇시", meaning: "何時", note: ""},
    {word: "늦었어요?", meaning: "遅れましたか", note: "基本形「늦다」"},
    {word: "벌써", meaning: "もう、すでに", note: ""},
    {word: "가면", meaning: "行けば", note: ""},
    {word: "곧", meaning: "すぐ", note: ""},
    {word: "괜찮아요", meaning: "大丈夫です", note: ""},
    {word: "알바", meaning: "アルバイト", note: "「아르바イト」の縮約形"},
    {word: "힘내세요", meaning: "頑張ってください", note: "元気出してください"},
    {word: "시간", meaning: "時間", note: ""},
    {word: "파이팅", meaning: "ファイト", note: "応援の言葉"},
    {word: "부터", meaning: "〜から", note: "時間などを表す助詞"},
    {word: "들어요?", meaning: "聴きますか", note: ""},
    {word: "맞아요", meaning: "その通りです", note: "相づち表現"},
    {word: "케이팝이요", meaning: "K-POPです", note: ""},
    {word: "받을 때", meaning: "受けるとき", note: "もらうとき"},
    {word: "특히 [트키]", meaning: "特に", note: ""},
    {word: "멜ロディ", meaning: "メロディー", note: ""},
    {word: "스트레스", meaning: "ストレス", note: ""},
    {word: "가사", meaning: "歌詞", note: ""},
    {word: "최고", meaning: "最高", note: ""},
    {word: "예뻐요", meaning: "きれいです", note: "かわいいです"},
    {word: "공감백배", meaning: "すごく共感", note: "〈共感百倍〉"},
    {word: "-마다", meaning: "〜ごとに", note: "〜によって"},
    {word: "오빠", meaning: "お兄さん", note: ""},
    {word: "야간", meaning: "夜間", note: ""},
    {word: "다르지만", meaning: "違うけど", note: "基本形「다르다」"},
    {word: "자율 학습", meaning: "自律学習", note: "自習"},
    {word: "자습하다 [자스파다]", meaning: "自習する", note: ""},
    {word: "-까지", meaning: "〜まで", note: "助詞"},
    {word: "-하는 거야", meaning: "〜するものだよ", note: ""},
    {word: "늦어요", meaning: "遅いです", note: ""},
    {word: "-에서요?", meaning: "〜でですか", note: "聞き返し表現"},
    {word: "걱정 마", meaning: "心配しないで", note: ""}
];

let currentIndex = 0;
const cardTrigger = document.getElementById('card-trigger');
const wordDisplay = document.getElementById('word-display');
const meaningDisplay = document.getElementById('meaning-display');
const noteDisplay = document.getElementById('note-display');
const counterDisplay = document.getElementById('counter');

function updateCard() {
    cardTrigger.classList.remove('flipped');
    setTimeout(() => {
        const item = wordList[currentIndex];
        wordDisplay.textContent = item.word;
        meaningDisplay.textContent = item.meaning;
        noteDisplay.textContent = item.note;
        counterDisplay.textContent = `${currentIndex + 1} / ${wordList.length}`;
    }, 150);
}

cardTrigger.onclick = () => cardTrigger.classList.toggle('flipped');

document.getElementById('prev-btn').onclick = () => {
    if (currentIndex > 0) { currentIndex--; updateCard(); }
};

document.getElementById('next-btn').onclick = () => {
    if (currentIndex < wordList.length - 1) { currentIndex++; updateCard(); }
};

// 初期表示
updateCard();
