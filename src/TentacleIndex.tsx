/*  Miskatonic-TIXT | TentacleIndeX Tracker

 *  Copyright (C) 2021 Stefan Zimmermann <user@zimmermann.co>

 *  Licensed under the MIT License
 */

import React, {ComponentProps, Props, ReactComponentElement, useEffect, useState} from "react";

import {MiskatonicYouTubeAPI} from './youtube'
import {findTentacleScoreInComment} from "./parser";


interface ScorerProps extends ComponentProps<any> {
    scores: number[]
}

interface TixerProps extends ComponentProps<any> {
    tixValue: number
}

interface TentacleIndexProps extends ComponentProps<any> {
    youTubeAPIKey: string
    videoId: string

    scorer?: (props: ScorerProps) => ReactComponentElement<any>
    tixer?: (props: TixerProps) => ReactComponentElement<any>
}

const TentacleIndex: React.FunctionComponent<TentacleIndexProps> = ({youTubeAPIKey, videoId, scorer, tixer, ...props}) => {
    const [scores, setScores] = useState([] as number[])
    const [tixValue, setTixValue] = useState(0)

    useEffect(() => {
        MiskatonicYouTubeAPI.usingKey(youTubeAPIKey).fetchCommentsForVideo(videoId).then(comments => {
            const scores: number[] = comments.map(findTentacleScoreInComment).filter(Number).map(Number)
            setScores(scores)

            if (scores.length) {
                setTixValue(scores.reduce((left, right) => left + right, 0) / scores.length)
            }
        })
    }, [youTubeAPIKey, videoId])

    return (<>
        {scorer ? scorer({scores, ...props}) : <div {...props}>{scores.map(score => <div>{score}</div>)}</div>}
        {tixer ? tixer({tixValue, ...props}) : <div {...props}>{tixValue}</div>}
    </>)
}

export default TentacleIndex
