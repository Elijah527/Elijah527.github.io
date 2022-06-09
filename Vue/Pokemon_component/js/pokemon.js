import card from './card.js'

const app = new Vue({
    el: '#app',
    data: {
        headerSetting: {
            mainImg: './images/722.png',
            subImg: './images/bottomRight.png'
        },
        //寶可夢data
        pokemonData: {
            pokemonRequestUrl: 'https://raw.githubusercontent.com/jacko1114/Homeworks/main/Pokemon/js/pokemons.json', //data source
            pokemonArray: [], //放撈回的資料
            cardArray: [], //要渲染在畫面的資料
            currentPokemon: { //儲存Modal上要渲染的資料
                index: '',
                id: '',
                name: '',
                hp: '',
                attack: '',
                defense: '',
                sp_attack: '',
                sp_defense: '',
                speed: '',
                img: '',
                type: '',
                evolution: '',
                genus: ''
            }
        },
        //儲存頁面目前有幾個寶可夢
        pageSetting: {
            index: 0
        }
    },
    created() { //run when new Vue(Vue生命週期的其中一個階段方法,參考https://book.vue.tw/CH1/1-7-lifecycle.html)
        this.getPokemonData()
    },
    methods: {
        getPokemonData() {
            axios.get(this.pokemonData.pokemonRequestUrl)
                .then((res) => {
                    console.log(res)
                    if (res.status == 200 && res.data.length != 0) {
                        this.pokemonData.pokemonArray = res.data.map((item, index) => ({
                            index: index,
                            id: item.id.toString().padStart(3, '0'),
                            name: item.name.chinese,
                            hp: item.base.HP,
                            attack: item.base.Attack,
                            defense: item.base.Defense,
                            sp_attack: item.base['Sp_Attack'],
                            sp_defense: item.base['Sp_Defense'],
                            speed: item.base.Speed,
                            img: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${item.id.toString().padStart(3, '0')}.png`,
                            type: item.type,
                            evolution: item.evolution,
                            genus: item.genus
                        }))
                        console.log(this.pokemonData.pokemonArray)
                    }
                })
                .catch((error) => { console.warn(error) })
        },
        addAllCards() {
            this.pokemonData.cardArray = this.pokemonData.pokemonArray
        },
        showPokemon(index) { //設定要渲染到Modal的資料
            this.pokemonData.currentPokemon = this.pokemonData.pokemonArray[index]
        },
        addOneCard() {
            if(this.pageSetting.index > this.pokemonData.pokemonArray.length -1) return
            this.pokemonData.cardArray.push(this.pokemonData.pokemonArray[this.pageSetting.index])
            this.pageSetting.index++
        },
        removeOneCard() {
            if(this.pageSetting.index == 0) return
            this.pokemonData.cardArray.splice(this.pageSetting.index - 1, 1)
            this.pageSetting.index--
        },
        resetCards() {
            this.pokemonData.cardArray = []
            this.pageSetting.index = 0
        }
    },
    components:{
        'pokemon-card':card
    }
})