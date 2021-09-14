document.getElementById("submit").addEventListener("click", handler9);
let vocabEnglish = [];
function handler9()  {

  
    let englishWords = document.getElementById("input").innerText


    for (let i = 0; i < englishWords.length; i++) {
            let englishWord = englishWords[i].innerText;
            vocabEnglish.push(englishWord); 
        
        }
        console.log("çalıştım");
        console.log(englishWords);
        return vocabEnglish;
      
    }
console.log(handler9());
console.log(vocabEnglish);
alert("alperen")

            