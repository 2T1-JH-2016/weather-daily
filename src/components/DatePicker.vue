<template>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="date"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <span 
          class="font-weight-bold"
          v-bind="attrs"
          v-on="on">{{date}}</span>
      </template>
      <v-date-picker
      v-model="date"
      no-title
      scrollable
      >
      <v-spacer></v-spacer>
      <v-btn
          text
          color="primary"
          @click="menu = false"
      >
          Cancel
      </v-btn>
      <v-btn
          text
          color="primary"
          @click="$refs.menu.save(date)"
      >
          OK
      </v-btn>
      </v-date-picker>
  </v-menu>
</template>

<script>
  export default {
    name: 'DatePicker',
    props : {
      value : {
        type : String,
        required : true
      }
    },
    data: () => ({
      menu : false,
      date : '',
    }),
    created(){
      this.date = this.value
    },
    methods : {
      updateDate : function(){
        this.$emit('updateDate', this.date)
      }
    },
  }
</script>
<style lang="scss" scoped>
  .text-only{
    .v-text-field__details{
      display:none!important;
    }
  }
</style>