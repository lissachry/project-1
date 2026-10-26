// --- JAVASCRIPT FOR SMART PRODUCTIVITY HUB ---

// 1. POMODORO TIMER
let timer;
let minutes = 25;
let seconds = 0;
let isRunning = false;

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const timerStatus = document.getElementById('timer-status');

function updateDisplay() {
    let minStr = minutes < 10 ? '0' + minutes : minutes;
    let secStr = seconds < 10 ? '0' + seconds : seconds;
    timerDisplay.textContent = `${minStr}:${secStr}`;
}

startBtn.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        timerStatus.textContent = "🚀 Sedang Fokus Berkerja...";
        timer = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(timer);
                    alert("Waktu fokus selesai! Istirahat sejenak.");
                    minutes = 5; // Pindah otomatis ke istirahat 5 menit
                    timerStatus.textContent = "☕ Waktunya Istirahat!";
                    isRunning = false;
                    updateDisplay();
                    return;
                }
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }
            updateDisplay();
        }, 1000);
    }
});

pauseBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    timerStatus.textContent = "⏸️ Timer Dijeda";
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    minutes = 25;
    seconds = 0;
    timerStatus.textContent = "⏱️ Waktunya Fokus!";
    updateDisplay();
});


// 2. TO-DO LIST (Menggunakan LocalStorage)
const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoList = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="${todo.completed ? 'completed' : ''}" onclick="toggleTodo(${index})">${todo.text}</span>
            <button onclick="deleteTodo(${index})" style="background-color: #e24a4a; padding: 0.3rem 0.6rem; font-size: 0.8rem;">Hapus</button>
        `;
        todoList.appendChild(li);
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

addTodoBtn.addEventListener('click', () => {
    if (todoInput.value.trim() !== '') {
        todos.push({ text: todoInput.value, completed: false });
        todoInput.value = '';
        renderTodos();
    }
});

window.toggleTodo = function(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}

window.deleteTodo = function(index) {
    todos.splice(index, 1);
    renderTodos();
}


// 3. JURNAL HARIAN
const journalInput = document.getElementById('journal-input');
const saveJournalBtn = document.getElementById('save-journal-btn');
const journalStatus = document.getElementById('journal-status');

// Muat jurnal yang tersimpan sebelumnya
journalInput.value = localStorage.getItem('dailyJournal') || '';

saveJournalBtn.addEventListener('click', () => {
    localStorage.setItem('dailyJournal', journalInput.value);
    journalStatus.textContent = "✅ Jurnal berhasil disimpan hari ini!";
    setTimeout(() => journalStatus.textContent = '', 3000);
});

// Jalankan fungsi load pertama kali
updateDisplay();
renderTodos();
