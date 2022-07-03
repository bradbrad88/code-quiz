const QUESTIONS = [
  {
    title: "Inside which HTML element do we put JavaScript?",
    answers: [
      { answer: "<script>", correct: true },
      { answer: "<scripting>", correct: false },
      { answer: "<js>", correct: false },
      { answer: "<javascript>", correct: false },
    ],
  },
  {
    title: "Where is the correct place to insert JavaScript?",
    answers: [
      { answer: "The <body> section", correct: false },
      { answer: "Both the <head> section and the <body> section are correct", correct: true },
      { answer: "The <head> section", correct: false },
    ],
  },
  {
    title: "What is the correct syntax for referring to an external script called 'xxx.js'?",
    answers: [
      { answer: '<script href="xxx.js">', correct: false },
      { answer: '<script name="xxx.js">', correct: false },
      { answer: '<script src="xxx.js">', correct: true },
      { answer: '<script data="xxx.js">', correct: false },
    ],
  },
  {
    title: "The external JavaScript file must contain the <script> tag.",
    answers: [
      { answer: "True", correct: false },
      { answer: "False", correct: true },
    ],
  },
  {
    title: "How do you write 'Hello World' in an alert box?",
    answers: [
      { answer: 'alert("Hello World");', correct: true },
      { answer: 'alertBox("Hello World");', correct: false },
      { answer: 'msgBox("Hello World");', correct: false },
      { answer: 'msg("Hello World");', correct: false },
    ],
  },
  {
    title: "How do you create a function in JavaScript?",
    answers: [
      { answer: "function myFunction() {}", correct: true },
      { answer: "function:myFunction() {}", correct: false },
      { answer: "function = myFunction() {}", correct: false },
      { answer: "myFunction() {}", correct: false },
    ],
  },
  {
    title: `How do you call a function named "myFunction"?`,
    answers: [
      { answer: "call myFunction()", correct: false },
      { answer: "call function myFunction()", correct: false },
      { answer: "myFunction()", correct: true },
    ],
  },
  {
    title: `How do you write an IF statement in JavaScript?`,
    answers: [
      { answer: "if i = 5", correct: false },
      { answer: "if i == 5 then", correct: false },
      { answer: "if (i == 5)", correct: true },
      { answer: "if i = 5 then", correct: false },
    ],
  },
  {
    title: `How to write an IF statement for executing some code if "i" is NOT equal to 5?`,
    answers: [
      { answer: "if (i <> 5)", correct: false },
      { answer: "if i <> 5", correct: false },
      { answer: "if i =! 5 then", correct: false },
      { answer: "if (i != 5)", correct: true },
    ],
  },
  {
    title: `How does a WHILE loop start?`,
    answers: [
      { answer: "while (i <= 10; i++)", correct: false },
      { answer: "while i = 1 to 10", correct: false },
      { answer: "while (i <= 10)", correct: true },
      { answer: "while i <= 10", correct: false },
    ],
  },
  // {
  //   title: `How does a FOR loop start?`,
  //   answers: [
  //     { answer: "for i = 1 to 5", correct: false },
  //     { answer: "for (i = 0; i <= 5)", correct: false },
  //     { answer: "for (i <= 5; i++)", correct: false },
  //     { answer: "for (i = 0; i <= 5; i++)", correct: true },
  //   ],
  // },
  // {
  //   title: `How can you add a comment in a JavaScript?`,
  //   answers: [
  //     { answer: "' This is a comment", correct: false },
  //     { answer: "// This is a comment", correct: true },
  //     { answer: "<!-- This is a comment -->", correct: false },
  //     { answer: "# This is a comment", correct: false },
  //   ],
  // },
  // {
  //   title: `How to insert a comment that has more than one line?`,
  //   answers: [
  //     { answer: "/* multi line comment */", correct: true },
  //     { answer: "// multi line comment //", correct: false },
  //     { answer: "<!-- multi line comment -->", correct: false },
  //   ],
  // },
  // {
  //   title: `What is the correct way to write a JavaScript array?`,
  //   answers: [
  //     { answer: 'var colours = "red", "green", "blue"', correct: false },
  //     { answer: 'var colours = 1 = ("red"), 2 = ("green"), 3 = ("blue")', correct: false },
  //     { answer: 'var colours = (1: "red", 2: "green", 3: "blue")', correct: false },
  //     { answer: 'var colours = ["red", "green", "blue"]', correct: true },
  //   ],
  // },
  // {
  //   title: `How do you round the number 7.25, to the nearest integer?`,
  //   answers: [
  //     { answer: "round(7.25)", correct: false },
  //     { answer: "rnd(7.25)", correct: false },
  //     { answer: "Math.round(7.25)", correct: true },
  //     { answer: "Math.rnd(7.25)", correct: false },
  //   ],
  // },
  // {
  //   title: `How do you find the number with the highest value of x and y?`,
  //   answers: [
  //     { answer: "Math.ceil(x, y)", correct: false },
  //     { answer: "ceil(x, y)", correct: false },
  //     { answer: "top(x, y)", correct: false },
  //     { answer: "Math.max(x, y)", correct: true },
  //   ],
  // },
  // {
  //   title: `What is the correct JavaScript syntax for opening a new window called "w2" ?`,
  //   answers: [
  //     { answer: 'w2 = window.new("https://www.w3schools.com")', correct: false },
  //     { answer: 'w2 = window.open("https://www.w3schools.com")', correct: true },
  //   ],
  // },
  // {
  //   title: `JavaScript is the same as Java`,
  //   answers: [
  //     { answer: "True", correct: false },
  //     { answer: "False", correct: true },
  //   ],
  // },
  // {
  //   title: `How can you detect the client's browser name?`,
  //   answers: [
  //     { answer: "browser.name", correct: false },
  //     { answer: "client.navName", correct: false },
  //     { answer: "navigator.appName", correct: true },
  //   ],
  // },
  // {
  //   title: `Which event occurs when the user clicks on an HTML element?`,
  //   answers: [
  //     { answer: "onmouseclick", correct: false },
  //     { answer: "onclick", correct: true },
  //     { answer: "onchange", correct: false },
  //     { answer: "onmouseover", correct: false },
  //   ],
  // },
  // {
  //   title: `How do you declare a JavaScript variable?`,
  //   answers: [
  //     { answer: "v carName;", correct: false },
  //     { answer: "var carName;", correct: true },
  //     { answer: "variable carName", correct: false },
  //     { answer: "declare carName", correct: false },
  //   ],
  // },
  // {
  //   title: `Which operator is used to assign a value to a variable?`,
  //   answers: [
  //     { answer: "x", correct: false },
  //     { answer: "=", correct: true },
  //     { answer: "*", correct: false },
  //     { answer: "-", correct: false },
  //   ],
  // },
  // {
  //   title: `What will the following code return: Boolean(10 > 9)`,
  //   answers: [
  //     { answer: "false", correct: false },
  //     { answer: "true", correct: true },
  //     { answer: "NaN", correct: false },
  //   ],
  // },
  // {
  //   title: `JavaScript is case-sensitive`,
  //   answers: [
  //     { answer: "false", correct: false },
  //     { answer: "true", correct: true },
  //   ],
  // },
];

// Developer validation to ensure that questions have exactly one correct answer
function checkQuestions() {
  QUESTIONS.forEach(question => {
    const correctAnswers = question.answers.filter(answer => answer.correct);
    if (correctAnswers.length === 1) return;
    if (correctAnswers.length === 0)
      return console.error("Question has no correct answer", question);
    if (correctAnswers.length > 1)
      return console.error("Question has multiple correct answers");
  });
}

checkQuestions();
