;(function 	() {
	'use strict'

	const markdownSourceElement = document.querySelector('#markdown-source')
	const markdownResultElement = document.querySelector('#markdown-result')
	const saveArticleButton = document.querySelector('#save-article-button')
	const articleTitleElement = document.querySelector('#article-title')

	const id = parseInt(location.search.substr(4))
	const json = localStorage.getItem('articles')
	const articles = JSON.parse(json)

	// Ищем в localStorage id: '' статьи. Если id найден то редактируем статью, если нет то получаем чистый редактор.
	// Т.е. если выбрать "Добавить статью" - перейдем в читый редактор markdown, если выбераем редактировать статью то идет поиск по id
	if (id) {		
		let article = null
		for (let i=0; i < articles.length; i++) {
			if (articles[i].id === id) {
				article = articles[i]
			}
		}

		markdownSourceElement.value = article.content
		articleTitleElement.value = article.title

		// можно продублировать или нет...
		const result = marked(markdownSourceElement.value)
		markdownResultElement.innerHTML = result
	}
	
	// Если найден id: '' редактируем выбранную статью иначе получаем чистую статью как по кнопке "Добавить статью"
	markdownSourceElement.addEventListener('keyup', function () {
		const result = marked(markdownSourceElement.value)
		markdownResultElement.innerHTML = result
	})

	// Если нажимаем на "Сохранить статью" начинает работать обработчик событий
	saveArticleButton.addEventListener('click', function () {
		// Проверяе если статья существует, то сохраняем как отредактированную
		if (id) {
			for (let i = 0; i < articles.length; i++) {
				if (articles[i].id === id) {
					articles[i].title = articleTitleElement.value
					articles[i].content = markdownSourceElement.value
				}
			}
			// const article = {
			// 	id: id,
			// 	title: articleTitleElement.value,
			// 	content: markdownSourceElement.value
			// }
		}
		else {
			// Если нет, то сохраняет как новую статью
			const newArticle = {
				id: 0,
				title: articleTitleElement.value,
				content: markdownSourceElement.value
			}

			newArticle.id = articles.length + 1
			articles.push(newArticle)
		}
		
		localStorage.setItem('articles', JSON.stringify(articles))

		// Перевод страницы на отредактированную статью
		if (id) {
			location.replace('article.html?id=' + id)
		}
		// Если нет то на страницу последней добавленной статьи
		else {
			location.replace('article.html?id=' + articles[articles.length - 1].id)
		}
	})
})();