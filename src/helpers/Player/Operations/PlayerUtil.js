export class PlayerUtil {
    /**
     *
     * @param music
     * @returns {{id, url, title: string, artist: string, artwork: string|string|string|string|string|*}}
     */
    static convertToTrackPlayerFormat(music) {
        return {
            id: music.id,
            url: music.path,
            title: music.title || 'Unknown',
            artist: music.author || 'Unknown',
            artwork: music.cover || 'Unknown',
        };
    }
}