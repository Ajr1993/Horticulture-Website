const quizData = [
    {
        question: "What is plant propagation?",
        options: ["Feeding plants", "watering plants", "Making new plants", "cutting grass"],
        correct: "Making new plants"
    },
    {
        question: "Which method uses seed to grow new plants?",
        options: ["Cuttings", "Layering", "Seed propagation", "Grafting"],
        correct: "Seed propagation"
    },
    {
        question: "Which tool is often used for cuttings?",
        options: ["Hammer", "Secateurs", "Strimmer", "Rake"],
        correct: "Secateurs"
    },
    {
        question: "What does a cutting need to be able to grow roots?",
        options: ["Dry soil", "Fertiliser", "Water and correct temperature", "Gravel"],
        correct: "Water and correct temperature"
    },
    {
        question: "What is one benefit of seed propagation?",
        options: ["Takes less time", "Always grows the same plant", "Produces lots of plants", "Needs no water"],
        correct: "Produces lots of plants"
    },
    {
        question: "Layering is a method where the stem is...",
        options: ["Cut off", "Bent to the ground", "Put in a pot", "Burnt"],
        correct: "Bent to the ground"
    },
    {
        question: "Which plant part is often used in cuttings?",
        options: ["Leaf or stem", "Fruit", "Flower", "Seed"],
        correct: "Leaf or stem"
    },
    {
        question: "Which method is best for producing identical plants?",
        options: ["Layering", "Cuttings", "Seed propagation", "Composting"],
        correct: "Cuttings"
    },
    {
        question: "What is the name of the young plant that grows from a seed?",
        options: ["Sprout", "Seedling", "Root", "Twig"],
        correct: "Seedling"
    },
    {
        question: "Which condition helps seeds to germinate?",
        options: ["Cold and dark", "Dry and windy", "Warmth and moisture", "Sand and gravel"],
        correct: "Warmth and moisture"
    }
];

let score = 0;

function handleQuestion(index) {
    const data = quizData[index];
    const answerDiv = document.getElementById(`answer-to-question-${index + 1}`);
    const scoreP = document.getElementById(`score-${index + 1}`);
    answerDiv.innerHTML = '';

    // Show the question
    const questionP = document.createElement('p');
    questionP.textContent = data.question;
    answerDiv.appendChild(questionP);

    // Show the options
    data.options.forEach(option => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.addEventListener('click', () => {
            if (btn.textContent === data.correct) {
                score++;
                scoreP.textContent = `Your score after round ${index + 1} is: ${score}`;
            } else {
                scoreP.textContent = `Your score after round ${index + 1} is: ${score} (Wrong answer)`;
            }

            // Disable all buttons for this question
            const allButtons = answerDiv.getElementsByTagName('button');
            for (let b of allButtons) {
                b.disabled = true;
            }
        });
        answerDiv.appendChild(btn);
    });

    // Disable the main question button after showing the question
    const questionBtn = document.getElementById(`btn-question-${index + 1}`);
    questionBtn.disabled = true;
}

// Attach listeners once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    quizData.forEach((_, index) => {
        const button = document.getElementById(`btn-question-${index + 1}`);
        if (button) {
            button.addEventListener('click', () => handleQuestion(index));
        }
    });
});