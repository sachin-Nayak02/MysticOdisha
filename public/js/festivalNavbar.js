let rightArrow=document.querySelectorAll('.festival-right-arrow');
let leftArrow=document.querySelectorAll('.festival-left-arrow');
let rightArrowIcon=document.querySelectorAll('.festival-right-arrow i');

let bioBox=document.querySelectorAll('.festival-bio');

//for open bio box
for(let i=0;i<rightArrow.length;i++){
    rightArrow[i].addEventListener("click",()=>{
        if (bioBox[i]) { // Ensure bioBox[i] exists before accessing
            bioBox[i].style.left = "100%";
            // bioBox[i].style.opacity = "1";
            rightArrow[i].style.opacity='0'
        }
    });
}


//for close bio box
for(let i=0;i<leftArrow.length;i++){
    leftArrow[i].addEventListener("click",()=>{
        if (bioBox[i]) { 
            bioBox[i].style.left = "-300%";
            // bioBox[i].style.opacity = "0";
            rightArrow[i].style.opacity='1'
        }
    });
    
    
}

