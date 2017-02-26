(function() {
    var fs = require('fs'),
        m3u = require('m3u');

    if (process.argv.length < 3)
        usage('Please provide directory path');

    try {
        var dir_stat = fs.statSync(process.argv[2]);

        if (!dir_stat.isDirectory())
            throw Error("'" + process.argv[2] + "' is not a directory");

        index(process.argv[2] + (process.argv[2].substr(-1) != '/' ? '/' : ''));
    }
    catch (err) {
        console.error(err.message);
        process.exit(2);
    }

    function usage(message) {
        if (typeof message !== 'undefined')
            console.error(message, '');

        console.error('Usage:', process.argv[0], process.argv[1], 'DIRECTORY');
        process.exit(1);
    }

    function index(root_dir, directory) {
        if (typeof directory === 'undefined') {
            directory = '';
        }

        if (directory) {
            console.log("Entering directory '" + directory + "'");
            directory += '/';
        }
        else {
            console.log("Entering root directory '" + root_dir + "'");
        }

        var songs = [];
        var dir_to_read = root_dir + directory;
        var has_subdirs = false;

        fs.readdirSync(dir_to_read).forEach(function(file) {
            if (file.substr(0, 1) == '.')
                return;

            var filename = dir_to_read + '/' + file;
            var stat = fs.statSync(filename);

            if (stat.isDirectory()) {
                var subdir_songs = index(root_dir, directory + file);
                has_subdirs = subdir_songs.length > 0;
                subdir_songs.forEach(function(song) {
                    songs.push(file + '/' + song);
                });
                return;
            }

            if (!stat.isFile())
                return;

            if (filename.substr(-4) != '.mp3')
                return;

            songs.push(file);
        });

        if (has_subdirs) {
            var m3u_writer = m3u.writer();

            songs.forEach(function(song) {
                m3u_writer.file(song);
            })

            fs.writeFileSync(dir_to_read + '/dir.m3u', m3u_writer.toString());
            console.log("'" + dir_to_read + "dir.m3u' has been written");
        }

        return songs;
    }
})();
