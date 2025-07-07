let BASE_URL = "https://www.floatrates.com/daily";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for(currCode in countryList){
        console.log(currCode,countryList[currCode]);   // currCode refer to keys in countryList && countryList[currCode] are value of keys currCode
        let options = document.createElement("option");
        options.innerText = currCode;
        options.value = currCode;
        if(select.name === "from" && options.innerText === "USD"){
            options.selected = "selected";
        }
        if(select.name === "to" && options.innerText === "INR"){
            options.selected = "selected";
        }
        select.append(options);
    };
        select.addEventListener("change", (evt) =>{
            flagChange(evt.target);
        });
};

const flagChange = (el) =>{
    console.log(el);
    let currCode = el.value;
    console.log(currCode);
    let countryCode = countryList[currCode];
    let imgSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    const img = el.parentElement.querySelector("img");
    return img.src = imgSrc;
};

btn.addEventListener("click", async () =>{
    msg.classList.remove("hide");
    msg.innerText = "Fetching Data.....";
    msg.style.border = "2px solid #3f72af";

    const input = document.querySelector(".cont-input input");
    let amt = input.value;
    console.log(amt);

    if(isNaN(amt) || amt<=0){
        alert("Enter a valid Amount");
        msg.classList.add("hide");
        return;
    }
    
    if(fromCurr.value === toCurr.value){
        msg.innerText = `${amt} ${fromCurr.value} = ${amt} ${toCurr.value}`;
        msg.style.border = "2px solid #3f72af";
        return;
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    try{
        let response = await fetch(URL);
        console.log(response);
        let data = await response.json();
        console.log(data);
        let rateinfo = data[toCurr.value.toLowerCase()];
        console.log(rateinfo);

        if(!rateinfo){
            alert(`Currency "${toCurr.value}" not supported for base "${fromCurr.value}".`);
        }

        let rate = rateinfo.rate;
        console.log(`1 ${fromCurr.value} = ${rate} ${toCurr.value}`);
        let convertAmt = (amt*rate).toFixed(2);
        console.log(convertAmt);
        
        msg.innerText = `${amt} ${fromCurr.value} = ${convertAmt} ${toCurr.value}`;
        msg.style.border = "2px solid #3f72af";
    } catch(err){
        alert("API error. Please check console");
        console.log(err);
    };
});