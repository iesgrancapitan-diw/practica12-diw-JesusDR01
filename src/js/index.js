window.addEventListener('DOMContentLoaded', () => {
    scrollToTopBehavior();
    const suggestBox = document.querySelector('.suggest .box');
    const main = document.querySelector('main');
    btnAddTaskBehavior(main);
    addSuggestBoxBehavior(suggestBox, main);
});

function addSuggestBoxBehavior(suggestBox, main) {
    suggestBox.addEventListener('click', async () => {
        const task = createTask();
        main.insertBefore(task, suggestBox.parentElement);
        await sleep(200);
        task.style.opacity = 1;
    });
}

function btnAddTaskBehavior(main) {
    const addBtn = document.querySelector('#add');
    
    addBtn.addEventListener('click', async () => {
        const img = document.querySelector('#add img')
        img && addBtn.removeChild(img);
        const task = createTask();
        main.appendChild(task);
        await sleep(200);
        task.style.opacity = 1;
        window.scrollTo({ top: task.parentElement.scrollHeight, behavior: 'smooth' });
    });
}

function scrollToTopBehavior() {
    document.querySelector('#up button').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function createTask() {
    const parent = document.createElement('div');
    parent.style.opacity = 0;
    parent.setAttribute('class', 'parent');
    const btnWrapper = createBtnWrapper();
    parent.appendChild(btnWrapper);
    const box = CreateBox(parent, btnWrapper);
    parent.appendChild(box);
    return parent;
}

function createBtnWrapper() {
    const btnWrapper = document.createElement('div');
    btnWrapper.setAttribute('class', 'edit');
    return btnWrapper;
}

function CreateBox(parent, btnWrapper) {
    const box = document.createElement('div');
    box.setAttribute('class', 'box');
    const form = createForm(parent, box, btnWrapper);
    box.appendChild(form);
    return box;
}

function createForm(parent, box, btnWrapper) {
    const form = document.createElement('form');
    const actionsWrapper = createActionsWrapper(parent);
    [
        createElement('input', 'text', 'title', 'Task Manager', 'Task title'),
        createElement('input', 'text', 'name', 'DIW', 'Subject Name'),
        createElement('textarea', '', 'description', 'You cannot use React', 'Task description'),
        createElement(
            'input',
            'datetime-local',
            'date',
            new Date().toISOString().split('.')[0].slice(0, -3),
            ''
        ),
        actionsWrapper,
    ].forEach((el) => form.appendChild(el));
    form.addEventListener('submit', fillBox(box, btnWrapper));
    return form;
}

function createActionsWrapper(parent) {
    const actionsWrapper = document.createElement('div');
    actionsWrapper.setAttribute('class', 'actionsWrapper');
    const cancelCreationBtn = createActionBtn('button', 'CANCEL', 'tap-effect');
    cancelCreationBtn.addEventListener('click', async () => {
        parent.style.opacity = 0;
        await sleep(300);
        parent.remove();
    });
    [cancelCreationBtn, createActionBtn('submit', 'ADD', 'tap-effect btn-strong')].forEach((btn) =>
        actionsWrapper.appendChild(btn)
    );
    return actionsWrapper;
}

function fillBox(box, btnWrapper) {
    return async function (e) {
        e.preventDefault();
        box.style.opacity = 0;
        await sleep(270);
        box.style.opacity = 1;
        const formData = new FormData(e.target);
        const { title, name, description, date } = Object.fromEntries(formData);
        box.removeChild(this);
        [createDeleteBtn(box), createEditBtn(box, btnWrapper)].forEach((btn) =>
            btnWrapper.appendChild(btn)
        );
        getContent(title, name, description, date).forEach((element) => box.appendChild(element));
    };
}

function createDeleteBtn(box) {
    const deleteBtn = createBtn('fas fa-trash-alt');
    deleteBtn.addEventListener('click', async () => {
        box.parentElement.style.opacity = 0;
        await sleep(500);
        box.parentElement.remove();
    });
    return deleteBtn;
}

function createEditBtn(box, btnWrapper) {
    const editBtn = createBtn('fas fa-pen');
    editBtn.addEventListener('click', () => {
        box.setAttribute('contenteditable', true);
        box.style.outline='none',
        box.style.boxShadow = '-1px 0px 8px 2px #03045e';
        box.style.caretColor = '#0138ff';
        box.focus();
        editBtn.remove();
        const cancelEditBtn = createBtn('fas fa-times');
        cancelEditBtn.addEventListener('click', () => {
            box.removeAttribute('contenteditable');
            cancelEditBtn.remove();
            btnWrapper.appendChild(editBtn);
            box.style.boxShadow = '-2px 2px 4px 0px #03045e';
        });

        btnWrapper.appendChild(cancelEditBtn);
    });
    return editBtn;
}

function createBtnWrapper() {
    let btnWrapper = document.createElement('div');
    btnWrapper.className = 'edit';
    return btnWrapper;
}

function createBtn(faClass) {
    const btn = document.createElement('button');
    const icon = document.createElement('i');
    icon.className = faClass;
    btn.appendChild(icon);
    return btn;
}

function createElement(elementType, type, name, value, placeholder) {
    const element = document.createElement(elementType);
    element.setAttribute('type', type);
    element.setAttribute('name', name);
    element.setAttribute('minlength', '2');
    element.setAttribute('required', '');
    if (elementType !== 'input') {
        element.innerText = value;
    }
    element.setAttribute('value', value);
    element.setAttribute('placeholder', placeholder);
    return element;
}

function createActionBtn(type, value, className) {
    const btn = document.createElement('input');
    btn.setAttribute('type', type);
    btn.setAttribute('value', value);
    btn.setAttribute('class', className);
    
    return btn;
}

function getContent(title, name, description, date) {
    const h2 = document.createElement('h2');
    h2.innerText = title;
    const h3 = document.createElement('h3');
    h3.innerText = name;
    const p = document.createElement('p');
    p.innerText = description;
    const p2 = document.createElement('p');
    p2.innerText = new Date(date).toLocaleString().slice(0, -3);
    return [h2, h3, p, p2];
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
