/**
 * Contract source: https://bit.ly/3DP1ypf
 *
 * Feel free to let us know via PR, if you find something broken in this contract
 * file.
 */

import { Expect } from '@japa/expect/build/src/types'
import '@japa/runner'

declare module '@japa/runner' {
  interface TestContext {
    // Extend context
    expect: Expect
  }

  interface Test<TestData> {
    // Extend test
  }
}
