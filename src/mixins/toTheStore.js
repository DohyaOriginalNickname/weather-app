export default {
    methods:{
        toTheStore(city){
            localStorage.setItem('selectedCity', JSON.stringify(city))
            this.$store.commit('changeCity', city)
            this.$router.push('/')
        }
    }
}