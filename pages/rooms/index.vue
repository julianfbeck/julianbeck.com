<template>
  <div class="container is-fluid">
    <RoomList :times="times"/>
  </div>
</template>

<script>
import RoomList from "~/components/RoomList.vue";
import moment from "moment"

export default {
  components: { RoomList },
  async asyncData({ $axios }) {
    let currentDay = Number(moment(Date.now()).day())-1;
    const rooms = await $axios.$get(
      `https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/unoccupiedrooms/lecturehalls/${currentDay}?suppress_error=false`
    );
    return { times: rooms.freeRooms };
  }
};
</script>
