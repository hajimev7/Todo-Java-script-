const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul")

const todos=JSON.parse(localStorage.getItem("todos"));

if (todos) {
  todos.forEach(todo=>{
    add(todo);
  })
}

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
  const deleteButton = document.createElement('button');
  const statusButton = document.createElement('button');

  li.innerText= todoText;
  li.classList.add("list-group-item")

    deleteButton.innerText='削除';
    li.appendChild(deleteButton);

    deleteButton.addEventListener('click',()=>{ 
      li.remove()
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
  
  li.addEventListener("contextmenu",function(event){
   event.preventDefault();
   li.remove();
  })

  li.addEventListener("click",function(){
    li.classList.toggle("text-decoration-line-through")
  })

  ul.appendChild(li)
  input.value="";
  saveData();
  }
}

function saveData(){
  const lists = document.querySelectorAll("li");
  let todos=[]
  lists.forEach(list=>{
    todos.push(list.innerText)
    localStorage.setItem("todos",JSON.stringify(todos))
  })
}