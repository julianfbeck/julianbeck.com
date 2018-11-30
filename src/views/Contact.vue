<template>
  <div class="contact container">
    <form method="POST" action="https://formspree.io/Kickbeck@googlemail.com">
      <div class="field">
        <label class="label">Your Name</label>
        <div class="control">
          <input class="input" type="text" name="name" placeholder="Your Name">
        </div>
      </div>

      <div class="field">
        <label class="label">Email</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input is-success"
            type="email"
            name="_replyto"
            placeholder="Email"
            value
          >
          <span class="icon is-small is-left">
            <font-awesome-icon :icon="['fa', 'envelope']"/>
          </span>
        </div>
      </div>

      <div class="field">
        <label class="label">Message</label>
        <div class="control">
          <textarea class="textarea" placeholder="...." name="message"></textarea>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button type="submit" class="button is-link" value="Send">Submit</button>
        </div>
      </div>
    </form>
  </div>
</template>
