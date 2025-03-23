<template>
    <SinglePost v-for="Blog in Blogs" :id="Blog.id" :key="Blog.id">   
    </SinglePost>
</template>






<script>
import SinglePost from './SinglePost.vue'

export default {
    data() {
        return {
            Blogs: []
        }
    },
    components :
        {
            SinglePost
        },
    mounted() {
        fetch('http://localhost:3540/Blogs')
        .then((resp) => resp.json()) //WE GET A RESPONSE AUTOMATICALLY WHICH WE GET AS AN ARGUMENT
                                    // since there is one argument we can get of the () and only keep resp
        .then((data) => this.Blogs = data)
        .catch((err) => console.log(err))
    }
}
</script>




<style>

</style>