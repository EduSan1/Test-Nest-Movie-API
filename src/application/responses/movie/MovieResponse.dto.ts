export class MovieResponse {
    constructor(
        readonly id : string,
        readonly title : string,
        readonly description : string,
        readonly releaseDate : Date
    ) {}
}