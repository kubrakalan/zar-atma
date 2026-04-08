document.addEventListener('DOMContentLoaded', () => {
    const dice1 = document.getElementById('dice1');
    const dice2 = document.getElementById('dice2');
    const rollButton = document.getElementById('rollButton');
    const resultText = document.getElementById('result');

    // Ses efekti için Audio nesnesi
    const diceSound = new Audio('sounds/dice.mp3');

    // Zar noktalarının pozisyonları
    const dicePositions = {
        1: [[1, 1]],
        2: [[0, 0], [2, 2]],
        3: [[0, 0], [1, 1], [2, 2]],
        4: [[0, 0], [0, 2], [2, 0], [2, 2]],
        5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
        6: [[0, 0], [0, 1], [0, 2], [2, 0], [2, 1], [2, 2]]
    };

    // Zarı temizle
    function clearDice(dice) {
        dice.innerHTML = '';
    }

    // Zarı güncelle
    function updateDice(dice, number) {
        clearDice(dice);
        dicePositions[number].forEach(([row, col]) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.style.gridRow = row + 1;
            dot.style.gridColumn = col + 1;
            dice.appendChild(dot);
        });
    }

    // Zar at
    function rollDice() {
        // Ses efektini çal
        diceSound.currentTime = 0; // Sesi başa sar
        diceSound.play();

        const number1 = Math.floor(Math.random() * 6) + 1;
        const number2 = Math.floor(Math.random() * 6) + 1;
        
        // Karışma animasyonu
        dice1.classList.add('shaking');
        dice2.classList.add('shaking');
        
        // Animasyon bittikten sonra zarları güncelle
        setTimeout(() => {
            updateDice(dice1, number1);
            updateDice(dice2, number2);
            dice1.classList.remove('shaking');
            dice2.classList.remove('shaking');
            
            resultText.textContent = `Toplam: ${number1 + number2}`;
        }, 500);
    }

    // Buton tıklama olayı
    rollButton.addEventListener('click', rollDice);

    // Sayfa yüklendiğinde zarları başlat
    updateDice(dice1, 1);
    updateDice(dice2, 1);
}); 