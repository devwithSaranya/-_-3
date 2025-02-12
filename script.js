function updateBackground() {
    const degrees = parseFloat(document.getElementById('degrees').value);
    const body = document.body;

    if (!isNaN(degrees)) {
        // Gradient shift based on degrees (-50 to 100 normalized for smooth transition)
        const normalized = Math.min(Math.max((degrees + 50) / 150, 0), 1);
        const red = Math.round(255 * normalized); // Higher temps -> more red
        const green = Math.round(255 * (1 - normalized)); // Lower temps -> more green

        body.style.background = `linear-gradient(135deg, rgb(${red}, ${green}, 0), green)`;
        body.style.transition = "background 1.5s ease-in-out";
    }
}

function convertTemperature() {
    const degrees = parseFloat(document.getElementById('degrees').value);
    const fromType = document.getElementById('fromType').value;
    const toType = document.getElementById('toType').value;
    const resultElement = document.getElementById('result');

    if (isNaN(degrees)) {
        resultElement.textContent = 'Please enter a valid number';
        return;
    }

    let result;

    // Convert from the selected "fromType" to the selected "toType"
    if (fromType === 'Celsius') {
        if (toType === 'Fahrenheit') {
            result = (degrees * 9/5) + 32; 
        } else if (toType === 'Kelvin') {
            result = degrees + 273.15; 
        } else {
            result = degrees; 
        }
    } else if (fromType === 'Fahrenheit') {
        if (toType === 'Celsius') {
            result = (degrees - 32) * 5/9; 
        } else if (toType === 'Kelvin') {
            result = ((degrees - 32) * 5/9) + 273.15; 
        } else {
            result = degrees; 
        }
    } else if (fromType === 'Kelvin') {
        if (toType === 'Celsius') {
            result = degrees - 273.15; 
        } else if (toType === 'Fahrenheit') {
            result = ((degrees - 273.15) * 9/5) + 32; 
        } else {
            result = degrees; 
        }
    }

    resultElement.textContent = `${result.toFixed(2)} °${toType.charAt(0).toUpperCase() + toType.slice(1)}`;

    // Add animation effect for result: green for low, red for high
    const normalized = Math.min(Math.max((result + 50) / 150, 0), 1);
    const red = Math.round(255 * normalized);
    const green = Math.round(255 * (1 - normalized));
    resultElement.style.color = `rgb(${red}, ${green}, 0)`;
    resultElement.style.transition = "color 1s ease-in-out";
}
