<template>
    <v-container>
        <v-row>
            <v-col class="userInfo" :style="$vuetify.breakpoint.width > 600 ? 'max-width:600px' :''">
                <v-card class="pl-10 pr-10">
                    <v-card-title>                           
                        <v-row class="d-flex">
                            <v-col cols="6" align="left" class="pb-0 pl-0 text-overline">
                                <DatePicker v-model="diary.date" @updateDate="updateDate"></DatePicker>
                                <font-awesome-icon class="ml-1" :icon="getWeatherIcon(diary.weather)" />
                            </v-col> 
                            <v-col class="d-flex flex-row-reverse" align="left" cols="6">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <div class="mt-1 text-caption text-truncate text-right" 
                                            style="max-width: 100%;"
                                            v-bind="attrs"
                                            v-on="on">
                                            <font-awesome-icon icon="fa-solid fa-location-dot" />
                                            <span class="ml-2">{{diary.location}}</span>
                                        </div>
                                    </template>
                                    <span>{{diary.location}}</span>
                                </v-tooltip>
                            </v-col>
                        </v-row>
                    </v-card-title>

                    <v-textarea
                        label="짧은 일기"
                        auto-grow
                        outlined
                        rows="4"
                        row-height="30"
                        shaped
                        maxlength="200"
                        v-model="diary.content"
                        color="orange orange-darken-4"
                        :messages="diary.content.length+' / 200'"
                    ></v-textarea>
                    <v-row>
                        <v-col align="right">
                            <v-btn
                                color="orange orange-darken-4"
                                depressed
                                dark
                                @click="saveDiary"
                            ><span class="font-weight-bold">OK</span></v-btn>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
    import DatePicker from '@/components/DatePicker'
    export default {
        name: 'WriteView',
        components : { DatePicker },
        data: () => ({
            menu: false,
            diary : {
                date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                weather : 0,
                location : 'asdgasdgasdgasdg',
                author : '이태원',
                title : 'asdgasdgasdg',
                content : 'asdgasdgsagasdg',
            },
        }),
        methods : {
            updateDate:function(date){
                this.diary.date = date
            },
            getWeatherIcon:function(value){
                console.log(value)
            
                switch(value){
                    case 0 : 
                    return "fa-solid fa-sun" //sun
                    case 1 :
                    return "fa-solid fa-snowflake" //snow
                    case 2 : 
                    return "fa-solid fa-cloud" //cloud
                    case 3 : 
                    return "fa-solid fa-sun-cloud" //sun-cloud
                    case 4 : 
                    return "fa-solid fa-umbrella-simple" //rain
                    case 5 : 
                    return "fa-solid fa-wind" //wind
                    default :
                    return "fa-solid fa-sun" //sun
                }
            },
            saveDiary:function(){
                alert("ddd");
            }
        },
        computed:{
        },
        created(){
            //location 받아오기
            var vm = this

            function onGeoOk(position){
                // const lat = position.coords.latitude;
                // const lat = position.coords.latitude;
                vm.diary.location = position.coords.longitude+', '+position.coords.longitude;
                console.table(position.coords)
                // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
            }

            function onGeoError(){
                vm.diary.location ="Can't find you. No location for you.";
            }

            navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
        }
    }
</script>

<style lang="scss" scoped>
  .userInfo {
    margin-left: auto; 
    margin-right: auto; 
  }
</style>