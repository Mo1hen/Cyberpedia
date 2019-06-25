;(function 	() {
	'use strict'
	// Объявляем переменные из article.htmk
	const markdownArticleElement = document.querySelector('#markdown-article')
	const editArticleButton = document.querySelector('#edit-article')
	const clearArticleButton = document.querySelector('#clear-article')
	const lastArticlesListElement = document.querySelector('#last-articles')

	// Ищем в localStorage id: '' статьи.
	const id = parseInt(location.search.substr(4))
	const json = localStorage.getItem('articles')
	const articles = JSON.parse(json)

	let article = null
	for (let i=0; i < articles.length; i++) {
		if (articles[i].id === id) {
			article = articles[i]
		}
	}

	// Если статья найдена выводится текст
	markdownArticleElement.innerHTML = marked(article.content)

	// При нажатии на кнопку "Редактировать статью" переходим в редактированию статьи.
	// Начинает работать new.js
	editArticleButton.addEventListener('click', function () {
		location.replace('new.html?id=' + id)
	})
    
    // Очищаем localStorage и переходил на главную страницу. Нужно сделать очистку только конткретной статьи...
	clearArticleButton.addEventListener('click', function () {
		localStorage.clear(),
		location.replace('index.html')
	})

	// Формируем список последних 3х статей из массива JSON 'articles' localStorage 
	let str = ''
	for (let i = articles.length - 3; i < articles.length; i++) {
		const curretArticle = articles[i]
		str = str + '<li class="articles-list-item"><a href="article.html?id=' + curretArticle.id + '" class="articles-list-link">' + curretArticle.title + '</a></li>'
	}
	// Выводим список последних 3х статей
	lastArticlesListElement.innerHTML = str


})();