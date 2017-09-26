var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;

      var $row = $(template);

            $row.find('.song-item-number').click(clickHandler);
            $row.hover(onHover, offHover);
            return $row;

};

var setSong = function (songNumber){
  if (currentSoundFile) {
           currentSoundFile.stop();
       }

  currentlyPlayingSongNumber = parseInt(songNumber);
  currentSongFromAlbum = currentAlbum.songs[songNumber - 1];

  currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
         formats: [ 'mp3' ],
         preload: true
     });

    setVolume(currentVolume);
};

var setVolume = function(volume) {
    if (currentSoundFile) {
        currentSoundFile.setVolume(volume);
    }
};

var getSongNumberCell= function(number){
    return $('.song-item-number[data-song-number="' + number + '"]');
};

var clickHandler = function() {
  var songNumber = parseInt($(this).attr('data-song-number'));

  if (currentlyPlayingSongNumber  !== null) {
          // Revert to song number for currently playing song because user started playing new song.
      var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
      currentlyPlayingCell.html(currentlyPlayingSongNumber);
  }
  if (currentlyPlayingSongNumber  !== songNumber) {
  // Switch from Play -> Pause button to indicate new song is playing.
    $(this).html(pauseButtonTemplate);
    setSong(songNumber);
    currentSoundFile.play();
    updatePlayerBarSong();
  } else if (currentlyPlayingSongNumber === songNumber) {
    if (currentSoundFile.isPaused()){
      $(this).html(pauseButtonTemplate);
      $('.main-controls .play-pause').html(playerBarPauseButton);
      currentSoundFile.play();
    }
    else{
      $(this).html(playButtonTemplate);
      $('.main-controls .play-pause').html(playerBarPlayButton);
      currentSoundFile.pause();
    }
        }
    };

var onHover = function(event) {

  var songNumberCell = $(this).find('.song-item-number');
  var songNumber = parseInt(songNumberCell.attr('data-song-number'));

  if (songNumber !== currentlyPlayingSongNumber) {
    songNumberCell.html(playButtonTemplate);
  }
};

var offHover = function(event) {

  var songNumberCell = $(this).find('.song-item-number');
  var songNumber= parseInt(songNumberCell.attr('data-song-number'));

  if (songNumber !== currentlyPlayingSongNumber) {
    songNumberCell.html(songNumber);
  }
  console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
  };


     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');

 var setCurrentAlbum = function(album) {
      currentAlbum = album;
      $albumTitle.text(album.title);
      $albumArtist.text(album.artist);
      $albumReleaseInfo.text(album.year + ' ' + album.label);
      $albumImage.attr('src', album.albumArtUrl);

      $albumSongList.empty();
     for (var i = 0; i < album.songs.length; i++) {
       var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
       $albumSongList.append($newRow);
     }
 };


  var trackIndex = function(album, song) {
      return album.songs.indexOf(song);
  };

  var nextSong = function(){
    $('.song-item-number').each(function(){
         var number = $(this).attr("data-song-number");
         $(this).text(number);
     });

    var indexSongNumber = trackIndex(currentAlbum, currentSongFromAlbum);
    indexSongNumber++;

    if (indexSongNumber >= currentAlbum.songs.length){
      indexSongNumber = 0;
    }

    var lastSongNumber = currentlyPlayingSongNumber;
    setSong(indexSongNumber + 1);
    currentSoundFile.play();
    currentSongFromAlbum = currentAlbum.songs[indexSongNumber];

    updatePlayerBarSong();

    var $nextSongNumberCell= getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell= getSongNumberCell(lastSongNumber);

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
  };


  var previousSong = function(){
    $('.song-item-number').each(function(){
         var number = $(this).attr("data-song-number");
         $(this).text(number);
     });

    var indexSongNumber = trackIndex(currentAlbum, currentSongFromAlbum);
    indexSongNumber--;

    if (indexSongNumber < 0){
      indexSongNumber = currentAlbum.songs.length - 1;
    }

    var lastSongNumber = currentlyPlayingSongNumber;
    setSong(indexSongNumber + 1)
    currentSoundFile.play();
    currentSongFromAlbum = currentAlbum.songs[indexSongNumber];

    updatePlayerBarSong();

    $('.main-controls .play-pause').html(playerBarPauseButton);
    var $previousSongNumberCell= getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell= getSongNumberCell(lastSongNumber);

    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
  };


var updatePlayerBarSong = function(){

  $('.song-name').text(currentSongFromAlbum.title);
  $('.artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
  $('.artist-name').text(currentAlbum.artist);
  $('.main-controls .play-pause').html(playerBarPauseButton);
};

var togglePlayFromPlayerBar= function(){
  var $currentlyPlayingCell= getSongNumberCell(currentlyPlayingSongNumber);
      if (currentSoundFile.isPaused()) {
      $currentlyPlayingCell.html(pauseButtonTemplate);
      $playButton.html(playerBarPauseButton);
      currentSoundFile.play();
    }
    else{
      $currentlyPlayingCell.html(playButtonTemplate);
      $playButton.html(playerBarPlayButton);
      currentSoundFile.pause();
    }
};

 var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
 var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
 var playerBarPlayButton = '<span class="ion-play"></span>';
 var playerBarPauseButton = '<span class="ion-pause"></span>';

 var currentAlbum = null;
 var currentlyPlayingSongNumber = null;
 var currentSongFromAlbum = null;
 var currentSoundFile = null;
 var currentVolume = 80;

 var $previousButton = $('.main-controls .previous');
 var $nextButton = $('.main-controls .next');
 var $playButton= $('.main-controls .play-pause');

$(document).ready(function() {
     setCurrentAlbum(albumPicasso);
     $previousButton.click(previousSong);
     $nextButton.click(nextSong);
     $playButton.click(togglePlayFromPlayerBar);
});

 var threeAlbums = [albumPicasso, albumMarconi, albumCamada]
 var i=0;

 $albumImage.click(function(){
   setCurrentAlbum(threeAlbums[i]);
   i++;
   if( i === threeAlbums.length){
     i =0;
   }
 });
