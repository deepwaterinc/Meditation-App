const app = () => {
   const song = document.querySelector('.song');
   const play = document.querySelector('.play');
   const outline = document.querySelector('.moving-outline circle');
   const video = document.querySelector('.vid-container video');
   //Sounds
   const sounds = document.querySelector('.sound-picker button');
   //Time display
   const timeDisplay = document.querySelector('.time-display');
   const outlineLength = outline.getTotalLength();
   //Duration
   const timeSelect = document.querySelectorAll('time-select button');
   let fakeDuration = 65;
   
   outline.style.strokeDasharray = outlineLength;
   outline.style.strokeDashoffset = outlineLength;
   
   // sounds.forEach(sound => {
   //    sound.addEventListener("click", function() {
   //      song.src = this.getAttribute("data-sound");
   //      video.src = this.getAttribute("data-video");
   //      checkPlaying(song);
   //    });
   //  });

   //Play sound
   play.addEventListener('click', () => {
      checkPlaying(song);
   });

   //Select time
   timeSelect.forEach(option =>{
      option.addEventListener('click', function(){
         fakeDuration = this.getAttribute('data-time');
         timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
      });
   });

   //Create a function for play and stop songs
   const checkPlaying = song =>{
      if(song.paused){
         song.play();
         video.play();
         play.src = './svg/pause.svg';
      }  else{
         song.pause();
         video.pause();
         play.src = './svg/play.svg';
      }
   };
   //Animated the circle
   song.ontimeupdate = function() {
      let currentTime = song.currentTime
      let elapsed = fakeDuration - currentTime
      let seconds = Math.floor(elapsed % 60);
      let minutes = Math.floor(elapsed / 60);
      
      let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
      outline.style.strokeDashoffset = progress;
      //Animated the text
      timeDisplay.textContent = `${minutes}:${seconds}`;

      if(currentTime >= fakeDuration){
         song.pause();
         song.currentTime = 0;
         play.src = './svg/play.svg'
         video.pause();
      }
   }

};
app()