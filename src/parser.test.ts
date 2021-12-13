import {MiskatonicYouTubeAPI} from "./youtube";
import {findTentacleScoreInComment} from "./parser";

describe('findTentacleScoreInComment', () => {
    it("should find the correct tentacle score", async () => {
        let youTubeAPI = MiskatonicYouTubeAPI.usingKey(process.env.MISKATONIC_YOUTUBE_API_KEY as string)
        let comments: string[] = await youTubeAPI.fetchCommentsForVideo('UJCGgUhwLqo')

        expect(findTentacleScoreInComment(comments[0])).toBe(undefined)
        expect(findTentacleScoreInComment(comments[1])).toBe(6)
        expect(findTentacleScoreInComment(comments[2])).toBe(4)
    })
})
