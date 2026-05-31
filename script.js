/**
 * 1. 共通データ定義
 */
const wordList = [
    {word: "몇시", meaning: "何時", note: ""},
    {word: "늦었어요?", meaning: "遅れましたか", note: "基本形「늦다」"},
    {word: "벌써", meaning: "もう、すでに", note: ""},
    {word: "가면", meaning: "行けば", note: ""},
    {word: "곧", meaning: "すぐ", note: ""},
    {word: "괜찮아요", meaning: "大丈夫です", note: ""},
    {word: "알바", meaning: "アルバイト", note: "「아르바이트」の縮約形"},
    {word: "힘내세요", meaning: "頑張ってください", note: "元気出してください"},
    {word: "時間", meaning: "時間", note: "시간"},
    {word: "파이팅", meaning: "ファイト", note: "応援の言葉"},
    {word: "부터", meaning: "〜から", note: "時間などを表す助詞"},
    {word: "들어요?", meaning: "聴きますか", note: ""},
    {word: "맞아요", meaning: "その通りです", note: "相づち表現"},
    {word: "케이팝이요", meaning: "K-POPです", note: ""},
    {word: "받을 때", meaning: "受けるとき", note: "もらうとき"},
    {word: "특히 [트키]", meaning: "特に", note: ""},
    {word: "멜로디", meaning: "メロディー", note: ""},
    {word: "스트레스", meaning: "ストレス", note: ""},
    {word: "가사", meaning: "歌詞", note: ""},
    {word: "최고", meaning: "最高", note: ""},
    {word: "예뻐요", meaning: "きれいです", note: "かわいいです"},
    {word: "공감백배", meaning: "すごく共感", note: "共感百倍"},
    {word: "-마다", meaning: "〜ごとに", note: "〜によって"},
    {word: "오빠", meaning: "お兄さん", note: ""},
    {word: "야간", meaning: "夜間", note: ""},
    {word: "다르지만", meaning: "違うけど", note: "基本形「다르다」"},
    {word: "자율 학습", meaning: "自律学習", note: "自習"},
    {word: "자습하다", meaning: "自習する", note: "[자스파다]"},
    {word: "-まで", meaning: "〜まで", note: "-까지"},
    {word: "-するんだよ", meaning: "〜するものだよ", note: "-하는 거야"},
    {word: "늦어요", meaning: "遅いです", note: ""},
    {word: "-에서요?", meaning: "〜でですか", note: "聞き返し"},
    {word: "걱정 마", meaning: "心配しないで", note: ""}
];

const numBase = [
    { n: 1, kr: "하나", mod: "한", jp: "1つ" },
    { n: 2, kr: "둘", mod: "두", jp: "2つ" },
    { n: 3, kr: "셋", mod: "세", jp: "3つ" },
    { n: 4, kr: "넷", mod: "네", jp: "4つ" },
    { n: 5, kr: "다섯", mod: "다섯", jp: "5つ" },
    { n: 6, kr: "여섯", mod: "여섯", jp: "6つ" },
    { n: 7, kr: "일곱", mod: "일곱", jp: "7つ" },
    { n: 8, kr: "여덟", mod: "여덟", jp: "8つ" },
    { n: 9, kr: "아홉", mod: "아홉", jp: "9つ" },
    { n: 10, kr: "열", mod: "열", jp: "10つ" }
];

const irregQuestions = [
    { word: "걷다 (歩く)", instruction: "ヘヨ体(現在形)は？", options: ["걸어요", "걷어요", "걸아요", "걷아요"], correct: 0 },
    { word: "듣다 (聞く)", instruction: "過去形(〜ました)は？", options: ["들었어요", "듣었어요", "들았어요", "듣았어요"], correct: 0 },
    { word: "돕다 (助ける)", instruction: "ヘヨ体(現在形)は？", options: ["도와요", "도워요", "돕아요", "도와요"], correct: 0 },
    { word: "춥다 (寒い)", instruction: "連結形(〜くて)は？", options: ["추워서", "춥아서", "추오서", "추워요"], correct: 0 },
    { word: "닫다 (閉める)", instruction: "ヘヨ体(現在形)は？", options: ["닫아요", "달아요", "닫어요", "달어요"], correct: 0 }
];

/**
 * 2. 単語帳ロジック (単語帳.html)
 */
