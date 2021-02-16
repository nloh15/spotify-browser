import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-album-page',
  templateUrl: './album-page.component.html',
  styleUrls: ['./album-page.component.css']
})
export class AlbumPageComponent implements OnInit {
	albumId:string;
	album:AlbumData;
  tracks:TrackData[];
  
  artist:ArtistData[];

  constructor(private route: ActivatedRoute, private spotify: SpotifyService) { }

  ngOnInit() {
  	this.albumId = this.route.snapshot.paramMap.get('id');
  	//TODO: inject spotifyService and use it to get the album data and the tracks for the album

    this.spotify.getAlbum(this.albumId).then((data)=>{
      console.log(data);
      console.log(data.artists);
      
      this.album = data;
      this.artist = data.artists;
      
    });

    this.spotify.getTracksForAlbum(this.albumId).then((data)=>{
      this.tracks = data;
    });
  }

}
