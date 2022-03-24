<template>
    <v-container>
        <v-row>
            <v-col class="userInfo" :style="$vuetify.breakpoint.width > 600 ? 'max-width:600px' :''">
                <v-sheet height="64">
                    <v-toolbar
                        flat
                        >
                        <v-row class="d-flex">
                          <v-col class="pa-0" cols="6" align="left" > 
                            <v-btn
                            fab
                            text
                            small
                            color="grey darken-2"
                            @click="prev"
                            >
                                <v-icon small>
                                mdi-chevron-left
                                </v-icon>
                            </v-btn>
                            <v-btn
                            outlined
                            color="grey darken-2"
                            @click="setToday"
                            >
                            Today
                            </v-btn>
                            <v-btn
                            fab
                            text
                            small
                            color="grey darken-2"
                            @click="next"
                            >
                                <v-icon small>
                                mdi-chevron-right
                                </v-icon>
                            </v-btn>
                          </v-col>
                          <v-col align="right" justify="center" class="pa-0 pt-2">
                            <v-toolbar-title v-if="$refs.calendar" class="text-overline" style="font-size: 1em!important;">
                              {{ $refs.calendar.lastStart.date  | moment('YYYY MMMM') }}</v-toolbar-title>
                          </v-col>
                        </v-row>
                    </v-toolbar>
                </v-sheet>
                <v-sheet height="550">
                    <v-calendar
                    ref="calendar"
                    v-model="focus"
                    color="orange"
                    :events="events"
                    :type="type"
                    @click:event="showEvent"
                    @click:date="viewDay"
                    @change="updateRange"
                    ></v-calendar>
                    <v-menu
                    v-model="selectedOpen"
                    :close-on-content-click="false"
                    :activator="selectedElement"
                    offset-x
                    >
                        <v-card
                        color="grey lighten-4"
                        min-width="350px"
                        flat
                        >
                            <v-toolbar
                            :color="selectedEvent.color"
                            dark
                            >
                                <v-btn icon>
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-btn icon>
                                    <v-icon>mdi-heart</v-icon>
                                </v-btn>
                                <v-btn icon>
                                    <v-icon>mdi-dots-vertical</v-icon>
                                </v-btn>
                            </v-toolbar>
                            <v-card-text>
                                <span v-html="selectedEvent.details"></span>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn
                                text
                                color="secondary"
                                @click="selectedOpen = false"
                                >
                                Cancel
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-menu>   
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
    export default {
    data: () => ({
      focus: '',
      type: 'month',
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
    }),
    mounted () {
      this.$refs.calendar.checkChange()
      console.log(this.$refs.calendar)
    },
    methods: {
      viewDay ({ date }) {
        alert("write view"+date)
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          requestAnimationFrame(() => requestAnimationFrame(() => open()))
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      updateRange ({ start, end }) {
        const events = []

        const min = new Date(`${start.date}T00:00:00`)
        const max = new Date(`${end.date}T23:59:59`)

        for (let i = 0; i < 10; i++) {
          const firstTimestamp = this.rnd(min.getTime(), max.getTime())
          const first = new Date(firstTimestamp - (firstTimestamp % 900000))

          events.push({
            name: "test",
            start: first,
            color : 'orange',
            timed: false,
          })
        }

        this.events = events
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
    },
  }
</script>

<style lang="scss" scoped>
  .userInfo {
    margin-left: auto; 
    margin-right: auto; 
  }
</style>