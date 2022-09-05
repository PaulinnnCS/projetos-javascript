
const LIST = document.getElementById('list');
const INPUT = document.getElementById('input');
var lastElement = undefined;
var countItemList = 0;

function addItem(){
    let valueInput = INPUT.value;
    
    if(valueInput != ''){
        const TAG_LI = newElement('li',['class'],['item-list']);
        const TAG_CHECK_INPUT = newElement('input',['type', 'class'],['checkbox','check'])
        const TAG_LABEL = newElement('label',['for','class'],[valueInput,'text-list']);
        const TAG_BUTTON = newElement('button',['id', 'class','onclick'],[`btn-remove-${countItemList}`,'btn-remove',`removeItem(${countItemList})`]);
        
        TAG_LABEL.innerText = valueInput;
        TAG_BUTTON.innerText = '-';

        TAG_LI.appendChild(TAG_CHECK_INPUT);
        TAG_LI.appendChild(TAG_LABEL);
        TAG_LI.appendChild(TAG_BUTTON);

        if(lastElement != undefined){
            LIST.insertBefore(TAG_LI, lastElement);
        } else {
            LIST.appendChild(TAG_LI);
        }
        
        lastElement = TAG_LI;

        INPUT.value = '';
        countItemList++;
    }
}

function newElement(tagElement, listAttribute, listAttributeName){
    let element = document.createElement(tagElement);

    for(let i = 0; i < listAttribute.length; i++){
        element.setAttribute(listAttribute[i], listAttributeName[i]);
    }

    return element;
}

function removeItem(idItem){
    var elementRemove = document.getElementById(`btn-remove-${idItem}`).parentNode;
    var childrens = LIST.children;

    for(let i = 0; i < childrens.length; i++){
        if(elementRemove === childrens[i]){
            lastElement = childrens[i + 1];
        }
    }
    
    elementRemove.parentNode.removeChild(elementRemove);
}

setInterval(() => {
    var childrens = LIST.children;
    for(let i = 0; i < childrens.length; i++){
        var childrenList = childrens[i].children;
        if(childrenList[0].checked){
            childrenList[1].classList.add('through');
        } else {
            childrenList[1].classList.remove('through');
        }
    }
},10);

document.addEventListener('keydown', () => {
    if(window.event.keyCode === 13){
        addItem();
    }
})


function clearAll(){
    LIST.innerHTML = '';
    lastElement = undefined;
}