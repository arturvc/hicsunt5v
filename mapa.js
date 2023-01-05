const datasheet = "pinout.json"; // JSON with the information of the participants
let pinos = [];
infoDatasheet();
async function infoDatasheet() {
    const resposta = await fetch(datasheet);
    const dados = await resposta.json();
    pinos = dados;
    console.log(pinos);
    carregarMapa();
}









function carregarMapa() {

    var mapa = L.map('itemMapa', {
        crs: L.CRS.Simple,
        zoom: -3,
        minZoom: -3,
        maxZoom: -1
    });


    var bounds = [
        [0, 0],
        [4320, 4320]
    ];

    var limites = [
        [-4000, -4000],
        [8320, 8320]
    ];

    var image = L.imageOverlay('arduino.png', bounds).addTo(mapa);

    mapa.setView([2000, 2000])
    mapa.setMaxBounds(limites); // restrict map view to polygon bounds

    //mapa.fitBounds(bounds);


    ///////////
    let dragao = L.icon({
        iconUrl: 'dracones.png',
        iconSize: [40, 40], // size of the icon

        iconAnchor: [20, 40], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -40] // point from which the popup should open relative to the iconAnchor
    });

    //////////


    let icsp = [
        [2460, 3832],
        [2000, 3832],
        [2000, 4150],
        [2460, 4150]
    ]

    let icsp1 = [
        [3350, 1250],

        [3060, 1250],
        [3060, 1690],
        [3350, 1690]
    ];

    let pinos16u2 = [
        [3035, 1405],
        [2768, 1405],
        [2768, 1670],
        [3035, 1670]
    ];

    L.polygon([icsp1], {
            color: 'pink',
            fillOpacity: 0.1,
        })
        .bindPopup(`
    <p><b>In-circuit serial programming (ICSP) 1</b></br>
    Conectores para programar o chip ATmega16U2, que faz a comunicação com a porta USB.</br>
    Obs.: Veja como transformar o <a href="https://youtu.be/wyB4fweqU5Q" target="blank">Arduino Uno em um dispositivo MIDI</a> .</p>`)
        .addTo(mapa);

    L.polygon([icsp], {
            color: 'pink',
            fillOpacity: 0.1,
        })
        .bindPopup(`
    <p><b>In-circuit serial programming (ICSP)</b></br>
    Conectores para programar o chip ATmega328P</br>
    Obs.: Os pinos COPI, CIPO, e SCK estão interligados com os pinos digitais D11, D12, e D13, respctivamente.</p>`)
        .addTo(mapa);




    L.polygon([pinos16u2], {
            color: 'pink',
            fillOpacity: 0.1,
        })
        .bindPopup(`
    <p><b>Conectores do ATMega16U2</b>: </br>
    <em>Hic Sunt Dracones</em> </br>
    Obs.: Normalmente, vem sem jumper soldado na placa. No datasheet são descritos como PB4, PB5, PB6 e PB7 do ATmega16U2.</p>`)
        .addTo(mapa);


    for (let i = 0; i < 60; i++) {

        //let valor = JSON.stringify(pinos[i].pino);
        //console.log(valor);

        L.marker(pinos[i].xy, {
                icon: L.icon({
                    iconUrl: pinos[i].pino,
                    iconSize: [40, 55],
                    iconAnchor: [20, 55],
                    popupAnchor: [0, -55]
                })
            })
            .bindPopup(`
        <p><b>${pinos[i].nome}</b></br>
        ${pinos[i].descrição}</br>
        Obs.: ${pinos[i].obs}</p>`)
            .addTo(mapa);

    }

    //var myIcon = L.divIcon({className: 'icone-textual',html: "<h2>Mapa do Arduino Uno</h2>"});
    //  L.marker([4300, 600], {icon: myIcon}).addTo(mapa);



    L.Control.textbox = L.Control.extend({
        onAdd: function (map) {

            var text = L.DomUtil.create('div');
            text.id = "info_text";
            text.innerHTML = "<strong>Hic sunt 5V</strong>"
            return text;
        },

        onRemove: function (map) {
            // Nothing to do here
        }
    });

    L.control.textbox = function (opts) {
        return new L.Control.textbox(opts);
    }
    L.control.textbox({
        position: 'topright'
    }).addTo(mapa);


    /*
    var popup = L.popup();
    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(mapa);
    }
    mapa.on('click', onMapClick);
*/
}

// https://store.arduino.cc/products/arduino-uno-rev3 


/*
var myIcon = L.divIcon({
    className: 'titulo',
    html: "<h2>Mapa do Arduino Uno</h2>"
});
// you can set .my-div-icon styles in CSS

L.marker([4000,530], {
    icon: myIcon,
    iconSize: 200
}).addTo(mapa);

///////////////////////////



    L.marker([2911, 1539], {
            icon: dragao        })
        .bindPopup(`
        <p><b>Conectores do ATMega16U2</b>: </br>
        <b>Descrição</b>: <em>Hic Sunt Dracones</em> </br>
        <b>Observação</b>: Normalmente, vem sem jumper soldado na placa. No datasheet é descrito como PB4, PB5, PB6 e PB7.</p>`).addTo(mapa);

    iconeTxt = L.divIcon({
      className: 'icone-textual',
      html: nomes[i]
    });
    
      marcador = L.marker(lat, long], {
        icon: iconeTxt
      }).bindPopup("neste ponto " + pontosWiFi[i].lat + ", " + pontosWiFi[i].long + "<br>estava disponível " + pontosWiFi[i].redes.length + " SSID");;
    }


estilo::
.icone-textual {
    background: none;
    border: none;
    font-size: 1.4em;
    color: #ffffff;
    white-space: nowrap;
    font-family: 'Courier New', Courier, monospace;
    margin: 0px;
    padding: 0px;
    font-weight: bold;

}


*/