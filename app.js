const cols = document.querySelectorAll('.col');

const getRandomColor = () => {
	const hexCodes = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
	}
	return color;
}
const setRandomColors = () => {
	cols.forEach(col => {
		const isLocked = col.querySelector('i').classList.contains('fa-lock');
		if (isLocked) return;
		const title = col.querySelector('.title');
		const color = getRandomColor();
		col.style.backgroundColor = color;
		title.textContent =  color;
	})
}
const lockColor = target => {
	const node = target.tagName.toLowerCase() === 'i'	? target : target.children[0]
	node.classList.toggle('fa-lock');
	node.classList.toggle('fa-lock-open')
}
const copyToClickBoard = target => navigator.clipboard.writeText(target.textContent);
setRandomColors();
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