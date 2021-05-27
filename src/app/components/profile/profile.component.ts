import { Component, OnInit } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { Title } from '@angular/platform-browser';

const query_variables = {
  'token': `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`,
  'username': 'lornakamau'
};
const userProfile = gql`
query {
  user(login: "${query_variables['username']}") {
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
      }
    }
  }
}
`
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = [];
  constructor(private apollo: Apollo, private titleService: Title) { }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {
    this.setTitle("kitu")

    this.apollo.watchQuery<any>({
      query: userProfile
    }).valueChanges
    .subscribe(({data, loading, error}) => {
      console.log(loading);
      console.log(data)
      console.log(error)
      // this.user = data;
    })
  }

}
