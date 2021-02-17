import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    var url = this.expressBaseUrl + endpoint;
    var promise = this.http.get(url).toPromise();
    return Promise.resolve(promise);
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    var encodedResource = encodeURIComponent(resource);

    // Identify search endpoint in express webserver
    var searchEndpoint = '/search/' + category + '/' + encodedResource;

    // Send request to express
    return this.sendRequestToExpress(searchEndpoint).then((data) => {
      // Identify category and get array based on data type
      if (category == "artist"){
        let artists = [];
        for (var a in data.artists.items){
          artists.push(new ArtistData(data.artists.items[a]));
        }
        return artists;
      }
      else if (category == "album"){
        let albums = [];
        for (var a in data.albums.items){
          albums.push(new AlbumData(data.albums.items[a]));
        }
        return albums;
      }
      else if (category == "track"){
        let tracks = [];
        console.log(data);
        for (var t in data.tracks.items){
          tracks.push(new TrackData(data.tracks.items[t]));
        }
        return tracks;
      }
    });
  }

  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.

    var encodedArtistId = encodeURIComponent(artistId);
    var searchEndpoint = '/artist/' + encodedArtistId;
    return this.sendRequestToExpress(searchEndpoint).then((data) => {
      return new ArtistData(data);
    });
  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
    var encodedArtistId = encodeURIComponent(artistId);
    var searchEndpoint = '/artist-related-artists/' + encodedArtistId;

    return this.sendRequestToExpress(searchEndpoint).then((data) => {
      let relatedArtists = [];
      for (var a in data.artists){
        relatedArtists.push(new ArtistData(data.artists[a]));
      }
      return relatedArtists;
    });
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    var encodedArtistId = encodeURIComponent(artistId);
    var searchEndpoint = '/artist-top-tracks/' + encodedArtistId;

    return this.sendRequestToExpress(searchEndpoint).then((data) => {
      let tracks = [];
      for (var t in data.tracks){
        tracks.push(new TrackData(data.tracks[t]));
      }

      return tracks;
    });
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    var encodedArtistId = encodeURIComponent(artistId);
    var searchEndpoint = '/artist-albums/' + encodedArtistId;

    return this.sendRequestToExpress(searchEndpoint).then((data) => {

      let albums = [];
      for (var a in data.items){
        albums.push(new AlbumData(data.items[a]));
      }
      return albums;
    });
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    var encodedAlbumId = encodeURIComponent(albumId);
    var searchEndpoint = '/album/' + encodedAlbumId;
    return this.sendRequestToExpress(searchEndpoint).then((data) => {
      return new AlbumData(data);
    });
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    var encodedAlbumId = encodeURIComponent(albumId);
    var searchEndpoint = '/album/' + encodedAlbumId;

    return this.sendRequestToExpress(searchEndpoint).then((data) => {

    console.log(data.tracks.items);
      let track = [];
      for (var a in data.tracks.items){
        track.push(new TrackData(data.tracks.items[a]));
      }
      return track;
    });
  }

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    var encodedTrackId = encodeURIComponent(trackId);
    var searchEndpoint = '/track/' + encodedTrackId;
    return this.sendRequestToExpress(searchEndpoint).then((data) => {
      return new TrackData(data);
    });
    return null;
  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    var encodedTrackId = encodeURIComponent(trackId);
    var searchEndpoint = '/track-audio-features/' + encodedTrackId;
    return this.sendRequestToExpress(searchEndpoint).then((data) => {
      var dataMapping = []
      for (var d in data){
        // Check if feature type is what we need
        if (TrackFeature.FeatureTypes.includes(d)){
          dataMapping.push(new TrackFeature(d, data[d]));
        }
      }
      console.log(dataMapping);
      return dataMapping;
    });
  }
}
