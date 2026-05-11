let words = [];
let currentIndex = 0;

const card = document.getElementById('card');
const wordDisplay = document.getElementById('word-display');
const meaningDisplay = document.getElementById('meaning-display');
const noteDisplay = document.getElementById('note-display');
const counter = document.getElementById('counter');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// CSVを読み込む
async function loadCSV() {
    const response = await fetch('words.csv');
    const data = await response.text();
    const rows = data.split('\n').slice(1); // ヘッダーを除去

    words = rows.filter(row => row).map(row => {
        // カンマ区切りだがダブルクォーテーションを考慮
        const parts = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
        return {
            word: parts[0].replace(/"/g, ''),
            meaning: parts[1].replace(/"/g, ''),
            note: parts[2] ? parts[2].replace(/"/g, '') : ''
        };
    });
    updateCard();
}

function updateCard() {
    if (words.length === 0) return;
    
    card.classList.remove('is-flipped');
    
    setTimeout(() => {
        const current = words[currentIndex];
        wordDisplay.textContent = current.word;
        meaningDisplay.textContent = current.meaning;
        noteDisplay.textContent = current.note;
        counter.textContent = `${currentIndex + 1} / ${words.length}`;
        
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === words.length - 1;
    }, 150);
}

card.addEventListener('click', () => {
    card.classList.toggle('is-flipped');
});

prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentIndex > 0) {
        currentIndex--;
        updateCard();
    }
});

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentIndex < words.length - 1) {
        currentIndex++;
        updateCard();
    }
});

loadCSV();
