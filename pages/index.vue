<template>
  <div>
    <!-- Header -->
    <section class="hero is-fullheight-with-navbar" id="intro">
      <div class="hero-body">
        <div class="container is-fluid">
          Hello! I am
          <h1 class="title is-1">Julian Beck</h1>
          <h2 class="subtitle is-3">Computer Science Student</h2>
          <a class="button is-danger is-medium" v-scroll-to="'#about'">Learn more</a>
        </div>
      </div>
    </section>

    <!-- About -->
    <section class="hero is-fullheight-with-navbar" id="about">
      <!-- Title -->
      <div class="hero-body container is-fluid">
        <div class="columns">
          <div class="column is-one-quarter">
            <img class="profile-image" src="~assets/images/Profile.jpg">
          </div>
          <div class="column">
            <h1 class="title is-1">About me</h1>
            <div>
              <p>
                I'm a computer science student at the University of applied sciences in Karlsruhe.
                Currently I have a huge intrest in learning Web techniques and Full Stack development as well es native App development.
                Besides that i love drinking coffee and seeing the world!
              </p>
              <br>
            </div>
            
            <a
              class="lbutton button is-medium"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/jufabeck2202"
            >
              <span class="icon">
                <fa-icon :icon="['fab', 'github']"/>
              </span>
              <span>GitHub</span>
            </a>
            <a
              class="lbutton button is-medium"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/kickbeak/"
            >
              <span class="icon is-medium">
                <fa-icon :icon="['fab', 'instagram']"/>
              </span>
              <span>Instagram</span>
            </a>
            <a
              class="button lbutton is-medium"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/julian-beck/"
            >
              <span class="icon is-medium">
                <fa-icon :icon="['fab', 'linkedin']"/>
              </span>
              <span>linkedin</span>
            </a>
            <a class="lbutton button is-danger is-medium" v-scroll-to="'#contact'">contact me</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section class="section " id="contact">
      <div class="container is-fluid">
        <div class="section-heading">
          <h3 class="title is-2">Contact</h3>
          <h4 class="subtitle is-5">Get in touch</h4>
        </div>
        <br>

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
              <button type="submit" class="button is-danger is-medium" value="Send">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="section-heading">
        <p>
          <strong>Personal website</strong>
        </p>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  name: "home"
};
</script>
<style>
#intro {
  background: #151515 url("~assets/images/background.jpg") no-repeat center
    bottom;
  background-size: cover;
}
.profile-image {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.lbutton{
  margin: 2px
}
@media only screen and (max-width: 700px) {
  #intro {
    background: #151515 url("~assets/images/background2.jpg") no-repeat center
      bottom;
    background-size: cover;
  }
}
@media (min-width: 1025px) {
  .container {
    margin-left: 128px !important;
    margin-right: 128px !important;
  }
}
</style>
