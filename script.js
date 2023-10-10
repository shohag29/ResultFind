let results = [];
const loadeResults = () => {
    fetch(`./json/results.json`)
        .then((res) => res.json())
        .then((data) => {
            results = data
        });
}

loadeResults();


// SINGLE RESULT FIND HERE

const rollinput = document.getElementById("rollinput");
const resultOutPut = document.getElementById("resultOutPut");

document.getElementById("singleBtn").addEventListener("click", function () {
    const rollNo = parseInt(rollinput.value);
    if (rollinput.value == "") {
        resultOutPut.innerHTML = `<h5 class="warning">Please Enter A Roll Number.</h5>`
    }
    else {
        resultOutPut.innerHTML = `<h5 class="warning">Enter a Valid Roll Number.</h5>`
    }
    const singleResult = results.find(result => result.roll == rollNo)
    resultOutPut.innerHTML = `
    <h5>Roll No: ${singleResult.roll}</h5>
    <h5>GPA: ${singleResult.gpa}</h5>
    `
    rollinput.value = ""
});

// SINGLE RESULT FIND CLOSE


// STUDENT FILTER HERE

const gpaOutput = document.getElementById("gpaOutput");
const minG = document.getElementById("min");
const maxG = document.getElementById("max");
const total = document.getElementById("total");

document.getElementById("btnMinMax").addEventListener("click", function () {
    gpaOutput.innerHTML = "";
    const min = parseFloat(minG.value);
    const max = parseFloat(maxG.value);

    if (minG.value == "" || maxG.value == "") {
        gpaOutput.innerHTML = `<h5 class="warning">Enter Min And Max Value</h5>`
    }
    else {
        i = 0
        for (const result of results) {
            if (parseFloat(result.gpa) >= min && parseFloat(result.gpa) <= max) {
                i++
                const newDiv = document.createElement("div")
                newDiv.innerHTML = `<h5>Roll No :${result.roll} & GPA: ${result.gpa}</h5>`
                gpaOutput.appendChild(newDiv)
            }
            if (1 > min || 4 < max) {
                gpaOutput.innerHTML = `<h5 class="warning">Enter Min & Max Between 1 out of 4<h5>`
            }

        }
        total.innerHTML = `Total Student : ${i}`
        minG.value = ""
        maxG.value = ""
    }
});

// STUDENT FILTER CLOSE



// COMPARE BETWEEN TO STUDENT HERE

const studentInpOne = document.getElementById("studentInpOne");
const studentInpTwo = document.getElementById("studentInpTwo");
const compareOutput = document.getElementById("compareOutput");

document.getElementById("compareBtn").addEventListener("click", function () {
    const stdInputOne = parseInt(studentInpOne.value);
    const stdInputTwo = parseInt(studentInpTwo.value);

    for (let result of results) {
        if (result.roll !== stdInputOne && result.roll !== stdInputTwo) {
            compareOutput.innerHTML = `<h5 class="warning">Please Enter Both Roll No crrectly to compare</h5>`
        }
        if (stdInputOne == "" || stdInputTwo == "") {
            compareOutput.innerHTML = `<h5 class="warning">Please Enter Both Roll No to compare</h5>`
        }
    }

    const resultOne = results.find(result => result.roll == stdInputOne);
    const resultTwo = results.find(result => result.roll == stdInputTwo);
    const stdOneResult = parseFloat(resultOne.gpa);
    const stdTwoResult = parseFloat(resultTwo.gpa);

    if (stdOneResult > stdTwoResult) {
        compareOutput.innerHTML = `<h5>${stdInputOne}(${stdOneResult}) Done ${((25 * stdOneResult).toFixed(2)) - ((25 * stdTwoResult).toFixed(2))}% better Result Then ${stdInputTwo} (${stdTwoResult}) </h5>`
    }
    else if (stdOneResult < stdTwoResult) {
        compareOutput.innerHTML = `<h5>${stdInputTwo} (${stdTwoResult}) Done ${((25 * stdTwoResult).toFixed(2)) - ((25 * stdOneResult).toFixed(2))}% better Result Then ${stdInputOne} (${stdOneResult})</h5>`
    }
    else if (stdOneResult == stdTwoResult) {
        compareOutput.innerHTML = `<h5>${stdInputTwo}(${stdTwoResult}) and ${stdInputOne}(${stdOneResult})Both have same GPA</h5>`
    }
});

// COMPARE BETWEEN TO STUDENT CLOSE
