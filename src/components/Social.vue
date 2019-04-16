<template>
    <div class="social flex">
        <i 
            class="icon-social" 
            v-for="(network, i) in networks" 
            :key="i"
            :class="{ [network]: network }"
        >
        </i>
    </div>
</template>

<script>
export default {
    props: {
        networks: Array
    }

}
</script>

<style lang="scss">
    .social {
        margin-top: 10px;
        .icon-social {
            margin: 0;
            background-size: cover;
            cursor: pointer;
            transition: opacity .1s;

            &:hover {
                opacity: .8;
            }
            
            &:not(:first-of-type):not(:last-of-type) {
                margin: 0 10px;
            }
        }
    }
</style>
