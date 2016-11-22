//Service de recherche de restau
const Yelp = require('yelp');

//Moteur de Templating : qui remplit une vue des données passées par un résultat de yelp.search
const Mustache = require('mustache');

//On déclare la sous-instance de eventEmitter et remote de Node.
//Modules pour l'envoi de message et construction du menu'
const {ipcRenderer, remote} = require('electron');
const {Menu, MenuItem} = remote;

const yelp = new Yelp({
consumer_key: 'InKCqPM-zjfnLhTYiKmhcg',
consumer_secret:'8TG59ztgHlK_MgJ8S7MRihSJ31c',
token:'Hr1IBEwBOy8y9oJ30puWNjUqhY8kCKFV',
token_secret:'QO-MiFdg_i_Z60MA1kQDJRIzC1g',
});


const btnSearch = document.querySelector('button');
const txtKeyWords = document.querySelector('#txtKeyWords');
const txtKeyCity = document.querySelector('#txtKeyCity');
const results = document.querySelector('#results');

let template = `
        <h2 class="sub-header">Résultats de votre recherche</h2>
        <table class="table-striped">
        <thead>
            <tr>
            <th>Nom</th>
            <th>Adresse</th>
            <th>Tel.</th>
            </tr>
        </thead>
        <tbody>
        {{#businesses}}
            <tr>
            <td>
                {{name}}
                <br>
                <img class="photo-box-img" height="90" width="90" src="{{image_url}}"/>
            </td>
            <td>
                {{#location_display_adress}}
                {{.}}<br>
                {{/location_display_adress}}
                <br>
            </td>
            <td>
                {{display_phone}}
            </td>
            </tr>
        </tbody>
        </table>
`;

//menu
let menuTemplate = [
        {
            label: "Fichier",
            submenu:[
                {
                    label: "Quitter",
                    accelerator: "Command+Q",
                    click: function(){
                        ipcRenderer.send('close-main-window');
                    }
                }
            ]
        },
        {
            label: "Extra",
            submenu:[
                {
                    label: "Help",
                    accelerator: "Command+Q",
                    click: function(){
                        ipcRenderer.send('close-main-window');
                    }
                }
            ]
        }        
    ]

let menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);

btnSearch.addEventListener('click', () => {
    yelp.seach({term : `resto ${txtKeyWords.value}`, location: `${txtKeyCity.value}, France`})
    .then(data => {
        let rendered = Mustache.render(template,data);
        results.innerHTML = rendered;
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    });
});