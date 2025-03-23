<template>
    <div>
        <h1>{{blog.titre}}</h1>
        <div>{{blog.body}}</div>
        <div>{{blog.tags}}</div>    
        <div>{{ blog.snippet }}</div>
    </div>
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