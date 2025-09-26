// Add this at the very beginning of script.js
function toggleMenu(type) {
  const tabs = ['tests', 'history', 'sheets'];
  tabs.forEach(tab => {
    const content = document.getElementById('content-' + tab);
    if (!content) return;
    if (tab === type) {
      content.classList.toggle('expanded');
    } else {
      content.classList.remove('expanded');
    }
  });
}
// Updated dark mode functionality for animated switch
function toggleDarkMode() {
  const body = document.body;
  const checkbox = document.getElementById('checkbox') || document.getElementById('dark-mode-switch');
  
  if (checkbox.checked) {
    body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled');
  } else {
    body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'disabled');
  }
}

// Load saved dark mode preference
function loadDarkModePreference() {
  const darkMode = localStorage.getItem('darkMode');
  const checkbox = document.getElementById('checkbox') || document.getElementById('dark-mode-switch');
  
  if (darkMode === 'enabled') {
    document.body.classList.add('dark-mode');
    if (checkbox) checkbox.checked = true;
  }
}

// Add event listener to checkbox
document.addEventListener("DOMContentLoaded", () => {
  fillMenuSections();
  toggleMenu('tests');
  showMainMenu();
  loadDarkModePreference();
  
  // Add event listener for the animated switch
  const checkbox = document.getElementById('checkbox') || document.getElementById('dark-mode-switch');
  if (checkbox) {
    checkbox.addEventListener('change', toggleDarkMode);
  }
});


const tests = {
  "Subjective Science Test": {
    testName: "Subjective Science Test",
    timeLimit: 30,
    questions: [
      {
        question: "Explain the process of photosynthesis in plants.",
        marks: 5,
        solution: "Photosynthesis is the process by which plants convert sunlight, carbon dioxide, and water into glucose and oxygen."
      },
      {
        question: "Describe the water cycle and its importance.",
        marks: 5,
        solution: "The water cycle involves evaporation, condensation, precipitation, and collection. It maintains Earth's water balance."
      },
      {
        question: "What are the main causes of soil erosion?",
        marks: 4,
        solution: "Deforestation, overgrazing, construction, and poor farming practices contribute to soil erosion."
      },
      {
        question: "Write briefly about the impact of pollution on aquatic life.",
        marks: 3,
        solution: "Pollution such as chemicals, plastics, and waste harms aquatic organisms, disrupting ecosystems."
      }
    ]
  },
  "Hard Linear Equations Test": {
    testName: "Hard Linear Equations in Two Variables Test",
    timeLimit: 45,
    questions: [
      {
        question: "If 2x + 3y = 7 and 4x + 6y = 14, then the pair of equations has:",
        options: [
          "Unique solution",
          "No solution", 
          "Infinitely many solutions",
          "Two solutions"
        ],
        answer: 2,
        marks: 1
      },
      {
        question: "The solution of equations 3x - 5y = -1 and x - y = -1 is:",
        options: [
          "x = 2, y = 3",
          "x = -2, y = -1", 
          "x = 3, y = 2",
          "x = 1, y = 2"
        ],
        answer: 0,
        marks: 1
      },
      {
        question: "For what value of k will the equations kx + 3y = k - 3 and 12x + ky = k have no solution?",
        options: [
          "k = 6",
          "k = -6",
          "k = 3", 
          "k = -3"
        ],
        answer: 1,
        marks: 2
      },
      {
        question: "If x + y = 14 and x - y = 4, then the value of x² + y² is:",
        options: [
          "116",
          "106", 
          "126",
          "136"
        ],
        answer: 1,
        marks: 2
      },
      {
        question: "The value of λ for which the system of equations 2x + 3y = 7 and (λ+1)x + (2λ-1)y = 4λ + 1 has infinitely many solutions is:",
        options: [
          "λ = 2",
          "λ = 3",
          "λ = 1", 
          "λ = 4"
        ],
        answer: 0,
        marks: 3
      },
      {
        question: "A two digit number is such that the product of its digits is 14. When 45 is added to the number, the digits interchange their places. The number is:",
        options: [
          "27",
          "72",
          "37",
          "73"
        ],
        answer: 0,
        marks: 3
      },
      {
        question: "If 2x + 3y = 11 and 2x - 4y = -24, then the value of y - x is:",
        options: [
          "1",
          "2", 
          "3",
          "4"
        ],
        answer: 2,
        marks: 2
      },
      {
        question: "The father's age is 6 times his son's age. Four years hence, the age of the father will be 4 times his son's age. The present ages of son and father are respectively:",
        options: [
          "4 years, 24 years",
          "5 years, 30 years",
          "6 years, 36 years", 
          "8 years, 48 years"
        ],
        answer: 3,
        marks: 3
      },
      {
        question: "For the equations ax + by = c and lx + my = n to have unique solution, which condition must be satisfied?",
        options: [
          "a/l ≠ b/m",
          "a/l = b/m = c/n",
          "a/l = b/m ≠ c/n", 
          "am - bl = 0"
        ],
        answer: 0,
        marks: 2
      },
      {
        question: "If the system 2x - 3y = 7 and (a+b)x - (a+b-3)y = 4a + b has infinitely many solutions, then:",
        options: [
          "a = 2b",
          "2a = b", 
          "a + 2b = 0",
          "2a + b = 0"
        ],
        answer: 3,
        marks: 4
      }
    ]
  }
};

