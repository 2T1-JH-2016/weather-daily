<template>
    <v-container>
        <v-row>
            <v-col :style="$vuetify.breakpoint.width > 600 ? 'max-width:600px' :''">
                <write-view-content />
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
import WriteViewContent from '@/views/WriteView-content.vue'
    export default {
        name: 'WriteView',
        components : { WriteViewContent },
    }
</script>
