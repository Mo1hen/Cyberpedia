;(function 	() {
	'use strict'

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

	clearArticleButton.addEventListener('click', function () {
		localStorage.clear(),
		location.replace('index.html')
	})

	// Выводим список последних 3х статей из массива JSON 'articles' localStorage 
	let str = ''
	for (let i = articles.length - 3; i < articles.length; i++) {
		const curretArticle = articles[i]
		str = str + '<li class="articles-list-item"><a href="article.html?id=' + curretArticle.id + '" class="articles-list-link">' + curretArticle.title + '</a></li>'
	}

	lastArticlesListElement.innerHTML = str

// 	const markdownArticleElement = document.querySelector('#markdown-article')
// 	const text = `# Киберспорт
// ## История
// [![cyber](img/cyber.png)](#)

// История киберспорта начинается с 1997 года, когда был основан [CPL], которая сделала первый турнир в дисциплине [Quake]. Но первой игрой с возможностью кооперативной схватки была [Doom 2].

// **Признание в России**

// > Россия стала первой страной в мире, которая признала киберспорт официальным видом спорта. Это произошло 25 июля 2001 года по распоряжению тогдашнего главы Госкомспорта России Рожкова Павла Алексеевича.

// После смены руководства и переименования Госкомспорта России в Федеральное агентство по физической культуре и спорту, а также в связи с последующим введением в действие Всероссийского реестра видов спорта (ВРВС), потребовалось повторить процедуру признания компьютерного спорта 12 марта 2004 г. по распоряжению главы Госкомспорта России Вячеслава Фетисова.

// ### Июль 2006 года

// Киберспорт был исключен из Всероссийского реестра видов спорта вследствие того, что он не соответствовал критериям, необходимым для включения в этот реестр: развитие в более чем половине субъектов Российской Федерации и наличие зарегистрированного в установленном порядке общероссийского физкультурно-спортивного объединения.

// ### 2014 год

// Российский государственный университет физической культуры, спорта, молодежи и туризма начал реализацию образовательной программы 
// - «Теория и методика интеллектуальных видов спорта (киберспорт)»

// ### 7 июня 2016 года

// Был опубликован приказ Министерства Спорта о включении компьютерного спорта в реестр официальных видов спорта Российской Федерации.

// ### 13 апреля 2017 года

// В Минюсте России был зарегистрирован Приказ Министерства спорта Российской Федерации от 16.03.2017 № 183
// - «О признании и включении во Всероссийский реестр видов спорта спортивных дисциплин, видов спорта и внесении изменений во Всероссийский реестр видов спорта»

// В соответствии с данным приказом компьютерный спорт был переведён во второй раздел 
// - «виды спорта, развиваемые на общероссийском уровне»

// Это значит, что появилась возможность проведения в России официального чемпионата страны, появлению разрядов и званий по компьютерному спорту. В этом же разделе находятся все «традиционные» виды спорта — футбол, хоккей, баскетбол и т. д.

// ### 5 июля 2017 года

// В соответствии с приказом Министерства спорта Российской Федерации № 618, аккредитованной спортивной федерацией по виду спорта «компьютерный спорт» является Федерация компьютерного спорта России.

// **С 2018 г. Университет ИТМО ввел стипендию для талантливых киберспортсменов в размере 10 тыс. руб. ежемесячно.**


// [CPL]: <https://ru.wikipedia.org/wiki/Cyberathlete_Professional_League>
// [Quake]: <https://ru.wikipedia.org/wiki/Quake>
// [Doom 2]: <https://ru.wikipedia.org/wiki/Doom_II:_Hell_on_Earth>`
	
// 	markdownArticleElement.innerHTML = marked(text)

})();