if (document.getElementById('card-trigger')) {
    let wordIdx = 0;
    const card = document.getElementById('card-trigger');
    const updateWord = () => {
        card.classList.remove('flipped');
        setTimeout(() => {
            document.getElementById('word-display').textContent = wordList[wordIdx].word;
            document.getElementById('meaning-display').textContent = wordList[wordIdx].meaning;
            document.getElementById('note-display').textContent = wordList[wordIdx].note;
            document.getElementById('counter').textContent = `${wordIdx + 1} / ${wordList.length}`;
        }, 150);
    };
    card.onclick = () => card.classList.toggle('flipped');
    document.getElementById('prev-btn').onclick = () => { if (wordIdx > 0) { wordIdx--; updateWord(); } };
    document.getElementById('next-btn').onclick = () => { if (wordIdx < wordList.length - 1) { wordIdx++; updateWord(); } };
    updateWord();
}

/**
 * 3. 固有数詞ロジック (固有数詞.html)
 */
let numQuestions = [], numIdx = 0, numScore = 0, isAnsweringNum = false;

function showMenu() {
    document.getElementById('menu').classList.remove('hidden');
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('result').classList.add('hidden');
}

function startNumQuiz(mode) {
    numIdx = 0; numScore = 0;
    if (mode === 'kn-jp') {
        numQuestions = numBase.map(i => ({ q: i.kr, a: i.jp, title: "ハングル → 日本語", choices: numBase.map(b => b.jp) }));
    } else if (mode === 'jp-kn') {
        numQuestions = numBase.map(i => ({ q: i.jp, a: i.kr, title: "日本語 → ハングル", choices: numBase.map(b => b.kr) }));
    } else if (mode === 'unit') {
        const units = [{n:"個", c:"개"}, {n:"歳", c:"살"}, {n:"時", c:"시"}];
        numQuestions = numBase.map(i => {
            const u = units[Math.floor(Math.random() * units.length)];
            return { q: `${i.n}${u.n}`, a: (i.n <= 4 ? i.mod : i.kr) + " " + u.c, title: "助数詞との結合", choices: numBase.map(b => (b.n <= 4 ? b.mod : b.kr) + " " + u.c) };
        });
    }
    numQuestions.sort(() => Math.random() - 0.5);
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden');
    showNumQuestion();
}

function showNumQuestion() {
    isAnsweringNum = false;
    const q = numQuestions[numIdx];
    document.getElementById('progress').innerText = `STEP ${numIdx + 1} / ${numQuestions.length}`;
    document.getElementById('section-title').innerText = q.title;
    document.getElementById('question').innerText = q.q;
    const optDiv = document.getElementById('options');
    optDiv.innerHTML = '';
    let choices = [...new Set([q.a, ...q.choices.sort(() => Math.random() - 0.5).slice(0, 3)])].sort(() => Math.random() - 0.5);
    choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.innerText = choice;
        btn.onclick = () => {
            if (isAnsweringNum) return; isAnsweringNum = true;
            if (choice === q.a) { btn.classList.add('correct'); numScore++; } 
            else { btn.classList.add('wrong'); Array.from(optDiv.children).forEach(b => { if(b.innerText === q.a) b.classList.add('correct'); }); }
            setTimeout(() => { numIdx++; if (numIdx < numQuestions.length) showNumQuestion(); else showNumResult(); }, 1000);
        };
        optDiv.appendChild(btn);
    });
}

function showNumResult() {
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('result-score').innerText = `${numScore} / ${numQuestions.length}`;
}

/**
 * 4. 不規則活用ロジック (不規則活用.html)
 */
if (document.getElementById('irreg-quiz-screen')) {
    let irregIdx = 0, irregScore = 0, answeredIrreg = false;
    const loadIrreg = () => {
        answeredIrreg = false;
        const q = irregQuestions[irregIdx];
        document.getElementById('irreg-word').innerText = q.word;
        document.getElementById('irreg-instruction').innerText = q.instruction;
        document.getElementById('irreg-feedback').innerText = "";
        document.getElementById('irreg-next-btn').classList.add('hidden');
        document.getElementById('irreg-counter').innerText = `${irregIdx + 1} / ${irregQuestions.length}`;
        const optDiv = document.getElementById('irreg-options');
        optDiv.innerHTML = "";
        q.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'btn';
            btn.innerText = opt;
            btn.onclick = () => {
                if (answeredIrreg) return; answeredIrreg = true;
                if (i === q.correct) { btn.classList.add('correct'); document.getElementById('irreg-feedback').innerText = "正解！ ✨"; irregScore++; }
                else { btn.classList.add('wrong'); optDiv.children[q.correct].classList.add('correct'); document.getElementById('irreg-feedback').innerText = "不正解..."; }
                document.getElementById('irreg-next-btn').classList.remove('hidden');
            };
            optDiv.appendChild(btn);
        });
    };
    document.getElementById('irreg-next-btn').onclick = () => {
        irregIdx++;
        if (irregIdx < irregQuestions.length) loadIrreg();
        else {
            document.getElementById('irreg-quiz-screen').classList.add('hidden');
            document.getElementById('irreg-result-screen').classList.remove('hidden');
            document.getElementById('irreg-score-text').innerText = `${irregScore} / ${irregQuestions.length} 正解！`;
        }
    };
    loadIrreg();
}

