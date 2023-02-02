const cols = document.querySelectorAll('.col');
const setColorsToHash = (colors = []) => {
	document.location.hash = colors.map(color => color.substring(1)).join('-');
}
const getColorsFromHash = (colors = []) => {
	if (document.location.hash.length > 1) {
		return document.location.hash.slice(1).split('-').map(color => '#' + color);
	}
	return [];
}
const getRandomColor = () => {
	const hexCodes = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
	}
	return color;
}
const setRandomColors = (isInitial) => {
	const colors = isInitial ? getColorsFromHash() : [];
	console.log(colors.length);
	cols.forEach((col, index) => {
		const lockBtn = col.querySelector('.btn')
		const isLocked = lockBtn.querySelector('i').classList.contains('fa-lock');
		const title = col.querySelector('.title');
		if (isLocked) return  ;
		const color = isInitial && colors.length ? colors[index] : getRandomColor();
		if (!isInitial) colors.push(color)
		// if(!color) color = getRandomColor() 
		col.style.backgroundColor = color;
		title.textContent =  color;
	})
	setColorsToHash(colors)
}
const lockColor = button => {
	const node = button.tagName.toLowerCase() === 'i'	? button : button.children[0]
	node.classList.toggle('fa-lock');
	node.classList.toggle('fa-lock-open')
}
const copyToClickBoard = target => navigator.clipboard.writeText(target.textContent);
setRandomColors(true);
document.addEventListener('keydown', (evt) => {
	if (evt.code.toLowerCase() === 'space')	{
		evt.preventDefault();
		setRandomColors();
	}
});
document.addEventListener('click', ({ target }) => {
	const type = target.dataset.type;
	if (type === 'lock') lockColor(target);
	if (target.classList.contains('title')) copyToClickBoard(target);
})