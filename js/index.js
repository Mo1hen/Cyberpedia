;(function 	() {
	'use strict'
	// Объявляем переменные из index.html
	const markdownIndexElement = document.querySelector('#markdown-index')
	const lastArticlesIndexListElement = document.querySelector('#last-articles-index')
	const allArticlesListElement = document.querySelector('#all-articles')
	const readArticleButton = document.querySelector('#read-article')

	const json = localStorage.getItem('articles')
	const articles = JSON.parse(json)
	const article = articles[articles.length - 1]

	// Опубликовать 270 сиволов последней из добавленных статей
	markdownIndexElement.innerHTML = marked(article.content.substr(0, 270) + '...')

	// Формируем в переменную 'str' список всех статей из localStorage - 'JSON.parse(localStorage.getItem('articles'))'
	let str = ''
	for (let i=0; i < articles.length; i++) {
		const curretArticle = articles[i]
		str = str + '<li class="other-list__item"><a class="other-list__link" href="article.html?id=' + curretArticle.id + '">' + curretArticle.title + '</a></li>'
	}
	// Выводим список всех статей
	allArticlesListElement.innerHTML = str

	// Формируем в переменную 'str' список 3-х последних статей
	str = ''
	for (let i = articles.length - 3; i < articles.length; i++) {
		const curretArticle = articles[i]
		str = str + '<li class="articles-list-item"><a href="article.html?id=' + curretArticle.id + '" class="articles-list-link">' + curretArticle.title + '</a></li>'
	}
	// Выводим список последних 3-х статей
	lastArticlesIndexListElement.innerHTML = str

	// Кнопка "Читать полностью" разворачивает статью в новом окне учитывая id статьи
	readArticleButton.addEventListener('click', function() {
		location.replace('article.html?id=' + article.id)
	})
	

})();