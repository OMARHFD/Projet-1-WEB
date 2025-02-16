let form=document.getElementById("form1");
function sform(){
    let elements=document.getElementsByClassName('obligatoir');
    for (let ele of elements){
        if(! ele.value.trim() ){
            alert('veuillez remplir tout les champs');
            return false;
        }
    }
    let nelements=document.getElementsByClassName('module obligatoir');
    for (let ele of nelements){
        if(! ele.value.trim() ){
            alert('veuillez remplir tout les champs');
            return false;
        }
        if(isNaN(ele.value)){
            alert("les notes doivent être des chiffres");
            return false;
        }
    }
    return true;
}