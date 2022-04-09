const colorPickerEl = document.getElementById('color-picker');
const schemeModeEl = document.querySelector('#color-scheme');
const schemeBtnEl = document.querySelector('#get-scheme-btn');
const hexPickerEl = document.querySelector('#hex')

const c0 = document.querySelector('.c0');
const c1 = document.querySelector('.c1');
const c2 = document.querySelector('.c2');
const c3 = document.querySelector('.c3');
const c4 = document.querySelector('.c4');
// const c5 = document.querySelector('.c5');

const p0 = document.querySelector('.p0');
const p1 = document.querySelector('.p1');
const p2 = document.querySelector('.p2');
const p3 = document.querySelector('.p3');
const p4 = document.querySelector('.p4');
// const p5 = document.querySelector('.p5');

function clickToCopyHex() {
    c0.onclick = () => {navigator.clipboard.writeText(p0.textContent)}
    c1.onclick = () => {navigator.clipboard.writeText(p1.textContent)}
    c2.onclick = () => {navigator.clipboard.writeText(p2.textContent)}
    c3.onclick = () => {navigator.clipboard.writeText(p3.textContent)}
    c4.onclick = () => {navigator.clipboard.writeText(p4.textContent)}
    // c5.onclick = () => {navigator.clipboard.writeText(p5.textContent)}
}

function displayPreviousScheme() {
    let parsedColorScheme = JSON.parse(localStorage.getItem("savedColorScheme")) || []
    let parsedColor = JSON.parse(localStorage.getItem("colorPicked")) || []

    let parsedHex = JSON.parse(localStorage.getItem("savedHexPicked")) || []

    colorPickerEl.value = parsedHex || parsedColor

    c0.style.background = parsedColorScheme[0]
    c1.style.background = parsedColorScheme[1]
    c2.style.background = parsedColorScheme[2]
    c3.style.background = parsedColorScheme[3]
    c4.style.background = parsedColorScheme[4]
    // c5.style.background = parsedColorScheme[5]

    p0.textContent = parsedColorScheme[0]
    p1.textContent = parsedColorScheme[1]
    p2.textContent = parsedColorScheme[2]
    p3.textContent = parsedColorScheme[3]
    p4.textContent = parsedColorScheme[4]
    // p5.textContent = parsedColorScheme[5]
}

displayPreviousScheme();

schemeBtnEl.addEventListener('click', function() {
    // localStorage.clear()
    let colorPicked = colorPickerEl.value.substring(1);
    let modePicked = schemeModeEl.value;
    let hexPicked = hexPickerEl.value.substring(1);
    let finalColor;
    let savedHexPicked;

    if (hexPicked) {
        // if hexPicked.val
        finalColor = hexPicked
        savedHexPicked = hexPickerEl.value
        let savedHexPickedStringed = JSON.stringify(savedHexPicked)
        localStorage.setItem('savedHexPicked', savedHexPickedStringed)


    } else {
        finalColor = colorPicked
    }
    console.log(finalColor)

    fetch(`https://www.thecolorapi.com/scheme?hex=${finalColor}&mode=${modePicked}&count=6`)
        .then(res => res.json())
        .then(data => {
            let savedColor0 = data.colors[0].hex.value
            let savedColor1 = data.colors[1].hex.value
            let savedColor2 = data.colors[2].hex.value
            let savedColor3 = data.colors[3].hex.value
            let savedColor4 = data.colors[4].hex.value
            // let savedColor5 = data.colors[5].hex.value
            
            c0.style.background = savedColor0
            c1.style.background = savedColor1
            c2.style.background = savedColor2
            c3.style.background = savedColor3
            c4.style.background = savedColor4
            // c5.style.background = savedColor5
            
            p0.textContent = savedColor0
            p1.textContent = savedColor1
            p2.textContent = savedColor2
            p3.textContent = savedColor3
            p4.textContent = savedColor4
            // p5.textContent = savedColor5

            let savedColorScheme = [savedColor0, savedColor1, savedColor2, savedColor3, savedColor4] // savedColor5
            
            let savedColorPicker = colorPickerEl.value

            console.log("savedColorScheme array: " + savedColorScheme)
            console.log("savedColor hex: " + savedColorPicker)

            let savedColorSchemeStringed = JSON.stringify(savedColorScheme)
            let savedColorPickerStringed = JSON.stringify(savedColorPicker)

            console.log("savedColorSchemeStringed: " + savedColorSchemeStringed)
            console.log("savedColor hex: " + savedColorPicker)

            localStorage.setItem('savedColorScheme', savedColorSchemeStringed)
            localStorage.setItem('savedColorPicker', savedColorPickerStringed)

            colorPickerEl.value = "#" + finalColor
        })
})

clickToCopyHex()

