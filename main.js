async function generateBingoBoard(filename) {
    fetch(filename).then((res) => res.text()).then((text) => {
        text = JSON.parse(text);
        let data = text;
        console.log(data);
        console.log(data);
        console.log(data);
        console.log(data);

        

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
    })
}

generateBingoBoard("physics.json");
