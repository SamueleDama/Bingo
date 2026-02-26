function generateBingoBoard(data) {
    const boardContainer = document.getElementById('bingo-container');
    
    // 1. Shuffle and pick the first 24 items
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    const selectedValues = shuffled.slice(0, 24);

    // 2. Create the table element
    const table = document.createElement('table');
    // Removed setAttribute('border', '1') because CSS handles this now
    
    let valueIndex = 0;

    for (let r = 0; r < 5; r++) {
        const row = document.createElement('tr');
        
        for (let c = 0; c < 5; c++) {
            const cell = document.createElement('td');
            
            // 3. Check if it's the middle cell (Index 2,2)
            if (r === 2 && c === 2) {
                cell.textContent = "FREE";
                cell.classList.add('free-space');
            } else {
                cell.textContent = selectedValues[valueIndex];
                valueIndex++;
            }

            // --- ADD EVENT LISTENER HERE ---
            cell.addEventListener('click', function() {
                this.classList.toggle('marked');
            });
            // -------------------------------
            
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    boardContainer.innerHTML = '';
    boardContainer.appendChild(table);
}

const myValues = [
    "speed","length","error","versor","pressure","politecnico","fall ","over","I don't know","physics","equation","integral","machanics","fas","chemical","notebook","light","direction","phone","morevoer ","[forgetting a word] ","[uses italian] ","[french word] ","element ","instrument ","liquid ","solid ","metal ","gear ","six ","break ","[5 uh in 5 minutes] ","[skips a topic] ","newton"
];

generateBingoBoard(myValues);