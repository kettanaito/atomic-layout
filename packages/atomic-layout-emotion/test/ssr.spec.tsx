/**
 * @jest-environment node
 */
import { createSsrTest } from '../../atomic-layout/test/createSsrTest'

createSsrTest(() => import('../src/index'))
