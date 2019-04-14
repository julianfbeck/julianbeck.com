<template>
  <div>
    <!-- Header -->
    <section class="hero is-fullheight-with-navbar" id="intro">
      <div class="hero-body">
        <div class="container">
          Hello! I am
          <h1 class="title is-1">Julian Beck</h1>
          <h2 class="subtitle is-3">Computer Science Student</h2>
          <a class="button is-primary" v-scroll-to="'#about'">Learn more</a>
        </div>
      </div>
    </section>

    <!-- About -->
    <section class="section" id="about">
      <!-- Title -->
      <div class="section-heading">
        <h3 class="title is-2">About Me</h3>
        <h4 class="subtitle is-5">Jack of all trades, master of "some"</h4>
        <div class="container">
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

      <div class="columns has-same-height is-gapless">
        <div class="column">
          <!-- Profile -->
          <div class="card">
            <div class="card-content">
              <h3 class="title is-4">Profile</h3>

              <br>
              <div class="buttons has-addons is-centered">
                <a href="#" class="button is-link">Github</a>
                <a href="#" class="button is-link">LinkedIn</a>
                <a href="#" class="button is-link">Twitter</a>
                <a href="#" class="button is-link">CodeTrace</a>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <!-- Profile picture -->
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="https://source.unsplash.com/random/1280x960" alt="Placeholder image">
              </figure>
            </div>
          </div>
        </div>
        <div class="column">
          <!-- Skills -->
          <div class="card">
            <div class="card-content skills-content">
              <h3 class="title is-4">Skills</h3>
              <div class="content">
                <article class="media">
                  <div class="media-content">
                    <div class="content">
                      <p>
                        <strong>JavaScript:</strong>
                        <br>
                        <progress class="progress is-primary" value="90" max="100"></progress>
                      </p>
                    </div>
                  </div>
                </article>

                <article class="media">
                  <div class="media-content">
                    <div class="content">
                      <p>
                        <strong>Vue.js:</strong>
                        <br>
                        <progress class="progress is-primary" value="90" max="100"></progress>
                      </p>
                    </div>
                  </div>
                </article>

                <article class="media">
                  <div class="media-content">
                    <div class="content">
                      <p>
                        <strong>Node.js:</strong>
                        <br>
                        <progress class="progress is-primary" value="75" max="100"></progress>
                      </p>
                    </div>
                  </div>
                </article>

                <article class="media">
                  <div class="media-content">
                    <div class="content">
                      <p>
                        <strong>HTML5/CSS3</strong>
                        <br>
                        <progress class="progress is-primary" value="95" max="100"></progress>
                      </p>
                    </div>
                  </div>
                </article>

                <article class="media">
                  <div class="media-content">
                    <div class="content">
                      <p>
                        <strong>Databases</strong>
                        <br>
                        <progress class="progress is-primary" value="66" max="100"></progress>
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills tags -->
    <!-- <br>
        <div class="tags custom-tags">
          <span class="tag is-light">Node.js</span><span class="tag is-light">Express.js</span><span class="tag is-light">VueJS</span><span
            class="tag is-light">JavaScript</span><span class="tag is-light">HTML5</span><span class="tag is-light">Canvas</span><span
            class="tag is-light">CSS3</span><span class="tag is-light">Bulma</span><span class="tag is-light">Bootstrap</span><span
            class="tag is-light">jQuery</span><span class="tag is-light">Pug</span><span class="tag is-light">Stylus</span><span
            class="tag is-light">SASS/SCSS</span><span class="tag is-light">Webpack</span><span class="tag is-light">Git</span><span
            class="tag is-light">ASP.NET Web Forms</span><span class="tag is-light">MSSQL</span><span class="tag is-light">MongoDB</span><span
            class="tag is-light">Apache Cordova</span><span class="tag is-light">Chrome Extensions</span>
    </div>-->

    <!-- Services -->
    <section class="section" id="services">
      <div class="section-heading">
        <h3 class="title is-2">Services</h3>
        <h4 class="subtitle is-5">What can I do for you?</h4>
      </div>
      <div class="container">
        <div class="columns">
          <div class="column">
            <div class="box">
              <div class="content">
                <h4 class="title is-5">Front End Web Development</h4>Develop Front End using latest standards with HTML5/CSS3 with added funtionality using JavaScript and
                Vue.js.
              </div>
            </div>
          </div>
          <div class="column">
            <div class="box">
              <div class="content">
                <h4 class="title is-5">Back End Web Development</h4>Develop Back End application/service using Node.js or ASP .NET and SQL server or Mongo DB databases.
              </div>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <div class="box">
              <div class="content">
                <h4 class="title is-5">Front End Web Development</h4>Develop Front End using latest standards with HTML5/CSS3 with added funtionality using JavaScript and
                Vue.js.
              </div>
            </div>
          </div>
          <div class="column">
            <div class="box">
              <div class="content">
                <h4 class="title is-5">Back End Web Development</h4>Develop Back End application/service using Node.js or ASP .NET and SQL server or Mongo DB databases.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section class="section" id="contact">
      <div class="container">
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
          <strong>Bulma Personal Template</strong> by
          <a href="https://mubaidr.js.org">Muhammad Ubaid Raza</a>. The
          source code is licensed
          <a
            href="http://opensource.org/licenses/mit-license.php"
          >MIT</a>.
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
  background: #151515 url(/wp-content/themes/jethromay/assets/images/intro.jpg)
    no-repeat center bottom;
  background-size: cover;
}
</style>
