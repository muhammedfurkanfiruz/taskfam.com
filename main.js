// bosDizi = [];
// function doFunction(){
  
//     const val = document.getElementById('exampleFormControlTextarea1').value;
//     bosDizi.push(val)
//     console.log(bosDizi);
//     return bosDizi;

 
// }

const isimler = ['alpiş baba ', 'meheme', 'furkan', 'saidoo', 'umuut'];  // ı just vreated an array 

let html = ''; // setup the html tags

isimler.forEach(function(isim){
    html += '<li>' + isim + '</li>';      //with this function we get all value of the array and add li tag for each return(step)
    

});
 
    html = (`<ul>  ${html}  <ul> `); // we putt the li tags in to the ul tags ı prefered to use template literal structure

    console.log(html);
    document.getElementById('isimYaz').innerHTML = html   // by using inner html we send the unordered list to the html 
                                                          // because we wanna see the result on the browser


            