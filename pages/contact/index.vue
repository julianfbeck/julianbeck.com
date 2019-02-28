<template>
  <div class="contact container">
    <form method="POST" action="https://formspree.io/Kickbeck@googlemail.com">
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" type="text" name="your name" placeholder="Your Name">
        </div>
      </div>

      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input
            class="input is-success"
            type="email"
            name="_replyto"
            placeholder="your email"
            value
          >
        </div>
      </div>

      <div class="field">
        <label class="label">Message</label>
        <div class="control">
          <textarea class="textarea" placeholder="Your message" name="message"></textarea>
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