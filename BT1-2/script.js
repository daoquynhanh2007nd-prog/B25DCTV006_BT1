const screen = document.getElementById('screen');
const buttons = document.querySelectorAll('.btn');

function calculateFactorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
}

function formatResult(num) {
    if (!isFinite(num)) return "Lỗi Phép Tính";
    if (Number.isInteger(num)) return num.toString();

    let str = parseFloat(num.toPrecision(13)).toString();
    if (!str.includes('.')) return str;

    let parts = str.split('.');
    let intPart = parts[0];
    let decPart = parts[1];

    const repeatRegex = /^(\d*?)(.+?)\2{2,}$/;
    const match = decPart.match(repeatRegex);

    if (match) {
        let nonRepeat = match[1];
        let repeat = match[2];
        return `${intPart}.${nonRepeat}(${repeat})`;
    }

    if (decPart.length > 7) {
        return `${intPart}.${decPart.substring(0, 7)}...`;
    }

    return str;
}

buttons.forEach(button => {
    button.addEventListener('click', function() {
        const isClear = this.id === 'btn-clear';
        const isEquals = this.id === 'btn-equals';
        const value = this.getAttribute('data-val');
        let currentText = screen.innerText;

        if (isClear) {
            screen.innerText = '0';
            return;
        }

        if (isEquals) {
            let expression = currentText;

            let openParens = (expression.match(/\(/g) || []).length;
            let closeParens = (expression.match(/\)/g) || []).length;
            for (let i = 0; i < (openParens - closeParens); i++) {
                expression += ')';
            }

            expression = expression.replace(/%/g, '/100');

            expression = expression.replace(/×/g, '*').replace(/÷/g, '/');
            expression = expression.replace(/π/g, 'Math.PI').replace(/e/g, 'Math.E');
            expression = expression.replace(/\^/g, '**'); // Lũy thừa
            
            expression = expression.replace(/sin\(/g, 'sinDeg(');
            expression = expression.replace(/cos\(/g, 'cosDeg(');
            expression = expression.replace(/tan\(/g, 'tanDeg(');
            
            expression = expression.replace(/log\(/g, 'Math.log10(');
            expression = expression.replace(/ln\(/g, 'Math.log(');
            expression = expression.replace(/√\(/g, 'Math.sqrt(');
            expression = expression.replace(/EXP\(/g, 'Math.exp(');
            
            expression = expression.replace(/log2e/g, 'Math.LOG2E');
            expression = expression.replace(/log10e/g, 'Math.LOG10E');

            expression = expression.replace(/(\d+)!/g, 'calculateFactorial($1)');

            try {
                const sinDeg = (deg) => Math.sin(deg * Math.PI / 180);
                const cosDeg = (deg) => Math.cos(deg * Math.PI / 180);
                const tanDeg = (deg) => Math.tan(deg * Math.PI / 180);
           
                const result = eval(expression);
                
                screen.innerText = formatResult(result);
            } catch (error) {
                screen.innerText = 'Lỗi Cú Pháp';
            }
            return;
        }

        if (value) {
            if (currentText === '0' || currentText === 'Lỗi Phép Tính' || currentText === 'Lỗi Cú Pháp') {
                const operators = ['+', '-', '×', '÷', '^2', '^3', '^', '%'];
                if (operators.includes(value)) {
                    screen.innerText = '0' + value;
                } else {
                    screen.innerText = value;
                }
            } else {
                screen.innerText += value;
            }
        }
    });
});