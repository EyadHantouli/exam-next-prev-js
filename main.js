

// Don't fongot to click on next or prev button to pin your answer
// cuz I didn't make a submit button for whole exam

// Fetched data example
const exam = [
    {
        Q: 'ما هي عاصمة مصر',
        a: 'القاهرة',
        b: 'الجيزة',
        c: 'الإسكندرية',
        d: 'الإسماعيلية',
        answer: 'a'
    },
    {
        Q: 'ما هي عاصمة الاردن',
        a: 'اربد',
        b: 'عمان',
        c: 'السلط',
        d: 'عجلون',
        answer: 'b'
    },
    {
        Q: 'ما هي عاصمة تونس',
        a: 'أريانة',
        b: 'باجة',
        c: 'قابس',
        d: 'تونس',
        answer: 'd'
    },
];

// Answers storage

let answers = [
    {
        checked: {
            answerCode: "", 
            isAnswered: false,
        },
    },
    {
        checked: {
            answerCode: "", 
            isAnswered: false,
        },
    },
    {
        checked: {
            answerCode: "", 
            isAnswered: false,
        },
    },
]

// ِAnswer is approved when moving to the previous or next question
function handleAnswer (currentQ, ans_code) {
    answers[currentQ].checked.answerCode = ans_code;
    answers[currentQ].checked.isAnswered = ans_code.length > 0;
};


// Render exam inside #exam div in indexedDB.html file 
function getExam (exam, currentQ) {

    // ans_code => Will be '' if user hasn't select any answer yet
    // ans_code => Selected answer code (a, b, c, d)
    let ans_code = answers[currentQ].checked.answerCode;

    // Render exam inside #exam div in indexedDB.html file
    // exam[currentQ] means current question
    document.querySelector('#exam').innerHTML = `
    <div id="exam-container">
        <form>
            <b>${exam[currentQ].Q}</b>
            <br>
            <br>
            <input type="radio" name="q" value="${exam[currentQ].a}" id="a" ${answers[currentQ].checked.isAnswered && answers[currentQ].checked.answerCode==='a' ? 'checked' : ''}>
            <label for="a">${exam[currentQ].a}</label>
            <br>
            <input type="radio" name="q" value="${exam[currentQ].b}" id="b" ${answers[currentQ].checked.isAnswered && answers[currentQ].checked.answerCode==='b' ? 'checked' : ''}>
            <label for="b">${exam[currentQ].b}</label>
            <br>
            <input type="radio" name="q" value="${exam[currentQ].c}" id="c" ${answers[currentQ].checked.isAnswered && answers[currentQ].checked.answerCode==='c' ? 'checked' : ''}>
            <label for="c">${exam[currentQ].c}</label>
            <br>
            <input type="radio" name="q" value="${exam[currentQ].d}" id="d" ${answers[currentQ].checked.isAnswered && answers[currentQ].checked.answerCode==='d' ? 'checked' : ''}>
            <label for="d">${exam[currentQ].d}</label>
        </form>
    </div>
    <br>
    <br>
    <div id="buttons">
    <button id='prev' ${!(currentQ > 0) ? "disabled" : ""}>السابق</button>
    <button id='next' ${!(currentQ < exam.length-1) ? "disabled" : ""}>التالي</button>
    <button id='print'>الإجابات</button>

    </div>
    `

    // Set ans_code to the selected answer code (a, b, c, d)
    document.querySelector('#a').onclick = () => {ans_code='a'}
    document.querySelector('#b').onclick = () => {ans_code='b'}
    document.querySelector('#c').onclick = () => {ans_code='c'}
    document.querySelector('#d').onclick = () => {ans_code='d'}

    // prev question button on click 
    document.querySelector('#prev').onclick = () => {

        handleAnswer(currentQ, ans_code) // pin the answer

        if (currentQ > 0) currentQ-- // check if you are in first question
        getExam(exam, currentQ) // rerender exam with the prev question
    };
    
    // next question button on click 
    document.querySelector('#next').onclick = () => {

        handleAnswer(currentQ, ans_code) // pin the answer

        if (currentQ < exam.length-1) currentQ++ // check if you are in last question
        getExam(exam, currentQ) // rerender exam with the next question
    };
    
    // Print user answers in window.alert function
    document.querySelector('#print').onclick = () => {
        alert(`اجابات المستخدم: ${answers.map(x => x.checked.answerCode).join(' | ')} \n
اجابات الإمتحان: ${exam.map(x => x.answer).join(' | ')}
        `)
    };
};


// Start exam
getExam(exam, 0);