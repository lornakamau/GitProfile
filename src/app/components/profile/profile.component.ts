import { Component, OnInit } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';

const query_variables = {
  'token': `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`,
  'username': 'lornakamau'
};

const userProfile = gql`
query { 
  user(login: "${query_variables['username']}")  
  {
    avatarUrl,
    followers{
      totalCount
    },
    following{
      totalCount
    }
    repositories(first: 30, ownerAffiliations: OWNER) {
      totalCount,
      nodes {
        name,
        
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
  constructor(private apollo: Apollo) { }

  ngOnInit(): void {

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
