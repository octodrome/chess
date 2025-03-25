import type { FetchOptions } from 'ofetch'
import { defu } from 'defu'
import { ofetch } from 'ofetch'

export function useCustomFetch<T>(url: string, options: FetchOptions = {}) {
    const config = useRuntimeConfig()
    const userAuth = useCookie('token')

    const defaults: FetchOptions = {
        baseURL: config.public.restApiUrl as string,
        headers: userAuth.value
            ? { Authorization: `Bearer ${userAuth.value}` }
            : {},
        responseType: 'json', // Set default responseType to 'json'
    }

    // Merge user-provided options with defaults using defu
    const params = defu(options, defaults) as FetchOptions

    // Explicitly type-cast params to enforce the correct 'json' responseType
    const finalParams = {
        ...params,
        responseType: 'json',
    } as FetchOptions<'json'> // Narrow to 'json'

    // Use ofetch (or $fetch) with the adjusted params
    return ofetch<T>(url, finalParams)
}
