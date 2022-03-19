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
                        label="ID"
                        p-10
                        v-model="info.id"
                        hide-details="auto"
                        :rules="[rules.required,rules.emailRules]"
                    ></v-text-field>
                    <v-text-field
                        label="PW"
                        name="input-10-2"
                        v-model="info.pw"
                        hint="At least 8 characters"
                        class="input-group--focused"
                        :append-icon="pwShow ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="pwShow ? 'text' : 'password'"
                        @click:append="pwShow = !pwShow"
                    ></v-text-field>
                    <v-btn
                        color="primary"
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
                                fab
                                icon
                                class="ma-3"
                                x-large
                                :key="i.id"
                                @click="oAuthLogin(i)"
                            ><font-awesome-icon class="fa-2x" :icon="i.class" /></v-btn>
                        </v-flex>
                    </v-row>
                    </div>
                </v-col>
            </v-row>
            <!-- 스토어 저장 후 삭제 -->
            <v-alert
                border="top"
                colored-border
                type="info"
                elevation="2"
                class="userInfo text-left"
                v-if="alertPopup"
                @click="alertPopup=false"
            >
                <p>ID : {{info.id}}</p>
                <p>PW : {{info.pw}}</p>
                store 에 계정 저장
            </v-alert>
            <!-- //스토어 저장 후 삭제 -->
            New to Diary? <a @click="sginInPopup=true">Create an account.</a>
        </v-container>
    </v-content>
</template>
  
<script>
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
      info : {
        id : '',
        pw : ''
      },
      icons:[
          {id : "twitter", class: "fa-brands fa-twitter"},
          {id : "facebook", class: "fa-brands fa-facebook"},
          {id : "google", class: "fa-brands fa-google"},
          {id : "apple", class: "fa-brands fa-apple"},
      ]
    }),
    methods : {
      loginEvnet : function() {
        if(this.validEmailCheck(this.info.id) && this.info.pw.length > 7)
          this.alertPopup = true
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