const userNote = document.getElementById("userNote");
const logBtn = document.getElementById("logBtn");
const logListContainer = document.getElementById("logList");
const greeting = document.getElementById("greeting");
const fullDate = document.getElementById("fullDate");
const isoDate = document.getElementById("isoDate");
const localeDateFormatGB = document.getElementById("localeDate");

// Create new Date instance
const date = new Date();

// ✅ Greet based on hour
const hour = date.getHours();
if (hour < 12) {
    greeting.innerText = "Good Morning!";
} else if (hour < 18) {
    greeting.innerText = "Good Afternoon!";
} else {
    greeting.innerText = "Good Evening!";
}

// ✅ Get day, month, year
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();

// ✅ Add ordinal suffix to day (1st, 2nd, 3rd, 4th...)
function getOrdinal(n) {
    if (n > 3 && n < 21) return `${n}th`; // 11-13
    switch (n % 10) {
        case 1: return `${n}st`;
        case 2: return `${n}nd`;
        case 3: return `${n}rd`;
        default: return `${n}th`;
    }
}

// ✅ Show formatted full date with ordinal day
fullDate.innerText = `${getOrdinal(day)} ${month}, ${year}`;

// ✅ Show ISO format
isoDate.innerText = date.toISOString();

// ✅ Show Locale Date Format in en-GB with options
function getLocaleDate(date) {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return date.toLocaleDateString("en-GB", options);
}
localeDateFormatGB.innerText = getLocaleDate(date);

// ✅ Log event with timestamp
logBtn.addEventListener("click", () => {
    const logMessage = userNote.value.trim();
    if (logMessage === "") {
        alert("Please Enter a Log Message!");
    } else {
        const timing = new Date().toLocaleTimeString();
        const logInput = document.createElement("li");
        logInput.innerHTML = `<strong>${timing}</strong> — ${logMessage}`;
        logListContainer.appendChild(logInput);
        userNote.value = "";
    }
});


const futureDateInput = document.getElementById("futureDate");
const daysLeftMessage = document.getElementById("daysLeftMessage");

futureDateInput.addEventListener("change", () => {
    const selectedDate = new Date(futureDateInput.value);
    const today = new Date();

    // Calculate time difference in milliseconds
    const timeDiff = selectedDate.getTime() - today.getTime();

    // Convert milliseconds to full days
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (isNaN(daysLeft)) {
        daysLeftMessage.innerText = "";
        return;
    }

    if (daysLeft < 0) {
        daysLeftMessage.innerText = "❌ Please select a future date.";
    } else if (daysLeft === 0) {
        daysLeftMessage.innerText = "🎉 That’s today!";
    } else {
        daysLeftMessage.innerText = `📅 ${daysLeft} day${daysLeft === 1 ? "" : "s"} left until your selected date.`;
    }
});
