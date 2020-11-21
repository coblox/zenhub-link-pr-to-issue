import * as core from '@actions/core'
import {context} from '@actions/github'
import {linkPrToIssue} from './zenhub'

async function run(): Promise<void> {
  try {
    const branchName: string = context.payload.pull_request!.head.ref
    core.debug(`Branch name: ${branchName}`)

    const branchPrefix = core.getInput('BRANCH_PREFIX', {required: false})

    const regex = RegExp(`^${branchPrefix}[0-9]+-.*$`)
    if (!regex.test(branchName)) {
      core.debug(`Branch name is not lead by a number followed by a dash`)
      return
    }

    const issueNumber: string = branchName.substring(0, branchName.indexOf('-'))
    core.debug(`Issue number: ${issueNumber}`)

    const prNumber: number = context.payload.pull_request!.number
    core.debug(`PR number: ${prNumber}`)

    const prRepoId: number = context.payload.pull_request!.head.repo.id
    core.debug(`PR repo id: ${prRepoId}`)

    const zenhubToken = core.getInput('ZENHUB_TOKEN', {required: true})
    await linkPrToIssue(
      prRepoId,
      issueNumber,
      prRepoId,
      prNumber,
      zenhubToken
    ).then(res => {
      const prRepoName = context.payload.pull_request!.head.repo.full_name

      if (res === 'ok') {
        core.debug(
          `Linked PR ${prRepoName}#${prNumber} to issue ${prRepoName}#${issueNumber}`
        )
        return
      } else if (res === 'not-found') {
        core.debug(
          `Issue number ${issueNumber} does not exist in ${prRepoName}`
        )
        return
      } else {
        throw new Error(
          `Failed to link PR ${prRepoName}#${prNumber} to issue ${prRepoName}#${issueNumber}: ${res.message}`
        )
      }
    })
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
