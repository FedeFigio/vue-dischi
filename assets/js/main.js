Vue.config.devtools = true;
// Attraverso una chiamata ajax all’API di boolean https://flynn.boolean.careers/exercises/api/array/music
// avremo a disposizione una decina di dischi musicali.
// Utilizzando vue, stampiamo a schermo una card per ogni album.
// BONUS
// Creare una select con tutti i generi dei dischi. In base a cosa scegliamo nella select, vedremo i corrispondenti cd.
// BONUS 2
// Ordinare i dischi per anno di uscita.
let app = new Vue({
    el: "#root",
    data: {
        disks: [],
        selected: "All",
        selectionFilter: []
    },
    methods: {
        filteredItems() {
            return this.disks.filter((disk) => {
                if (this.selected == "All") return true;
                return disk.genre == this.selected;
            })
        }
    },
    mounted() {
        axios.get("https://flynn.boolean.careers/exercises/api/array/music")
            .then((response) => {
                this.disks = response.data.response

                this.disks.sort((a, b) => {
                    return a.year - b.year;
                })
                let onlyGenre = this.disks.map((disk) => {
                    return disk.genre;
                })
                for (let i = 0; i < onlyGenre.length; i++) {
                    const genre = onlyGenre[i];
                    if (!this.selectionFilter.includes(genre)) {
                        this.selectionFilter.push(genre)
                    }
                }
            });
    },
    watch: {
        filter(val) {
            console.log(val);
        }
    }
})