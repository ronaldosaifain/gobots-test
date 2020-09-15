module.exports = app => {

    app.get('/playlist', app.service.playlist.getPlaylist)


}