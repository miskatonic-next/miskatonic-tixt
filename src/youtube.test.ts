import {MiskatonicYouTubeAPI} from "./youtube";


describe('MiskatonicYouTubeAPI', () => {

    describe('.fetchCommentsForVideo()', () => {
        it('should return correct data', async () => {
            let youTubeAPI = MiskatonicYouTubeAPI.usingKey(process.env.MISKATONIC_YOUTUBE_API_KEY as string)
            let comments: string[] = await youTubeAPI.fetchCommentsForVideo('UJCGgUhwLqo')

            expect(comments).toHaveLength(3)
        })
    })
})
