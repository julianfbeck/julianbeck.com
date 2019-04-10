<template>
  <section>
    <h3 class="title is-3">Free rooms for {{getDay()}}:</h3>
    <b-table :data="times">
      <template slot-scope="time">
        <b-table-column
          field="time"
          label="Time"
        >{{ convertTime(time.row.startTime) }} - {{ convertTime(time.row.endTime) }}</b-table-column>

        <b-table-column field="id" label="Room" width="40"><span class="tag is-success">{{rooms(time.row)}}</span></b-table-column>
      </template>

      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon icon="emoticon-sad" size="is-large"></b-icon>
            </p>
            <p>Nothing here.</p>
          </div>
        </section>
      </template>
    </b-table>
  </section>
</template>
<script>
import moment from "moment";
export default {
  methods: {
    rooms: function(time) {
      return time.locations.reduce(
        (rooms, currRoom) => rooms + currRoom.building + currRoom.room + " ",
        ""
      );
    },
    convertTime: function(time) {
      let midnight = moment(
        `${moment(Date.now()).month() + 1} ${moment(
          Date.now()
        ).date()} 00:00:00`,
        "MM DD hh:mm:ss"
      );
      return midnight.add(time, "m").format("HH:mm");
    },
    getDay: function(){
      return moment(Date.now()).format("dddd")
    }
  },
  computed: {},
  props: {
    times: {
      type: Array
    }
  }
};
</script>
