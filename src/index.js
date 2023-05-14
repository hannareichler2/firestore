import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getFirestore, getDoc, setDoc, doc  } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

// import { getDoc, setDoc, doc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

const firebaseApp = initializeApp ({
    apiKey: "AIzaSyCbA4n656MGfVsvrekiQfI_2jCB2zTPsI4",
    authDomain: "deathisnot-28c25.firebaseapp.com",
    projectId: "deathisnot-28c25",
    storageBucket: "deathisnot-28c25.appspot.com",
    messagingSenderId: "494356689157",
    appId: "1:494356689157:web:153fb0df1829d04671876c",
    measurementId: "G-8HPGPX0SP6"
});

const firestore = getFirestore();
// const test = doc(firestore, 'saveanswers');

const questionText = [
    "Do you believe in the afterlife?",
    "Do you still believe in the afterlife?",
];
const question = document.getElementById("question");
const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const thankYouMsg = document.getElementById("thankYouMsg");
const continueBtn = document.getElementById("continueBtn");

let questionIndex = 0;
let answers = [];

console.log(document.cookie);

function setQuestion() {
    question.textContent = questionText[questionIndex];
}

function answer(answer) {
    if (answer !== "continue" && questionIndex < questionText.length) {
        questionIndex++;
    }

    if (questionIndex === 1 && answer !== "continue") {
        thankYouMsg.style.display = "block";
        continueBtn.style.display = "block";
        yesBtn.style.display = "none";
        noBtn.style.display = "none";
        question.style.display = "none";
    } else if (answer === "continue") {
        thankYouMsg.style.display = "none";
        continueBtn.style.display = "none";
        yesBtn.style.display = "inline-block";
        noBtn.style.display = "inline-block";
        question.style.display = "block";
        setQuestion();
    } else if (questionIndex === questionText.length) {
        answers.push(answer);
        saveAnswers();
        window.location.href = "graphics.html";
    } else {
        answers.push(answer);
    }
}

function saveAnswers() {
    const question1Value = answers[0];
    const question2Value = answers[1];
    const surveyDataKey = "surveyData";

    const docRef = doc(firestore, "cookies", surveyDataKey);

    getDoc(docRef)
        .then((docSnapshot) => {
            let surveyData = [];
            if (docSnapshot.exists()) {
                surveyData = docSnapshot.data().value;
            }
            surveyData.push({
                before: question1Value,
                after: question2Value,
            });

            setDoc(docRef, { value: surveyData });
        })
        .catch((error) => {
            console.error("Error getting document: ", error);
        });
}


setQuestion();

yesBtn.addEventListener("click", () => answer("yes"));
noBtn.addEventListener("click", () => answer("no"));
continueBtn.addEventListener("click", () => answer("continue"));
