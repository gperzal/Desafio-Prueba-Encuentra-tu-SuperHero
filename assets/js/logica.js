$(document).ready(function () {
    $('#searchButton').click(function () {
        var heroId = $('#heroInput').val(); // Paso 1: Captura de información
        if (isValidInput(heroId)) { // Paso 3: Comprobación de la entrada del usuario
            getHeroInfo(heroId); // Paso 2: Separación de la captura de datos y la consulta
        } else {
            alert('Por favor, ingresa un número válido.'); // Paso 8: Manejo de errores
        }
    });
});


$(document).ready(function () {
    $('#searchButtonName').click(function () {
        var heroName = $('#heroInput').val(); // Paso 1: Captura de información
        if (isValidInput2(heroName)) { // Paso 3: Comprobación de la entrada del usuario
            getHeroInfo2(heroName); // Paso 2: Separación de la captura de datos y la consulta
        } else {
            console.log('isValidInput2 result:', heroName); // Imprime el resultado de la validación
            alert('Por favor, ingresa un nombre válido.'); // Paso 8: Manejo de errores
        }
    });
});

function isValidInput(input) {
    return !isNaN(input) && parseInt(Number(input)) == input && !isNaN(parseInt(input, 10));
}



function isValidInput2(input) {
    return /^[a-zA-Z\s]+$/.test(input);
}


// Funcion para obtener la Informacion mediantre API
function getHeroInfo(heroId) {
    $.ajax({ // Paso 4: Consulta a la API
        url: `https://superheroapi.com/api.php/10232407405152330/${heroId}`,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            renderHeroCard(data); // Paso 5: Renderizar información
            renderHeroStatsChart(data); // Paso 7: Uso de CanvasJS para gráficos
        },
        error: function () {
            alert('Error al buscar la información del superhéroe.'); // Paso 8: Manejo de errores
        }
    });
}



function renderHeroCard(hero) {
    var cardHtml = `
        <div class="card " >
            <img src="${hero.image.url}" class="card-img-top" alt="${hero.name}">
            <div class="card-body">
                <h5 class="card-title">${hero.name}</h5>
                <p class="card-text">Conexiones: ${hero.connections['group-affiliation']}</p>
                <p class="card-text">Publicado por: ${hero.biography.publisher}</p>
                <p class="card-text">Primera aparición: ${hero.biography['first-appearance']}</p>
            </div>
        </div>
    `;
    $('#heroCard').html(cardHtml); // Paso 6: Uso de ciclos/métodos de arreglo
    // Renderiza la tarjeta del héroe -  ajusta la altura de heroChart
}



function renderHeroStatsChart(hero) {
    var chart = new CanvasJS.Chart("heroChart", {
        theme: "dark2",
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: `Estadísticas de Poder para ${hero.name}`

        },
        data: [{
            type: "pie", // Tipo de gráfico de pastel
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}%", // Mostrar porcentaje en el tooltip
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} ({y})", // Mostrar etiquetas con porcentaje
            dataPoints: [
                { y: hero.powerstats.intelligence, label: "Inteligencia" },
                { y: hero.powerstats.strength, label: "Fuerza" },
                { y: hero.powerstats.speed, label: "Velocidad" },
                { y: hero.powerstats.durability, label: "Durabilidad" },
                { y: hero.powerstats.power, label: "Poder" },
                { y: hero.powerstats.combat, label: "Combate" }
            ]
        }]
    });
    chart.render();

}
