<template>
  <div>
    <!-- Header -->
    <section class="hero is-fullheight-with-navbar" id="intro">
      <div class="hero-body">
        <div class="container is-fluid">
          Hello! I am
          <h1 class="title is-1">Julian Beck</h1>
          <h2 class="subtitle is-3">Computer Science Student</h2>
          <a class="button is-danger" v-scroll-to="'#about'">Learn more</a>
        </div>
      </div>
    </section>

    <!-- About -->
    <section class="section" id="about">
      <!-- Title -->
      <div class="section-heading container is-fluid">
        <h3 class="title is-2">About Me</h3>

        <div class="columns">
          <div class="column is-one-third">
            <img src="https://avatars2.githubusercontent.com/u/7285926?s=460&v=4">
          </div>
          <div class="column">
            <h4 class="subtitle">Jack of all trades, master of "some"</h4>
            <div>
              <p>
                Web developer with more than
                <strong>4 years</strong> of well-rounded experience with a degree in the
                field of
                <strong>Computer Science</strong>, extensive knowledge of modern Web techniques and love for
                <strong>Coffee</strong>.
                Looking for an opportunity to work and upgrade, as well as being involved in an organization that
                believes
                in gaining a competitive edge and giving back to the community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section class="section" id="contact">
      <div class="container is-fluid">
        <div class="section-heading">
          <h3 class="title is-2">Contact</h3>
          <h4 class="subtitle is-5">Get in touch</h4>
        </div>
        <br>

        <div class="columns">
          <div class="column is-6 is-offset-3">
            <div class="box">
              <div class="field">
                <label class="label">Name</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Text input">
                </div>
              </div>

              <div class="field">
                <label class="label">Email</label>
                <div class="control has-icons-left">
                  <input class="input" type="email" placeholder="Email input" value>
                  <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                  </span>
                </div>
              </div>

              <div class="field">
                <label class="label">Message</label>
                <div class="control">
                  <textarea class="textarea" placeholder="Textarea"></textarea>
                </div>
              </div>

              <div class="field is-grouped has-text-centered">
                <div class="control">
                  <button class="button is-link is-large">
                    <span class="icon">
                      <i class="fas fa-envelope"></i>
                    </span>
                    <span>Submit</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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

@media only screen and (max-width: 700px) {
  #intro {
    background: #151515 url("~assets/images/background2.jpg") no-repeat center
      bottom;
    background-size: cover;
  }
}
@media (min-width: 1025px) {
  
  .container{
    margin-left: 128px !important;
    margin-right: 128px !important;

  }
  
}
</style>
