<template>
  <section>
    <b-table :data="hosts">
      <template slot-scope="host">
        <b-table-column field="first_name" label="Name">{{ host.row.name }}</b-table-column>
        <b-table-column field="id" label="IP" width="40">{{ host.row.ip }}</b-table-column>


        <b-table-column field="date" label="Last seen" centered>
          <span  v-if="host.row.status" class="tag is-success">now</span>
          <span v-else class="tag is-danger">{{ host.row.lastSeen }}</span>
        </b-table-column>

        <b-table-column label="Status">
          <span v-if="host.row.status"  class="tag is-success">Online</span>
          <span v-else class="tag is-danger">Offline</span>
        </b-table-column>

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
import axios from "axios";
export default {
  props: {
    hosts: {
      type: Array
    }
  }
};
</script>
