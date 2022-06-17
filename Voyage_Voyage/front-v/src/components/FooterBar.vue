<template>
    <div class="footer-dark">
        <footer>
            <div class="containe">
                
                <div class="row">
                  <div class="col-sm-1 item">
                    <a class="navbar-brand" href="/"><img class="logo" src="../assets/Voyage-logo.png" alt="logo_voyage" /></a>
                  </div>
              
                    <div class="col-sm-2 col-md-3 item">
                        <h3>Legal information</h3>
                        <ul>
                            <li><a href='/termsandconditions'>Terms of use</a></li>
                            <li><a href='/termsandconditions'>Policies</a></li>
                            <li><a href="#">Hosting</a></li>
                        </ul>
                    </div>
                    <div class="col-sm-2 col-md-3 item">
                        <h3>About</h3>
                        <ul>
                            <li><a href="#">Company</a></li>
                            <li><a href="#">Team</a></li>
                            <li><a href="#">Careers</a></li>
                        </ul>
                    </div>
                    <div class="col-md-2 col-md-3 item ">
                        <h3>Voyage Voyage</h3>
                        <p>Voyage voyage &circledR; the world's largest travel guidance platform, helps hundreds of millions 
                          of people each month become better travelers, from planning to booking to taking a trip. 
                         Voyage voyage &circledR; makes planning easy no matter the trip type.</p>
                        <br/>
                            <audio controls>
                              <source src="../assets/music/Desireless-Voyage.mp3" type="audio/mpeg">
                              <p>Your browser doesn't support HTML5 audio. Here is
                                a <a href="https://music.youtube.com/tasteprofile">link to the audio</a> instead.</p>
                        </audio>
                        <!--<iframe width="560" height="315" src="https://www.youtube.com/embed/sM2ZhByFcDk" 
                        title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; 
                        encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
                    </div>
                    <div class="col item social"><a href="#"><i class="icon ion-social-facebook"></i></a><a href="#"><i class="icon ion-social-twitter"></i></a><a href="#"><i class="icon ion-social-snapchat"></i></a><a href="#"><i class="icon ion-social-instagram"></i></a></div>
                </div>
                <p class="copyright">Voyage Voyage © 2022</p>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'FooterBar'
}
</script>

<style scoped>
.footer-dark {
  padding:50px 0;
  color:#f0f9ff;
  background-color:#282d32;
}

.footer-dark h3 {
  margin-top:0;
  margin-bottom:12px;
  font-weight:bold;
  font-size:16px;
}
.footer-dark p{
  font-size: 12px;
}

.footer-dark ul {
  padding:0;
  list-style:none;
  line-height:1.6;
  font-size:18px;
  margin-bottom:0;
}

.footer-dark ul a {
  color:inherit;
  text-decoration:none;
  opacity:0.6;
}

.footer-dark ul a:hover {
  opacity:0.8;
}

@media (max-width:767px) {
  .footer-dark .item:not(.social) {
    text-align:center;
  }
  .footer-dark{
    width: 100%;
  }
}

.footer-dark .item.text {
  margin-bottom:36px;
}

@media (max-width:767px) {
  .footer-dark .item.text {
    margin-bottom:0;
  }
  .footer-dark{
    width: 100%;
  }
}

.footer-dark .item.text p {
  opacity:0.6;
  margin-bottom:0;
}
.logo{
  width:90px;
  height: auto;
}
</style>