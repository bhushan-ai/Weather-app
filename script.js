
const apiKey="6be431ec3503f260eed4aee048a7d25e"

const whetherDataEle= document.querySelector(".whether-data")
const cityNameEle=document.querySelector("#city-name")
const formEle=document.querySelector("form")
const imgIcon=document.querySelector(".icon")

formEle.addEventListener("submit",(e)=>{
    e.preventDefault()
    // console.log(cityNameEle.value)
    const cityValue= cityNameEle.value

    getWhetherData(cityValue)
})
   async function getWhetherData(cityValue){

    const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${ apiKey}&units=metric`)
    try{
        if(!response.ok){
            throw new console.error("Network responsce is not Ok !");
            
        }
      const data=await response.json();
    //    console.log(data);
    
       const tempreture= Math.floor(data.main.temp);
       const description=data.weather[0].description;
       const icon =data.weather[0].icon;

     const details=[
       `Feels like: ${Math.floor(data.main.feels_like)}`,
       `Humidity:${data.main.humidity}%`,
       `Wind Speed:${data.wind.speed}m/s`

     ]


       whetherDataEle.querySelector(".temp").textContent=`${tempreture}°C`
       whetherDataEle.querySelector(".desc").textContent=`${description}`

       imgIcon.innerHTML=`<img src="https://openweathermap.org/img/wn/${icon}.png">`
       
       whetherDataEle.querySelector(".details").innerHTML=details.map((detail)=>{
        return `<div>${detail}</div>`

       }).join(" ");

 
    }
    catch(err){
        whetherDataEle.querySelector(".temp").textContent=""
        imgIcon.innerHTML=""
        whetherDataEle.querySelector(".desc").textContent="An error occured"
    }




  }
