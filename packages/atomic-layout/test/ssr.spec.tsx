/**
 * @jest-environment node
 */
import { createSsrTest } from './createSsrTest'

createSsrTest(() => import('../src'))