/**
 * 5. 時計読みクイズロジック (時計.html用)
 */
if (document.getElementById('clock-quiz-screen')) {
    // 1〜12時の固有数詞マップ (助数詞「시」に結合する変形形を適用)
    const clockHourKr = {
        1: "한", 2: "두", 3: "세", 4: "네", 5: "다섯", 
        6: "여섯", 7: "일곱", 8: "여덟", 9: "아홉", 10: "열", 
        11: "열한", 12: "열두"
    };

    // 0〜55分(5分刻み)の漢数詞マップ
    const clockMinKr = {
        0: "", // 0分の時は「分」を表示しない、または「정각(正刻)」だが、初心者は空文字が一般的
        5: "오", 10: "십", 15: "십오", 20: "이십", 25: "이십오",
        30: "삼십", 35: "삼십오", 40: "사십", 45: "사십오", 50: "오십", 55: "오십오"
    };

    let clockIdx = 0, clockScore = 0, answeredClock = false;
    let clockQuestions = [];

    // クイズデータの生成 (5問分をランダムに事前ビルド)
    const generateClockQuestions = () => {
        const questions = [];
        for (let i = 0; i < 5; i++) {
            const h = Math.floor(Math.random() * 12) + 1; // 1~12
            const m = Math.floor(Math.random() * 12) * 5;  // 0, 5, 10...55
            
            // 正解文字列の構築 (例: "한 시 삼십 분" / "두 시")
            const answerStr = `${clockHourKr[h]} 시` + (m > 0 ? ` ${clockMinKr[m]} 분` : '');
            
            // ダミーの選択肢を作るためにプールを用意
            const pool = new Set([answerStr]);
            while (pool.size < 4) {
                const dh = Math.floor(Math.random() * 12) + 1;
                const dm = Math.floor(Math.random() * 12) * 5;
                const dummyStr = `${clockHourKr[dh]} 시` + (dm > 0 ? ` ${clockMinKr[dm]} 분` : '');
                pool.add(dummyStr);
            }

            questions.push({
                hour: h,
                minute: m,
                correctText: answerStr,
                options: [...pool].sort(() => Math.random() - 0.5)
            });
        }
        return questions;
    };

    clockQuestions = generateClockQuestions();

    const loadClockQuestion = () => {
        answeredClock = false;
        const q = clockQuestions[clockIdx];

        // カウンターと表示リセット
        document.getElementById('clock-counter').innerText = `${clockIdx + 1} / ${clockQuestions.length}`;
        document.getElementById('clock-feedback').innerText = "";
        document.getElementById('clock-feedback').className = ""; 
        document.getElementById('clock-next-btn').classList.add('hidden');

        // 時計の針を物理的に回転させる
        const hourHand = document.getElementById('clock-hour-hand');
        const minuteHand = document.getElementById('clock-minute-hand');
        
        const minDeg = q.minute * 6; // 1分あたり6度
        const hourDeg = (q.hour % 12) * 30 + (q.minute * 0.5); // 1時間あたり30度 + 分によるズレ

        hourHand.style.transform = `rotate(${hourDeg}deg)`;
        minuteHand.style.transform = `rotate(${minDeg}deg)`;

        // 選択肢ボタンの生成
        const optDiv = document.getElementById('clock-options');
        optDiv.innerHTML = "";

        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'btn';
            btn.innerText = opt;
            btn.onclick = () => {
                if (answeredClock) return;
                answeredClock = true;

                if (opt === q.correctText) {
                    btn.classList.add('correct');
                    document.getElementById('clock-feedback').innerText = "正解！ ✨";
                    clockScore++;
                } else {
                    btn.classList.add('wrong');
                    // 正解のボタンをハイライト
                    Array.from(optDiv.children).forEach(b => {
                        if (b.innerText === q.correctText) b.classList.add('correct');
                    });
                    document.getElementById('clock-feedback').innerText = "不正解...";
                }
                document.getElementById('clock-next-btn').classList.remove('hidden');
            };
            optDiv.appendChild(btn);
        });
    };

    // 次へボタンのイベントハンドラ
    document.getElementById('clock-next-btn').onclick = () => {
        clockIdx++;
        if (clockIdx < clockQuestions.length) {
            loadClockQuestion();
        } else {
            document.getElementById('clock-quiz-screen').classList.add('hidden');
            document.getElementById('clock-result-screen').classList.remove('hidden');
            document.getElementById('clock-score-text').innerText = `${clockScore} / ${clockQuestions.length} 正解！`;
        }
    };

    // 初回読み込み実行
    loadClockQuestion();
}
