import { Component, OnInit } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  queryParam: any;
  loading: boolean = false;
  advancedSearchUrl: any;
  constructor(private apollo: Apollo, private titleService: Title) {
    this.advancedSearchUrl = `/search/advanced?q=${this.queryParam}`;
   }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  queryApi(param: any): void{
    const query_variables = {
      'token': `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`,
      'username': ''
    };
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
        status {
          emoji
          message
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
        console.log(loading);
        this.loading = loading;
        this.user = data.search.nodes[0];
        console.log(typeof data.search.nodes[0], data.search.nodes[0]);
        console.log(error);
      })
  }
  search(event: any): void{
    this.queryApi(event);
    this.queryParam = event;
    this.loading = true;    
  }
  ngOnInit(): void {
    this.setTitle("kitu")
  }

}
