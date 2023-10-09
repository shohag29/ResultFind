let results = [];
const loadeResults = () => {
    fetch(`./json/results.json`)
        .then((res) => res.json())
        .then((data) => {
            results = data
        });
}

loadeResults();

const rollinput = document.getElementById("rollinput");
const resultOutPut = document.getElementById("resultOutPut");

// SINGLE RESULT FIND HERE

document.getElementById("submit").addEventListener("click", function () {
    const rollNo = parseInt(rollinput.value);
    if (rollinput.value == "") {
        resultOutPut.innerHTML = `<h5>SHOHAG</h5>`
    }
    else {
        resultOutPut.innerHTML = `<h5>BAPPY</h5>`
    }
    const singleResult = results.find(result => result.roll == rollNo)
    resultOutPut.innerHTML = `
    <h5>Roll No: ${singleResult.roll}</h5>
    <h5>GPA: ${singleResult.gpa}</h5>
    `
});

// SINGLE RESULT FIND CLOSE

