// import gql from "graphql-tag";

// import { Poll } from "../Models/Poll";

// export interface AllOpenPollsData {
//   openPolls: Poll[]
// }

// export const ALL_OPEN_POLLS = gql`
//   query {
//     openPolls {
//         id
//         title
//         open
//         pollOptions {
//           userVotes {
//             veto
//             voter {
//               username
//               color
//             }
//           }
//           game {
//             name
//             description
//           }
//         }
//         author {
//           username
//           color
//         }
//       }
//     }
// `;