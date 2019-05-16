<template>
  <div class="container is-fluid">
    <RoomList :times="times" class="rooms"/>
  </div>
</template>

<script>
import RoomList from "~/components/RoomList.vue";
import moment from "moment";

export default {
  components: { RoomList },
  async asyncData({ $axios }) {
    let currentDay = Number(moment(Date.now()).day()) - 1;
    currentDay = currentDay == -1 || currentDay == 5 ? 1 : currentDay;
    console.log(currentDay)
    const rooms = await $axios.$get(
      `http://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/unoccupiedrooms/lecturehalls/${currentDay}?suppress_error=false`
    );
    return { times: rooms.freeRooms };
  }
};
</script>
<style>
.rooms {
  margin: 5px
}
</style>

