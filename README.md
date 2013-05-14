firefoxbluesbeat
================

A sidebar add-on for Mozilla Firefox.  Users can upload or drag and drop mp3 tracks onto the sidebar.  Detailed information about the track and artist will be retrieved from the Echo Nest API and displayed.

![ScreenShot](https://raw.github.com/jcraig77/firefoxbluesbeat/master/sidebar_screenshot.png)

The user can choose to either select a file from their local operating system or drag a link from the main Firefox browswer window onto the drag target within the sidebar.  A progress bar will display while the track is being analyzed.  Note: It may take several seconds for the track to be uploaded and/or analyzed.

The following information is returned:
Artist - The name of the artist

Title - The title of the track

Release - The album the track was released on.

Bitrate - The bitrate of the track.

Sample Rate - The sample rate of the track.

Danceability -

Duration - The duration of the track in seconds.

Energy -

Key - From the Echo Nest API documentation: the estimated overall key of a track. The key identi�es the tonic triad, the chord, major or minor, which 
represents the �nal point of rest of a piece

Loudness - From the Echo Nest API documentation: the overall loudness of a track in decibels (dB). Loudness values in the Analyzer are averaged across 
an entire track and are useful for comparing relative loudness of segments and tracks. Loudness is the quality of 
a sound that is the primary psychological correlate of physical strength (amplitude).

Liveness -

Tempo - From the Echo Nest API documentation: the overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the 
speed or pace of a given piece and derives directly from the average beat duration.

Time Signature - From the Echo Nest API documentation: an estimated overall time signature of a track. The time signature (meter) is a notational 
convention to specify how many beats are in each bar (or measure).

Mode - From the Echo Nest API documentation: indicates the modality (major or minor) of a track, the type of scale from which its melodic content is 
derived

Similar Artists - Return similar artists given one or more artists for comparison.