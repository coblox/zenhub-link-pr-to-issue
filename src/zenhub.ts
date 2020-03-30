import axios from 'axios'

type Response = 'ok' | Error
type Error =
  | 'not-found'
  | {
      message: string
    }

export async function linkPrToIssue(
  issueRepoId: number,
  issueNumber: string,
  prRepoId: number,
  prNumber: number,
  token: string
): Promise<Response> {
  return axios
    .post(
      `https://api.zenhub.com/v4/repositories/${issueRepoId}/connection`,
      {
        issue_number: issueNumber,
        connected_repo_id: prRepoId,
        connected_issue_number: prNumber
      },
      {
        headers: {'x-authentication-token': token}
      }
    )
    .then(
      _ => {
        return 'ok'
      },
      reason => {
        return reason.message === 'Not found'
          ? 'not-found'
          : {message: reason.message}
      }
    )
}
