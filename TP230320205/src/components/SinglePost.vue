<template>
    <h3>{{blog.titre}}</h3>
    <p>{{blog.tags}}</p>
    <router-link :to="{ name: 'PostDetailsView' , params : { id:this.id }}">Read More</router-link>


</template>


<script>
export default{
    props: {
        id: {
            type: String, 
            required: true
        }
    },

    data() {
        return {
            blog: []
        }
    },


    mounted() {
        fetch("http://localhost:3540/Blogs/"+this.id)
        .then((resp) => resp.json()) //WE GET A RESPONSE AUTOMATICALLY WHICH WE GET AS AN ARGUMENT
                                    // since there is one argument we can get of the () and only keep resp
        .then((data) => this.blog = data)
        .catch((err) => console.log(err))
    }
}


</script>


<style>


</style>