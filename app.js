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
setRandomColors();
document.addEventListener('keydown', (evt) => {
	if (evt.code.toLowerCase() === 'space')	{
		evt.preventDefault();
		setRandomColors();
	}
});
document.addEventListener('click', (evt) => {
	const type = evt.target.dataset.type;
	if (type === 'lock') {
		const node = evt.target.tagName.toLowerCase() === 'i'	? evt.target : evt.target.children[0]
		node.classList.toggle('fa-lock');
		node.classList.toggle('fa-lock-open')
	}
	if (evt.target.classList.contains('title')) return navigator.clipboard.writeText(evt.target.textContent);
})