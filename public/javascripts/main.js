
(function () {
    function init() {
        function onSuccess(data) {
            const listOfChars = data.data.data
            var listInfo = [];

            function getPorcentagem(...values) {
                let total = 0;

                values.forEach(number => {
                    !isNaN(number) ? total += parseInt(number, 10) : total = 0
                });
                let porcentagem = !isNaN(values[0]) && !isNaN(values[1]) ? Math.round((values[0] / total) * 100) : 0
                return porcentagem
            }

            function getTotal(...values) {
                let total = 0;

                values.forEach(number => {
                    !isNaN(number) ? total += parseInt(number, 10) : total = 0
                });
                return parseInt(total, 10)
            };


            listOfChars.forEach((char, index) => {
                let charInfo = {
                    id: char.__id,
                    name: char.name,
                    description: char.description,
                    pic: char.picture,
                    total: getTotal(char.positive, char.negative),
                    porcentagemOfPositives: getPorcentagem(char.positive, char.negative),
                    porcentagemOfNegatives: getPorcentagem(char.negative, char.positive),
                }
                listInfo[index] = charInfo
            });
            var sortedListInfo = listInfo.sort(function (a, b) { return b.total - a.total })
            var output = []
            sortedListInfo.map((char, index) => {
                output[index] = `
                <li class="ranking__char">
                    <div class="char__percentuals">
                        <div class="likes">
                            <div class="title">Gostam</div>
                            <div class="value">${char.porcentagemOfPositives} %</div>
                        </div>
                        <div class="separator"></div>
                        <div class="dislikes">
                            <div class="title">Não gostam</div>
                            <div class="value">${char.porcentagemOfNegatives} %</div>
                        </div>
                    </div>
                    <div class="char__image" data-position="${index + 1}">
                        <img src="${char.pic}">
                    </div>
                    <div class="char__info">
                        <h2>${char.name}</h2>
                        <h3>${char.description}</h3>
                    </div>
                </li>`
            })

            var outPutFormatted = output.join('')
            var rankingElement = document.querySelector('.ranking')

            rankingElement.insertAdjacentHTML('afterbegin', outPutFormatted)
        }
        function onFail(error) {
            console.log(error)
        }
        function getDataInfo(element) {
            let elementUrl = document.querySelector(element).getAttribute('data-url')
            axios.get(elementUrl)
                .then(function (response) {
                    onSuccess(response)
                })
                .catch(function (error) {
                    onFail(error)
                })
        }
        getDataInfo('#app')
    }
    init()
}());
