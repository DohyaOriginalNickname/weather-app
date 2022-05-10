export default {
    methods:{
        toTheStore(city){
            this.$store.commit('changeCity', city)
            this.$router.push('/')
        }
    }
}