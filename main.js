function checkCookies(){
    let cookies = cookiesToDictionary();
    
    switch(cookies["redo"]){
        case "0":
            console.log("You have no more redos left!");
        break;

        case "1":
            document.cookie = "redo=0"
        break;
            
        case "2":
            document.cookie = "redo=1";
        break;

        case "3":
            document.cookie = "redo=2";
        break;

        default:
            document.cookie = "redo=3";
    }
}

function cookiesToDictionary() {
    const cookies = document.cookie.split(';');
    const cookieDict = {};
    
    cookies.forEach(cookie => {
        const [key, value] = cookie.trim().split('=');
        cookieDict[key] = decodeURIComponent(value); // Decode value from URL encoding
    });
    
    return cookieDict;
} 

function randomValues(data){
    // 1. Shuffle and pick the first 24 items
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    const selectedValues = shuffled.slice(0, 24);
    return selectedValues;
}
async function generateBingoBoard(filename) {
    fetch(filename).then((res) => res.text()).then((text) => {
        text = JSON.parse(text);
        let data = text;

        const boardContainer = document.getElementById('bingo-container');
        
        const initialCookies = cookiesToDictionary(); 
        const canShuffle = initialCookies["redo"] !== "0";

        checkCookies(); 

        const updatedCookies = cookiesToDictionary(); 
        
        let selectedValues;
        
        if (canShuffle) {
            selectedValues = randomValues(data);
            document.cookie = `words=${JSON.stringify(selectedValues)}; path=/`;
        } else {
            selectedValues = JSON.parse(updatedCookies["words"]);
        }

        if ("redo" in updatedCookies) {
            document.getElementById("redos").innerHTML = updatedCookies["redo"];
        }       
        

        const table = document.createElement('table');
        
        let valueIndex = 0;

        for (let r = 0; r < 5; r++) {
            const row = document.createElement('tr');
            
            for (let c = 0; c < 5; c++) {
                const cell = document.createElement('td');
                
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
                
                row.appendChild(cell);
            }
            table.appendChild(row);
        }

        boardContainer.innerHTML = '';
        boardContainer.appendChild(table);
    })
}

generateBingoBoard("physics.json");
