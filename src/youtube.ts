/*  Miskatonic-TIXT | TentacleIndeX Tracker

 *  Copyright (C) 2021 Stefan Zimmermann <user@zimmermann.co>

 *  Licensed under the MIT License
 */

import axios, {AxiosInstance, AxiosResponse} from 'axios'
import {youtube_v3} from 'googleapis'

// const {google} = require('googleauth')


export class MiskatonicYouTubeAPI {

    private readonly axiosInstance: AxiosInstance

    private constructor(key: string) {
        this.axiosInstance = axios
            .create({ baseURL: 'https://www.googleapis.com/youtube/v3/', params: { key: key, part: 'snippet' } })
    }

    static usingKey = (key: string): MiskatonicYouTubeAPI => {
        return new MiskatonicYouTubeAPI(key)
    }

    fetchCommentsForVideo = async (videoId: string): Promise<string[]> => {
        const response = await this.axiosInstance.get('/commentThreads', { params: { videoId: videoId } })
            .catch(e => {
                console.error(e)
                return []
            })

        const data: youtube_v3.Schema$CommentThreadListResponse = (response as AxiosResponse).data
        return data?.items?.map(commentThread => commentThread?.snippet?.topLevelComment?.snippet?.textOriginal as string) || []
    }
}
