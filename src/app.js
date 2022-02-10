const body = document.querySelector('.body');
const input = document.querySelector('.input');
const toggleBtn = document.querySelector('.toggle-btn');
const switchBtn = document.querySelector('.switch');
const display = document.getElementById('display');
const btns = document.querySelectorAll('.btn');

display.value = 0;
display.value.lemgth = 9;


btns.forEach(function(btn){
	btn.addEventListener('click', function(e){
		const element = e.target.dataset.action;
		keyContent = e.target.textContent;
		displayedNum = display.value;
		const prevSymbol = input.dataset.prevSymbol;

		//display numbers
		if(!element){
			if(displayedNum === '0' || prevSymbol === 'operator'){
				display.value = keyContent;
			}
			else{
				display.value = displayedNum + keyContent;
			}
			input.dataset.prevSymbol = 'number'
		}

		//adding decimal
		if(element === 'decimal'){
			display.value = displayedNum + '.'
			if(displayedNum.includes('.')){
				display.value = displayedNum;
			}
			input.dataset.prevSymbol = 'decimal'
		}

		if(element === 'add' || 
			element === 'subtract' || 
			element === 'multiply' || 
			element === 'divide' ||
			element === 'reset'){

			const operator = input.dataset.operator;
			const firstValue = input.dataset.firstValue;
			const secondValue = displayedNum;

			if(firstValue && operator){
				display.value = calculate(firstValue, operator, secondValue);
			}

			//creates new custom attribute in input
			input.dataset.operator = element;
			input.dataset.firstValue = displayedNum;
			input.dataset.prevSymbol = 'operator';
		}

		if(element === 'calculate'){
			const operator = input.dataset.operator;
			const firstValue = input.dataset.firstValue;
			const secondValue = displayedNum;

			display.value = calculate(firstValue, operator, secondValue);
			input.dataset.prevSymbol = 'calculate'
		}

		if(element === 'reset'){
			display.value = 0
		}

	})
})
	
function calculate(a,operator,b){
	let result = '';
	if(operator === 'add'){
		result = parseFloat(a) + parseFloat(b);
	} else if(operator === 'subtract'){
		result = parseFloat(a) - parseFloat(b);
	} else if(operator === 'multiply'){
		result = parseFloat(a) * parseFloat(b);
	} else if(operator === 'divide'){
		result = parseFloat(a) / parseFloat(b);
	} else if(operator === 'reset'){
		result = 0;
	}
	return result;
	// 	switch(operation){
	// 	case (operator === 'add'): 
	// 		result = parseFloat(a) + parseFloat(b);
	// 		break;
	// 	case (operator === 'subtract'): 
	// 		result = parseFloat(a) - parseFloat(b);
	// 		break;
	// 	case (operator === 'multiply'): 
	// 		result = parseFloat(a) * parseFloat(b);
	// 		break;
	// 	case (operator === 'divide'): 
	// 		result = parseFloat(a) / parseFloat(b);
	// 		break;
	// }
}