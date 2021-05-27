import { Component, OnInit } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { Title } from '@angular/platform-browser';
import {User } from '../../../models/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  queryParam: any;
  loading: boolean = false;
  intro: boolean = true;
  advancedSearchUrl: any;
  overlayMenu: boolean = false;
  constructor(private apollo: Apollo, private titleService: Title) {}

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  queryApi(param: any): void{
    const userProfile = gql`
    query {
      search(query: "${param}", type: USER, first: 1) {
        nodes {
          ... on User {
          name
          login
          bio
          avatarUrl
          followers {
            totalCount
          }
          following {
            totalCount
          }
          starredRepositories {
            totalCount
          }
          company
          location
          websiteUrl
          email
          twitterUsername
          organizations(first: 5) {
            nodes {
              url
              avatarUrl
            }
          }
          repositories(first: 20, ownerAffiliations: OWNER, orderBy: {field: PUSHED_AT, direction: DESC}, privacy: PUBLIC) {
            totalCount
            nodes {
              name
              description
              forkCount
              stargazerCount
              updatedAt
              url
              languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {
                edges {
                  size
                  node {
                    color
                    name
                  }
                }
              }
              licenseInfo {
                name
              }
            }
          }
          }
        }
      }
    }
    `
    this.apollo.watchQuery<any>({
        query: userProfile
      }).valueChanges
      .subscribe(({data, loading, error}) => {
        this.loading = loading;
        if (data.search.nodes.length !=0 && data.search.nodes[0].__typename === 'User'){
          this.user = data.search.nodes[0];
        } else {
          this.user = null;
          this.advancedSearchUrl = `https://github.com/search/advanced?q=${this.queryParam}`;
        }
        if (this.user && this.user.login && this.user.name){
          this.setTitle(`${this.user.login} (${this.user.name})`);
        } else if (this.user && this.user.login && !this.user.name){
          this.setTitle(`${this.user.login}`);
        } else {
          this.setTitle("GitHub");
        }
      })
  }
  
  search(event: any): void{
    console.log(event)
    this.queryApi(event);
    this.queryParam = event;
    this.loading = true;   
    this.intro = false; 
    this.overlayMenu = false;
  }
  ngOnInit(): void {
  }

}
