<template>
    <h1>Jobs</h1>
    <div v-for="job in jobs" :key="job.id">
        <router-link :to="{name: 'jobdetails', params: {id: job.id}}">
            <h2>{{ job.id  }} : {{ job.title }}</h2>
        </router-link>
  </div>
  
</template>



<script>    

export default {
    data() {
        return {
            jobs: []
        }
    },
    mounted() {
        fetch('http://localhost:3000/jobs')
        .then((resp) => resp.json()) //WE GET A RESPONSE AUTOMATICALLY WHICH WE GET AS AN ARGUMENT
                                    // since there is one argument we can get of the () and only keep resp
        .then((data) => this.jobs = data)
        .catch((err) => console.log(err))
    }
}
</script>

<style>

</style>