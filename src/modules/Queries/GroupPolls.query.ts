import gql from "graphql-tag";

export interface GroupPolls {
  groupPolls: GroupPoll[]
}

export interface GroupPoll {
  id: string;
  open: boolean;
  title: string;
  author: GroupPollAuthor;
  playDate: Date;
}

export interface GroupPollAuthor {
  id: string;
  username: string;
  color: string;
}

export const GROUP_POLLS = gql`
  query {
    groupPolls {
        id
        title
        open
        playDate
        author {
          id
          username
          color
        }
      }
    }
`;