import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest'
import Tasks from './Tasks.vue'
import { useQuery } from '@tanstack/vue-query'
import { reactive } from 'vue'
import { mount } from '@vue/test-utils'
import { useRoute } from 'vue-router'

vi.mock('@tanstack/vue-query', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useQuery: vi.fn()
  }
})
vi.mock('vue-router', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useRoute: vi.fn()
  }
})

vi.mock('@/components/Pagination/Pagination.vue', () => ({
  default: {
    template: "**Pagination mock**"
  }
}))

describe('Tasks', () => {

  afterEach(() => {
    vi.clearAllMocks()
  })

  beforeEach(() => {
    useRoute.mockImplementation(() => (reactive({ query: { pageSize: 5, pageNumber: 1 } })))
  })

  describe('when data is loading', () => {
    beforeEach(() => {
      useQuery.mockImplementation(() => {
        return reactive({
          isError: false,
          isPending: true,
          data: {}
        })
      })
    })

    it('should not blow', () => {
      const wrapper = mount(Tasks)
      expect(wrapper.text()).toContain('loading')
    })
  })

  describe('when there is an error', () => {
    beforeEach(() => {
      useQuery.mockImplementation(() => {
        return reactive({
          isError: true,
          isPending: false,
          data: {}
        })
      })
    })

    it('should not blow', () => {
      const wrapper = mount(Tasks)
      expect(wrapper.text()).toContain('Error')
      // expect(wrapper.element).toMatchSnapshot()
    })
  })
})
