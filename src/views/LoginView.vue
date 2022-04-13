<template>
    <v-content>
      <v-container>
            <v-row>
                <v-col cols="12"><h1>날씨일기</h1></v-col>
            </v-row>
            <v-row class="text-center">
                <v-col
                    class="mb-5"
                    cols="12"
                >
                <div class="userInfo">
                    <v-text-field
                        clearable
                        color="orange orange-darken-4"
                        label="ID"
                        p-10
                        v-model="info.id"
                        hide-details="auto"
                        :rules="[rules.required,rules.emailRules]"
                        @keydown="info.path='email'"
                    ></v-text-field>
                    <v-text-field
                        label="PW"
                        name="input-10-2"
                        v-model="pw"
                        color="orange orange-darken-4"
                        hint="At least 8 characters"
                        class="input-group--focused"
                        :append-icon="pwShow ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="pwShow ? 'text' : 'password'"
                        @click:append="pwShow = !pwShow"
                        @keydown="info.path='email'"
                    ></v-text-field>
                    <v-btn
                        color="orange orange-darken-4"
                        outlined
                        plain
                        block
                        @click="loginEvnet"
                    >Log-In</v-btn>
                    <v-row class="ma-5">
                        <v-flex>
                            <v-btn
                                v-for="i in icons"
                                elevation="2"
                                icon
                                class="ma-2"
                                :style="i.color"
                                x-large
                                :key="i.id"
                                @click="info.path=i.id;oAuthLogin(i)"
                            ><font-awesome-icon :icon="i.class" /></v-btn>
                        </v-flex>
                    </v-row>
                    </div>
                </v-col>
            </v-row>
            New to Diary? <a @click="sginInPopup=true">Create an account.</a>
      </v-container>
    </v-content>
</template>
  
<script>
import { mapActions, mapGetters } from 'vuex';
  export default {
    data: () => ({
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailRules: v => /.+@.+/.test(v) || 'E-mail must be valid',
      },
      pwShow : false,
      alertPopup : false,
      sginInPopup : false,
      icons:[
          {id : "twitter", class: "fa-brands fa-twitter", color:"color:#1DA1F2"},
          {id : "facebook", class: "fa-brands fa-facebook", color:"color:#4267B2"},
          {id : "google", class: "fa-brands fa-google", color:"color:#4285F4"},
          {id : "apple", class: "fa-brands fa-apple", color:"color:#A2AAAD"},
      ],
      pw : ''
    }),
    computed :{
      ...mapGetters({ info : 'getUserInfo'})
    },
    methods : {
      ...mapActions(['setUserInfo']),
      loginEvnet : function() {
        // if(this.validEmailCheck(this.info.id) && this.info.pw.length > 7)
          this.$router.push("/diary");
          let user_info = {
            id : this.info.id
          }
          this.setUserInfo(user_info);
      },
      validEmailCheck: function(value){
        var pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        return (value.match(pattern)!=null)
      },
      oAuthLogin : function(service){
          console.table(service)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .userInfo {
    max-width : 500px;
    margin-left: auto; 
    margin-right: auto; 
  }
</style>