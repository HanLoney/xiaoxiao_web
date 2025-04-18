// 获取 DOM 元素
const todoInput = document.getElementById('todo-input');// 获取：输入框
const categorySelect = document.getElementById('category-select');// 获取：分类选择框
const prioritySelect = document.getElementById('priority-select');// 获取：优先级选择框
const addBtn = document.getElementById('add-btn');// 获取：添加按钮
const todoList = document.getElementById('todo-list');// 获取：待办事项列表(添加的地方)

// 待办事项数组
let todos = [];// 用于存储待办事项的数组（后面添加对象）

// 添加待办事项
function addTodo() {
    const todoText = todoInput.value.trim(); // 获取输入框的值并去除前后空格
    const category = categorySelect.value;   // 获取分类
    const priority = prioritySelect.value;   // 获取优先级
    if (todoText !== '') {// 如果输入内容不为空，则添加
        // 数组可以存储对象
        todos.push({ 
            text: todoText, // 待办事项文本
            category: category, // 分类
            priority: priority, // 优先级
            completed: false // 默认未完成
        });
        
        renderTodos(); // 渲染列表
        // 调回默认值
        todoInput.value = ''; // 清空输入框
        categorySelect.value = '学习'; // 默认选择“学习”
        prioritySelect.value = '低'; // 默认选择“低”
    }
}

// 删除待办事项
function deleteTodo(index) {
    todos.splice(index, 1); // 删除指定索引的待办事项
    renderTodos(); // 渲染列表
}

// 编辑待办事项
function editTodo(index) {
    const newTodoText = prompt('编辑待办事项:', todos[index].text);//newTodoText去接收弹出框输入的内容
    if (newTodoText !== null && newTodoText.trim() !== '') { // 确保输入不为空并且前后无空格
        todos[index].text = newTodoText.trim();//将新输入值赋值给todos数组中对应索引的text属性
        renderTodos(); // 渲染列表
    }
}

// 切换完成状态
function toggleCompleted(index) {
    todos[index].completed = !todos[index].completed; // 切换完成状态
    renderTodos(); // 渲染列表
}

// 渲染待办事项列表
function renderTodos() {
    todoList.innerHTML = ''; // 清空当前列表内容
    // 根据优先级排序
    todos.sort((a, b) => {
        return a.priority.localeCompare(b.priority);
    });
    
    // 遍历数组，为每个待办事项创建 HTML 元素
    todos.forEach((todo, index) => {
        const li = document.createElement('li'); // 创建 <li> 标签
        // 给 li 标签添加 html 内容（包含事项文本、分类、完成状态和操作按钮）
        
        li.innerHTML = `
        <div id="li_box">
            <div id="li_text">
                <input type="checkbox" class="completed-checkbox" data-index="${index}" ${todo.completed ? 'checked' : ''}>
                <p class="${todo.completed ? 'completed' : ''}">${todo.text}</p>
                <span class="category">${todo.category}</span>
            </div>
            <div id="li_btns">
                <span><button class="edit-btn" data-index="${index}">编辑</button></span>
                <span><button class="delete-btn" data-index="${index}">删除</button></span>
            </div>
        </div>
        `;
        todoList.appendChild(li); // 将 <li> 添加到列表中
    });
    // 为复选框添加事件监听器
    document.querySelectorAll('.completed-checkbox').forEach(checkbox => {//给所有选项框添加事件监听器
        checkbox.addEventListener('change', function () {//监听选择框改变
            const index = this.getAttribute('data-index');//获取当前改变的选项框的索引
            toggleCompleted(index);//将索引传给触发器完成函数，切换勾选状态，渲染页面
        });
    });
    // 为编辑按钮添加事件监听器
    document.querySelectorAll('.edit-btn').forEach(button => {//遍历所有编辑按钮
        button.addEventListener('click', function () {//给每个按钮添加点击事件
            const index = this.getAttribute('data-index');//获取点击按钮的索引
            editTodo(index);//将索引传给编辑函数，弹出输入框，获取新的待办事项文本
        });
    });
    // 为删除按钮添加事件监听器
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            deleteTodo(index);
        });
    });
}

// 放最后这里addTodo是为了能正确获取到前面的各种函数
// 事件监听
addBtn.addEventListener('click', addTodo);//对 添加按妞 绑定点击事件
// 为输入框添加键盘 Enter 键的事件监听
todoInput.addEventListener('keypress', (e) => {//对输入框绑定键盘事件
    if (e.key === 'Enter') {
        addTodo();
    }
});

// 初始渲染
renderTodos();




