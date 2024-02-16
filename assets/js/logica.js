$(document).ready(function () {
    $('#searchButton').click(function () {
        let heroId = $('#heroInput').val().trim(); // Paso 1: Captura de información
        if (isValidInput(heroId)) { // Paso 3: Comprobación de la entrada del usuario
            getHeroInfo(heroId);
            $('#liveAlertPlaceholder').hide(); // Oculta el mensaje de error si la entrada es válida
            $('#logo').hide(); // Esto ocultará el div con id="logo"
        } else {
            $('#liveAlertPlaceholder').text('Por favor, ingresa un número válido.').show(); // Paso 8: Manejo de errores
        }
    });
});




// 1.- valida que input sea un número
// Se verifica que num no sea NaN para asegurarse de que sea un número.
// Se verifica que num esté en el rango de 1 a 731. Ambos Inclusive

function isValidInput(input) {
    return !isNaN(input) && !isNaN(parseInt(input, 10)) && input >= 1 && input <= 731
}


// function isValidInput2(input) {
//     return /^[a-zA-Z\s]+$/.test(input);
// }


// Funcion para obtener la Informacion mediantre API
function getHeroInfo(heroId) {
    $.ajax({ // Paso 4: Consulta a la API
        url: `https://superheroapi.com/api.php/10232407405152330/${heroId}`,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            renderHeroCard(data); // Paso 5: Renderizar información
            renderHeroStatsChart(data); // Paso 7: Uso de CanvasJS para gráficos de torta o pie
            $('#liveAlertPlaceholder').hide(); // Oculta el mensaje de error si la entrada es válida
        },
        error: function () {
            $('#liveAlertPlaceholder').text('Eror al buscar la información del superhéroe..').show(); // Paso 8: Manejo de errores
        }
    });
}



// Paso 6: Uso de ciclos/métodos de arreglos que permitan ordenar y mostrar la información
function renderHeroCard(hero) {

    let cardHtml = `
                <div class="card mb-3"  >
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${hero.image.url}" class="card-img-top" alt="${hero.name}">
                        <div class="card-body">
                            <h5 class="card-title"><span class="fw-bold"> ${hero.name}</span></h5>
                        </div>
                    </div>
                <div class="col-md-8">   
                      
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item text-start"><span class="fw-bold">Conexiones: </span> ${hero.connections['group-affiliation']}</li>
                            <li class="list-group-item text-start"><span class="fw-bold">Publicado por: </span> ${hero.biography.publisher}</li>
                            <li class="list-group-item text-start"><span class="fw-bold">Ocupación: </span> ${hero.work.occupation}</li>
                            <li class="list-group-item text-start"><span class="fw-bold">Primera Aparición: </span> ${hero.biography['first-appearance']}</li>
                            <li class="list-group-item text-start"><span class="fw-bold">Altura: </span>${hero.appearance.height.join("  - ")}</li> 
                            <li class="list-group-item text-start"><span class="fw-bold">Peso: </span>${hero.appearance.weight.join(" - ")}</li> 
                            <li class="list-group-item text-start"><span class="fw-bold">Alianzas: </span>${hero.biography.aliases}</li>
                        </ul >
                </div >
                </div>
        `;
    $('#heroCard').html(cardHtml);
    // Renderiza la tarjeta del héroe -  ajusta la altura de heroChart
}


function renderHeroStatsChart(hero) {
    let chart = new CanvasJS.Chart("heroChart", {
        theme: "dark2",
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: `Estadísticas de Poder para ${hero.name} `
        },
        data: [{
            type: "pie", // Tipo de gráfico de pastel
            startAngle: 10,
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

