/*  Miskatonic-TIXT | TentacleIndeX Tracker

 *  Copyright (C) 2021 Stefan Zimmermann <user@zimmermann.co>

 *  Licensed under the MIT License
 */

const NUMBER_PATTERNS = {
    1: "ein((en?)|s)?",
    2: "zwei",
    3: "drei",
    4: "vier",
    5: "f(ue|ü)nf",
    6: "sechs",
    7: "sieben",
    8: "acht",
    9: "neun",
    10: "zehn",
}


class TentacleNumber {

    readonly value: number
    readonly matchDistance: number

    constructor(value: number, distance: number) {
        this.value = value
        this.matchDistance = distance
    }
}


export function findTentacleScoreInComment(comment: string): number | undefined {
    const tentacleMatchIndex = comment.search(/tent(ae?|ä)keln?([^a-z]|$)/i)

    let closestNumber: TentacleNumber | undefined = undefined
    for (const [num, pattern] of Object.entries(NUMBER_PATTERNS)) {
        // @ts-ignore
        for (const numberMatch of comment.matchAll(RegExp(num + '|' + pattern, 'ig'))) {
            const numberMatchIndex = (numberMatch as RegExpMatchArray)?.index
            switch (numberMatchIndex) {
                case undefined:
                    continue

                default:
                    const matchDistance = tentacleMatchIndex - numberMatchIndex
                    if (matchDistance > 0 && (closestNumber === undefined || matchDistance < closestNumber.matchDistance)) {
                        closestNumber = new TentacleNumber(parseInt(num), matchDistance)
                    }
            }
        }
    }

    return closestNumber?.value
}
