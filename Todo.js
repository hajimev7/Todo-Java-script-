const form = document.getElementById("form");
const addbutton = document.getElementById("addbutton")
const input = document.getElementById("input");
const input2 = document.createElement('input');
const ul = document.getElementById("ul")
const span = document.getElementById('span');

const todos=JSON.parse(localStorage.getItem("todos"));

if (todos) {
  todos.forEach(todo=>{
    add(todo);
  })
}
//追加ボタンの機能追加x
addbutton.addEventListener('click',()=>{
  add()
})

form.addEventListener("submit",function(event){
  event.preventDefault();
  add()
})

function add(todo){
  let todoText=input.value
  if(todo){
    todoText=todo;
  }

  if(todoText.length>0){
  const li = document.createElement("li")
  const span = document.createElement('span');
  const deleteButton = document.createElement('button');
  const statusButton = document.createElement('button');
  const editButton = document.createElement('button');
  const edit2Button = document.createElement('button');       

  li.classList.add("list-group-item")
  span.textContent = todoText;
  li.appendChild(span);

    deleteButton.innerText='削除';
    li.appendChild(deleteButton);

    deleteButton.addEventListener('click',()=>{ 
      li.remove()
      saveData();
    })

    statusButton.innerText = '未完了';
    li.appendChild(statusButton);

    statusButton.addEventListener('click', () => {
      if (statusButton.innerText == '未完了') {
        statusButton.innerText = '完了';
      } else {
        statusButton.innerText = '未完了';
      }
  });

  //編集ボタンの追加
    editButton.innerText = '編集';
    li.appendChild(editButton);
  //編集機能の追加
    editButton.addEventListener('click',()=>{ 
      
      span.remove()
      console.log(span)

      input2.setAttribute("id", "input2");
      edit2Button.innerText = '編集完了';
      li.appendChild(edit2Button);   
      input2.value = span.innerHTML
      li.prepend(input2);   
      saveData();
      
    })

    edit2Button.addEventListener('click',()=>{
      span.textContent = input2.value;
      li.prepend(span)
      input2.remove()  
      edit2Button.remove() 
    })

  ul.appendChild(li)
  input.value="";
  saveData();
  }
}

function saveData(){
  //spanタグの取得に変更
  const lists = document.querySelectorAll("span");
  let todos=[]
  lists.forEach(list=>{
    todos.push(list.innerText)
    localStorage.setItem("todos",JSON.stringify(todos))
  })
}