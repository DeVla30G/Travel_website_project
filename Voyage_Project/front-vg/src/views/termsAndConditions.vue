<template>
<NavBar/>
<div>
    <div class="container">
        <h1>Commenting Terms and Conditions</h1>
        <h5>Submission of a comment to this blog is subject to additional Terms and Conditions. 
            By clicking “I accept the User Comment Terms and Conditions” before you submit your first comment, 
            you agree to be bound by these conditions every time you submit a comment.</h5>
    <div>
        <ol>
            <li>
            This Agreement shall begin on the date hereof.
            </li>
            <li>
            Voyage voyage reserves the right to monitor all Comments and to remove any Comments 
            which it considers in its absolute discretion to be inappropriate, offensive or otherwise in breach of these Terms and Conditions.
            </li>
            <li>
            You warrant and represent that:   
            <ul>
                    You are entitled to post the Comments on the website and have all necessary licenses and consents to do so;
                    <li>
                    the Comments do not infringe any intellectual property right, 
                    including without limitation copyright, patent or trademark, or other proprietary right of any third party;
                    </li>
                    <li>
                    the Comments do not contain any defamatory, libellous, offensive, indecent or
                    otherwise unlawful material or material which is an invasion of privacy
                    </li>
                    <li>
                    the Comments do not contain any contaminating or destructive features or devices such as viruses,
                    time bombs or coding designed to interrupt, destroy or limit the functionality of this website or any of 
                    this website’s user’s computer equipment or software; and
                    </li>
                    <li>
                    the Comments will not be used to solicit or promote business or
                    custom or present commercial activities or unlawful activity.
                    </li>
            </ul>
            </li>
            <li>
            You hereby grant to Voyage voyage a non-exclusive royalty-free license to use, 
            reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.
            </li>
            <li>
            You hereby agree to indemnify and keep indemnified Voyage voyage, its affiliates, 
            contractors and agents from and against any and all losses (including without limitation direct, 
            indirect and consequential loss), costs, claims, damages or expenses of whatever nature and howsoever 
            caused arising directly or indirectly from any breach of these Terms and Conditions or arising from 
            the Comments posted on this website or content contained in any email sent using the facilities 
            provided by the website by you including without limitation as a result of any infringement of 
            any intellectual property or other proprietary rights, libel, defamation, obscenity or the Comments being otherwise unlawful.
            </li>
       </ol>
    </div>

    </div>
</div>
<FooterBar/>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import FooterBar from '@/components/FooterBar.vue'
export default {
    name: 'termsAndConditions',
    components: {
        NavBar,
        FooterBar
    }
}
</script>

<style scoped>
.container{
    border: 5px solid;
  border-image: linear-gradient(#f5ff2f, #914017, #fb2b02) 1;
  animation: rotate 2.5s ease-in infinite;
  background-color: white;
  opacity: 80%;
  z-index: 0;
  padding: 3em;
  margin-top: 3em;
  margin-bottom: 3em;
}

</style>