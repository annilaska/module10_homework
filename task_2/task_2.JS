//----------------------------задание 2---------------------------

// Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert. 


const button = document.querySelector('.btn');


button.addEventListener('click', () => {

    const width = window.screen.width;
    const height = window.screen.height;
    

    alert(`Display properties: width - ${width}px, height - ${height}px`);
})