let currentTestName = "";
let currentTest = [];
let currentQ = 0;
let answers = [];
let markedForReview = new Set();
const timerDurationSeconds = 20 * 60;
let timerInterval = null;
let timeRemaining = timerDurationSeconds;

// DOM references
const mainMenuDiv = document.getElementById("main-menu");
const quizContainer = document.getElementById("quiz-container");
const questionNumberDiv = document.getElementById("question-number");
const questionTextDiv = document.getElementById("question-text");
const marksDiv = document.getElementById("marks");
const optionsListDiv = document.getElementById("options-list");
const questionPaletteDiv = document.getElementById("question-palette");
const timerDisplay = document.getElementById("timer");
const testNameSpan = document.getElementById("test-name");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-btn");
const reviewBtn = document.getElementById("review-btn");
const reportBtn = document.getElementById("report-btn");

// Dynamically fill menu content sections
function fillMenuSections() {
  const contentTests = document.getElementById('content-tests');
  contentTests.innerHTML = '';
  const ulTests = document.createElement("ul");
  Object.keys(tests).forEach(testName => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = testName;
    btn.onclick = () => {
      startTest(testName);
      toggleMenu('tests');
    };
    li.appendChild(btn);
    ulTests.appendChild(li);
  });
  contentTests.appendChild(ulTests);

  const contentHistory = document.getElementById('content-history');
  contentHistory.innerHTML = '';
  const histBtn = document.createElement("button");
  histBtn.textContent = "Show History";
  histBtn.onclick = () => {
    showHistory();
    toggleMenu('history');
  };
  contentHistory.appendChild(histBtn);

  const contentSheets = document.getElementById('content-sheets');
  contentSheets.innerHTML = '';
  const sheetBtn = document.createElement("button");
  sheetBtn.textContent = "Show Test Sheets";
  sheetBtn.onclick = () => {
    showTestSheets();
    toggleMenu('sheets');
  };
  contentSheets.appendChild(sheetBtn);
}

function clearTestSheets() {
  if (confirm("Clear all test sheets? This action cannot be undone.")) {
    localStorage.removeItem("testSheets");
    showTestSheets();
  }
}

function updateTimerAppearance(timeLeft) {
  const timer = document.getElementById('timer');
  timer.classList.remove('warning', 'critical');
  if (timeLeft <= 10) {
    timer.classList.add('critical');
  } else if (timeLeft <= 60) {
    timer.classList.add('warning');
  }
}

