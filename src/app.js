const body = document.querySelector('.body');
const input = document.querySelector('.input');
const display = document.getElementById('display');
const switchBtns = document.querySelectorAll('.switch');
const btns = document.querySelectorAll('.btn');

display.value = 0;

btns.forEach(function(btn){
	btn.addEventListener('click', function(e){
		const element = e.target.dataset.action;
		let keyContent = e.target.textContent;
		let displayedNum = display.value;

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
			input.dataset.prevSymbol = 'decimal';
		}

		if(element === 'reset'){
			display.value = 0;
			input.dataset.prevSymbol = 'reset';
		}

		if(element === 'add' || 
			element === 'subtract' || 
			element === 'multiply' || 
			element === 'divide')
		{

			const operator = input.dataset.operator;
			const firstValue = input.dataset.firstValue;
			const secondValue = displayedNum;

			if(firstValue && operator && prevSymbol === 'operator'){
				display.value = calculate(firstValue, operator, secondValue);
			}

			// //creates new custom attribute in input
			input.dataset.firstValue = displayedNum;
			input.dataset.prevSymbol = 'operator';
			input.dataset.operator = element;
		}

		if(element === 'calculate'){
			const operator = input.dataset.operator;
			const firstValue = input.dataset.firstValue;
			const secondValue = displayedNum;

			display.value = calculate(firstValue, operator, secondValue);
			input.dataset.prevSymbol = 'calculate';
		}

		if(element === 'delete'){
			let number = display.value;
			number = number.slice(0, -1);
			display.value = number;
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
	}if(!operator){
		result = b;
	}
	return result;
}

const redBtn = document.querySelector('.red-btn');



switchBtns.forEach(function(switchBtn){
	switchBtn.addEventListener('click', function(e){
		const id = e.target.dataset.id
		if(id === '1'){
			redBtn.style.left = '0';
			body.classList.add('theme-a');
			body.classList.remove('theme-b', 'theme-c');
		}
		if(id === '2'){
			redBtn.style.left = '20px';
			body.classList.add('theme-b');
			body.classList.remove('theme-a', 'theme-c');
		}
		if(id === '3'){
			redBtn.style.left = '40px';
			body.classList.add('theme-c');
			body.classList.remove('theme-a', 'theme-b');
		}
	})
})
	
window.addEventListener('DOMContentLoaded', function(){
	let themes = ['theme-a', 'theme-b', 'theme-c'];
})
