let toadd=document.getElementsByName('add')[0];
toadd.addEventListener('keydown' , function (event){
    if (event.key =='Enter')
    {
        event.preventDefault();
        let todo = toadd.value;
        let newele = document.createElement("li");
        newele.setAttribute("class","list-group-item d-flex justify-content-between align-items-center");
        newele.innerHTML=`
            <span>${todo}</span>
            <i class="far fa-trash-alt delete"></i>`;
        let parent=document.querySelector("ul");
        parent.append(newele);
        toadd.value="";
    }
})


let tosearch=document.getElementsByName("search")[0];

tosearch.addEventListener("input",function () {searchelimin(tosearch.value)});
function searchelimin(inputed){
    let parent = document.querySelector("ul");
    console.log(parent);
    let tosearchs=parent.children;
    console.log(tosearchs);
    for (let ele of tosearchs)
        {
            console.log(ele);
            console.log((ele.querySelector("span").textContent.includes(inputed)));
            console.log(!(ele.querySelector("span").textContent.includes(inputed)));
            if (!(ele.querySelector("span").textContent.includes(inputed)))
                    {
                        ele.style.visibility = "hidden";
                    }
            else{
                    ele.style.visibility = "visible";
            }

        }   
}