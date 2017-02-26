# m3u-indexer

**m3u-indexer** walks through directories under a given root, locates mp3 files and creates m3u playlists.
The script will create playlist for every directory which has subdirectories with mp3 files.

It was made because my Seat Ibiza's stock radio can't shuffle all songs on SD card if I organise them in directories. But luckily enough the radio supports m3u playlists, so I wrote this little script to generate them for us. I suppose the script should work for other VW-based cars with similar radios as well.

For example, consider the following directory structure. Each of the directories has mp3s in it:
```
- Elvis Presley
-- Brilliant Elvis Country
-- Brilliant Elvis Love Songs & Gospel Favorites
-- Brilliant Elvis Movie Songs
-- Brilliant Elvis Rock And Roll
- Pink Floyd
-- 1979 - The Wall
-- 1988 - Delicate Sound Of Thunder
```
For the given structure, three m3us would be created: one for Elvis, one for the Pink Floyd and the last one in the root directory containing the mp3s.

## Installation

Just `npm install` in project root directory.

## Usage

In project root directory, run:
```
node . /Volumes/MUSIC/
```
Where `/Volumes/MUSIC/` is a path to a root directory.

## Usage for non-IT guys, Mac

1. Press the green **Clone or download** button at the top of the page.
2. Choose **Download ZIP**
3. Unpack a zipfile downloaded
4. Run **Terminal**
5. Type `cd ` (with a space at the end) in **Terminal**
6. Drag'n'drop a directory which was unpacked at the step 3 and hit **Enter**
7. Type `npm install` and hit **Enter**
  a. If you're getting `command not found` error, download and install NodeJS from [their website](https://nodejs.org) and try again
8. Now, as all dependencies for the script are installed, you can start to use it
9. Type the command from the **Usage** section, replacing `/Volumes/MUSIC/` with a path you need. Yep, I mean the short one above
