const taskListContainer =document.querySelector ('.app__section-task-list')

const formTask = document.querySelector ('.app__form-add-task')
const formLabel = document.querySelector ('.app__form-label')
const toggleFormTaskBtn = document.querySelector ('.app__button--add-task')

const textarea = document.querySelector ('.app__form-textarea')
const btnCancel = document.querySelector ('.app__form-footer__button--cancel')

const taskAtiveDescription  = document.querySelector ('.app__section-active-task-description')


let localStorageTarefas = localStorage.getItem('tarefas')
let tarefas = localStorageTarefas ? JSON.parse (localStorageTarefas) : []
let tarefaSelecionada = null
let itemTarefaSelecionada = null


const taskIconSvg = `<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF" />
    <path
        d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
        fill="#01080E" />
</svg>`


const selicionaTarefa = (tarefa, elemento) => {

    document.querySelectorAll('.app__section-task-list-item-active').forEach(function (button) {
        button.classList.remove('app__section-task-list-item-active')
    })
    
    if (tarefaSelecionada == tarefa) {
        taskAtiveDescription.textContent = null
        itemTarefaSelecionada = null
        tarefaSelecionada = null
        return
    }
    
    tarefaSelecionada = tarefa
    itemTarefaSelecionada = elemento
    taskAtiveDescription.textContent = tarefa.descricao
    elemento.classList.add('app__section-task-list-item-active') }


function createTask (tarefa) {
    const li = document.createElement ('li')
    li.classList.add ('app__section-task-list-item')

    const svgIcon = document.createElement ('svg')
    svgIcon.innerHTML = taskIconSvg

    const paragraph = document.createElement ('p')
    paragraph.classList.add ('app__section-task-list-item-description')
    paragraph.textContent =tarefa.descricao

    li.appendChild(svgIcon)

    li.appendChild (paragraph)

    li.onclick = () => {
        selicionaTarefa (tarefa, li )
    }


    return li
}

const limparForm = () => {
    textarea.value =''
    formTask.classList.add('hidden')

}

const updateLocalStorage = () => {
    localStorage.setItem ('tarefas', JSON.stringify (tarefas))
}

tarefas.forEach ((tarefa)=> {
    const taskIcon = createTask (tarefa)
    taskListContainer.appendChild (taskIcon)
})

toggleFormTaskBtn.addEventListener ('click', () => {
    formLabel.textContent = 'Adicionando tarefa'
    formTask.classList.toggle('hidden')
})

formTask.addEventListener ('submit', (event) => {
    event.preventDefault()
    const task = {
        descricao: textarea.value,
        concluida : false
    }
    tarefas.push(task)
    
    const taskItem = createTask (task)
    taskListContainer.appendChild (taskItem)

    updateLocalStorage()
    limparForm()
})

btnCancel.addEventListener ('click', limparForm )