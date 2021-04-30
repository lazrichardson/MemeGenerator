const EVENTS = {
    DOM_LOADED: "DOMContentLoaded",
};

let fontSize = 4;
let documentUploaded = false;

window.addEventListener(EVENTS.DOM_LOADED, () => {

    document.getElementById("topText").addEventListener("keyup", () => {
        updateTopCaption();
        console.log("updated top")
    });

    document.getElementById("bottomText").addEventListener("keyup", () => {
        updateBottomCaption();
        console.log("updated btm")
    });

    document.getElementById("fontBigger").addEventListener("click", () => {
        fontChange(1)
        console.log("font up")
    });

    document.getElementById("fontSmaller").addEventListener("click", () => {
        fontChange(0)
        console.log("font down")
    });

    document.getElementById("imgSubmit").addEventListener("click", () => {
        fileSubmit().then(function () {
            console.log("Image uploaded successfully")
            documentUploaded = true;
        });
    });

    document.getElementById("print").addEventListener("click", () => {
        printController();
    });

    document.getElementById("dogeMeme").addEventListener("click", () => {
        imageSwitch("images/Doge-meme-template.jpg");
    });

    document.getElementById("badLuckMeme").addEventListener("click", () => {
        imageSwitch("images/Bad_Luck_Brian.jpg");
    });

    document.getElementById("oneNotSimply").addEventListener("click", () => {
        imageSwitch("images/One-Does-Not-Simply.jpg");
    });

    document.getElementById("ancientAliens").addEventListener("click", () => {
        imageSwitch("images/Ancient-Aliens.jpg");
    });

    document.getElementById("successKid").addEventListener("click", () => {
        imageSwitch("images/Success-Kid.jpeg");
    });

    document.getElementById("notSureIf").addEventListener("click", () => {
        imageSwitch("images/NOTSUREIF.jpg");
    });

    document.getElementById("keanu").addEventListener("click", () => {
        imageSwitch("images/conspiracykeanu.jpg");
    });

    document.getElementById("businessCat").addEventListener("click", () => {
        imageSwitch("images/business-cat.jpg");
    });

    document.getElementById("billGates").addEventListener("click", () => {
        imageSwitch("images/bill-gates.jpg");
    });

    document.getElementById("catNewspaper").addEventListener("click", () => {
        imageSwitch("images/cat-newspaper.jpg");
    });


})
    ; // end of listeners

function printController() {
    if (documentUploaded === false) {
        generateCanvas().then(function () {
            console.log("printed");
        })
    } else {
        window.print();
    }
}

function updateMemeName(newPath) {
    let titleText = document.getElementById("meme-name");
    let newTitle;

    // set the top text based on what the user uploads
    if (newPath.includes("Buff-Doge")) {
        newTitle = "Buff Doge vs. Cheems";
    } else if (newPath.includes("Doge-meme")) {
        newTitle = "Doge";
    } else if (newPath.includes("Bad_Luck")) {
        newTitle = "Bad Luck Brian";
    } else if (newPath.includes("One-Does-Not")) {
        newTitle = "One Does Not Simply";
    } else if (newPath.includes("Ancient-Aliens")) {
        newTitle = "Ancient Aliens";
    } else if (newPath.includes("bill-gates")) {
        newTitle = "Bill Gates";
    } else if (newPath.includes("NOTSURE")) {
        newTitle = "Not Sure Fry";
    } else if (newPath.includes("Success-Kid")) {
        newTitle = "Success Kid";
    } else if (newPath.includes("Keanu")) {
        newTitle = "Conspiracy Keanu";
    } else if (newPath.includes("cat-newspaper")) {
        newTitle = "Cat Reading Newspaper";
    } else if (newPath.includes("business-cat")) {
        newTitle = "Business Cat";
    } else {
        newTitle = "Custom Meme";
    }

    // set the new title
    titleText.innerText = newTitle;
}

// generate a html2d canvas
async function printCanvas(canvas) {

    let css = "<head><title>Share</title>" + "<!-- Required meta tags -->\n" +
        "  <meta charset=\"utf-8\">\n" +
        " <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">\n" +
        " <!-- Bootstrap CSS -->\n" +
        " <link rel=\"stylesheet\"" +
        " href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\"\n" +
        " integrity=\"sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T\"" +
        " crossorigin=\"anonymous\">\n" +
        " <!-- Internal CSS -->\n" +
        " <link rel=\"stylesheet\" href=\"css/style2.css\"></head>"

    let my_window = window.open('', 'mywindow', 'width=' + screen.availWidth + ',height=' + screen.availHeight);
    my_window.document.write('<!DOCTYPE html>');
    my_window.document.write('<html lang="en">');
    my_window.document.write(css);
    my_window.document.write('<body>');
    my_window.document.write('<img src="' + canvas.toDataURL() + '" alt="exported image">');
    my_window.document.write('<p>Please copy or Print this image.')
    my_window.document.write('When you print this window, it will close afterward.</p>');
    my_window.document.write('</body></html>');
}


async function generateCanvas() {

    let section = document.getElementById("printArea");

    html2canvas(section, {
        logging: true,
        allowTaint: true,
    }).then(function (canvas) {
        return canvas;
    }).then(function (res) {
        printCanvas(res);
    });
}

async function fileSubmit() {
    let uploadedFile = document.getElementById("imgUpload").files[0];
    uploadedFile = window.URL.createObjectURL(uploadedFile);
    document.getElementById("mainImage").src = uploadedFile;
    documentUploaded = true;
    updateMemeName(uploadedFile);
}

function imageSwitch(newPath) {
    console.log(document.getElementById("mainImage").src);
    document.getElementById("mainImage").src = newPath;
    updateMemeName(newPath);
    documentUploaded = false;
}

function updateTopCaption() {
    document.getElementById("top-caption").innerText = document.getElementById("topText").value;
}

function updateBottomCaption() {
    document.getElementById("bottom-caption").innerText = document.getElementById("bottomText").value;
}

function fontChange(direction) {
    let topCaption = document.getElementById("top-caption");
    let botCaption = document.getElementById("bottom-caption");


    // default font size for project is 4vw;
    if (direction === 0) {
        if (!(fontSize === 1)) {
            fontSize = fontSize - 0.5;

            botCaption.style.fontSize = fontSize + "vw";
            topCaption.style.fontSize = fontSize + "vw";
        }
    } else {
        if (!(fontSize === 9)) {
            fontSize = fontSize + 0.5;

            botCaption.style.fontSize = fontSize + "vw";
            topCaption.style.fontSize = fontSize + "vw";
        }
    }
}