function startTimer(durationSec) {
  clearInterval(timerInterval);
  timeRemaining = durationSec;
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timeRemaining--;
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      alert("Time's up! Test will be submitted automatically.");
      submitTest();
    } else {
      updateTimerDisplay();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  timerDisplay.textContent = `00:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function showMainMenu() {
  mainMenuDiv.style.display = 'block';
  quizContainer.style.display = 'none';
  clearInterval(timerInterval);
  timerDisplay.textContent = "00:20:00";
  fillMenuSections();
  toggleMenu('tests');
  currentTestName = "";
  currentTest = [];
  currentQ = 0;
  answers = [];
  markedForReview.clear();
}

function startTest(testName) {
  currentTestName = testName;
  const selectedTest = tests[testName];
  
  if (!selectedTest) {
    alert(`Test "${testName}" not found!`);
    showMainMenu();
    return;
  }
  
  if (!selectedTest.questions || selectedTest.questions.length === 0) {
    alert(`Test "${testName}" has no questions!`);
    showMainMenu();
    return;
  }
  
  currentTest = selectedTest.questions;
  currentQ = 0;
  answers = new Array(currentTest.length).fill("");
  markedForReview.clear();

  mainMenuDiv.style.display = 'none';
  quizContainer.style.display = 'block';
  testNameSpan.textContent = `${selectedTest.testName || testName}`;
  
  const timeLimit = (selectedTest.timeLimit || 20) * 60;
  startTimer(timeLimit);
  
  showQuestion(currentQ);
}

function showQuestion(idx) {
  currentQ = idx;
  const q = currentTest[currentQ];
  questionNumberDiv.textContent = `Question No. ${currentQ + 1} of ${currentTest.length}`;
  questionTextDiv.textContent = q.question;
  marksDiv.textContent = `Marks: ${q.marks}`;
  optionsListDiv.innerHTML = "";
  
  if (q.options && q.options.length > 0) {
    q.options.forEach((opt, i) => {
      const optionDiv = document.createElement("div");
      optionDiv.classList.add("option-container");
      if (answers[currentQ] === i) optionDiv.classList.add("selected");
      optionDiv.textContent = opt;
      optionDiv.style.userSelect = "none";
      
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "option";
      radio.id = `opt${i}`;
      radio.value = i;
      radio.style.display = "none";
      if (answers[currentQ] === i) radio.checked = true;
      
      optionDiv.addEventListener("click", () => {
        answers[currentQ] = i;
        updatePalette();
        showQuestion(currentQ);
      });
      
      optionsListDiv.appendChild(radio);
      optionsListDiv.appendChild(optionDiv);
    });
  } else {
    const textarea = document.createElement("textarea");
    textarea.style.width = "100%";
    textarea.style.height = "120px";
    textarea.value = answers[currentQ] || "";
    textarea.addEventListener("input", e => {
      answers[currentQ] = e.target.value;
      updatePalette();
    });
    optionsListDiv.appendChild(textarea);
  }
  updatePalette();
}

function updatePalette() {
  questionPaletteDiv.innerHTML = "";
  currentTest.forEach((_, i) => {
    const btn = document.createElement("button");
    btn.textContent = i + 1;
    if (markedForReview.has(i)) {
      btn.className = "marked";
    } else if (answers[i] === null || answers[i] === "") {
      btn.className = "not-visited";
    } else {
      btn.className = "answered";
    }
    if (i === currentQ) btn.style.border = "3px solid #ff5722";
    btn.addEventListener("click", () => {
      showQuestion(i);
    });
    questionPaletteDiv.appendChild(btn);
  });
}

nextBtn.onclick = () => {
  if (currentQ < currentTest.length - 1) {
    showQuestion(currentQ + 1);
  }
};

submitBtn.onclick = () => {
  if (confirm(`Submit test? You have answered ${answers.filter(a => a !== "").length} of ${currentTest.length} questions.`)) {
    submitTest();
  }
};

cancelBtn.onclick = () => {
  if (confirm("Cancel test and lose all progress?")) {
    clearInterval(timerInterval);
    showMainMenu();
  }
};

reviewBtn.onclick = () => {
  if (markedForReview.has(currentQ)) {
    markedForReview.delete(currentQ);
  } else {
    markedForReview.add(currentQ);
  }
  updatePalette();
};

reportBtn.onclick = () => {
  alert("Thank you for reporting this question. Our team will review it.");
};

function submitTest() {
  clearInterval(timerInterval);
  let score = 0;
  
  answers.forEach((ans, i) => {
    if (typeof ans === "number" && currentTest[i].answer === ans) {
      score++;
    }
  });

  saveHistory({
    testName: currentTestName,
    score,
    total: currentTest.length,
    date: new Date().toLocaleString(),
    answers: answers.slice()
  });

  saveTestSheet(currentTestName, currentTest, answers);
  showResultPage(currentTestName, score, currentTest.length, answers);
}

function saveHistory(entry) {
  let history = JSON.parse(localStorage.getItem("quizHistory")) || [];
  history.push(entry);
  localStorage.setItem("quizHistory", JSON.stringify(history));
}

function saveTestSheet(testName, questions, answers) {
  let sheets = JSON.parse(localStorage.getItem("testSheets")) || [];
  let paperText = `Test: ${testName}\n\n`;
  questions.forEach((q, i) => {
    paperText += `Q${i + 1}: ${q.question}\n`;
    paperText += `A${i + 1}: ${answers[i] || ""}\n\n`;
  });
  sheets.push({ testName, date: new Date().toLocaleString(), paperText });
  localStorage.setItem("testSheets", JSON.stringify(sheets));
}

function showHistory() {
  mainMenuDiv.style.display = 'none';
  quizContainer.style.display = 'block';
  let history = JSON.parse(localStorage.getItem("quizHistory")) || [];
  
  if (history.length === 0) {
    quizContainer.innerHTML = `
      <div class="score-page">
        <h2>No History Found</h2>
        <button class="btn-primary" onclick="showMainMenu()">Back to Main Menu</button>
      </div>
    `;
    return;
  }
  
  let html = `
    <div class="score-page">
      <h2>Test History</h2>
      <table>
        <thead>
          <tr><th>Test Name</th><th>Score</th><th>Date</th></tr>
        </thead>
        <tbody>
  `;
  
  history.slice().reverse().forEach((item, idx) => {
    html += `
      <tr class="history-row" data-idx="${history.length - 1 - idx}" style="cursor:pointer;">
        <td>${item.testName}</td>
        <td>${item.score} / ${item.total}</td>
        <td>${item.date}</td>
      </tr>
    `;
  });
  
  html += `
        </tbody>
      </table>
      <button class="btn-primary" onclick="showMainMenu()" style="margin-top:20px;">Back to Main Menu</button>
      <button class="btn-secondary" onclick="clearHistory()" style="margin-top:10px;">Clear History</button>
    </div>
  `;
  
  quizContainer.innerHTML = html;
  
  document.querySelectorAll(".history-row").forEach(row => {
    row.addEventListener("click", () => {
      const idx = Number(row.getAttribute("data-idx"));
      showResultFromHistory(idx);
    });
  });
}

function showResultFromHistory(idx) {
  const history = JSON.parse(localStorage.getItem("quizHistory")) || [];
  const entry = history[idx];
  if (!entry) {
    alert("Result not found.");
    showHistory();
    return;
  }
  
  const testName = entry.testName;
  const score = entry.score;
  const total = entry.total;
  const date = entry.date;
  const userAnswers = entry.answers;
  
  const testObj = tests[testName];
  if (!testObj || !testObj.questions) {
    alert("Test data unavailable for this result.");
    showHistory();
    return;
  }
  
  showResultPage(testName, score, total, userAnswers, date);
}

function showResultPage(testName, score, total, userAnswers, date = null) {
  const testObj = tests[testName];
  const testQuestions = testObj && testObj.questions ? testObj.questions : [];
  
  if (!testQuestions || testQuestions.length === 0) {
    alert("Test data unavailable for this result.");
    showHistory();
    return;
  }
  
  let html = `
    <div class="score-page">
      <h2>${testObj.testName || testName} Result${date ? ` (${date})` : ""}</h2>
      <p>Your Score: <span class="score">${score} / ${total}</span></p>
      <hr>
  `;
  
  testQuestions.forEach((q, i) => {
    const userAns = userAnswers ? userAnswers[i] : null;
    const correctAns = q.answer ?? null;
    const isCorrect = userAns === correctAns;
    
    html += `
      <div class="evaluation-question" style="margin-bottom:20px;">
        <b>Q${i + 1} (${q.marks} marks):</b> ${q.question}<br>
    `;
    
    if (q.options) {
      html += `<b>Your answer:</b> ${typeof userAns === 'number' ? q.options[userAns] : 'Not answered'}<br>`;
      if (correctAns !== null) {
        html += `<b>Correct answer:</b> ${q.options[correctAns]}<br>`;
        if (!isCorrect && q.solution) {
          html += `<i style="color: #e74c3c;">✗ Incorrect</i><br>`;
          html += `<b>Explanation:</b> ${q.solution}<br>`;
        } else if (isCorrect) {
          html += `<i style="color: #27ae60;">✓ Correct</i><br>`;
        }
      }
    } else {
      html += `<b>Your answer:</b> ${userAns || 'Not answered'}<br>`;
      if (q.solution) {
        html += `<b>Sample answer:</b> ${q.solution}<br>`;
      }
      html += `<i style="color: #f39c12;">⚠ Requires manual evaluation</i><br>`;
    }
    
    html += `<hr></div>`;
  });
  
  html += `
      <div class="score-buttons">
        <button class="btn-primary" onclick="showMainMenu()">Back to Main Menu</button>
        <button class="btn-secondary" onclick="showHistory()">View History</button>
      </div>
    </div>
  `;
  
  quizContainer.innerHTML = html;
  mainMenuDiv.style.display = 'none';
  quizContainer.style.display = 'block';
}

function clearHistory() {
  if (confirm("Clear all history? This cannot be undone.")) {
    localStorage.removeItem("quizHistory");
    showHistory();
  }
}

function showTestSheets() {
  mainMenuDiv.style.display = 'none';
  quizContainer.style.display = 'block';
  let sheets = JSON.parse(localStorage.getItem("testSheets")) || [];
  
  if (sheets.length === 0) {
    quizContainer.innerHTML = `
      <div class="score-page">
        <h2>No Test Sheets Found</h2>
        <button class="btn-primary" onclick="showMainMenu()">Back to Main Menu</button>
      </div>
    `;
    return;
  }
  
  let html = `<div class="score-page"><h2>Test Sheets</h2><ul>`;
  sheets.forEach((sheet, idx) => {
    html += `<li><b>${sheet.testName}</b> (${sheet.date})<br>
      <button class="btn-secondary" onclick="viewSheet(${idx})" style="margin-top:7px;">View</button>
    </li>`;
  });
  
  html += `</ul>
    <div class="score-buttons">
      <button class="btn-primary" onclick="showMainMenu()">Back to Main Menu</button>
      <button class="btn-secondary" onclick="clearTestSheets()" style="background-color: #e74c3c;">Clear All Sheets</button>
    </div>
    </div>`;
  
  quizContainer.innerHTML = html;
}

function viewSheet(idx) {
  let sheets = JSON.parse(localStorage.getItem("testSheets")) || [];
  let sheet = sheets[idx];
  if (!sheet) {
    alert("Sheet not found.");
    showTestSheets();
    return;
  }
  
  quizContainer.innerHTML = `
    <div class="score-page">
      <h3>${sheet.testName} (${sheet.date})</h3>
      <textarea readonly style="width:100%; height:350px; font-size:15px;">${sheet.paperText}</textarea>
      <p>
        <button class="btn-secondary" onclick="showTestSheets()">Back to Sheets</button>
        <button class="btn-primary" onclick="showMainMenu()">Main Menu</button>
      </p>
      <small>You can copy the content above for AI or manual evaluation.</small>
    </div>`;
  mainMenuDiv.style.display = 'none';
  quizContainer.style.display = 'block';
}

document.addEventListener("DOMContentLoaded", () => {
  fillMenuSections();
  toggleMenu('tests');
  showMainMenu();
});
